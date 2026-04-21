import React from 'react';
import { Users, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { EMPLOYEE_DATA } from '../data/mockData';

const Employees = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="text-primary" />
                        Employees
                    </h1>
                    <p className="text-secondary">Manage access and monitor individual engagement risks.</p>
                </div>
                <button className="btn btn-primary">Invite Employees</button>
            </div>

            <div className="card">
                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or dept..."
                        className="p-2 border rounded-lg w-64 text-sm"
                    />
                    <button className="btn btn-outline text-sm">Filter by Risk</button>
                </div>

                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr className="text-secondary text-sm border-b">
                            <th className="p-3 font-medium">Name</th>
                            <th className="p-3 font-medium">Department</th>
                            <th className="p-3 font-medium">Status</th>
                            <th className="p-3 font-medium">Last Active (Recency)</th>
                            <th className="p-3 font-medium">Risk Score</th>
                            <th className="p-3 font-medium">Engagement</th>
                            <th className="p-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EMPLOYEE_DATA.map((emp) => (
                            <tr key={emp.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="p-3 font-bold">{emp.name}</td>
                                <td className="p-3 text-sm text-secondary">{emp.dept}</td>
                                <td className="p-3">
                                    <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="p-3 text-sm">{emp.recency}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${emp.riskScore > 70 ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${emp.riskScore}%`, background: emp.riskScore > 70 ? 'var(--danger)' : 'var(--success)' }}
                                            />
                                        </div>
                                        <span className="text-xs">{emp.riskScore}</span>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className={`badge ${emp.engagement === 'High' ? 'badge-blue' : emp.engagement === 'Low' ? 'badge-warning' : 'badge-secondary'}`}>
                                        {emp.engagement}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {emp.riskScore > 80 ? (
                                        <button className="text-xs flex items-center gap-1 text-danger font-bold hover:underline">
                                            <AlertCircle size={12} /> Review
                                        </button>
                                    ) : emp.status === 'Inactive' ? (
                                        <button className="text-xs flex items-center gap-1 text-primary font-bold hover:underline">
                                            <Mail size={12} /> Invite
                                        </button>
                                    ) : (
                                        <span className="text-gray-300">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
