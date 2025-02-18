import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, List, LayoutGrid } from 'lucide-react';
import { mockPatients } from "@/lib/mock";
import { Patient } from "@/types/doctor";
import { PatientCard } from "./patient/PatientCard";
import { PatientDetail } from "./patient/PatientDetail";
import { PatientsTable } from "./patient/PatientsTable";

const PatientsTab: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [view, setView] = useState<"table" | "grid">("table");

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
                        <PatientsTable
                            patients={mockPatients}
                            searchTerm={searchTerm}
                            onSelectPatient={setSelectedPatient}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockPatients
                                .filter(patient =>
                                    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((patient) => (
                                    <PatientCard
                                        key={patient.id}
                                        patient={patient}
                                        onClick={() => setSelectedPatient(patient)}
                                    />
                                ))
                            }
                        </div>
                    )}
                </>
            ) : (
                <PatientDetail
                    patient={selectedPatient}
                    setSelectedPatient={setSelectedPatient}
                />
            )}
        </div>
    );
};

export default PatientsTab;