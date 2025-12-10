import type { SimulationInput, PolicyResult } from './types';

export const evaluatePolicy = (policyCode: string, input: SimulationInput): PolicyResult => {
    try {
        // Basic hygiene: wrap in a function body that returns a PolicyResult
        // We expect the user to write code that returns an object { decision: 'ALLOW' | 'DENY', reason: string }

        // We construct a function: (input) => { ... user code ... }
        const cleanerCode = policyCode.trim();

        // Safety check (very basic client-side sandbox)
        if (cleanerCode.includes('eval(') || cleanerCode.includes('import(') || cleanerCode.includes('window.')) {
            return {
                decision: 'DENY',
                reason: 'Unsafe code detected (eval, import, window usage prohibited).',
            };
        }

        // Create the function
        // The user code is expected to be the body of the function.
        // If they include "export default function", we strip it for this simple eval.
        // For this prototype, let's assume the user writes the *body* or a standard fn structure
        // We'll normalize it by wrapping it.

        // Let's allow the user to write:
        // "if (input.action === 'git_push') return { decision: 'DENY', reason: '...' }"
        const funcBody = `
      "use strict";
      try {
        ${cleanerCode}
        return { decision: 'ALLOW', reason: 'Default allow' };
      } catch (e) {
        return { decision: 'DENY', reason: 'Runtime Error: ' + e.message };
      }
    `;

        const policyFn = new Function('input', funcBody);
        const result = policyFn(input);

        // Validate result shape
        if (result && (result.decision === 'ALLOW' || result.decision === 'DENY')) {
            return result as PolicyResult;
        }

        return {
            decision: 'DENY',
            reason: 'Policy returned invalid result format.',
        };

    } catch (e: any) {
        return {
            decision: 'DENY',
            reason: `Policy Syntax Error: ${e.message}`,
        };
    }
};

export const PRESET_POLICIES = {
    default: `// Default Policy: Allow everything
// The 'input' object is available globally here.

return { decision: 'ALLOW', reason: 'No restrictions applied.' };`,

    blockMain: `// Block direct pushes to 'main' branch

if (input.action === 'git_push' && input.branch === 'main') {
  return { 
    decision: 'DENY', 
    reason: 'Pushing directly to main is protected.' 
  };
}

return { decision: 'ALLOW', reason: 'Action permitted' };`,

    blockSecrets: `// Prevent reading sensitive configuration files

if (input.action === 'read_file' && input.resource.endsWith('.env')) {
  return { 
    decision: 'DENY', 
    reason: 'Access to .env files is strictly prohibited.' 
  };
}

return { decision: 'ALLOW', reason: 'Resource access granted' };`,

    requireCI: `// Block deployment if CI is failing

if (input.action === 'deploy' && !input.isCI) {
  return { 
    decision: 'DENY', 
    reason: 'Cannot deploy: CI build is failing.' 
  };
}

return { decision: 'ALLOW', reason: 'Deployment checks passed' };`
};
