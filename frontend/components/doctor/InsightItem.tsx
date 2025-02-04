import { InsightItemProps } from "@/types/doctor";

// Helper function to determine confidence color
const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 80) return "text-green-600"; // High confidence
    if (confidence >= 50) return "text-yellow-600"; // Medium confidence
    return "text-red-600"; // Low confidence
};

export const InsightItem: React.FC<InsightItemProps> = ({
    icon: Icon,
    title,
    description,
    iconColor,
    confidence,
}) => {
    return (
        <div className="flex items-start gap-3 p-3 border rounded-md">
            {/* Icon */}
            <Icon className={`h-5 w-5 ${iconColor} mt-1`} />

            {/* Content */}
            <div>
                {/* Title and Confidence Score */}
                <div className="flex items-center gap-2">
                    <h4 className="font-medium">{title}</h4>
                    {confidence !== undefined && (
                        <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${getConfidenceColor(confidence)}`}
                        >
                            {confidence}%
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};