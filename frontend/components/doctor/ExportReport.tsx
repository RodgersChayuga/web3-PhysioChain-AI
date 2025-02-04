import React from 'react';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/doctor";

interface ExportReportProps {
    patient: Patient;
}

export const ExportReport: React.FC<ExportReportProps> = ({ patient }) => {
    const handleExport = () => {
        const doc = new jsPDF();

        // Set up fonts and colors
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(31, 41, 55); // text-gray-800

        // Header
        doc.text("Patient Report", 105, 20, { align: "center" });

        // Add a line under the header
        doc.setDrawColor(229, 231, 235); // border-gray-200
        doc.line(20, 25, 190, 25);

        // Patient basic info section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Patient Information", 20, 40);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Name: ${patient.name}`, 20, 50);

        // Medical details section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Medical Details", 20, 70);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Condition: ${patient.condition}`, 20, 80);

        // Stats section with colored boxes
        doc.setFillColor(243, 244, 246); // bg-gray-100
        doc.rect(20, 100, 170, 30, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Treatment Statistics", 25, 110);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Adherence Rate: ${patient.adherenceRate}%`, 25, 120);

        // Appointment section
        doc.setFillColor(236, 253, 245); // bg-green-50
        doc.rect(20, 140, 170, 30, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Next Appointment", 25, 150);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Date: ${patient.nextSession}`, 25, 160);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128); // text-gray-500
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 280, { align: "center" });

        doc.save(`${patient.name}-report.pdf`);
    };

    return (
        <div className="print-container">
            <Button
                onClick={handleExport}
                variant="outline"
                className="gap-2 bg-green-50 hover:bg-green-100 text-green-600 border-green-200 hover:border-green-300 transition-all duration-200"
            >
                <Download className="w-4 h-4" />
                Export Report
            </Button>
        </div>
    );
};