import { Activity, Award, Users } from "lucide-react";

import { Clock } from "lucide-react";
import { StatCard } from "./StatCard";

interface QuickStatsProps {
    data: {
        activePatients: string;
        adherenceRate: string;
        sessionsToday: string;
        patientMilestones: string;
    };
}

export const QuickStats: React.FC<QuickStatsProps> = ({ data }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
            icon={Users}
            title="Active Patients"
            value={data.activePatients}
            trend="+12% this month"
        />
        <StatCard
            icon={Activity}
            title="Avg. Adherence Rate"
            value={data.adherenceRate}
            trend="+5% this week"
        />
        <StatCard
            icon={Clock}
            title="Sessions Today"
            value={data.sessionsToday}
        />
        <StatCard
            icon={Award}
            title="Patient Milestones"
            value={data.patientMilestones}
            trend="+3 this week"
        />
    </div>
);