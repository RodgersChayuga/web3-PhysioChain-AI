'use client'

import React, { useState } from 'react';
import {
  // BarChart, 
  // Bar, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
  // Calendar, 
  // AlertCircle, 
  // Users, 
  // TrendingUp, 
  // ChevronDown, Play, Pause, RotateCcw, 
  // ThumbsDown, 
  Bell, Settings,
  Activity,
  Award, Clock,
  Video,
  CheckCircle,
  Filter, Download,
  ThumbsUp,
  MessageSquare, LucideIcon
} from 'lucide-react';
import Image from 'next/image';

// Mock data
const mockProgressData = [
  { name: 'Mon', accuracy: 85, sessions: 3, pain: 2 },
  { name: 'Tue', accuracy: 87, sessions: 2, pain: 3 },
  { name: 'Wed', accuracy: 82, sessions: 4, pain: 1 },
  { name: 'Thu', accuracy: 89, sessions: 3, pain: 2 },
  { name: 'Fri', accuracy: 91, sessions: 2, pain: 1 },
  { name: 'Sat', accuracy: 88, sessions: 1, pain: 2 },
  { name: 'Sun', accuracy: 90, sessions: 3, pain: 1 }
];

const bodyPartData = [
  { name: 'Lower Back', value: 65 },
  { name: 'Right Shoulder', value: 45 },
  { name: 'Left Knee', value: 80 },
  { name: 'Neck', value: 90 }
];

const performanceData = [
  { subject: 'Form', A: 85, fullMark: 100 },
  { subject: 'Consistency', A: 78, fullMark: 100 },
  { subject: 'Range', A: 92, fullMark: 100 },
  { subject: 'Strength', A: 68, fullMark: 100 },
  { subject: 'Endurance', A: 75, fullMark: 100 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard = ({ icon: Icon, title, value, subtext, color }: { icon: LucideIcon, title: string, value: string, subtext: string, color: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center gap-4">
      <div className={`bg-${color}-100 p-3 rounded-lg`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div>
        <p className="text-gray-600">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
        <p className={`text-sm text-${color}-600`}>{subtext}</p>
      </div>
    </div>
  </div>
);

const NotificationsPanel = ({ show, notifications }: { show: boolean, notifications: { message: string; time: string }[] }) => (
  show && (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-10">
      <h3 className="font-semibold mb-2">Notifications</h3>
      <div className="space-y-2">
        {notifications.map((notif, index) => (
          <div key={index} className="p-2 hover:bg-gray-50 rounded">
            <p className="text-sm">{notif.message}</p>
            <p className="text-xs text-gray-500">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
);

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const notifications = [
    { message: 'New message from your therapist', time: '5 minutes ago' },
    { message: 'Achievement unlocked: Perfect Form!', time: '1 hour ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-blue-600">PhysioChain</h1>
              <nav className="hidden md:flex space-x-4">
                {['progress', 'exercises', 'rewards'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-2 rounded-md ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <NotificationsPanel show={showNotifications} notifications={notifications} />
              </div>
              <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
              <Image src="/img/profile.JPG" width={32} height={32} alt="Profile" className="rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <select
              className="bg-white border rounded-lg px-4 py-2"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
              <Video className="w-4 h-4" />
              Start Session
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message Therapist
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Activity}
            title="Weekly Progress"
            value="87%"
            subtext="↑ 12% from last week"
            color="blue"
          />
          <StatCard
            icon={Award}
            title="Reward Points"
            value="2,450"
            subtext="+150 this week"
            color="green"
          />
          <StatCard
            icon={Clock}
            title="Exercise Time"
            value="5h 45m"
            subtext="This week"
            color="purple"
          />
          <StatCard
            icon={CheckCircle}
            title="Exercises"
            value="18/24"
            subtext="75% completed"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Progress Overview</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border rounded-full bg-blue-50 text-blue-600">Accuracy</button>
                <button className="px-3 py-1 text-sm border rounded-full">Sessions</button>
                <button className="px-3 py-1 text-sm border rounded-full">Pain Level</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#2563eb" />
                  <Line type="monotone" dataKey="sessions" stroke="#16a34a" />
                  <Line type="monotone" dataKey="pain" stroke="#dc2626" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Body Parts Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Body Part Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bodyPartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {bodyPartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {bodyPartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                  <span className="text-sm text-gray-600 ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Radar */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Performance Metrics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Video className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Completed Exercise Session</p>
                  <p className="text-sm text-gray-600">Lower Back Routine • 25 mins</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Good form!</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Achievement Unlocked</p>
                  <p className="text-sm text-gray-600">Perfect Form Streak • +50 points</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">Therapist Feedback</p>
                  <p className="text-sm text-gray-600">Great progress on exercises!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}