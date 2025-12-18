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
  CheckCircle2,
  Settings,
  RefreshCw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface PrivacyMetric {
  id: string;
  name: string;
  budget: number;
  used: number;
  status: "healthy" | "warning" | "critical";
  lastQuery: string;
  description: string;
}

export function PrivacyBudgetDashboard() {
  const [metrics, setMetrics] = useState<PrivacyMetric[]>([
    { id: "1", name: "Differential Privacy (ε)", budget: 1.0, used: 0.42, status: "healthy", lastQuery: "Fraud Detection Query", description: "Mathematical privacy guarantee measuring information leakage" },
    { id: "2", name: "Query Budget", budget: 100, used: 67, status: "warning", lastQuery: "Aggregate Sum", description: "Maximum number of queries allowed per time period" },
    { id: "3", name: "Data Access Tokens", budget: 50, used: 12, status: "healthy", lastQuery: "Cohort Analysis", description: "Tokens consumed for each data access operation" },
    { id: "4", name: "Encryption Cycles", budget: 1000, used: 234, status: "healthy", lastQuery: "HE Computation", description: "Homomorphic encryption computation cycles used" },
  ]);

  const [complianceLogs, setComplianceLogs] = useState([
    { id: 1, action: "GDPR Data Request", status: "approved", time: "2 min ago" },
    { id: 2, action: "PII Access Blocked", status: "blocked", time: "5 min ago" },
    { id: 3, action: "Consent Verified", status: "approved", time: "8 min ago" },
    { id: 4, action: "Audit Log Export", status: "approved", time: "15 min ago" },
  ]);

  const [selectedMetric, setSelectedMetric] = useState<PrivacyMetric | null>(null);
  const [selectedLog, setSelectedLog] = useState<typeof complianceLogs[0] | null>(null);
  const [encryptionDialog, setEncryptionDialog] = useState(false);
  const [leakageDialog, setLeakageDialog] = useState(false);

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

  const resetBudget = (id: string) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, used: 0, status: "healthy" } : m));
    setSelectedMetric(null);
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-[#90AB8B]/20 bg-gradient-to-r from-[#5A7863] to-[#3B4953]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-white/10">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#EBF4DD]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#EBF4DD] text-sm sm:text-base">Privacy Budget Monitor</h3>
                <p className="text-xs text-[#90AB8B] hidden sm:block">Real-time differential privacy tracking</p>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMetric(metric)}
                className="space-y-2 cursor-pointer hover:bg-[#EBF4DD]/30 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Lock className={`w-3 h-3 sm:w-4 sm:h-4 ${getStatusColor(metric.status)}`} />
                    <span className="text-xs sm:text-sm font-medium text-[#3B4953]">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs text-[#5A7863] font-mono">
                      {metric.used.toFixed(2)} / {metric.budget}
                    </span>
                    <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {((metric.used / metric.budget) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="relative h-1.5 sm:h-2 bg-[#EBF4DD] rounded-full overflow-hidden">
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
          <div className="p-3 sm:p-4 border-b border-[#90AB8B]/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#5A7863]" />
              <h3 className="font-semibold text-[#3B4953] text-sm sm:text-base">Compliance Audit Log</h3>
            </div>
          </div>

          <div className="divide-y divide-[#90AB8B]/10">
            {complianceLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedLog(log)}
                className="p-2 sm:p-3 flex items-center justify-between hover:bg-[#EBF4DD]/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {log.status === "approved" ? (
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#5A7863]" />
                  ) : (
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                  )}
                  <span className="text-xs sm:text-sm text-[#3B4953]">{log.action}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded ${
                    log.status === "approved" 
                      ? "bg-[#90AB8B]/20 text-[#5A7863]" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {log.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#90AB8B] hidden xs:inline">{log.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div 
            onClick={() => setEncryptionDialog(true)}
            className="bg-gradient-to-br from-[#5A7863] to-[#3B4953] rounded-xl p-3 sm:p-4 text-[#EBF4DD] cursor-pointer hover:shadow-lg transition-shadow active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <Key className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Encryption</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold font-mono">AES-256</p>
            <p className="text-xs opacity-70 mt-0.5 sm:mt-1">Homomorphic: Active</p>
          </div>

          <div 
            onClick={() => setLeakageDialog(true)}
            className="bg-gradient-to-br from-[#90AB8B] to-[#5A7863] rounded-xl p-3 sm:p-4 text-[#EBF4DD] cursor-pointer hover:shadow-lg transition-shadow active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Data Leakage</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold font-mono">0 bytes</p>
            <p className="text-xs opacity-70 mt-0.5 sm:mt-1">Zero raw data egress</p>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-md">
          {selectedMetric && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className={`w-5 h-5 ${getStatusColor(selectedMetric.status)}`} />
                  {selectedMetric.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedMetric.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#EBF4DD]/50 text-center">
                  <p className="text-3xl font-bold text-[#5A7863] font-mono">
                    {((selectedMetric.used / selectedMetric.budget) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-[#3B4953]">Budget Used</p>
                </div>

                <div className="space-y-2">
                  <Progress value={(selectedMetric.used / selectedMetric.budget) * 100} className="h-4" />
                  <div className="flex justify-between text-xs text-[#90AB8B]">
                    <span>Used: {selectedMetric.used.toFixed(2)}</span>
                    <span>Total: {selectedMetric.budget}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-[#5A7863] mb-1">Last Query</p>
                  <p className="text-sm font-medium text-[#3B4953]">{selectedMetric.lastQuery}</p>
                </div>

                <div className={`p-3 rounded-lg ${
                  selectedMetric.status === "healthy" ? "bg-[#EBF4DD]" :
                  selectedMetric.status === "warning" ? "bg-amber-50" :
                  "bg-red-50"
                }`}>
                  <p className={`text-sm font-medium ${getStatusColor(selectedMetric.status)}`}>
                    Status: {selectedMetric.status.toUpperCase()}
                  </p>
                  <p className="text-xs mt-1 opacity-70">
                    {selectedMetric.status === "healthy" && "Budget utilization is within safe limits"}
                    {selectedMetric.status === "warning" && "Consider optimizing queries to reduce budget consumption"}
                    {selectedMetric.status === "critical" && "Budget nearly exhausted - immediate action required"}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedMetric(null)}>Close</Button>
                <Button 
                  className="bg-[#5A7863] hover:bg-[#3B4953]"
                  onClick={() => resetBudget(selectedMetric.id)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Budget
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-md">
          {selectedLog && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedLog.status === "approved" ? (
                    <CheckCircle2 className="w-5 h-5 text-[#5A7863]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  Audit Log Details
                </DialogTitle>
                <DialogDescription>
                  Compliance action record
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Action</p>
                  <p className="font-medium text-[#3B4953]">{selectedLog.action}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Status</p>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    selectedLog.status === "approved" ? "bg-[#5A7863] text-white" : "bg-red-500 text-white"
                  }`}>{selectedLog.status.toUpperCase()}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Timestamp</p>
                  <p className="font-medium text-[#3B4953]">{selectedLog.time}</p>
                </div>
              </div>

              <DialogFooter>
                <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={() => setSelectedLog(null)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={encryptionDialog} onOpenChange={setEncryptionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-[#5A7863]" />
              Encryption Status
            </DialogTitle>
            <DialogDescription>
              Current encryption configuration and status
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#EBF4DD]/50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">Algorithm</span>
              <span className="font-mono font-medium text-[#5A7863]">AES-256-GCM</span>
            </div>
            <div className="p-3 rounded-lg bg-[#EBF4DD]/50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">Homomorphic Encryption</span>
              <span className="px-2 py-0.5 rounded bg-[#5A7863] text-white text-xs">ACTIVE</span>
            </div>
            <div className="p-3 rounded-lg bg-[#EBF4DD]/50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">Key Rotation</span>
              <span className="text-sm text-[#5A7863]">Every 24 hours</span>
            </div>
            <div className="p-3 rounded-lg bg-[#EBF4DD]/50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">TLS Version</span>
              <span className="font-mono text-[#5A7863]">1.3</span>
            </div>
          </div>

          <DialogFooter>
            <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={() => setEncryptionDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={leakageDialog} onOpenChange={setLeakageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-[#5A7863]" />
              Data Leakage Report
            </DialogTitle>
            <DialogDescription>
              Zero trust data egress monitoring
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="text-center p-6 rounded-lg bg-[#EBF4DD]/50">
              <p className="text-5xl font-bold text-[#5A7863] font-mono">0</p>
              <p className="text-sm text-[#3B4953] mt-2">Bytes of Raw Data Leaked</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">PII Records Exposed</span>
              <span className="font-mono text-[#5A7863]">0</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">Raw Data Transfers</span>
              <span className="font-mono text-[#5A7863]">0</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-[#3B4953]">Unencrypted Outputs</span>
              <span className="font-mono text-[#5A7863]">0</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#5A7863]/10">
              <CheckCircle2 className="w-4 h-4 text-[#5A7863]" />
              <span className="text-sm text-[#5A7863]">All data transfers are encrypted and privacy-protected</span>
            </div>
          </div>

          <DialogFooter>
            <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={() => setLeakageDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
