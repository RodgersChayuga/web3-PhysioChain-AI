import React from 'react';

interface Reward {
    date: string;
    description: string;
    points: number;
}

const mockRewards: Reward[] = [
    { date: "2024-01-01", description: "Completed 5 sessions", points: 50 },
    { date: "2024-01-05", description: "Perfect Form Streak", points: 100 },
    { date: "2024-01-10", description: "Achieved Milestone", points: 200 },
];

export const RewardsTimeline: React.FC = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Rewards History</h2>
            <div className="relative">
                <div className="absolute w-1 bg-gray-300 h-full left-4 top-0"></div>
                {mockRewards.map((reward, index) => (
                    <div key={index} className="flex items-center gap-4 relative pl-10">
                        <div className="absolute left-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            +{reward.points}
                        </div>
                        <div>
                            <p className="font-medium">{reward.description}</p>
                            <p className="text-sm text-gray-600">{reward.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-4">
                Redeem Rewards
            </button>
        </div>
    );
};