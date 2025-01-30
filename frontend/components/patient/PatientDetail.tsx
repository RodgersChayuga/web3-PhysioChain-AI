import React from 'react';
import { Activity, Award, Calendar, TrendingUp } from 'lucide-react';
import { PatientHeader } from './PatientHeader';
import { MetricCard } from './MetricCard';
import { ProgressChart } from './ProgressChart';
import { AIInsightsPanel } from './AIInsightsPanel';
import { BlockchainData } from './BlockchainData';
import { TreatmentPlan } from './TreatmentPlan';
import { PatientDetailProps } from "@/types/patient";

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient, setSelectedPatient }) => {
    return (
        <div className="space-y-6">
            <PatientHeader patient={patient} onBack={() => setSelectedPatient(null)} />

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                    icon={Activity}
                    title="Adherence Rate"
                    value={`${patient.adherenceRate}%`}
                    color="text-blue-500"
                />
                <MetricCard
                    icon={Award}
                    title="Tokens Earned"
                    value={`${patient.tokensEarned} PHYSIO`}
                    color="text-yellow-500"
                />
                <MetricCard
                    icon={Calendar}
                    title="Next Session"
                    value={patient.nextSession}
                    color="text-green-500"
                />
                <MetricCard
                    icon={TrendingUp}
                    title="Progress"
                    value={patient.progress}
                    color="text-purple-500"
                />
            </div>

            {/* Progress Chart and AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgressChart />
                <AIInsightsPanel />
            </div>

            {/* Treatment Plan and Blockchain Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TreatmentPlan />
                <div className="space-y-6">
                    <BlockchainData patientId={patient.id} />
                </div>
            </div>
        </div>
    );
};