import { useState } from 'react';
import './index.css';
import { PolicyEditor } from './components/PolicyEditor';
import { InputSimulator } from './components/InputSimulator';
import { DecisionVisualizer } from './components/DecisionVisualizer';
import { evaluatePolicy, PRESET_POLICIES } from './lib/policyEvaluator';
import type { PolicyResult, SimulationInput } from './lib/types';
import { Lock } from 'lucide-react';

function App() {
  const [policyCode, setPolicyCode] = useState(PRESET_POLICIES.default);
  const [input, setInput] = useState<SimulationInput>({
    action: 'git_push',
    resource: 'src/main.ts',
    branch: 'main',
    isCI: true,
    userParams: {}
  });
  
  const [result, setResult] = useState<PolicyResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleRun = () => {
    setIsEvaluating(true);
    setResult(null); // Clear previous

    // Simulate network delay / processing time
    setTimeout(() => {
      const decision = evaluatePolicy(policyCode, input);
      setResult(decision);
      setIsEvaluating(false);
    }, 800);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="flex items-center gap-3">
          <div className="logo-box">
            <Lock size={16} className="text-accent-blue" />
          </div>
          <h1 className="font-bold tracking-wide text-lg text-white">CUPCAKE <span className="text-accent-blue opacity-80 font-normal">PLAYGROUND</span></h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
           <a href="https://github.com/eqtylab/cupcake" target="_blank" className="hover:text-accent-blue transition-colors">Original Repo: eqtylab/cupcake</a>
           <span>v1.0.0-demo</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="main-content">
        <div className="grid-layout">
          
          {/* Left: Policy (Code) */}
          <div className="h-full">
            <PolicyEditor code={policyCode} onChange={setPolicyCode} />
          </div>

          {/* Middle: Simulator Controls */}
          <div className="h-full">
            <InputSimulator input={input} onChange={setInput} onRun={handleRun} />
          </div>

          {/* Right: Visualization */}
          <div className="h-full">
            <DecisionVisualizer result={result} isEvaluating={isEvaluating} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
