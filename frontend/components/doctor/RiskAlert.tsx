import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface RiskAlertProps {
    message: string;
    suggestion: string;
}

export const RiskAlert: React.FC<RiskAlertProps> = ({ message, suggestion }) => {
    return (
        <Card className="border-red-500 bg-red-50">
            <CardHeader className="flex flex-row items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-600">Risk Alert</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-red-700">{message}</p>
                <p className="text-xs text-gray-600 mt-2">Suggested Action: {suggestion}</p>
            </CardContent>
        </Card>
    );
};