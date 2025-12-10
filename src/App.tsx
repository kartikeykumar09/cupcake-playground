import { useState } from 'react';
import './index.css';
import { PolicyEditor } from './components/PolicyEditor';
import { InputSimulator } from './components/InputSimulator';
import { DecisionVisualizer } from './components/DecisionVisualizer';
import { evaluatePolicy, PRESET_POLICIES } from './lib/policyEvaluator';
import { PolicyResult, SimulationInput } from './lib/types';
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
    <div className="flex flex-col h-screen bg-bg-primary text-text-primary overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border-color bg-bg-secondary flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-bg-tertiary flex items-center justify-center border border-border-color">
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
      <main className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-12 gap-4 h-full">
          
          {/* Left: Policy (Code) */}
          <div className="col-span-4 h-full">
            <PolicyEditor code={policyCode} onChange={setPolicyCode} />
          </div>

          {/* Middle: Simulator Controls */}
          <div className="col-span-3 h-full">
            <InputSimulator input={input} onChange={setInput} onRun={handleRun} />
          </div>

          {/* Right: Visualization */}
          <div className="col-span-5 h-full">
            <DecisionVisualizer result={result} isEvaluating={isEvaluating} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
