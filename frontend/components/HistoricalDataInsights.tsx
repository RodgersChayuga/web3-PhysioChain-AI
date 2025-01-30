import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Patient } from '@/types';

export const HistoricalDataInsights = ({ patientData }: { patientData: Patient[] }) => {
    const calculateAverages = () => {
        const totalPatients = patientData.length;
        const averages = {
            adherenceRate: patientData.reduce((acc, p) => acc + p.adherenceRate, 0) / totalPatients,
            formAccuracy: patientData.reduce((acc, p) => acc + p.progressMetrics.formAccuracy, 0) / totalPatients,
            consistencyScore: patientData.reduce((acc, p) => acc + p.progressMetrics.consistencyScore, 0) / totalPatients,
        };
        return averages;
    };

    const averages = calculateAverages();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Historical Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded text-center">
                        <h3 className="text-lg font-semibold">Average Adherence</h3>
                        <p className="text-3xl font-bold mt-2">{averages.adherenceRate.toFixed(1)}%</p>
                    </div>
                    <div className="p-4 border rounded text-center">
                        <h3 className="text-lg font-semibold">Form Accuracy</h3>
                        <p className="text-3xl font-bold mt-2">{averages.formAccuracy.toFixed(1)}%</p>
                    </div>
                    <div className="p-4 border rounded text-center">
                        <h3 className="text-lg font-semibold">Consistency Score</h3>
                        <p className="text-3xl font-bold mt-2">{averages.consistencyScore.toFixed(1)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}