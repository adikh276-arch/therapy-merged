import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, User, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <SettingsIcon className="text-primary" />
                    Settings
                </h1>
                <p className="text-secondary">Manage your company profile and dashboard preferences.</p>
            </div>

            <div className="card">
                <h2 className="text-lg font-bold mb-6">General Settings</h2>

                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-2 rounded-lg text-primary"><User size={24} /></div>
                            <div>
                                <div className="font-bold">Company Profile</div>
                                <div className="text-sm text-secondary">Update company name, logo, and address.</div>
                            </div>
                        </div>
                        <button className="btn btn-outline text-sm">Edit</button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Bell size={24} /></div>
                            <div>
                                <div className="font-bold">Notifications</div>
                                <div className="text-sm text-secondary">Configure email alerts for high-risk cohorts.</div>
                            </div>
                        </div>
                        <button className="btn btn-outline text-sm">Configure</button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-2 rounded-lg text-green-600"><Globe size={24} /></div>
                            <div>
                                <div className="font-bold">Integrations</div>
                                <div className="text-sm text-secondary">Connect with Slack, MS Teams, and HRIS.</div>
                            </div>
                        </div>
                        <button className="btn btn-outline text-sm">Manage</button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-2 rounded-lg text-red-600"><Lock size={24} /></div>
                            <div>
                                <div className="font-bold">Privacy & Security</div>
                                <div className="text-sm text-secondary">Manage data retention policies and access logs.</div>
                            </div>
                        </div>
                        <button className="btn btn-outline text-sm">View</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
