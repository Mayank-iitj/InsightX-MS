"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  delay?: number;
}

function KPICard({ title, value, change, icon, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl border border-[#90AB8B]/30 p-5 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#5A7863] font-medium">{title}</p>
          <p className="text-3xl font-bold text-[#3B4953] mt-2 font-mono">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-[#5A7863]' : 'text-red-500'}`}>
            {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="font-medium">{Math.abs(change)}%</span>
            <span className="text-[#90AB8B]">vs last week</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-[#EBF4DD]">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export function AnalyticsKPIs() {
  const [fraudData, setFraudData] = useState<{ time: string; detected: number; blocked: number }[]>([]);
  const [modelPerformance, setModelPerformance] = useState([
    { name: "Bank A", accuracy: 94 },
    { name: "Bank B", accuracy: 91 },
    { name: "Retailer X", accuracy: 88 },
    { name: "Insurer Y", accuracy: 92 },
    { name: "Telecom Z", accuracy: 89 },
  ]);

  const pieData = [
    { name: "Cross-Bank", value: 35, color: "#5A7863" },
    { name: "Retail-Bank", value: 28, color: "#90AB8B" },
    { name: "Healthcare", value: 20, color: "#3B4953" },
    { name: "Telecom", value: 17, color: "#EBF4DD" },
  ];

  useEffect(() => {
    const generateData = () => {
      const data = [];
      for (let i = 23; i >= 0; i--) {
        const hour = new Date();
        hour.setHours(hour.getHours() - i);
        data.push({
          time: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detected: Math.floor(Math.random() * 50) + 20,
          blocked: Math.floor(Math.random() * 40) + 15,
        });
      }
      return data;
    };

    setFraudData(generateData());
    
    const interval = setInterval(() => {
      setFraudData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detected: Math.floor(Math.random() * 50) + 20,
          blocked: Math.floor(Math.random() * 40) + 15,
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Fraud Detected"
          value="1,247"
          change={12.5}
          icon={<ShieldCheck className="w-6 h-6 text-[#5A7863]" />}
          delay={0}
        />
        <KPICard
          title="Active Organizations"
          value="3"
          change={0}
          icon={<Users className="w-6 h-6 text-[#5A7863]" />}
          delay={0.1}
        />
        <KPICard
          title="Model Accuracy"
          value="94.2%"
          change={2.3}
          icon={<TrendingUp className="w-6 h-6 text-[#5A7863]" />}
          delay={0.2}
        />
        <KPICard
          title="Avg Response"
          value="1.8s"
          change={-15}
          icon={<Zap className="w-6 h-6 text-[#5A7863]" />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-[#90AB8B]/30 p-5 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#3B4953]">Fraud Detection Timeline</h3>
              <p className="text-sm text-[#5A7863]">Last 24 hours (encrypted aggregates)</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#5A7863]" />
                <span className="text-[#5A7863]">Detected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#90AB8B]" />
                <span className="text-[#5A7863]">Blocked</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={fraudData}>
              <defs>
                <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5A7863" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5A7863" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#90AB8B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#90AB8B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#90AB8B" opacity={0.2} />
              <XAxis dataKey="time" stroke="#5A7863" fontSize={10} tickLine={false} />
              <YAxis stroke="#5A7863" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #90AB8B',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="detected" stroke="#5A7863" fillOpacity={1} fill="url(#colorDetected)" strokeWidth={2} />
              <Area type="monotone" dataKey="blocked" stroke="#90AB8B" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-[#90AB8B]/30 p-5 shadow-lg"
        >
          <h3 className="font-semibold text-[#3B4953] mb-2">Use Case Distribution</h3>
          <p className="text-sm text-[#5A7863] mb-4">Privacy-safe insights by sector</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #90AB8B',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#3B4953]">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl border border-[#90AB8B]/30 p-5 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[#3B4953]">Federated Model Performance</h3>
            <p className="text-sm text-[#5A7863]">Per-node accuracy (no raw data exchanged)</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4DD]">
            <Activity className="w-4 h-4 text-[#5A7863]" />
            <span className="text-sm text-[#5A7863] font-medium">Live Training</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={modelPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#90AB8B" opacity={0.2} horizontal={false} />
            <XAxis type="number" domain={[80, 100]} stroke="#5A7863" fontSize={10} />
            <YAxis type="category" dataKey="name" stroke="#5A7863" fontSize={12} width={80} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #90AB8B',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value}%`, 'Accuracy']}
            />
            <Bar dataKey="accuracy" fill="#5A7863" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
