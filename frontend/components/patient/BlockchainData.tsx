import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Database, CheckCircle } from 'lucide-react';

export const BlockchainData: React.FC<{ patientId: number }> = ({ patientId }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Database size={20} />
                Blockchain Data
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Treatment Plan NFT ID</span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">#TN-{patientId}834</code>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Smart Contract Status</span>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle size={14} />
                        Active
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <span className="text-sm">2024-01-29 14:30 UTC</span>
                </div>
            </div>
        </CardContent>
    </Card>
);