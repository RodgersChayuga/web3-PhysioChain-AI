import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, AlertTriangle } from 'lucide-react';
import { mockAIInsights } from "@/lib/mock";

export const AIInsightsPanel = () => (
    <Card className="p-6">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Insights
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {mockAIInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-blue-600">{insight.title}</h4>
                            <span className="text-sm text-gray-500">
                                Confidence: {insight.confidence}%
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                            {insight.category === 'risk' && (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-xs text-gray-500">
                                {new Date(insight.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);