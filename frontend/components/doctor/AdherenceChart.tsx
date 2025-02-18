import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import {
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    LineChart,
    XAxis,
    YAxis,
    Line,
} from "recharts";
import { useState } from "react";
import { AdherenceData } from "@/types/doctor"; // Import the AdherenceData type

interface AdherenceChartProps {
    data: AdherenceData[]; // Accept adherence data as a prop
}

export const AdherenceChart: React.FC<AdherenceChartProps> = ({ data }) => {
    // State to manage the selected timeframe
    const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("weekly");

    // Filter data based on the selected timeframe
    const filteredData = data.filter((item) => {
        if (timeframe === "daily") return item.name.includes("Day");
        if (timeframe === "weekly") return item.name.includes("Week");
        if (timeframe === "monthly") return item.name.includes("Month");
        return true;
    });

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload }: { active: boolean, payload: any }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-lg p-2 rounded-md border">
                    <p className="text-sm font-bold">{payload[0].payload.name}</p>
                    <p className="text-sm">Adherence Rate: {payload[0].value}%</p>
                    {payload[0].payload.notes && (
                        <p className="text-xs text-gray-600">{payload[0].payload.notes}</p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Adherence Trend</CardTitle>
                {/* Timeframe Toggle Buttons */}
                <div className="flex gap-2 mt-2">
                    <button
                        className={`px-3 py-1 rounded-md ${timeframe === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => setTimeframe("daily")}
                    >
                        Daily
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md ${timeframe === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => setTimeframe("weekly")}
                    >
                        Weekly
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md ${timeframe === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => setTimeframe("monthly")}
                    >
                        Monthly
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip active={false} payload={undefined} />} />
                            <Line
                                type="monotone"
                                dataKey="rate"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4 }} // Highlight data points
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};