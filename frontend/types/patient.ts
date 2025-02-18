import { Patient } from "./doctor";

export interface MetricCardProps {
    icon: React.ElementType;
    title: string;
    value: string | number;
    color: string;
}

export interface PatientDetailProps {
    patient: Patient;
    setSelectedPatient: (patient: Patient | null) => void;
}

export interface PatientCardProps {
    patient: Patient;
    onClick: (patient: Patient) => void;
}
