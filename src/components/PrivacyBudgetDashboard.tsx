"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Key, 
  FileCheck, 
  AlertCircle,
  TrendingDown,
  CheckCircle2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PrivacyMetric {
  id: string;
  name: string;
  budget: number;
  used: number;
  status: "healthy" | "warning" | "critical";
  lastQuery: string;
}

export function PrivacyBudgetDashboard() {
  const [metrics, setMetrics] = useState<PrivacyMetric[]>([
    { id: "1", name: "Differential Privacy (ε)", budget: 1.0, used: 0.42, status: "healthy", lastQuery: "Fraud Detection Query" },
    { id: "2", name: "Query Budget", budget: 100, used: 67, status: "warning", lastQuery: "Aggregate Sum" },
    { id: "3", name: "Data Access Tokens", budget: 50, used: 12, status: "healthy", lastQuery: "Cohort Analysis" },
    { id: "4", name: "Encryption Cycles", budget: 1000, used: 234, status: "healthy", lastQuery: "HE Computation" },
  ]);

  const [complianceLogs, setComplianceLogs] = useState([
    { id: 1, action: "GDPR Data Request", status: "approved", time: "2 min ago" },
    { id: 2, action: "PII Access Blocked", status: "blocked", time: "5 min ago" },
    { id: 3, action: "Consent Verified", status: "approved", time: "8 min ago" },
    { id: 4, action: "Audit Log Export", status: "approved", time: "15 min ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        used: Math.min(m.budget, m.used + (Math.random() * 0.5)),
        status: m.used / m.budget > 0.8 ? "critical" : m.used / m.budget > 0.6 ? "warning" : "healthy"
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-[#5A7863]";
      case "warning": return "text-amber-500";
      case "critical": return "text-red-500";
      default: return "text-[#5A7863]";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-[#5A7863]";
      case "warning": return "bg-amber-500";
      case "critical": return "bg-red-500";
      default: return "bg-[#5A7863]";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-[#90AB8B]/20 bg-gradient-to-r from-[#5A7863] to-[#3B4953]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Shield className="w-5 h-5 text-[#EBF4DD]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#EBF4DD]">Privacy Budget Monitor</h3>
              <p className="text-xs text-[#90AB8B]">Real-time differential privacy tracking</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                  <span className="text-sm font-medium text-[#3B4953]">{metric.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5A7863] font-mono">
                    {metric.used.toFixed(2)} / {metric.budget}
                  </span>
                  <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {((metric.used / metric.budget) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-[#EBF4DD] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${getProgressColor(metric.status)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.used / metric.budget) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-[#90AB8B]">Last: {metric.lastQuery}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-[#90AB8B]/20">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-[#5A7863]" />
            <h3 className="font-semibold text-[#3B4953]">Compliance Audit Log</h3>
          </div>
        </div>

        <div className="divide-y divide-[#90AB8B]/10">
          {complianceLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 flex items-center justify-between hover:bg-[#EBF4DD]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {log.status === "approved" ? (
                  <CheckCircle2 className="w-4 h-4 text-[#5A7863]" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm text-[#3B4953]">{log.action}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  log.status === "approved" 
                    ? "bg-[#90AB8B]/20 text-[#5A7863]" 
                    : "bg-red-100 text-red-600"
                }`}>
                  {log.status.toUpperCase()}
                </span>
                <span className="text-xs text-[#90AB8B]">{log.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#5A7863] to-[#3B4953] rounded-xl p-4 text-[#EBF4DD]">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4" />
            <span className="text-sm font-medium">Encryption Status</span>
          </div>
          <p className="text-2xl font-bold font-mono">AES-256</p>
          <p className="text-xs opacity-70 mt-1">Homomorphic: Active</p>
        </div>

        <div className="bg-gradient-to-br from-[#90AB8B] to-[#5A7863] rounded-xl p-4 text-[#EBF4DD]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-medium">Data Leakage</span>
          </div>
          <p className="text-2xl font-bold font-mono">0 bytes</p>
          <p className="text-xs opacity-70 mt-1">Zero raw data egress</p>
        </div>
      </div>
    </div>
  );
}
