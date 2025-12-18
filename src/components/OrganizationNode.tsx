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
  AlertTriangle
} from "lucide-react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecords(prev => prev + Math.floor(Math.random() * 50));
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <div className="bg-white rounded-xl border border-[#90AB8B]/30 p-5 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute -top-2 -right-2">
          <motion.div
            animate={{ scale: isProcessing ? [1, 1.2, 1] : 1 }}
            className={`w-4 h-4 rounded-full ${statusColors[status]} flex items-center justify-center`}
          >
            <span className="text-white">{statusIcons[status]}</span>
          </motion.div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#EBF4DD]">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#3B4953] text-lg">{name}</h3>
            <p className="text-sm text-[#5A7863]">{industry}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5A7863] flex items-center gap-2">
              <Database className="w-4 h-4" />
              Local Records
            </span>
            <span className="font-mono text-[#3B4953] font-medium">
              {currentRecords.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5A7863] flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy Budget
            </span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-[#EBF4DD] rounded-full overflow-hidden">
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

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5A7863] flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Data Egress
            </span>
            <span className="text-[#5A7863] font-medium bg-[#EBF4DD] px-2 py-0.5 rounded text-xs">
              BLOCKED
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#90AB8B]/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#90AB8B]">Last sync: {lastSync}</span>
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
  );
}
