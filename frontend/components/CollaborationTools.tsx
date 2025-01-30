'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Patient } from '@/types';

export const CollaborationTools = ({ patients }: { patients: Patient[] }) => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Collaboration Hub</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                        <h3 className="text-lg font-semibold mb-2">Patient List</h3>
                        <div className="space-y-2">
                            {patients.map(patient => (
                                <div
                                    key={patient.id}
                                    className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                                    onClick={() => setSelectedPatient(patient)}
                                >
                                    <p className="font-medium">{patient.name}</p>
                                    <p className="text-sm text-gray-600">
                                        Adherence Rate: {patient.adherenceRate}%
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="text-lg font-semibold mb-2">Patient Details</h3>
                        {selectedPatient ? (
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {selectedPatient.name}</p>
                                <p><strong>Age:</strong> {selectedPatient.age}</p>
                                <p><strong>Treatment Status:</strong> {selectedPatient.treatmentPlan.status}</p>
                                <p><strong>Progress:</strong> {selectedPatient.progressMetrics.overallProgress}%</p>
                            </div>
                        ) : (
                            <p>Select a patient to view details</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}