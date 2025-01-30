import React, { useMemo, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Activity,
    Search,
    Filter,
    Plus,
    MoreVertical,
    TrendingUp,
    Calendar,
    Clock,
    Award,
    Brain,
    Shield,
    LayoutGrid,
    List,
    CheckCircle,
    Database,
    FileText,
    AlertTriangle,
    Video,
    Settings,
    Bell,
    MessageSquare,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Patient } from "@/types/patient";
import { mockAIInsights, mockPatients, mockVitals } from "@/lib/mock";

// Previous interfaces remain the same...


interface PatientDetailProps {
    patient: Patient;
    setSelectedPatient: (patient: Patient | null) => void;
}

interface AIInsight {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

interface TreatmentActivity {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface ProgressData {
    week: string;
    adherence: number;
    pain: number;
}

const progressData: ProgressData[] = [
    { week: 'Week 1', adherence: 65, pain: 7 },
    { week: 'Week 2', adherence: 75, pain: 5 },
    { week: 'Week 3', adherence: 85, pain: 4 },
    { week: 'Week 4', adherence: 90, pain: 3 },
];



const PatientsTab: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [view, setView] = useState<"table" | "grid">("table");

    // Previous PatientCard component remains the same...
    const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => (
        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPatient(patient)}>
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

    const PatientsTable: React.FC = () => {
        const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
        const [currentPage, setCurrentPage] = useState(1);
        const [searchCriteria, setSearchCriteria] = useState<keyof Patient>('name');
        const [filterStatus, setFilterStatus] = useState<Patient['status'] | 'all'>('all');
        const [filterProgress, setFilterProgress] = useState<Patient['progress'] | 'all'>('all');
        const itemsPerPage = 10;

        // Filter patients based on search and filters
        const filteredPatients = useMemo(() => {
            return mockPatients.filter(patient => {
                const matchesSearch = patient[searchCriteria].toString().toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
                const matchesProgress = filterProgress === 'all' || patient.progress === filterProgress;
                return matchesSearch && matchesStatus && matchesProgress;
            });
        }, [mockPatients, searchTerm, searchCriteria, filterStatus, filterProgress]);

        // Sort patients
        const sortedPatients = useMemo(() => {
            const sorted = [...filteredPatients].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
            return sorted;
        }, [filteredPatients, sortConfig]);

        // Paginate
        const paginatedPatients = sortedPatients.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);

        const handleSort = (key: keyof Patient) => {
            setSortConfig({
                key,
                direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
            });
        };

