import { ActivityItemProps } from "@/types/doctor";

export const ActivityItem: React.FC<ActivityItemProps> = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
        <Icon className="h-5 w-5 text-blue-500" />
        <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    </div>
);