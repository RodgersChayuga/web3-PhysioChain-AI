"use client"

// Component
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Activity, Users, Calendar, Award,
    TrendingUp, Clock, Bell, Settings,
    FileText, Brain, Zap, Shield, Coins, Database, Box, AlertTriangle,
    CheckCircle, Server, Cpu
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PatientsTab from "@/components/PatientTab";

const mockData: MockData = {
    adherenceData: [
        { name: 'Week 1', rate: 65 },
        { name: 'Week 2', rate: 78 },
        { name: 'Week 3', rate: 85 },
        { name: 'Week 4', rate: 82 },
        { name: 'Week 5', rate: 90 }
    ]
};

// Types and Interfaces
interface TokenMetrics {
    totalSupply: string;
    circulatingSupply: string;
    rewardsDistributed: string;
    avgDailyRewards: string;
}

interface AIMetrics {
    accuracyRate: number;
    exercisesValidated: number;
    customizations: number;
    alertsGenerated: number;
}

interface BlockchainMetrics {
    totalTransactions: number;
    activeSmartContracts: number;
    avgGasUsed: string;
    networkHealth: string;
}

interface AdherenceData {
    name: string;
    rate: number;
}

interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: string;
    trend?: string;
}

interface MockData {
    adherenceData: AdherenceData[];
}

type TabValue = 'overview' | 'patients' | 'analytics' | 'schedule' | 'ai-insights' | 'rewards';

const tokenMetrics: TokenMetrics = {
    totalSupply: "1,000,000 PHYSIO",
    circulatingSupply: "750,000 PHYSIO",
    rewardsDistributed: "25,000 PHYSIO",
    avgDailyRewards: "1,200 PHYSIO"
};

const aiMetrics: AIMetrics = {
    accuracyRate: 95.5,
    exercisesValidated: 1458,
    customizations: 324,
    alertsGenerated: 45
};

const blockchainMetrics: BlockchainMetrics = {
    totalTransactions: 15784,
    activeSmartContracts: 456,
    avgGasUsed: "0.002 ETH",
    networkHealth: "Excellent"
};

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabValue>('overview');

    const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend }) => (
        <Card className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                    {trend && (
                        <p className={`text-sm mt-1 ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {trend}
                        </p>
                    )}
                </div>
                <Icon className="h-8 w-8 text-blue-500" />
            </div>
        </Card>
    );


    interface ActivityItemProps {
        icon: React.ElementType;
        title: string;
        subtitle: string;
    }

    const ActivityItem: React.FC<ActivityItemProps> = ({ icon: Icon, title, subtitle }) => (
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <Icon className="h-5 w-5 text-blue-500" />
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
    );

    interface InsightItemProps {
        icon: React.ElementType;
        title: string;
        description: string;
        iconColor: string;
    }

    const InsightItem: React.FC<InsightItemProps> = ({ icon: Icon, title, description, iconColor }) => (
        <div className="flex items-start gap-3">
            <Icon className={`h-5 w-5 ${iconColor} mt-1`} />
            <div>
                <h4 className="font-medium">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">PhysioChain Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Dr. Chayuga</p>
                </div>
                <div className="flex gap-4">
                    <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
                    <Settings className="h-6 w-6 text-gray-500 cursor-pointer" />
                </div>
            </div>

            {/* Main Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab as (value: string) => void} className="space-y-6">
                <TabsList className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="patients">Patients</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="rewards">Rewards</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            icon={Users}
                            title="Active Patients"
                            value="124"
                            trend="+12% this month"
                        />
                        <StatCard
                            icon={Activity}
                            title="Avg. Adherence Rate"
                            value="85%"
                            trend="+5% this week"
                        />
                        <StatCard
                            icon={Clock}
                            title="Sessions Today"
                            value="8"
                        />
                        <StatCard
                            icon={Award}
                            title="Patient Milestones"
                            value="15"
                            trend="+3 this week"
                        />
                    </div>

                    {/* Charts & Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Adherence Trend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={mockData.adherenceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="rate"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Insights Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>AI-Generated Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <InsightItem
                                        icon={Brain}
                                        title="Treatment Effectiveness"
                                        description="85% of patients showing improved form in lower back exercises"
                                        iconColor="text-blue-500"
                                    />
                                    <InsightItem
                                        icon={Zap}
                                        title="Suggested Optimizations"
                                        description="Consider adjusting difficulty for evening sessions"
                                        iconColor="text-yellow-500"
                                    />
                                    <InsightItem
                                        icon={Shield}
                                        title="Risk Assessment"
                                        description="No high-risk patterns detected in current treatment plans"
                                        iconColor="text-green-500"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity & Upcoming Sessions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <ActivityItem
                                            key={i}
                                            icon={Activity}
                                            title="Patient completed session"
                                            subtitle="John D. • 2h ago"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Sessions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <ActivityItem
                                            key={i}
                                            icon={Calendar}
                                            title="Lower Back Assessment"
                                            subtitle="Sarah M. • 2:30 PM"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="patients" className="space-y-6">
                    <PatientsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;