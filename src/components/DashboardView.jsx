import React from 'react';
import { User, Medal, Sparkles } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const DashboardView = () => {
  const radarData = [
    { subject: 'PYREFELL', value: 85 },
    { subject: 'SERPENTIDE', value: 60 },
    { subject: 'TERRACROFT', value: 75 },
    { subject: 'AEROQUILL', value: 95 },
    { subject: 'INSTINCT', value: 70 },
    { subject: 'HARMONY', value: 80 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold border-2 border-blue-400">
            N
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Nox Von Lienhaber</h1>
            <div className="flex gap-2 text-xs">
              <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-700/50">ชั้นปีที่ 1</span>
              <span className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded border border-cyan-700/50">Aeroquill</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-6 lg:col-span-1">
          <h2 className="text-sm text-[#8b95a5] tracking-widest uppercase mb-4 text-center">Aura Stats</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Aura" dataKey="value" stroke="#62d2ff" fill="#62d2ff" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-6 lg:col-span-2 space-y-4">
          <h2 className="text-sm text-[#8b95a5] tracking-widest uppercase mb-4">Digital Student ID Card</h2>
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-blue-500/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_15px_rgba(30,58,138,0.5)]">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles size={100} />
            </div>
            <div className="relative z-10 flex gap-6 items-center">
              <div className="w-20 h-24 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center">
                <User size={40} className="text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-blue-400 tracking-wider mb-1">AURA ARCANA ACADEMY</p>
                <h3 className="text-xl font-bold text-white mb-2">Nox Von Lienhaber</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-300">
                  <p><span className="text-gray-500">HOUSE:</span> Aeroquill</p>
                  <p><span className="text-gray-500">YEAR:</span> 1 (2026)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;