
export interface VisualizationPoint {
  name: string;
  [key: string]: string | number;
}

export interface HypothesisData {
  hypothesisTitle: string;
  summary: string;
  supportingConnection: string;
  mermaidDiagram: string;
  visualization: {
    data: VisualizationPoint[];
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    dataKey1: string;
    dataKey2?: string;
  };
}
