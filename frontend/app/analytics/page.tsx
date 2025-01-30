import { AdvancedAnalytics } from '@/components/AdvancedAnalytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import mockHistoricalData from "@/lib/mock";

export const Analytics = () => {

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

            <div className="grid grid-cols-1 gap-6">
                <AdvancedAnalytics historicalData={mockHistoricalData} />

                <Card>
                    <CardHeader>
                        <CardTitle>Treatment Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded">
                                <h3 className="text-lg font-semibold">Most Effective Exercises</h3>
                                <ul className="mt-2 space-y-2">
                                    <li>Exercise 1 - 92% success rate</li>
                                    <li>Exercise 2 - 88% success rate</li>
                                    <li>Exercise 3 - 85% success rate</li>
                                </ul>
                            </div>
                            <div className="p-4 border rounded">
                                <h3 className="text-lg font-semibold">Recovery Trends</h3>
                                <ul className="mt-2 space-y-2">
                                    <li>Average recovery time: 6 weeks</li>
                                    <li>Adherence impact: +25% faster recovery</li>
                                    <li>Pain reduction: 65% by week 4</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}