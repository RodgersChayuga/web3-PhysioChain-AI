import { AdherenceData } from "@/types/doctor";

import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";

import { ResponsiveContainer, CartesianGrid, Tooltip, LineChart, XAxis, YAxis } from "recharts";

import { Line } from "recharts";

interface AdherenceChartProps {
    data: AdherenceData[];
}

export const AdherenceChart: React.FC<AdherenceChartProps> = ({ data }) => (
    <Card>
        <CardHeader>
            <CardTitle>Patient Adherence Trend</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#3b82f6"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);