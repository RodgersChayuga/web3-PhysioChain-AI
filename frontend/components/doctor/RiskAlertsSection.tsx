import { RiskAlert } from "./RiskAlert";

const riskAlerts = [
    { message: "High Risk of Overexertion", suggestion: "Reduce exercise intensity." },
    { message: "Declining Adherence Rate", suggestion: "Follow up with the patient." },
];

export const RiskAlertsSection: React.FC = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">Risk Alerts</h3>
            {riskAlerts.length > 0 ? (
                riskAlerts.map((alert, index) => (
                    <RiskAlert key={index} message={alert.message} suggestion={alert.suggestion} />
                ))
            ) : (
                <p className="text-gray-600">No risk alerts at this time.</p>
            )}
        </div>
    );
};