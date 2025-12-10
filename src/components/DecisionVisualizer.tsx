import React from 'react';
import type { PolicyResult } from '../lib/types';
import { CheckCircle, XCircle, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  result: PolicyResult | null;
  isEvaluating: boolean;
}

export const DecisionVisualizer: React.FC<Props> = ({ result, isEvaluating }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <Cpu size={16} className="text-accent-green" />
        <span>Cupcake Decision Engine</span>
      </div>

      <div className="viz-container">
        
        {/* Background Grid Enhancement */}
        <div 
            style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                pointerEvents: 'none',
                backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
        />

        <AnimatePresence mode='wait'>
          {isEvaluating ? (
            <motion.div
              key="evaluating"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="flex-col items-center gap-4 flex"
            >
              <div style={{ position: 'relative', width: '96px', height: '96px' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '4px solid', borderColor: 'var(--accent-blue) transparent transparent transparent',
                  borderRadius: '50%', animation: 'spin 1s linear infinite'
                }}></div>
              </div>
              <div className="text-accent-blue font-mono text-lg" style={{ animation: 'pulse 1.5s infinite' }}>ANALYZING POLICY...</div>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex-col items-center flex"
              style={{ zIndex: 10 }}
            >
              {result.decision === 'ALLOW' && (
                <>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    style={{
                      width: '128px', height: '128px', borderRadius: '50%',
                      background: 'rgba(0, 255, 157, 0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
                      boxShadow: '0 0 30px rgba(0,255,157,0.2)'
                    }}
                  >
                    <CheckCircle size={64} className="text-accent-green" />
                  </motion.div>
                  <h2 className="text-accent-green font-bold" style={{ fontSize: '2.5rem', letterSpacing: '0.1em', marginBottom: '8px' }}>ALLOWED</h2>
                  <p className="text-secondary" style={{ maxWidth: '320px' }}>{result.reason}</p>
                </>
              )}

              {result.decision === 'DENY' && (
                <>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    style={{
                      width: '128px', height: '128px', borderRadius: '50%',
                      background: 'rgba(255, 51, 102, 0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
                      boxShadow: '0 0 30px rgba(255,51,102,0.2)'
                    }}
                  >
                    <XCircle size={64} className="text-accent-red" />
                  </motion.div>
                  <h2 className="text-accent-red font-bold" style={{ fontSize: '2.5rem', letterSpacing: '0.1em', marginBottom: '8px' }}>BLOCKED</h2>
                  <p className="text-primary font-mono text-sm" style={{ 
                    background: 'var(--bg-tertiary)', padding: '8px 16px', borderRadius: '4px', maxWidth: '320px',
                    border: '1px solid rgba(255, 51, 102, 0.3)'
                  }}>
                    {result.reason}
                  </p>
                </>
              )}
            </motion.div>
          ) : (
             <div className="text-muted text-sm font-mono" style={{ zIndex: 10 }}>
               SYSTEM READY<br/>AWAITING INPUT...
             </div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Console Output Simulation */}
      <div className="console-output">
         <div className="text-accent-blue" style={{ opacity: 0.5, marginBottom: '4px' }}>$ cupcake-monitor --watch</div>
         {isEvaluating && <div className="text-muted">_ interception detected...</div>}
         {result && (
            <>
               <div className="text-muted">_ evaluating against 1 policy module...</div>
               <div className={result.decision === 'ALLOW' ? "text-accent-green" : "text-accent-red"}>
                  {`> DECISION: ${result.decision.toUpperCase()}`}
               </div>
            </>
         )}
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};
