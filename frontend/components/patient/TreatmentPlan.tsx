import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Clock, Calendar } from 'lucide-react';

interface TreatmentActivity {
    icon: React.ElementType;
    title: string;
    description: string;
}

export const TreatmentPlan = () => {
    const treatmentActivities: TreatmentActivity[] = [
        {
            icon: Clock,
            title: "Daily Exercises",
            description: "3 sets of knee strengthening exercises"
        },
        {
            icon: Calendar,
            title: "Weekly Sessions",
            description: "2 supervised sessions per week"
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText size={20} />
                    Treatment Plan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {treatmentActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <Icon className="text-blue-500" />
                                <div>
                                    <p className="font-medium">{activity.title}</p>
                                    <p className="text-sm text-gray-500">{activity.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};