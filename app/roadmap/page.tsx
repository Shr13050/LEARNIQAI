"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { chatSession } from '@/utils/AiModel';

interface RoadmapData {
  topic: string;
  keywords: string[];
  jobDescription: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  resources: {
    name: string;
    url?: string;
    type: string;
  }[];
  timeEstimate: string;
}

const RoadmapPage = () => {
  const router = useRouter();
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load data from localStorage on component mount
    try {
      const storedData = localStorage.getItem('roadmapData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setRoadmapData(parsedData);
        generateRoadmap(parsedData);
      } else {
        setError('No roadmap data found. Please go back and select a topic.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading roadmap data:', error);
      setError('Error loading roadmap data. Please try again.');
      setLoading(false);
    }
  }, []);

  const generateRoadmap = async (data: RoadmapData) => {
    setLoading(true);
    try {
      const prompt = `
        You are an expert career coach and technical trainer. Create a detailed learning roadmap for someone who needs to develop skills in "${data.topic}".
        
        Specifically, they need to learn about the following keywords that were missing from their resume:
        ${data.keywords.join(', ')}
        
        Here's the job description they're targeting:
        ${data.jobDescription}
        
        Create a step-by-step roadmap with 4-6 clear steps that will help them develop these skills efficiently.
        
        Return your response in strictly valid JSON format with the following structure:
        {
          "steps": [
            {
              "title": "Step title",
              "description": "Detailed explanation of what to learn and why it matters",
              "resources": [
                {
                  "name": "Resource name",
                  "url": "Optional resource URL (leave blank if not applicable)",
                  "type": "book, course, tutorial, documentation, etc."
                }
              ],
              "timeEstimate": "Estimated time to complete this step"
            }
          ]
        }
        
        Ensure your steps are practical, specific to the keywords, and relevant to the job description.
        Recommend high-quality, current resources that are industry-recognized.
        For each step, include 2-3 resources.
        
        Ensure your response is ONLY the JSON object, with no additional text or markdown.
      `;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();

      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const parsedResult = JSON.parse(jsonMatch[0]);
      
      if (!parsedResult.steps || !Array.isArray(parsedResult.steps)) {
        throw new Error('Invalid response structure');
      }

      setRoadmap(parsedResult.steps);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setError('An error occurred while generating your roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button onClick={goBack} variant="outline" className="mb-6">
        ← Back to Analysis
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {roadmapData ? `Learning Roadmap: ${roadmapData.topic}` : 'Learning Roadmap'}
          </CardTitle>
          {roadmapData && (
            <div className="mt-2 text-sm text-gray-500">
              <p>Keywords: {roadmapData.keywords.join(', ')}</p>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          {loading && (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4">Generating your personalized learning roadmap...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              <p>{error}</p>
            </div>
          )}
          
          {roadmap && (
            <div className="space-y-6">
              {roadmap.map((step, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-blue-800">{step.title}</h3>
                      <p className="mt-2 text-gray-700">{step.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800">Resources:</h4>
                        <ul className="mt-2 space-y-2">
                          {step.resources.map((resource, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block w-5 h-5 bg-green-100 text-green-800 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-1">
                                {idx + 1}
                              </span>
                              <div>
                                <p className="font-medium">{resource.name}</p>
                                <p className="text-sm text-gray-500">Type: {resource.type}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                        Estimated time: {step.timeEstimate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapPage;