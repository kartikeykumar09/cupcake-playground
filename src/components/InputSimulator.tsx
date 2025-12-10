import React from 'react';
import type { SimulationInput } from '../lib/types';
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
    <div className="panel">
      <div className="panel-header">
        <Terminal size={16} className="text-accent-yellow" />
        <span>Agent Activity Simulator</span>
      </div>

      <div className="panel-content p-4 gap-4">
        
        {/* Action Selection */}
        <div className="flex-col gap-2">
          <label className="text-xs text-text-secondary font-bold" style={{textTransform: 'uppercase'}}>Intended Action</label>
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
        <div className="flex-col gap-3">
          <label className="text-xs text-text-secondary font-bold" style={{textTransform: 'uppercase'}}>Context Signals</label>
          
          <div className="signal-row">
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-muted" />
              <span className="text-sm">Git Branch</span>
            </div>
            <select 
              className="input-field text-sm"
              style={{ width: 'auto', padding: '2px 8px' }}
              value={input.branch}
              onChange={(e) => handleChange('branch', e.target.value)}
            >
              <option value="main">main</option>
              <option value="feature/dev">feature/dev</option>
              <option value="hotfix">hotfix</option>
            </select>
          </div>

          <div className="signal-row">
            <div className="flex items-center gap-2">
              <Server size={16} className="text-muted" />
              <span className="text-sm">CI Status</span>
            </div>
            <div className="flex gap-2">
              <button
                className={`status-toggle ${input.isCI ? 'passing' : 'inactive'}`}
                onClick={() => handleChange('isCI', true)}
              >
                PASSING
              </button>
              <button
                className={`status-toggle ${!input.isCI ? 'failing' : 'inactive'}`}
                onClick={() => handleChange('isCI', false)}
              >
                FAILING
              </button>
            </div>
          </div>

          <div className="flex-col gap-2">
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

        <div style={{ marginTop: 'auto' }}>
          <button className="btn btn-primary" onClick={onRun}>
            EVALUATE ACTION
          </button>
        </div>

      </div>
    </div>
  );
};
