// components/PatientsTable.tsx

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Patient } from "@/types/doctor";

interface PatientsTableProps {
    patients: Patient[];
    searchTerm: string;
    onSelectPatient: (patient: Patient) => void;
}

export const PatientsTable: React.FC<PatientsTableProps> = ({
    patients,
    searchTerm,
    onSelectPatient,
}) => {
    // State management
    const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: 'asc' | 'desc' }>({
        key: 'name',
        direction: 'asc',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCriteria, setSearchCriteria] = useState<keyof Patient>('name');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
    const [filterProgress, setFilterProgress] = useState<'all' | 'improving' | 'stable' | 'declining'>('all');
    const itemsPerPage = 10;

    // Helper function for status color
    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'text-green-600';
            case 'inactive':
                return 'text-red-600';
            case 'completed':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    // Helper function for progress color and icon
    const getProgressColorAndIcon = (progress: string): { color: string; icon: JSX.Element } => {
        switch (progress.toLowerCase()) {
            case 'improving':
                return { color: 'text-green-600', icon: <TrendingUp className="h-4 w-4 inline" /> };
            case 'stable':
                return { color: 'text-yellow-600', icon: <Minus className="h-4 w-4 inline" /> };
            case 'declining':
                return { color: 'text-red-600', icon: <TrendingDown className="h-4 w-4 inline" /> };
            default:
                return { color: 'text-gray-600', icon: <Minus className="h-4 w-4 inline" /> };
        }
    };

    // Filter patients based on search term and filters
    const filteredPatients = useMemo(() => {
        return patients.filter((patient) => {
            const searchMatch = patient[searchCriteria]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus.toLowerCase();
            const progressMatch = filterProgress === 'all' || patient.progress.toLowerCase() === filterProgress.toLowerCase();
            return searchMatch && statusMatch && progressMatch;
        });
    }, [patients, searchTerm, searchCriteria, filterStatus, filterProgress]);

    // Sort patients
    const sortedPatients = useMemo(() => {
        const sorted = [...filteredPatients].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredPatients, sortConfig]);

    // Paginate patients
    const paginatedPatients = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedPatients.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedPatients, currentPage]);

    // Calculate total pages
    const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);

    // Handle sort
    const handleSort = (key: keyof Patient) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    return (
        <Card>
            <CardContent className="p-4">
                {/* Filters */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                        {/* Search Criteria */}
                        <Select value={searchCriteria} onValueChange={(value) => setSearchCriteria(value as keyof Patient)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Search by..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="condition">Condition</SelectItem>
                                <SelectItem value="status">Status</SelectItem>
                                <SelectItem value="progress">Progress</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as 'all' | 'active' | 'inactive' | 'completed')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Progress Filter */}
                        <Select value={filterProgress} onValueChange={(value) => setFilterProgress(value as 'all' | 'improving' | 'stable' | 'declining')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Progress" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="improving">Improving</SelectItem>
                                <SelectItem value="stable">Stable</SelectItem>
                                <SelectItem value="declining">Declining</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell onClick={() => handleSort('name')} className="cursor-pointer hover:bg-gray-50">
                                Name
                            </TableCell>
                            <TableCell onClick={() => handleSort('condition')} className="cursor-pointer hover:bg-gray-50">
                                Condition
                            </TableCell>
                            <TableCell onClick={() => handleSort('status')} className="cursor-pointer hover:bg-gray-50">
                                Status
                            </TableCell>
                            <TableCell onClick={() => handleSort('progress')} className="cursor-pointer hover:bg-gray-50">
                                Progress
                            </TableCell>
                            <TableCell onClick={() => handleSort('adherenceRate')} className="cursor-pointer hover:bg-gray-50">
                                Adherence Rate
                            </TableCell>
                            <TableCell onClick={() => handleSort('nextSession')} className="cursor-pointer hover:bg-gray-50">
                                Next Session
                            </TableCell>
                            <TableCell onClick={() => handleSort('tokensEarned')} className="cursor-pointer hover:bg-gray-50">
                                Tokens Earned
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedPatients.map((patient) => {
                            const statusColor = getStatusColor(patient.status);
                            const { color: progressColor, icon: progressIcon } = getProgressColorAndIcon(patient.progress);

                            return (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.condition}</TableCell>
                                    <TableCell className={statusColor}>{patient.status}</TableCell>
                                    <TableCell className={progressColor}>
                                        {progressIcon} {patient.progress}
                                    </TableCell>
                                    <TableCell>{patient.adherenceRate}%</TableCell>
                                    <TableCell>{patient.nextSession}</TableCell>
                                    <TableCell>{patient.tokensEarned} PHYSIO</TableCell>
                                    <TableCell>
                                        {/* Quick Actions Dropdown */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => alert(`Schedule session for ${patient.name}`)}>
                                                    Schedule Session
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => alert(`Send message to ${patient.name}`)}>
                                                    Send Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onSelectPatient(patient)}>
                                                    View Details
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, sortedPatients.length)} of{' '}
                        {sortedPatients.length} results
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};