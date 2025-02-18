import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockVitals } from "@/lib/mock";

export const ProgressChart = () => {
    const progressData = [
        { week: 'Week 1', adherence: 65, pain: 7 },
        { week: 'Week 2', adherence: 75, pain: 5 },
        { week: 'Week 3', adherence: 85, pain: 4 },
        { week: 'Week 4', adherence: 90, pain: 3 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 gap-4 p-6 mb-4">
                    {mockVitals.slice(-1).map((vital, index) => (
                        <React.Fragment key={index}>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-600">Heart Rate</p>
                                <p className="text-2xl font-bold">{vital.heartRate} BPM</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-gray-600">Movement Accuracy</p>
                                <p className="text-2xl font-bold">{vital.movement}%</p>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-gray-600">Breathing Rate</p>
                                <p className="text-2xl font-bold">{vital.breathing}/min</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg">
                                <p className="text-sm text-gray-600">Pain Level</p>
                                <p className="text-2xl font-bold">{vital.painLevel}/10</p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="adherence"
                                stroke="#3b82f6"
                                name="Adherence %"
                                strokeWidth={2}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="pain"
                                stroke="#ef4444"
                                name="Pain Level"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};