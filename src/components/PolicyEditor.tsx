import React from 'react';
import { PRESET_POLICIES } from '../lib/policyEvaluator';
import { Shield } from 'lucide-react';

interface Props {
  code: string;
  onChange: (code: string) => void;
}

export const PolicyEditor: React.FC<Props> = ({ code, onChange }) => {
  return (
    <div className="panel h-full">
      <div className="panel-header">
        <Shield size={16} className="text-accent-blue" />
        <span>Policy Definition (Rego)</span>
      </div>
      
      <div className="p-2 bg-bg-secondary border-b border-border-color flex gap-2">
        <select 
          className="input-field text-xs w-auto bg-bg-tertiary"
          onChange={(e) => {
            const preset = PRESET_POLICIES[e.target.value as keyof typeof PRESET_POLICIES];
            if (preset) onChange(preset);
          }}
        >
          <option value="default">Empty Policy</option>
          <option value="blockMain">Block Push to Main</option>
          <option value="blockSecrets">Block Secret Access</option>
          <option value="requireCI">Require CI Pass</option>
        </select>
      </div>

      <textarea 
        className="code-editor"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};
