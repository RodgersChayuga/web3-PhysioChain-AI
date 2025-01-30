import { Patient } from "@/types";

// Mock data - in real application, this would come from your backend
export const mockHistoricalData = [
    { date: new Date('2024-01-01'), adherenceRate: 75, formAccuracy: 80, painLevel: 3 },
    { date: new Date('2024-01-05'), adherenceRate: 78, formAccuracy: 82, painLevel: 3 },
    { date: new Date('2024-01-10'), adherenceRate: 80, formAccuracy: 85, painLevel: 2 },
    { date: new Date('2024-02-01'), adherenceRate: 82, formAccuracy: 87, painLevel: 2 },
    { date: new Date('2024-02-07'), adherenceRate: 85, formAccuracy: 89, painLevel: 1 },
    { date: new Date('2024-02-15'), adherenceRate: 88, formAccuracy: 91, painLevel: 1 },
    { date: new Date('2024-03-01'), adherenceRate: 90, formAccuracy: 93, painLevel: 0 },
    { date: new Date('2024-03-10'), adherenceRate: 87, formAccuracy: 92, painLevel: 1 },
    { date: new Date('2024-03-20'), adherenceRate: 84, formAccuracy: 88, painLevel: 2 },
    { date: new Date('2024-04-01'), adherenceRate: 80, formAccuracy: 85, painLevel: 3 },
    { date: new Date('2024-04-10'), adherenceRate: 83, formAccuracy: 86, painLevel: 2 },
    { date: new Date('2024-05-01'), adherenceRate: 85, formAccuracy: 88, painLevel: 1 },
    { date: new Date('2024-05-12'), adherenceRate: 89, formAccuracy: 92, painLevel: 1 },
    { date: new Date('2024-06-01'), adherenceRate: 92, formAccuracy: 95, painLevel: 0 },
    { date: new Date('2024-06-15'), adherenceRate: 94, formAccuracy: 97, painLevel: 0 },
];

export default mockHistoricalData;


export const mockPatients: Patient[] = [
    {
        id: '1',
        name: 'John Doe',
        age: 35,
        treatmentPlan: {
            id: 'tp1',
            exercises: [
                { id: 'ex1', name: 'Stretching', description: 'Full-body stretch routine', duration: 15, repetitions: 3, completionRate: 90 },
                { id: 'ex2', name: 'Resistance Training', description: 'Lightweight strength training', duration: 20, repetitions: 4, completionRate: 85 },
            ],
            startDate: new Date('2024-01-05'),
            endDate: new Date('2024-03-05'),
            status: 'active' as const,
        },
        adherenceRate: 85,
        progressMetrics: {
            overallProgress: 75,
            formAccuracy: 80,
            consistencyScore: 85,
            painLevels: [3, 2, 2, 1],
        },
    },
    {
        id: '2',
        name: 'Jane Smith',
        age: 42,
        treatmentPlan: {
            id: 'tp2',
            exercises: [
                { id: 'ex3', name: 'Yoga', description: 'Gentle stretching and breathing exercises', duration: 30, repetitions: 1, completionRate: 95 },
                { id: 'ex4', name: 'Pilates', description: 'Core strengthening routine', duration: 25, repetitions: 2, completionRate: 90 },
            ],
            startDate: new Date('2024-02-10'),
            endDate: new Date('2024-04-20'),
            status: 'active' as const,
        },
        adherenceRate: 92,
        progressMetrics: {
            overallProgress: 88,
            formAccuracy: 90,
            consistencyScore: 95,
            painLevels: [2, 1, 1, 0],
        },
    },
    {
        id: '3',
        name: 'Alice Johnson',
        age: 29,
        treatmentPlan: {
            id: 'tp3',
            exercises: [
                { id: 'ex5', name: 'Cardio', description: 'Running and high-intensity interval training', duration: 40, repetitions: 1, completionRate: 80 },
                { id: 'ex6', name: 'Strength Training', description: 'Weight lifting and resistance exercises', duration: 35, repetitions: 3, completionRate: 78 },
            ],
            startDate: new Date('2023-12-15'),
            endDate: new Date('2024-02-15'),
            status: 'completed' as const,
        },
        adherenceRate: 78,
        progressMetrics: {
            overallProgress: 80,
            formAccuracy: 82,
            consistencyScore: 75,
            painLevels: [4, 3, 2, 1],
        },
    },
    {
        id: '4',
        name: 'Michael Brown',
        age: 50,
        treatmentPlan: {
            id: 'tp4',
            exercises: [
                { id: 'ex7', name: 'Physiotherapy', description: 'Rehabilitation movements and stretches', duration: 30, repetitions: 2, completionRate: 70 },
                { id: 'ex8', name: 'Hydrotherapy', description: 'Water-based therapy exercises', duration: 45, repetitions: 1, completionRate: 75 },
            ],
            startDate: new Date('2024-01-20'),
            endDate: new Date('2024-03-30'),
            status: 'active' as const,
        },
        adherenceRate: 65,
        progressMetrics: {
            overallProgress: 60,
            formAccuracy: 70,
            consistencyScore: 55,
            painLevels: [5, 4, 3, 2],
        },
    },
    {
        id: '5',
        name: 'Emma Wilson',
        age: 37,
        treatmentPlan: {
            id: 'tp5',
            exercises: [
                { id: 'ex9', name: 'Posture Correction', description: 'Core and back exercises', duration: 20, repetitions: 3, completionRate: 85 },
                { id: 'ex10', name: 'Mobility Drills', description: 'Joint movement and flexibility training', duration: 25, repetitions: 2, completionRate: 90 },
            ],
            startDate: new Date('2023-11-05'),
            endDate: new Date('2024-01-10'),
            status: 'completed' as const,
        },
        adherenceRate: 90,
        progressMetrics: {
            overallProgress: 85,
            formAccuracy: 87,
            consistencyScore: 88,
            painLevels: [2, 2, 1, 0],
        },
    },
];