        return (
            <div>
                <div className="mb-4 flex gap-4">
                    <Select value={searchCriteria} onValueChange={(value: keyof Patient) => setSearchCriteria(value)}>
                        <div className="flex">

                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="condition">Condition</SelectItem>
                                <SelectItem value="status">Status</SelectItem>
                            </SelectContent>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Search by..." />
                            </SelectTrigger>
                        </div>
                    </Select>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter size={16} />
                                Filters
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus as (value: string) => void}>
                                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Active">Active</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Inactive">Inactive</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Progress</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={filterProgress} onValueChange={setFilterProgress as (value: string) => void}>
                                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Improving">Improving</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Stable">Stable</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Declining">Declining</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => handleSort('name')} className="cursor-pointer">Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead onClick={() => handleSort('condition')} className="cursor-pointer">Condition {sortConfig.key === 'condition' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead onClick={() => handleSort('status')} className="cursor-pointer">Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead onClick={() => handleSort('progress')} className="cursor-pointer">Progress {sortConfig.key === 'progress' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead onClick={() => handleSort('adherenceRate')} className="cursor-pointer">Adherence {sortConfig.key === 'adherenceRate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead onClick={() => handleSort('nextSession')} className="cursor-pointer">Next Session {sortConfig.key === 'nextSession' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead onClick={() => handleSort('tokensEarned')} className="cursor-pointer">Tokens Earned {sortConfig.key === 'tokensEarned' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedPatients.map((patient) => (
                                    <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedPatient(patient)}>
                                        <TableCell className="font-medium">{patient.name}</TableCell>
                                        <TableCell>{patient.condition}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-sm ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {patient.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`flex items-center gap-1 ${patient.progress === 'Improving' ? 'text-green-600' : patient.progress === 'Stable' ? 'text-blue-600' : 'text-red-600'}`}>
                                                <TrendingUp size={16} />
                                                {patient.progress}
                                            </span>
                                        </TableCell>
                                        <TableCell>{patient.adherenceRate}%</TableCell>
                                        <TableCell>{patient.nextSession}</TableCell>
                                        <TableCell>{patient.tokensEarned} PHYSIO</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedPatients.length)} of {sortedPatients.length} results
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    // Previous PatientDetail component remains the same...
    // (Keep all the PatientDetail code from the previous version)

    return (
        <div className="space-y-6">
            {!selectedPatient ? (
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Patients</h2>
                            <p className="text-gray-500">Manage and monitor patient progress</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex rounded-md shadow-sm">
                                <Button
                                    variant={view === "table" ? "default" : "outline"}
                                    className="rounded-r-none"
                                    onClick={() => setView("table")}
                                >
                                    <List size={16} />
                                </Button>
                                <Button
                                    variant={view === "grid" ? "default" : "outline"}
                                    className="rounded-l-none"
                                    onClick={() => setView("grid")}
                                >
                                    <LayoutGrid size={16} />
                                </Button>
                            </div>
                            <Button className="gap-2">
                                <Plus size={16} />
                                Add New Patient
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                            <Input
                                placeholder="Search patients..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {view === "table" ? (
                        <PatientsTable />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockPatients.map((patient) => (
                                <PatientCard key={patient.id} patient={patient} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <PatientDetail patient={selectedPatient} setSelectedPatient={setSelectedPatient} />
            )}
        </div>
    );
};




const PatientDetail: React.FC<PatientDetailProps> = ({ patient, setSelectedPatient }) => {
    const aiInsights: AIInsight[] = [
        {
            icon: Brain,
            title: "Exercise Form Analysis",
            description: "Showing consistent improvement in knee extension form.",
            color: "text-blue-500",
        },
        {
            icon: TrendingUp,
            title: "Progress Prediction",
            description: "On track for 90% recovery within 6 weeks.",
            color: "text-green-500",
        },
        {
            icon: Shield,
            title: "Risk Assessment",
            description: "Low risk of reinjury based on current progress.",
            color: "text-yellow-500",
        },
    ];

    const treatmentActivities: TreatmentActivity[] = [
        {
            icon: Clock,
            title: "Daily Exercises",
            description: "3 sets of knee strengthening exercises",
        },
        {
            icon: Calendar,
            title: "Weekly Sessions",
            description: "2 supervised sessions per week",
        },
    ];

    const MetricCard: React.FC<{
        icon: React.ElementType;
        title: string;
        value: string | number;
        color: string;
    }> = ({ icon: Icon, title, value, color }) => (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                    <Icon className={color} />
                    <div>
                        <p className="text-sm text-gray-500">{title}</p>
                        <p className="text-xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );



    return (
        <div className="space-y-6">

            {/* Header */}
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
                    <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                        Back to List
                    </Button>
                </div>

            </div>


            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                    icon={Activity}
                    title="Adherence Rate"
                    value={`${patient.adherenceRate}%`}
                    color="text-blue-500"
                />
                <MetricCard
                    icon={Award}
                    title="Tokens Earned"
                    value={`${patient.tokensEarned} PHYSIO`}
                    color="text-yellow-500"
                />
                <MetricCard
                    icon={Calendar}
                    title="Next Session"
                    value={patient.nextSession}
                    color="text-green-500"
                />
                <MetricCard
                    icon={TrendingUp}
                    title="Progress"
                    value={patient.progress}
                    color="text-purple-500"
                />
            </div>

            {/* Progress Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Card>
                    <CardHeader>
                        <CardTitle>Progress Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4 p-6 mb-4" >
                            {mockVitals.slice(-1).map((vital, index) => (
                                <React.Fragment key={index}>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Heart Rate</p>
                                        <p className="text-2xl font-bold">{vital.heartRate} BPM</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Movement Accuracy</p>
                                        <p className="text-2xl font-bold">{vital.movement}%</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Breathing Rate</p>
                                        <p className="text-2xl font-bold">{vital.breathing}/min</p>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Pain Level</p>
                                        <p className="text-2xl font-bold">{vital.painLevel}/10</p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={progressData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="adherence"
                                        stroke="#3b82f6"
                                        name="Adherence %"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="pain"
                                        stroke="#ef4444"
                                        name="Pain Level"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>


                    </CardContent>
                </Card>
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="h-5 w-5" />
                            AI Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockAIInsights.map((insight, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-blue-600">{insight.title}</h4>
                                        <span className="text-sm text-gray-500">
                                            Confidence: {insight.confidence}%
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{insight.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        {insight.category === 'risk' && (
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                        )}
                                        <span className="text-xs text-gray-500">
                                            {new Date(insight.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Insights and Treatment Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain size={20} />
                            AI Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {aiInsights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <insight.icon className={insight.color} />
                                <div>
                                    <h4 className="font-medium">{insight.title}</h4>
                                    <p className="text-sm text-gray-600">{insight.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Treatment Plan */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText size={20} />
                                Treatment Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {treatmentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <activity.icon className="text-blue-500" />
                                        <div>
                                            <p className="font-medium">{activity.title}</p>
                                            <p className="text-sm text-gray-500">{activity.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Smart Contract Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database size={20} />
                                Blockchain Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Treatment Plan NFT ID</span>
                                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">#TN-{patient.id}834</code>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Smart Contract Status</span>
                                    <span className="text-sm text-green-600 flex items-center gap-1">
                                        <CheckCircle size={14} />
                                        Active
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Last Updated</span>
                                    <span className="text-sm">2024-01-29 14:30 UTC</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PatientsTab;