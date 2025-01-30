import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Video, MessageSquare } from 'lucide-react';
import { Patient } from "@/types/doctor";

export const PatientHeader: React.FC<{
    patient: Patient;
    onBack: () => void;
}> = ({ patient, onBack }) => (
    <div className="flex justify-between items-center">
        <div className="flex gap-4">
            <div>
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <p className="text-gray-600">{patient.condition}</p>
            </div>
            <div className="mb-8 flex justify-between items-center">
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Start Session
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message {patient.name}
                    </button>
                </div>
            </div>
        </div>
        <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
                <Calendar size={16} />
                Schedule Session
            </Button>
            <Button variant="outline" className="gap-2">
                <FileText size={16} />
                Edit Treatment Plan
            </Button>
            <Button variant="outline" onClick={onBack}>
                Back to List
            </Button>
        </div>
    </div>
);