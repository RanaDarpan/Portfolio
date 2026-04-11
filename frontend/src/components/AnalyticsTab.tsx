import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Loader2, Users, Globe, Activity, Monitor } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  recentVisits: any[];
  locationStats: { name: string; value: number }[];
  timelineStats: { date: string; visits: number }[];
}

export const AnalyticsTab = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/visitors/stats`);
        const data = await res.json();
        
        if (data.success) {
          setStats(data.stats);
        } else {
          setError('Failed to load stats');
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to backend');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3">
        <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
        <p className="text-slate-400">Loading analytics data...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-20 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  // Format date for chart
  const formattedTimeline = stats.timelineStats.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d')
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-brand-400" />
          </div>
          <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Total Views</p>
          <h4 className="text-3xl font-bold font-display text-white">{stats.totalVisits}</h4>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-blue-400" />
          </div>
          <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Unique Visitors</p>
          <h4 className="text-3xl font-bold font-display text-white">{stats.uniqueVisitors}</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart (Timeline) */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold font-display text-white mb-6">Traffic (Last 7 Days)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedTimeline}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="formattedDate" 
                  stroke="#ffffff50" 
                  tick={{fill: '#ffffff50', fontSize: 12}}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff50" 
                  tick={{fill: '#ffffff50', fontSize: 12}}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Locations Chart */}
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold font-display text-white mb-6">Top Locations</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.locationStats}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.locationStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend Component */}
            <div className="mt-4 flex flex-col gap-2 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
              {stats.locationStats.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-slate-300 truncate max-w-[120px]">{entry.name}</span>
                  </div>
                  <span className="text-slate-400 font-semibold">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="glass p-6 rounded-2xl border border-white/5">
        <h3 className="text-lg font-bold font-display text-white mb-6">Recent Visitors</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">OS</th>
                <th className="px-4 py-3 rounded-tr-lg">Browser</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentVisits.map((visit, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {format(new Date(visit.visitDate), 'MMM d, HH:mm')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-brand-400" />
                      <span>{visit.city !== 'Unknown' ? `${visit.city}, ` : ''}{visit.country}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-slate-500" />
                      <span className="truncate max-w-[200px]">{visit.os}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="truncate max-w-[200px] block">{visit.browser.split(' ')[0]}</span>
                  </td>
                </tr>
              ))}
              {stats.recentVisits.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center">No visitors recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
