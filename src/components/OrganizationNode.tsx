"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Shield, 
  Lock, 
  Activity,
  Server,
  CheckCircle2,
  AlertTriangle,
  Settings,
  RefreshCw,
  Eye,
  BarChart3,
  Cpu
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface OrganizationNodeProps {
  name: string;
  industry: string;
  recordCount: number;
  status: "connected" | "syncing" | "error";
  privacyBudget: number;
  lastSync: string;
  icon: React.ReactNode;
  delay?: number;
}

export function OrganizationNode({
  name,
  industry,
  recordCount,
  status,
  privacyBudget,
  lastSync,
  icon,
  delay = 0
}: OrganizationNodeProps) {
  const [currentRecords, setCurrentRecords] = useState(recordCount);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [settings, setSettings] = useState({
    autoSync: true,
    encryption: true,
    dpEnabled: true,
    mpc: true
  });
  const [nodeStats, setNodeStats] = useState({
    queriesProcessed: 1247,
    dataVolume: "2.3 GB",
    avgLatency: "45ms",
    uptime: "99.9%"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecords(prev => prev + Math.floor(Math.random() * 50));
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (detailsOpen) {
      const interval = setInterval(() => {
        setNodeStats(prev => ({
          ...prev,
          queriesProcessed: prev.queriesProcessed + Math.floor(Math.random() * 5),
          avgLatency: `${Math.floor(Math.random() * 30) + 30}ms`
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [detailsOpen]);

  const statusColors = {
    connected: "bg-[#90AB8B]",
    syncing: "bg-amber-400",
    error: "bg-red-500"
  };

  const statusIcons = {
    connected: <CheckCircle2 className="w-3 h-3" />,
    syncing: <Activity className="w-3 h-3 animate-pulse" />,
    error: <AlertTriangle className="w-3 h-3" />
  };

  const handleSync = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="relative"
      >
        <div 
          onClick={() => setDetailsOpen(true)}
          className="bg-white rounded-xl border border-[#90AB8B]/30 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-[0.98]"
        >
          <div className="absolute -top-2 -right-2">
            <motion.div
              animate={{ scale: isProcessing ? [1, 1.2, 1] : 1 }}
              className={`w-4 h-4 rounded-full ${statusColors[status]} flex items-center justify-center`}
            >
              <span className="text-white">{statusIcons[status]}</span>
            </motion.div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-[#EBF4DD] shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#3B4953] text-base sm:text-lg truncate">{name}</h3>
              <p className="text-xs sm:text-sm text-[#5A7863] truncate">{industry}</p>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#5A7863] flex items-center gap-1 sm:gap-2">
                <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Local</span> Records
              </span>
              <span className="font-mono text-[#3B4953] font-medium">
                {currentRecords.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#5A7863] flex items-center gap-1 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                Privacy
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-[#EBF4DD] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#5A7863] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${privacyBudget}%` }}
                    transition={{ delay: delay + 0.3, duration: 0.8 }}
                  />
                </div>
                <span className="font-mono text-[#3B4953] text-xs">{privacyBudget}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#5A7863] flex items-center gap-1 sm:gap-2">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                Egress
              </span>
              <span className="text-[#5A7863] font-medium bg-[#EBF4DD] px-1.5 sm:px-2 py-0.5 rounded text-xs">
                BLOCKED
              </span>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#90AB8B]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#90AB8B]">Sync: {lastSync}</span>
              <div className="flex items-center gap-1">
                <Server className="w-3 h-3 text-[#5A7863]" />
                <span className="text-xs text-[#5A7863]">On-premise</span>
              </div>
            </div>
          </div>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#90AB8B]/5 rounded-xl flex items-center justify-center"
            >
              <div className="flex items-center gap-2 text-[#5A7863] text-sm">
                <Activity className="w-4 h-4 animate-spin" />
                Processing...
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#EBF4DD]">{icon}</div>
              <div>
                <span className="text-[#3B4953]">{name}</span>
                <p className="text-sm font-normal text-[#5A7863]">{industry}</p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Node configuration and real-time statistics
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#EBF4DD]/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#5A7863] font-mono">{currentRecords.toLocaleString()}</p>
                <p className="text-xs text-[#3B4953]">Total Records</p>
              </div>
              <div className="p-3 rounded-lg bg-[#EBF4DD]/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#5A7863] font-mono">{nodeStats.queriesProcessed}</p>
                <p className="text-xs text-[#3B4953]">Queries Processed</p>
              </div>
              <div className="p-3 rounded-lg bg-[#EBF4DD]/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#5A7863] font-mono">{nodeStats.dataVolume}</p>
                <p className="text-xs text-[#3B4953]">Data Volume</p>
              </div>
              <div className="p-3 rounded-lg bg-[#EBF4DD]/50 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#5A7863] font-mono">{nodeStats.avgLatency}</p>
                <p className="text-xs text-[#3B4953]">Avg Latency</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[#3B4953]">Privacy Budget</h4>
              <Progress value={privacyBudget} className="h-3" />
              <p className="text-xs text-[#90AB8B]">{privacyBudget}% remaining of allocated ε budget</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[#3B4953] flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Node Settings
              </h4>
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span className="text-sm text-[#3B4953] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <Switch 
                    checked={value} 
                    onCheckedChange={(v) => setSettings({...settings, [key]: v})}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#5A7863] to-[#3B4953] text-white text-center">
                <Cpu className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs">MPC Active</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#90AB8B] to-[#5A7863] text-white text-center">
                <Lock className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs">HE Enabled</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#3B4953] to-[#5A7863] text-white text-center">
                <Eye className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs">DP On</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleSync} className="w-full sm:w-auto">
              <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
            <Button className="bg-[#5A7863] hover:bg-[#3B4953] w-full sm:w-auto" onClick={() => setDetailsOpen(false)}>
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
