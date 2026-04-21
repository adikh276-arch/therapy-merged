import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const StatCard = ({ title, value, trend, trendDirection = 'neutral', icon: Icon, color = 'primary' }) => {
    const getTrendColor = () => {
        if (trendDirection === 'up') return 'text-success';
        if (trendDirection === 'down') return 'text-danger';
        return 'text-secondary';
    };

    const getTrendIcon = () => {
        if (trendDirection === 'up') return <ArrowUp size={16} />;
        if (trendDirection === 'down') return <ArrowDown size={16} />;
        return <Minus size={16} />;
    };

    return (
        <div className="card">
            <div className="flex justify-between items-start mb-2">
                <span className="text-secondary text-sm font-medium">{title}</span>
                {Icon && (
                    <div style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: `var(--${color === 'primary' ? 'bg-page' : 'bg-page'})`, // simplified logic
                        color: `var(--${color})`
                    }}>
                        <Icon size={20} />
                    </div>
                )}
            </div>

            <div className="text-2xl font-bold mb-2">{value}</div>

            {trend && (
                <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
                    {getTrendIcon()}
                    <span>{trend}</span>
                    <span className="text-secondary text-xs ml-1">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;
