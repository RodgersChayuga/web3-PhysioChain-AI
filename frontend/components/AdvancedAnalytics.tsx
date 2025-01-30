import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HistoricalData } from '@/types';

export function AdvancedAnalytics({ historicalData }: { historicalData: HistoricalData[] }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Treatment Progress Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-96">
                    <LineChart width={800} height={400} data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="adherenceRate" stroke="#8884d8" name="Adherence Rate" />
                        <Line type="monotone" dataKey="formAccuracy" stroke="#82ca9d" name="Form Accuracy" />
                        <Line type="monotone" dataKey="painLevel" stroke="#ff7300" name="Pain Level" />
                    </LineChart>
                </div>
            </CardContent>
        </Card>
    );
}