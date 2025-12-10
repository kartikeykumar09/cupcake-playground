import type { SimulationInput, PolicyResult } from './types';

export const evaluatePolicy = (policyCode: string, input: SimulationInput): PolicyResult => {
    // This is a naive mock evaluator. In a real scenario, this would be WASM/Rego.
    // We will check for specific keywords in the "policyCode" to simulate behavior.

    const lowerPolicy = policyCode.toLowerCase();

    // 1. Check for "Block Main Push" logic
    if (lowerPolicy.includes('input.action == "git_push"') && lowerPolicy.includes('branch == "main"')) {
        if (input.action === 'git_push' && input.branch === 'main') {
            return {
                decision: 'DENY',
                reason: 'Direct push to main branch is prohibited by policy.',
            };
        }
    }

    // 2. Check for "Block Secrets" logic
    if (lowerPolicy.includes('endswith(input.resource, ".env")')) {
        if (input.resource.endsWith('.env')) {
            return {
                decision: 'DENY',
                reason: 'Access to sensitive .env files is restricted.',
            };
        }
    }

    // 3. Check for "Require CI" logic
    if (lowerPolicy.includes('input.ci == false')) {
        if (!input.isCI) {
            return {
                decision: 'DENY',
                reason: 'Action blocked because CI is not passing.',
            };
        }
    }

    // 4. Default Allow
    return {
        decision: 'ALLOW',
        reason: 'Action complies with all active policies.',
    };
};

export const PRESET_POLICIES = {
    default: `package cupcake.policies

# Default: Allow everything
default allow = true`,

    blockMain: `package cupcake.policies

# Block git push directly to main
deny if {
    input.action == "git_push"
    input.branch == "main"
}`,

    blockSecrets: `package cupcake.policies

# Prevent reading .env files
deny if {
    input.action == "read_file"
    endswith(input.resource, ".env")
}`,

    requireCI: `package cupcake.policies

# Prevent deployment if CI failed
deny if {
    input.action == "deploy"
    input.ci == false
}`
};
