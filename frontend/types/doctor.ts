// Previous interfaces remain the same...
export interface Patient {
    id: number;
    name: string;
    condition: string;
    adherenceRate: number;
    nextSession: string;
    status: 'Active' | 'Inactive' | 'Completed';
    progress: 'Improving' | 'Stable' | 'Declining';
    tokensEarned: number;
}

export interface ProgressData {
    name: string;
    accuracy: number;
    sessions: number;
    pain: number;
    adherence: number;
}

export interface BodyPartData {
    name: string;
    value: number;
}

export interface PerformanceData {
    subject: string;
    A: number;
    fullMark: number;
}

export interface BlockchainMetrics {
    smartContracts: number;
    tokensDistributed: number;
    activeUsers: number;
    gasUsed: string;
}

export interface AIInsight {
    title: string;
    description: string;
    confidence: number;
    category: 'treatment' | 'progress' | 'risk' | 'recommendation';
    timestamp: string;
}

export interface PatientVitals {
    heartRate: number;
    breathing: number;
    movement: number;
    painLevel: number;
    timestamp: string;
}

export interface TokenMetrics {
    totalSupply: string;
    circulatingSupply: string;
    rewardsDistributed: string;
    avgDailyRewards: string;
}

export interface AIMetrics {
    accuracyRate: number;
    exercisesValidated: number;
    customizations: number;
    alertsGenerated: number;
}

export interface BlockchainMetrics {
    totalTransactions: number;
    activeSmartContracts: number;
    avgGasUsed: string;
    networkHealth: string;
}

// Define the interface for granular adherence data
export interface AdherenceData {
    name: string; // e.g., "Week 1", "Day 1", "Month 1"
    rate: number; // Adherence rate (e.g., 85)
    notes?: string; // Optional notes or insights
}

export interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: string;
    trend?: string;
}

export interface ActivityItemProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
}

export interface InsightItemProps {
    icon: React.ElementType;
    title: string;
    description: string;
    iconColor: string;
    confidence?: number;
}


export interface MockData {
    adherenceData: AdherenceData[];
}

export type TabValue = 'overview' | 'patients' | 'analytics' | 'schedule' | 'ai-insights' | 'rewards';