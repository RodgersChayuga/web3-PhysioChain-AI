import React from "react";
// import { FaChartLine, FaUserCheck, FaExclamationTriangle } from "lucide-react";
import { InsightItem } from "./InsightItem";
import { ChartLine, TriangleAlert, UserCheck } from "lucide-react";
import { Card } from "../ui/card";

const AIInsightsSection: React.FC = () => {
    const insights = [
        {
            icon: ChartLine,
            title: "Treatment Effectiveness",
            description: "85% of patients show improved form in lower back exercises.",
            iconColor: "text-blue-500",
            confidence: 92,
        },
        {
            icon: UserCheck,
            title: "Suggested Optimizations",
            description: "Consider adjusting difficulty for evening sessions.",
            iconColor: "text-green-500",
            confidence: 88,
        },
        {
            icon: TriangleAlert,
            title: "Risk Assessment",
            description: "Potential overexertion detected in shoulder exercises.",
            iconColor: "text-yellow-500",
            confidence: 75,
        },
        {
            icon: ChartLine,
            title: "General Trend",
            description: "Most patients prefer morning sessions.",
            iconColor: "text-purple-500",
        }, // No confidence score for this insight
    ];

    return (
        <Card className="space-y-4 p-4">
            <h3 className="text-lg font-bold">AI-Generated Insights</h3>
            <div className="space-y-3">
                {insights.map((insight, index) => (
                    <InsightItem
                        key={index}
                        icon={insight.icon}
                        title={insight.title}
                        description={insight.description}
                        iconColor={insight.iconColor}
                        confidence={insight.confidence}
                    />
                ))}
            </div>
        </Card>
    );
};

export default AIInsightsSection;