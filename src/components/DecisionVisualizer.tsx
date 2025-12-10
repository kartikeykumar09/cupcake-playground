import React, { useEffect, useState } from 'react';
import { PolicyResult } from '../lib/types';
import { CheckCircle, XCircle, AlertTriangle, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  result: PolicyResult | null;
  isEvaluating: boolean;
}

export const DecisionVisualizer: React.FC<Props> = ({ result, isEvaluating }) => {
  return (
    <div className="panel h-full relative">
      <div className="panel-header">
        <Cpu size={16} className="text-accent-green" />
        <span>Cupcake Decision Engine</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        
        {/* Background Grid Enhancement */}
        <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
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
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-accent-blue rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 border-4 border-accent-blue opacity-30 rounded-full border-b-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
              <div className="text-accent-blue font-mono text-lg animate-pulse">ANALYZING POLICY...</div>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="z-10 flex flex-col items-center"
            >
              {result.decision === 'ALLOW' && (
                <>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="w-32 h-32 rounded-full bg-accent-green/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,157,0.2)]"
                  >
                    <CheckCircle size={64} className="text-accent-green" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-accent-green tracking-widest mb-2">ALLOWED</h2>
                  <p className="text-text-secondary max-w-xs">{result.reason}</p>
                </>
              )}

              {result.decision === 'DENY' && (
                <>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="w-32 h-32 rounded-full bg-accent-red/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,51,102,0.2)]"
                  >
                    <XCircle size={64} className="text-accent-red" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-accent-red tracking-widest mb-2">BLOCKED</h2>
                  <p className="text-text-primary bg-bg-tertiary px-4 py-2 rounded border border-accent-red/30 max-w-xs font-mono text-sm">
                    {result.reason}
                  </p>
                </>
              )}
            </motion.div>
          ) : (
             <div className="text-text-muted text-sm font-mono z-10">
               SYSTEM READY<br/>AWAITING INPUT...
             </div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Console Output Simulation */}
      <div className="h-32 bg-black border-t border-border-color p-4 font-mono text-xs overflow-y-auto">
         <div className="text-accent-blue opacity-50 mb-1">$ cupcake-monitor --watch</div>
         {isEvaluating && <div className="text-text-muted">_ interception detected...</div>}
         {result && (
            <>
               <div className="text-text-muted">_ evaluating against 1 policy module...</div>
               <div className={result.decision === 'ALLOW' ? "text-accent-green" : "text-accent-red"}>
                  {`> DECISION: ${result.decision.toUpperCase()}`}
               </div>
            </>
         )}
      </div>

    </div>
  );
};
