"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Clock,
  Eye,
  ChevronRight
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Alert {
  id: string;
  type: "fraud" | "anomaly" | "threshold";
  severity: "high" | "medium" | "low";
  message: string;
  source: string;
  timestamp: Date;
  confidence: number;
  encrypted: boolean;
}

const alertTypes = [
  { type: "fraud", message: "Cross-bank transaction pattern detected", source: "Bank A + Bank B" },
  { type: "anomaly", message: "Unusual spending cluster identified", source: "Retailer X + Bank C" },
  { type: "threshold", message: "Risk score exceeded threshold", source: "Insurer Y" },
  { type: "fraud", message: "Synthetic identity indicators found", source: "All Nodes" },
  { type: "anomaly", message: "Churn-fraud correlation spike", source: "Telecom Z + Insurer Y" },
  { type: "fraud", message: "Multi-party velocity check triggered", source: "Bank A + Bank B + Bank C" },
  { type: "threshold", message: "Privacy budget approaching limit", source: "Healthcare Node" },
  { type: "anomaly", message: "Encrypted aggregate outlier detected", source: "Federated Model" },
];

export function FraudAlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const generateAlert = () => {
      const template = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const newAlert: Alert = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: template.type as Alert["type"],
        severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as Alert["severity"],
        message: template.message,
        source: template.source,
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 30) + 70,
        encrypted: true
      };
      
      setAlerts(prev => [newAlert, ...prev].slice(0, 20));
    };

    generateAlert();
    const interval = setInterval(generateAlert, 4000);
    return () => clearInterval(interval);
  }, []);

  const severityColors = {
    high: "bg-red-500/10 border-red-500/30 text-red-600",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-600",
    low: "bg-[#90AB8B]/10 border-[#90AB8B]/30 text-[#5A7863]"
  };

  const severityIcons = {
    high: <AlertTriangle className="w-4 h-4 text-red-500" />,
    medium: <TrendingUp className="w-4 h-4 text-amber-500" />,
    low: <Shield className="w-4 h-4 text-[#5A7863]" />
  };

  return (
    <div className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-[#90AB8B]/20 bg-[#3B4953]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#5A7863]">
              <AlertTriangle className="w-5 h-5 text-[#EBF4DD]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#EBF4DD]">Real-Time Alert Feed</h3>
              <p className="text-xs text-[#90AB8B]">Privacy-safe anomaly detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#90AB8B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#90AB8B]"></span>
            </span>
            <span className="text-xs text-[#90AB8B] font-mono">LIVE</span>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-3 space-y-2">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg border ${severityColors[alert.severity]} cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{severityIcons[alert.severity]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase tracking-wide opacity-70">
                        {alert.type}
                      </span>
                      {alert.encrypted && (
                        <span className="text-xs bg-[#3B4953]/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Encrypted
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium truncate">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs opacity-70">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {alert.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="font-mono">
                        {alert.confidence}% conf.
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}
