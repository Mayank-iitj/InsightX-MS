"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Clock,
  Eye,
  ChevronRight,
  X,
  CheckCircle2,
  Archive,
  Filter
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Alert {
  id: string;
  type: "fraud" | "anomaly" | "threshold";
  severity: "high" | "medium" | "low";
  message: string;
  source: string;
  timestamp: Date;
  confidence: number;
  encrypted: boolean;
  details?: {
    affectedRecords: number;
    riskScore: number;
    suggestedAction: string;
    relatedPatterns: string[];
  };
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
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<string>>(new Set());

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
        encrypted: true,
        details: {
          affectedRecords: Math.floor(Math.random() * 1000) + 100,
          riskScore: Math.floor(Math.random() * 40) + 60,
          suggestedAction: ["Investigate immediately", "Monitor for 24 hours", "Review with team", "Escalate to security"][Math.floor(Math.random() * 4)],
          relatedPatterns: ["Pattern A-127", "Pattern B-89", "Pattern C-234"].slice(0, Math.floor(Math.random() * 3) + 1)
        }
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

  const filteredAlerts = filter === "all" ? alerts : alerts.filter(a => a.severity === filter);

  const acknowledgeAlert = (id: string) => {
    setAcknowledgedAlerts(prev => new Set([...prev, id]));
    setSelectedAlert(null);
  };

  const dismissAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-[#90AB8B]/20 bg-[#3B4953]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#5A7863]">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#EBF4DD]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#EBF4DD] text-sm sm:text-base">Real-Time Alerts</h3>
                <p className="text-xs text-[#90AB8B] hidden sm:block">Privacy-safe anomaly detection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-24 sm:w-28 h-8 bg-[#5A7863]/30 border-none text-[#EBF4DD] text-xs">
                  <Filter className="w-3 h-3 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#90AB8B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-[#90AB8B]"></span>
                </span>
                <span className="text-xs text-[#90AB8B] font-mono">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[300px] sm:h-[400px]">
          <div className="p-2 sm:p-3 space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-2 sm:p-3 rounded-lg border ${severityColors[alert.severity]} cursor-pointer hover:shadow-md transition-all relative group ${acknowledgedAlerts.has(alert.id) ? 'opacity-60' : ''}`}
                >
                  <button 
                    onClick={(e) => dismissAlert(alert.id, e)}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="flex items-start gap-2 sm:gap-3 pr-6">
                    <div className="mt-0.5 shrink-0">{severityIcons[alert.severity]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-medium uppercase tracking-wide opacity-70">
                          {alert.type}
                        </span>
                        {alert.encrypted && (
                          <span className="text-xs bg-[#3B4953]/10 px-1 sm:px-1.5 py-0.5 rounded flex items-center gap-0.5 sm:gap-1">
                            <Shield className="w-2 h-2 sm:w-3 sm:h-3" />
                            <span className="hidden xs:inline">Encrypted</span>
                          </span>
                        )}
                        {acknowledgedAlerts.has(alert.id) && (
                          <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="hidden xs:inline">ACK</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium truncate">{alert.message}</p>
                      <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-2 text-xs opacity-70 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span className="hidden xs:inline">{alert.source}</span>
                          <span className="xs:hidden">{alert.source.split('+')[0]}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                        <span className="font-mono">
                          {alert.confidence}%
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50 shrink-0 hidden sm:block" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert && severityIcons[selectedAlert.severity]}
              Alert Details
            </DialogTitle>
            <DialogDescription>
              {selectedAlert?.message}
            </DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Severity</p>
                  <p className={`font-semibold capitalize ${
                    selectedAlert.severity === "high" ? "text-red-600" :
                    selectedAlert.severity === "medium" ? "text-amber-600" :
                    "text-[#5A7863]"
                  }`}>{selectedAlert.severity}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Confidence</p>
                  <p className="font-semibold text-[#3B4953] font-mono">{selectedAlert.confidence}%</p>
                </div>
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Risk Score</p>
                  <p className="font-semibold text-[#3B4953] font-mono">{selectedAlert.details?.riskScore}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                  <p className="text-xs text-[#5A7863]">Affected Records</p>
                  <p className="font-semibold text-[#3B4953] font-mono">{selectedAlert.details?.affectedRecords}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                <p className="text-xs text-[#5A7863] mb-1">Source</p>
                <p className="text-sm text-[#3B4953]">{selectedAlert.source}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                <p className="text-xs text-[#5A7863] mb-1">Suggested Action</p>
                <p className="text-sm text-[#3B4953] font-medium">{selectedAlert.details?.suggestedAction}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                <p className="text-xs text-[#5A7863] mb-2">Related Patterns</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.details?.relatedPatterns.map((pattern, i) => (
                    <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-[#90AB8B]/30">{pattern}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#90AB8B]">
                <Shield className="w-4 h-4" />
                All data processed with differential privacy (ε=0.1)
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setSelectedAlert(null)} className="w-full sm:w-auto">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button 
              className="bg-[#5A7863] hover:bg-[#3B4953] w-full sm:w-auto"
              onClick={() => selectedAlert && acknowledgeAlert(selectedAlert.id)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Acknowledge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
