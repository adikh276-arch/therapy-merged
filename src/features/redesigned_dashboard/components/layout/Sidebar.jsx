import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    Activity,
    Users,
    TrendingUp,
    Award,
    MessageSquare,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    FileText
} from 'lucide-react';

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        summary: true,
        engagement: true
    });

    const toggleMenu = (key) => {
        setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            background: 'var(--bg-sidebar)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #334155',
            zIndex: 50
        }}>
            {/* Logo Area */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span style={{ color: 'var(--primary)' }}>Mantra</span>Care
                </h1>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>

                {/* Home */}
                <NavLink
                    to="/"
                    className={({ isActive }) => `flex items-center gap-2 src-sidebar-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: isActive ? 'white' : '#94A3B8',
                        background: isActive ? 'var(--primary)' : 'transparent',
                        transition: 'all 0.2s',
                        marginBottom: '0.5rem'
                    })}
                >
                    <Home size={20} />
                    <span>Home</span>
                </NavLink>

                {/* Summary (Overview, Service) */}
                <div>
                    <button
                        onClick={() => toggleMenu('summary')}
                        className="flex items-center justify-between w-full p-3 text-gray-400 hover:text-white transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <Activity size={20} />
                            <span>Summary</span>
                        </div>
                        {openMenus.summary ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {openMenus.summary && (
                        <div className="ml-8 flex flex-col gap-1 border-l border-slate-700 pl-2">
                            <NavLink to="/summary" className={({ isActive }) => `p-2 text-sm rounded ${isActive ? 'text-white font-medium' : 'text-slate-400 hover:text-white'}`}>
                                Overview
                            </NavLink>
                            <NavLink to="/summary" className="p-2 text-sm text-slate-400 hover:text-white">
                                Service
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Engagement */}
                <div>
                    <button
                        onClick={() => toggleMenu('engagement')}
                        className="flex items-center justify-between w-full p-3 text-gray-400 hover:text-white transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <Users size={20} />
                            <span>Engagement</span>
                        </div>
                        {openMenus.engagement ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {openMenus.engagement && (
                        <div className="ml-8 flex flex-col gap-1 border-l border-slate-700 pl-2">
                            <NavLink to="/engagement" className={({ isActive }) => `p-2 text-sm rounded ${isActive ? 'text-white font-medium' : 'text-slate-400 hover:text-white'}`}>
                                Calendar
                            </NavLink>
                            <NavLink to="/engagement" className="p-2 text-sm text-slate-400 hover:text-white">
                                Webinar
                            </NavLink>
                            <NavLink to="/engagement" className="p-2 text-sm text-slate-400 hover:text-white">
                                Surveys
                            </NavLink>
                            <NavLink to="/engagement" className="p-2 text-sm text-slate-400 hover:text-white">
                                Group Chat
                            </NavLink>
                            <NavLink to="/reports" className="p-2 text-sm text-slate-400 hover:text-white">
                                Report
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Program ROI */}
                <NavLink
                    to="/roi"
                    className={({ isActive }) => `flex items-center gap-2 src-sidebar-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: isActive ? 'white' : '#94A3B8',
                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                        transition: 'all 0.2s',
                        marginTop: '0.5rem'
                    })}
                >
                    <TrendingUp size={20} />
                    <span>Program ROI</span>
                </NavLink>

                {/* Employees */}
                <NavLink
                    to="/employees"
                    className={({ isActive }) => `flex items-center gap-2 src-sidebar-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: isActive ? 'white' : '#94A3B8',
                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                        marginTop: '0.5rem'
                    })}
                >
                    <Users size={20} />
                    <span>Employees</span>
                </NavLink>

                {/* Rewards */}
                <NavLink
                    to="/rewards"
                    className={({ isActive }) => `flex items-center gap-2 src-sidebar-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: isActive ? 'white' : '#94A3B8',
                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                        marginTop: '0.5rem'
                    })}
                >
                    <Award size={20} />
                    <span>Rewards</span>
                </NavLink>

                {/* Feedback */}
                <NavLink
                    to="/feedback"
                    className={({ isActive }) => `flex items-center gap-2 src-sidebar-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: isActive ? 'white' : '#94A3B8',
                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                        marginTop: '0.5rem'
                    })}
                >
                    <MessageSquare size={20} />
                    <span>Feedback</span>
                </NavLink>

                {/* Settings */}
                <NavLink
                    to="/settings"
                    className={({ isActive }) => `flex items-center gap-2 src-sidebar-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: isActive ? 'white' : '#94A3B8',
                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                        marginTop: '0.5rem'
                    })}
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>

            </nav>

            {/* User Logic */}
            <div style={{ padding: '1rem', borderTop: '1px solid #334155' }}>
                <button className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8', width: '100%' }}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
