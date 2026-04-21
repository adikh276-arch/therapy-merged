import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const Reports = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="text-primary" />
                        Reports
                    </h1>
                    <p className="text-secondary">Download detailed data exports for HRIS integration.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-outline text-sm">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="btn btn-primary">Generate Report</button>
                </div>
            </div>

            <div className="card">
                <h2 className="text-lg font-bold mb-4">Available Reports</h2>

                <table style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr className="border-b text-sm text-secondary">
                            <th className="p-3">Report Name</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Last Generated</th>
                            <th className="p-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">Monthly Program Health</td>
                            <td className="p-3 text-sm text-secondary">Executive summary of adoption and ROI.</td>
                            <td className="p-3 text-sm">Jan 1, 2026</td>
                            <td className="p-3 text-right">
                                <button className="text-primary hover:underline text-sm font-bold flex items-center gap-1 justify-end">
                                    <Download size={14} /> PDF
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">Risk Cohort Analysis</td>
                            <td className="p-3 text-sm text-secondary">Anonymized list of high-risk departments.</td>
                            <td className="p-3 text-sm">Jan 8, 2026</td>
                            <td className="p-3 text-right">
                                <button className="text-primary hover:underline text-sm font-bold flex items-center gap-1 justify-end">
                                    <Download size={14} /> CSV
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">Utilization Log</td>
                            <td className="p-3 text-sm text-secondary">Detailed service usage logs for billing.</td>
                            <td className="p-3 text-sm">Jan 12, 2026</td>
                            <td className="p-3 text-right">
                                <button className="text-primary hover:underline text-sm font-bold flex items-center gap-1 justify-end">
                                    <Download size={14} /> CSV
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
