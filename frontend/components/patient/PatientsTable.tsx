// components/PatientsTable.tsx
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Filter, MoreVertical, TrendingUp } from 'lucide-react';
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
        direction: 'asc'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCriteria, setSearchCriteria] = useState<keyof Patient>('name');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterProgress, setFilterProgress] = useState<string>('all');
    const itemsPerPage = 10;

    // Filter patients based on search term and filters
    const filteredPatients = useMemo(() => {
        return patients.filter(patient => {
            const searchMatch = patient[searchCriteria]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = filterStatus === 'all' || patient.status === filterStatus;
            const progressMatch = filterProgress === 'all' || patient.progress === filterProgress;
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

    // Table header component
    const TableSortHeader: React.FC<{ label: string; sortKey: keyof Patient }> = ({ label, sortKey }) => (
        <TableHead
            onClick={() => handleSort(sortKey)}
            className="cursor-pointer hover:bg-gray-50"
        >
            <div className="flex items-center gap-1">
                {label}
                {sortConfig.key === sortKey && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
            </div>
        </TableHead>
    );

    return (
        <div className="space-y-4">
            <div className="flex gap-4 mb-4">
                <Select
                    value={searchCriteria}
                    onValueChange={(value: keyof Patient) => setSearchCriteria(value)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Search by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="condition">Condition</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
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
                        <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
                            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Active">Active</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Inactive">Inactive</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Progress</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={filterProgress} onValueChange={setFilterProgress}>
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
                                <TableSortHeader label="Name" sortKey="name" />
                                <TableSortHeader label="Condition" sortKey="condition" />
                                <TableSortHeader label="Status" sortKey="status" />
                                <TableSortHeader label="Progress" sortKey="progress" />
                                <TableSortHeader label="Adherence" sortKey="adherenceRate" />
                                <TableSortHeader label="Next Session" sortKey="nextSession" />
                                <TableSortHeader label="Tokens Earned" sortKey="tokensEarned" />
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedPatients.map((patient) => (
                                <TableRow
                                    key={patient.id}
                                    className="cursor-pointer hover:bg-gray-50"
                                    onClick={() => onSelectPatient(patient)}
                                >
                                    <TableCell className="font-medium">{patient.name}</TableCell>
                                    <TableCell>{patient.condition}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-sm ${patient.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {patient.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`flex items-center gap-1 ${patient.progress === 'Improving'
                                            ? 'text-green-600'
                                            : patient.progress === 'Stable'
                                                ? 'text-blue-600'
                                                : 'text-red-600'
                                            }`}>
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