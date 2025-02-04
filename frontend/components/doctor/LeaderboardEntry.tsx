import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LeaderboardEntry {
    name: string;
    adherenceRate: number;
    milestonesAchieved: number;
}

const leaderboardData: LeaderboardEntry[] = [
    { name: "Dr. John Doe", adherenceRate: 92, milestonesAchieved: 15 },
    { name: "Dr. Jane Smith", adherenceRate: 88, milestonesAchieved: 12 },
    { name: "Dr. Alex Brown", adherenceRate: 85, milestonesAchieved: 10 },
];

export const Leaderboard: React.FC = () => {
    return (
        <div className="h-[95vh] border-0 border-r-[0.5px]">
            <CardHeader>
                <CardTitle>Doctor Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {leaderboardData.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{entry.name}</p>
                                <p className="text-sm text-gray-600">Milestones: {entry.milestonesAchieved}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">{entry.adherenceRate}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </div>
    );
};