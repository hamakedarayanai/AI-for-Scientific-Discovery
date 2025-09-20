import { GoogleGenAI, Type } from "@google/genai";
import { HypothesisData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    hypothesisTitle: {
      type: Type.STRING,
      description: "A concise, academic-style title for the generated hypothesis."
    },
    summary: {
      type: Type.STRING,
      description: "A detailed paragraph explaining the hypothesis, its potential impact, and the reasoning behind it."
    },
    supportingConnection: {
      type: Type.STRING,
      description: "A paragraph detailing the non-obvious connection discovered between two or more scientific concepts that forms the basis of the hypothesis."
    },
    mermaidDiagram: {
      type: Type.STRING,
      description: "A valid Mermaid.js 'graph TD' or 'flowchart TD' string that visually represents the core concept, interaction, or pathway of the hypothesis. The string MUST start directly with 'graph TD' or 'flowchart TD' and contain only valid Mermaid syntax. Do not wrap it in markdown code fences. For example: 'graph TD; A[Concept 1] --> B[Proposed Interaction] --> C[Outcome];'"
    },
    visualization: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A descriptive title for a chart that would support the hypothesis."
        },
        data: {
          type: Type.ARRAY,
          description: "An array of 3-5 data points for the visualization chart. Each object must have a 'name' property (string) for the X-axis label, and at least one numerical data property (e.g., 'value1', 'efficiency', 'bindingAffinity').",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              value1: { type: Type.NUMBER },
              value2: { type: Type.NUMBER, description: "Optional second data series value." }
            },
            required: ["name", "value1"]
          }
        },
        xAxisLabel: {
          type: Type.STRING,
          description: "A label for the X-axis of the chart."
        },
        yAxisLabel: {
          type: Type.STRING,
          description: "A label for the Y-axis of the chart."
        },
        dataKey1: {
          type: Type.STRING,
          description: "The key name for the first numerical data series (e.g., 'value1')."
        },
        dataKey2: {
          type: Type.STRING,
          description: "The key name for the optional second numerical data series (e.g., 'value2')."
        }
      },
      required: ["title", "data", "xAxisLabel", "yAxisLabel", "dataKey1"]
    }
  },
  required: ["hypothesisTitle", "summary", "supportingConnection", "mermaidDiagram", "visualization"]
};

export const generateHypothesis = async (topic: string): Promise<HypothesisData> => {
  const prompt = `
    Based on the following research topic, act as an AI research assistant.
    Your task is to simulate a deep analysis of a vast corpus of scientific literature (papers, patents, datasets) to uncover a novel, non-obvious connection and generate a testable hypothesis.
    Provide a multi-modal explanation for your hypothesis.

    Research Topic: "${topic}"

    Your output MUST be a single JSON object that strictly adheres to the provided schema. Do not include any markdown formatting (like \`\`\`json) in the output.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation to ensure structure matches HypothesisData
    if (
      !parsedData.hypothesisTitle ||
      !parsedData.summary ||
      !parsedData.visualization ||
      !parsedData.visualization.data
    ) {
      throw new Error("Received malformed data from API.");
    }
    
    return parsedData as HypothesisData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model failed to generate a valid response. Please try refining your topic.");
  }
};