import { StatCardProps } from "@/types/doctor";
import React from 'react'
import { Card } from "../ui/card";

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend }) => (
    <Card className="p-4">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
                {trend && (
                    <p className={`text-sm mt-1 ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {trend}
                    </p>
                )}
            </div>
            <Icon className="h-8 w-8 text-blue-500" />
        </div>
    </Card>
);