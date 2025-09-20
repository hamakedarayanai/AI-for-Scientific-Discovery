
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HypothesisData } from '../types';
import { ChartBarIcon } from './IconComponents';

interface DataVisualizationCardProps {
  vizData: HypothesisData['visualization'];
}

const DataVisualizationCard: React.FC<DataVisualizationCardProps> = ({ vizData }) => {
  const hasData = vizData && vizData.data && vizData.data.length > 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
        <ChartBarIcon className="w-5 h-5 text-cyan-500" />
        Supporting Data Projection
      </h4>
      <div className="w-full h-[250px] bg-white dark:bg-slate-800 p-2 rounded-md">
        {hasData ? (
          <>
            <p className="text-center font-medium text-sm text-slate-700 dark:text-slate-300 -mt-1 mb-2">{vizData.title}</p>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={vizData.data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} label={{ value: vizData.xAxisLabel, position: 'insideBottom', offset: -15, fill: 'currentColor' }} />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} label={{ value: vizData.yAxisLabel, angle: -90, position: 'insideLeft', fill: 'currentColor', dx: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    borderColor: '#334155',
                    color: '#f1f5f9',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend wrapperStyle={{fontSize: "14px", paddingTop: "10px"}}/>
                <Bar dataKey={vizData.dataKey1} fill="#06b6d4" name={vizData.dataKey1} />
                {vizData.dataKey2 && vizData.data[0].hasOwnProperty(vizData.dataKey2) && <Bar dataKey={vizData.dataKey2} fill="#6366f1" name={vizData.dataKey2}/>}
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No visualization data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualizationCard;
