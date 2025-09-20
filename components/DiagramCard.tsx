import React, { useEffect, useRef } from 'react';
import { SvgChartIcon } from './IconComponents';

// Make mermaid available globally
declare const mermaid: any;

interface DiagramCardProps {
  diagram: string;
}

const DiagramCard: React.FC<DiagramCardProps> = ({ diagram }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current && diagram) {
      // Clean up potential markdown code fences that the model might add
      const cleanDiagram = diagram
        .replace(/^```mermaid/, '')
        .replace(/```$/, '')
        .trim();

      mermaidRef.current.innerHTML = cleanDiagram;
      mermaidRef.current.removeAttribute('data-processed');

      try {
        mermaid.run({ nodes: [mermaidRef.current] });
      } catch (e) {
        console.error("Mermaid rendering error:", e);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div class="text-red-500 p-4 text-center">
            <p class="font-bold">Diagram Rendering Error</p>
            <p class="text-sm mt-1">The AI-generated diagram syntax appears to be invalid. You could try generating a new hypothesis.</p>
          </div>`;
        }
      }
    }
  }, [diagram]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
        <SvgChartIcon className="w-5 h-5 text-cyan-500" />
        Conceptual Diagram
      </h4>
      <div className="flex justify-center items-center min-h-[200px] p-2 bg-white dark:bg-slate-800 rounded-md">
         {/* The content is set dynamically by the useEffect hook */}
         <div ref={mermaidRef} className="mermaid w-full"></div>
      </div>
    </div>
  );
};

export default DiagramCard;
