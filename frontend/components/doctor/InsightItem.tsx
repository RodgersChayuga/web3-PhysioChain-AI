import { InsightItemProps } from "@/types/doctor";

export const InsightItem: React.FC<InsightItemProps> = ({ icon: Icon, title, description, iconColor }) => (
    <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${iconColor} mt-1`} />
        <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);