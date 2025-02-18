export interface Patient {
    id: string;
    name: string;
    age: number;
    treatmentPlan: TreatmentPlan;
    adherenceRate: number;
    progressMetrics: ProgressMetrics;
}

export interface TreatmentPlan {
    id: string;
    exercises: Exercise[];
    startDate: Date;
    endDate: Date;
    status: 'active' | 'completed' | 'paused';
}

export interface Exercise {
    id: string;
    name: string;
    description: string;
    duration: number;
    repetitions: number;
    completionRate: number;
}

export interface ProgressMetrics {
    overallProgress: number;
    formAccuracy: number;
    consistencyScore: number;
    painLevels: number[];
}

export interface HistoricalData {
    date: Date;
    adherenceRate: number;
    formAccuracy: number;
    painLevel: number;
}