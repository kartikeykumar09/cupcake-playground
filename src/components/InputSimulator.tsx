import React from 'react';
import { SimulationInput } from '../lib/types';
import { Terminal, GitBranch, Server, Settings } from 'lucide-react';

interface Props {
  input: SimulationInput;
  onChange: (input: SimulationInput) => void;
  onRun: () => void;
}

export const InputSimulator: React.FC<Props> = ({ input, onChange, onRun }) => {
  const handleChange = (key: keyof SimulationInput, value: any) => {
    onChange({ ...input, [key]: value });
  };

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <Terminal size={16} className="text-accent-yellow" />
        <span>Agent Activity Simulator</span>
      </div>

      <div className="p-4 flex flex-col gap-6">
        
        {/* Action Selection */}
        <div className="space-y-2">
          <label className="text-xs uppercase text-text-secondary font-bold">Intended Action</label>
          <select 
            className="input-field"
            value={input.action}
            onChange={(e) => handleChange('action', e.target.value)}
          >
            <option value="git_push">git_push</option>
            <option value="read_file">read_file</option>
            <option value="deploy">deploy</option>
            <option value="write_file">write_file</option>
          </select>
        </div>

        {/* Signals */}
        <div className="space-y-4">
          <label className="text-xs uppercase text-text-secondary font-bold">Context Signals</label>
          
          <div className="flex items-center justify-between p-2 rounded bg-bg-tertiary border border-border-color">
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-text-muted" />
              <span className="text-sm">Git Branch</span>
            </div>
            <select 
              className="bg-bg-primary text-text-primary text-sm border border-border-color rounded px-2 py-1"
              value={input.branch}
              onChange={(e) => handleChange('branch', e.target.value)}
            >
              <option value="main">main</option>
              <option value="feature/dev">feature/dev</option>
              <option value="hotfix">hotfix</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-bg-tertiary border border-border-color">
            <div className="flex items-center gap-2">
              <Server size={16} className="text-text-muted" />
              <span className="text-sm">CI Status</span>
            </div>
            <div className="flex gap-2">
              <button
                className={`text-xs px-2 py-1 rounded ${input.isCI ? 'bg-accent-green text-bg-primary font-bold' : 'bg-bg-primary text-text-muted'}`}
                onClick={() => handleChange('isCI', true)}
              >
                PASSING
              </button>
              <button
                className={`text-xs px-2 py-1 rounded ${!input.isCI ? 'bg-accent-red text-bg-primary font-bold' : 'bg-bg-primary text-text-muted'}`}
                onClick={() => handleChange('isCI', false)}
              >
                FAILING
              </button>
            </div>
          </div>

          <div className="space-y-2">
             <div className="flex items-center gap-2 text-sm text-text-secondary">
               <Settings size={14} />
               <span>Resource / File Path</span>
             </div>
             <input 
               type="text" 
               className="input-field" 
               placeholder="e.g. src/config.json"
               value={input.resource}
               onChange={(e) => handleChange('resource', e.target.value)}
             />
          </div>

        </div>

        <div className="mt-auto">
          <button className="btn btn-primary w-full py-3" onClick={onRun}>
            EVALUATE ACTION
          </button>
        </div>

      </div>
    </div>
  );
};
