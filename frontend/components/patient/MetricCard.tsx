import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MetricCardProps } from "@/types/patient";

export const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, color }) => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center gap-2">
                <Icon className={color} />
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-xl font-bold">{value}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);