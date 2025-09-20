
import React, { useState, useCallback } from 'react';
import { generateHypothesis } from './services/geminiService';
import { HypothesisData } from './types';
import HypothesisOutput from './components/HypothesisOutput';
import Loader from './components/Loader';
import { BeakerIcon, LightBulbIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hypothesisData, setHypothesisData] = useState<HypothesisData | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setHypothesisData(null);

    try {
      const result = await generateHypothesis(topic);
      setHypothesisData(result);
    } catch (err) {
      setError(err instanceof Error ? `Failed to generate hypothesis: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, isLoading]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <BeakerIcon className="w-10 h-10 text-cyan-500" />
            AI for Scientific Discovery
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Uncover novel connections and generate testable hypotheses from any research domain.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg sticky top-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-amber-400" />
                Problem Statement
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Enter a research topic, a scientific challenge, or a domain of interest.
              </p>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'Develop a biodegradable alternative to plastic using mycelium' or 'Find novel drug targets for Alzheimer's disease by analyzing protein interactions'..."
                className="w-full h-48 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow duration-200 resize-none"
                disabled={isLoading}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className="mt-4 w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5" />
                    Analyzing & Generating...
                  </>
                ) : (
                  'Generate Hypothesis'
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg min-h-[600px] flex flex-col justify-center">
              {isLoading && (
                 <div className="text-center">
                   <Loader className="w-12 h-12 mx-auto text-cyan-500" />
                   <h3 className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-300">Synthesizing Knowledge...</h3>
                   <p className="text-slate-500 dark:text-slate-400 mt-1">The AI is cross-referencing concepts to find novel connections.</p>
                 </div>
              )}
              {error && (
                <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
                  <p>{error}</p>
                </div>
              )}
              {!isLoading && !error && hypothesisData && (
                <HypothesisOutput data={hypothesisData} />
              )}
              {!isLoading && !error && !hypothesisData && (
                 <div className="text-center text-slate-500 dark:text-slate-400">
                    <BeakerIcon className="w-20 h-20 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">Awaiting Your Spark</h2>
                    <p className="mt-2 max-w-md mx-auto">Your next great discovery begins with a question. The AI is ready to explore the connections.</p>
                 </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
