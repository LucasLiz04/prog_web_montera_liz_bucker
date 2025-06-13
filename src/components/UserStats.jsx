// src/components/UserStats.jsx
import React from 'react';
import { Award, BarChart2, Clock } from 'react-feather';

const StatItem = ({ icon, value, label }) => (
    <div className="flex items-center gap-4">
        <div className="bg-sky-500/20 p-3 rounded-lg text-sky-400">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    </div>
);

const UserStats = ({ stats }) => {
    return (
        <div className="bg-[#1f2128]/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50 space-y-5">
            <h3 className="text-xl font-bold text-white mb-4">Stats</h3>
            <StatItem icon={<BarChart2 />} value={stats.gamesPlayed} label="Games Played" />
            <StatItem icon={<Clock />} value={`${stats.totalDuration} Hours`} label="Total Duration" />
            <StatItem icon={<Award />} value={stats.achievements} label="Achievements" />
        </div>
    );
};

export default UserStats;