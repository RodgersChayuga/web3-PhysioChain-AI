import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PatientCardProps } from "@/types/patient";

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => (
    <Card
        className="hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onClick(patient)}
    >
        <CardContent className="p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg">{patient.name}</h3>
                    <p className="text-gray-600">{patient.condition}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {patient.status}
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Adherence Rate</p>
                    <p className="font-semibold">{patient.adherenceRate}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Tokens Earned</p>
                    <p className="font-semibold">{patient.tokensEarned} PHYSIO</p>
                </div>
            </div>
        </CardContent>
    </Card>
);