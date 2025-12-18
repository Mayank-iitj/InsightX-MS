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
  Activity,
  Maximize2,
  Download,
  RefreshCw
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  details?: {
    description: string;
    breakdown: { label: string; value: string | number }[];
  };
}

function KPICard({ title, value, change, icon, delay = 0, onClick, details }: KPICardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        onClick={() => details ? setDetailsOpen(true) : onClick?.()}
        className="bg-white rounded-xl border border-[#90AB8B]/30 p-3 sm:p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all active:scale-[0.98]"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-[#5A7863] font-medium truncate">{title}</p>
            <p className="text-xl sm:text-3xl font-bold text-[#3B4953] mt-1 sm:mt-2 font-mono">{value}</p>
            <div className={`flex items-center gap-1 mt-1 sm:mt-2 text-xs sm:text-sm ${change >= 0 ? 'text-[#5A7863]' : 'text-red-500'}`}>
              {change >= 0 ? <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" /> : <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />}
              <span className="font-medium">{Math.abs(change)}%</span>
              <span className="text-[#90AB8B] hidden xs:inline">vs last week</span>
            </div>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-[#EBF4DD] shrink-0">
            {icon}
          </div>
        </div>
      </motion.div>

      {details && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {icon}
                {title}
              </DialogTitle>
              <DialogDescription>{details.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="text-center p-4 rounded-lg bg-[#EBF4DD]/50">
                <p className="text-4xl font-bold text-[#5A7863] font-mono">{value}</p>
                <p className={`text-sm mt-1 ${change >= 0 ? 'text-[#5A7863]' : 'text-red-500'}`}>
                  {change >= 0 ? '+' : ''}{change}% from last week
                </p>
              </div>
              <div className="space-y-2">
                {details.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <span className="text-sm text-[#5A7863]">{item.label}</span>
                    <span className="font-mono text-[#3B4953] font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function AnalyticsKPIs() {
  const [fraudData, setFraudData] = useState<{ time: string; detected: number; blocked: number }[]>([]);
  const [modelPerformance] = useState([
    { name: "Bank A", accuracy: 94 },
    { name: "Bank B", accuracy: 91 },
    { name: "Retail X", accuracy: 88 },
    { name: "Insurer Y", accuracy: 92 },
    { name: "Telecom Z", accuracy: 89 },
  ]);
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pieData = [
    { name: "Cross-Bank", value: 35, color: "#5A7863" },
    { name: "Retail-Bank", value: 28, color: "#90AB8B" },
    { name: "Healthcare", value: 20, color: "#3B4953" },
    { name: "Telecom", value: 17, color: "#B5C4B1" },
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

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const kpiDetails = {
    fraud: {
      description: "Total fraud cases detected through federated analysis",
      breakdown: [
        { label: "Cross-bank fraud", value: 487 },
        { label: "Identity theft", value: 312 },
        { label: "Transaction anomalies", value: 448 },
      ]
    },
    orgs: {
      description: "Active organizations in the federated network",
      breakdown: [
        { label: "Financial", value: 1 },
        { label: "Retail", value: 1 },
        { label: "Healthcare", value: 1 },
      ]
    },
    accuracy: {
      description: "Average model accuracy across all nodes",
      breakdown: [
        { label: "Precision", value: "92.8%" },
        { label: "Recall", value: "95.1%" },
        { label: "F1 Score", value: "93.9%" },
      ]
    },
    response: {
      description: "Average query response time",
      breakdown: [
        { label: "P50 Latency", value: "1.2s" },
        { label: "P95 Latency", value: "2.4s" },
        { label: "P99 Latency", value: "3.8s" },
      ]
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <KPICard
          title="Fraud Detected"
          value="1,247"
          change={12.5}
          icon={<ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />}
          delay={0}
          details={kpiDetails.fraud}
        />
        <KPICard
          title="Active Orgs"
          value="3"
          change={0}
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />}
          delay={0.1}
          details={kpiDetails.orgs}
        />
        <KPICard
          title="Model Accuracy"
          value="94.2%"
          change={2.3}
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />}
          delay={0.2}
          details={kpiDetails.accuracy}
        />
        <KPICard
          title="Avg Response"
          value="1.8s"
          change={-15}
          icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />}
          delay={0.3}
          details={kpiDetails.response}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-[#90AB8B]/30 p-3 sm:p-5 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h3 className="font-semibold text-[#3B4953] text-sm sm:text-base">Fraud Detection Timeline</h3>
              <p className="text-xs sm:text-sm text-[#5A7863]">Last 24 hours (encrypted)</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={refreshData}
                className="p-1.5 rounded-lg hover:bg-[#EBF4DD] transition-colors"
              >
                <RefreshCw className={`w-4 h-4 text-[#5A7863] ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={() => setExpandedChart("timeline")}
                className="p-1.5 rounded-lg hover:bg-[#EBF4DD] transition-colors"
              >
                <Maximize2 className="w-4 h-4 text-[#5A7863]" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#5A7863]" />
              <span className="text-[#5A7863]">Detected</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#90AB8B]" />
              <span className="text-[#5A7863]">Blocked</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
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
              <XAxis dataKey="time" stroke="#5A7863" fontSize={10} tickLine={false} interval="preserveStartEnd" />
              <YAxis stroke="#5A7863" fontSize={10} tickLine={false} width={30} />
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
          onClick={() => setExpandedChart("pie")}
          className="bg-white rounded-xl border border-[#90AB8B]/30 p-3 sm:p-5 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h3 className="font-semibold text-[#3B4953] mb-1 sm:mb-2 text-sm sm:text-base">Use Case Distribution</h3>
          <p className="text-xs sm:text-sm text-[#5A7863] mb-2 sm:mb-4">Privacy-safe insights</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
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
          <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-2 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[#3B4953] truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => setExpandedChart("performance")}
        className="bg-white rounded-xl border border-[#90AB8B]/30 p-3 sm:p-5 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="font-semibold text-[#3B4953] text-sm sm:text-base">Federated Model Performance</h3>
            <p className="text-xs sm:text-sm text-[#5A7863]">Per-node accuracy (no raw data exchanged)</p>
          </div>
          <div className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full bg-[#EBF4DD]">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-[#5A7863]" />
            <span className="text-xs sm:text-sm text-[#5A7863] font-medium">Live</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={modelPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#90AB8B" opacity={0.2} horizontal={false} />
            <XAxis type="number" domain={[80, 100]} stroke="#5A7863" fontSize={10} />
            <YAxis type="category" dataKey="name" stroke="#5A7863" fontSize={10} width={60} />
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

      <Dialog open={!!expandedChart} onOpenChange={() => setExpandedChart(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {expandedChart === "timeline" && "Fraud Detection Timeline"}
              {expandedChart === "pie" && "Use Case Distribution"}
              {expandedChart === "performance" && "Model Performance Details"}
            </DialogTitle>
            <DialogDescription>
              Detailed view with export options
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px]">
            {expandedChart === "timeline" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fraudData}>
                  <defs>
                    <linearGradient id="colorDetectedExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5A7863" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#5A7863" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBlockedExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#90AB8B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#90AB8B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#90AB8B" opacity={0.2} />
                  <XAxis dataKey="time" stroke="#5A7863" fontSize={12} />
                  <YAxis stroke="#5A7863" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="detected" stroke="#5A7863" fillOpacity={1} fill="url(#colorDetectedExp)" strokeWidth={2} />
                  <Area type="monotone" dataKey="blocked" stroke="#90AB8B" fillOpacity={1} fill="url(#colorBlockedExp)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
            {expandedChart === "pie" && (
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {expandedChart === "performance" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#90AB8B" opacity={0.2} />
                  <XAxis type="number" domain={[80, 100]} stroke="#5A7863" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="#5A7863" fontSize={12} width={80} />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Accuracy']} />
                  <Bar dataKey="accuracy" fill="#5A7863" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={() => setExpandedChart(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
