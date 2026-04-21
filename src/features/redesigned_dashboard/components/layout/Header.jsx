import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 'var(--sidebar-width)',
            right: 0,
            height: 'var(--header-height)',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem'
        }}>
            {/* Search / Breadcrumb Placeholder */}
            <div className="flex items-center gap-4">
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                        type="text"
                        placeholder="Search employees, reports..."
                        style={{
                            padding: '0.5rem 1rem 0.5rem 2.2rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'white',
                            fontSize: '0.875rem',
                            width: '280px',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* Health Score Widget */}
                <div className="flex items-center gap-3" style={{
                    background: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <div className="text-sm font-bold text-secondary">Program Health</div>
                    <div className="flex items-center gap-2">
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--success)'
                        }} />
                        <span className="text-lg font-bold text-primary">Good (78)</span>
                    </div>
                </div>

                <div style={{ width: '1px', height: '24px', background: '#E2E8F0' }} />

                <button style={{ position: 'relative' }}>
                    <Bell size={20} color="#64748B" />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        background: 'var(--danger)',
                        borderRadius: '50%',
                        border: '1px solid white'
                    }} />
                </button>

                <div className="flex items-center gap-3">
                    <div style={{ textAlign: 'right' }}>
                        <div className="text-sm font-bold">Mantra Internal</div>
                        <div className="text-xs text-secondary">Admin</div>
                    </div>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                    }}>
                        MA
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
