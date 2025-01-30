import { InsightItem } from "./InsightItem";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brain, Shield, Zap } from "lucide-react";

export const AIInsights: React.FC = () => (
    <Card>
        <CardHeader>
            <CardTitle>AI-Generated Insights</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <InsightItem
                    icon={Brain}
                    title="Treatment Effectiveness"
                    description="85% of patients showing improved form in lower back exercises"
                    iconColor="text-blue-500"
                />
                <InsightItem
                    icon={Zap}
                    title="Suggested Optimizations"
                    description="Consider adjusting difficulty for evening sessions"
                    iconColor="text-yellow-500"
                />
                <InsightItem
                    icon={Shield}
                    title="Risk Assessment"
                    description="No high-risk patterns detected in current treatment plans"
                    iconColor="text-green-500"
                />
            </div>
        </CardContent>
    </Card>
);