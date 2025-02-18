import React, { useState } from 'react';

interface Goal {
    id: number;
    description: string;
    target: number;
    progress: number;
}

const initialGoals: Goal[] = [];

export const GoalSetting: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>(initialGoals);
    const [newGoal, setNewGoal] = useState<string>("");
    const [target, setTarget] = useState<number>(0);

    const addGoal = () => {
        if (newGoal.trim() && target > 0) {
            const newGoalItem: Goal = {
                id: Date.now(),
                description: newGoal,
                target,
                progress: 0,
            };
            setGoals([...goals, newGoalItem]);
            setNewGoal("");
            setTarget(0);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Set Goals</h2>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter your goal"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="border p-2 rounded-md flex-grow"
                />
                <input
                    type="number"
                    placeholder="Target"
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="border p-2 rounded-md w-24"
                />
                <button onClick={addGoal} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Add Goal
                </button>
            </div>
            <div className="space-y-2">
                {goals.map((goal) => (
                    <div key={goal.id} className="flex justify-between items-center">
                        <p>{goal.description} ({goal.progress}/{goal.target})</p>
                        <button className="text-blue-500">Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};