
import React from 'react';
import { HypothesisData } from '../types';
import DiagramCard from './DiagramCard';
import DataVisualizationCard from './DataVisualizationCard';
import { BrainCircuitIcon, LinkIcon } from './IconComponents';

interface HypothesisOutputProps {
  data: HypothesisData;
}

const HypothesisOutput: React.FC<HypothesisOutputProps> = ({ data }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="pb-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {data.hypothesisTitle}
        </h2>
      </header>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <BrainCircuitIcon className="w-6 h-6 text-cyan-500" />
          Hypothesis Summary
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {data.summary}
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <LinkIcon className="w-6 h-6 text-cyan-500" />
          Underlying Connection
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
          {data.supportingConnection}
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <DiagramCard diagram={data.mermaidDiagram} />
        <DataVisualizationCard vizData={data.visualization} />
      </div>
    </div>
  );
};

export default HypothesisOutput;
