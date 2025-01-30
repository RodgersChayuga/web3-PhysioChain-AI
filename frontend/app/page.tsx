"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, Bell, Calendar, Settings } from 'lucide-react';
import { QuickStats } from "@/components/doctor/QuickStats";
import { AdherenceChart } from "@/components/doctor/AdherenceChart";
import { ActivityItem } from "@/components/doctor/ActivityItem";
import { TabValue } from "@/types/doctor";
import { AIInsights } from "@/components/doctor/AIInsights";
import PatientsTab from "@/components/PatientTab";
import ComingSoonPage from "@/components/ComingSoon";

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabValue>('overview');

    const mockData = {
        adherenceData: [
            { name: 'Week 1', rate: 65 },
            { name: 'Week 2', rate: 78 },
            { name: 'Week 3', rate: 85 },
            { name: 'Week 4', rate: 82 },
            { name: 'Week 5', rate: 90 }
        ],
        quickStats: {
            activePatients: "124",
            adherenceRate: "85%",
            sessionsToday: "8",
            patientMilestones: "15"
        }
    };

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
                    <QuickStats data={mockData.quickStats} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AdherenceChart data={mockData.adherenceData} />
                        <AIInsights />
                    </div>

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
                <TabsContent value="analytics" className="space-y-6">
                    <ComingSoonPage />
                </TabsContent>
                <TabsContent value="schedule" className="space-y-6">
                    <ComingSoonPage />
                </TabsContent>
                <TabsContent value="ai-insights" className="space-y-6">
                    <ComingSoonPage />
                </TabsContent>
                <TabsContent value="rewards" className="space-y-6">
                    <ComingSoonPage />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;