"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Server, 
  Lock, 
  ArrowRight,
  Cpu,
  Database,
  Eye,
  CheckCircle2,
  Info
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

export function FederatedArchitecture() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const dataFlowSteps = [
    { 
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, 
      label: "Local Data", 
      desc: "On-premise",
      details: {
        title: "Local Data Storage",
        description: "Data remains on-premise within organization boundaries. No raw data ever leaves the local environment.",
        features: [
          "PostgreSQL/DuckDB local shards",
          "Organization-controlled access",
          "Full data sovereignty",
          "GDPR/DPDP compliant storage"
        ]
      }
    },
    { 
      icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />, 
      label: "Encrypt", 
      desc: "HE/MPC",
      details: {
        title: "Encryption Layer",
        description: "All data is encrypted using homomorphic encryption before any computation occurs.",
        features: [
          "Pyfhel/TenSEAL libraries",
          "256-bit AES encryption",
          "Zero-knowledge proofs",
          "Secure key management"
        ]
      }
    },
    { 
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />, 
      label: "Federated", 
      desc: "Training",
      details: {
        title: "Federated Learning",
        description: "Models are trained locally and only encrypted gradients are shared for aggregation.",
        features: [
          "PyTorch/TensorFlow Federated",
          "Local model training",
          "Gradient aggregation only",
          "No raw data exchange"
        ]
      }
    },
    { 
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, 
      label: "DP Noise", 
      desc: "Added",
      details: {
        title: "Differential Privacy",
        description: "Calibrated noise is added to outputs to provide mathematical privacy guarantees.",
        features: [
          "OpenDP/Diffprivlib integration",
          "Configurable epsilon (ε)",
          "Query-level budgeting",
          "Statistical privacy guarantees"
        ]
      }
    },
    { 
      icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />, 
      label: "Insights", 
      desc: "Only",
      details: {
        title: "Privacy-Safe Outputs",
        description: "Only aggregated, noise-protected insights are delivered. No individual records exposed.",
        features: [
          "Aggregate statistics only",
          "Synthetic data exports",
          "No PII in outputs",
          "Audit-ready results"
        ]
      }
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden"
      >
        <div className="p-3 sm:p-4 border-b border-[#90AB8B]/20 bg-gradient-to-r from-[#3B4953] to-[#5A7863]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10">
              <Server className="w-4 h-4 sm:w-5 sm:h-5 text-[#EBF4DD]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#EBF4DD] text-sm sm:text-base">Federated Architecture</h3>
              <p className="text-xs text-[#90AB8B] hidden sm:block">Zero raw data egress guarantee</p>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6">
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {dataFlowSteps.map((step, index) => (
              <div key={index} className="flex items-center shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  onClick={() => setSelectedStep(index)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#EBF4DD] flex items-center justify-center text-[#5A7863] border-2 border-[#90AB8B]/30 shadow-md hover:shadow-lg transition-all group-hover:bg-[#5A7863] group-hover:text-white group-active:scale-95">
                    {step.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#3B4953] mt-1 sm:mt-2 text-center">{step.label}</p>
                  <p className="text-xs text-[#90AB8B] hidden sm:block">{step.desc}</p>
                </motion.div>
                {index < dataFlowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: index * 0.15 + 0.1 }}
                    className="mx-1 sm:mx-3"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 text-[#90AB8B]" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div 
            onClick={() => setSelectedStep(0)}
            className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-[#EBF4DD]/50 border border-[#90AB8B]/20 cursor-pointer hover:bg-[#EBF4DD]/70 transition-colors"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#5A7863] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#3B4953]">Privacy Guarantee</p>
                <p className="text-xs text-[#5A7863] mt-1">
                  Raw data never leaves organization boundaries. Only encrypted gradients, DP-protected aggregates, and synthetic outputs are shared.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
            <div 
              onClick={() => setSelectedStep(1)}
              className="text-center p-2 sm:p-3 rounded-lg bg-[#5A7863]/5 cursor-pointer hover:bg-[#5A7863]/10 transition-colors"
            >
              <p className="text-lg sm:text-2xl font-bold text-[#5A7863] font-mono">256-bit</p>
              <p className="text-xs text-[#90AB8B]">Encryption</p>
            </div>
            <div 
              onClick={() => setSelectedStep(3)}
              className="text-center p-2 sm:p-3 rounded-lg bg-[#5A7863]/5 cursor-pointer hover:bg-[#5A7863]/10 transition-colors"
            >
              <p className="text-lg sm:text-2xl font-bold text-[#5A7863] font-mono">ε=0.1</p>
              <p className="text-xs text-[#90AB8B]">DP Budget</p>
            </div>
            <div 
              onClick={() => setSelectedStep(4)}
              className="text-center p-2 sm:p-3 rounded-lg bg-[#5A7863]/5 cursor-pointer hover:bg-[#5A7863]/10 transition-colors"
            >
              <p className="text-lg sm:text-2xl font-bold text-[#5A7863] font-mono">0 PII</p>
              <p className="text-xs text-[#90AB8B]">Exposed</p>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={selectedStep !== null} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-md">
          {selectedStep !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#EBF4DD]">
                    {dataFlowSteps[selectedStep].icon}
                  </div>
                  {dataFlowSteps[selectedStep].details.title}
                </DialogTitle>
                <DialogDescription>
                  {dataFlowSteps[selectedStep].details.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#3B4953]">Key Features</h4>
                <div className="space-y-2">
                  {dataFlowSteps[selectedStep].details.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#EBF4DD]/50">
                      <CheckCircle2 className="w-4 h-4 text-[#5A7863] shrink-0" />
                      <span className="text-sm text-[#3B4953]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#3B4953]/5">
                <Info className="w-4 h-4 text-[#5A7863]" />
                <span className="text-xs text-[#5A7863]">
                  Step {selectedStep + 1} of {dataFlowSteps.length} in the federated pipeline
                </span>
              </div>

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}
                  disabled={selectedStep === 0}
                >
                  Previous
                </Button>
                <Button 
                  className="bg-[#5A7863] hover:bg-[#3B4953]"
                  onClick={() => selectedStep < dataFlowSteps.length - 1 ? setSelectedStep(selectedStep + 1) : setSelectedStep(null)}
                >
                  {selectedStep < dataFlowSteps.length - 1 ? "Next" : "Close"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
