"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Server, 
  Lock, 
  ArrowRight,
  Cpu,
  Database,
  Eye,
  CheckCircle2
} from "lucide-react";

export function FederatedArchitecture() {
  const dataFlowSteps = [
    { icon: <Database className="w-5 h-5" />, label: "Local Data", desc: "On-premise" },
    { icon: <Lock className="w-5 h-5" />, label: "Encrypt", desc: "HE/MPC" },
    { icon: <Cpu className="w-5 h-5" />, label: "Federated", desc: "Training" },
    { icon: <Shield className="w-5 h-5" />, label: "DP Noise", desc: "Added" },
    { icon: <Eye className="w-5 h-5" />, label: "Insights", desc: "Only" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-[#90AB8B]/20 bg-gradient-to-r from-[#3B4953] to-[#5A7863]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10">
            <Server className="w-5 h-5 text-[#EBF4DD]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#EBF4DD]">Federated Architecture Flow</h3>
            <p className="text-xs text-[#90AB8B]">Zero raw data egress guarantee</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          {dataFlowSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.15, type: "spring" }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-xl bg-[#EBF4DD] flex items-center justify-center text-[#5A7863] border-2 border-[#90AB8B]/30 shadow-md hover:shadow-lg transition-shadow">
                  {step.icon}
                </div>
                <p className="text-sm font-medium text-[#3B4953] mt-2">{step.label}</p>
                <p className="text-xs text-[#90AB8B]">{step.desc}</p>
              </motion.div>
              {index < dataFlowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                  className="mx-3"
                >
                  <ArrowRight className="w-5 h-5 text-[#90AB8B]" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#EBF4DD]/50 border border-[#90AB8B]/20">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#5A7863] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#3B4953]">Privacy Guarantee</p>
              <p className="text-xs text-[#5A7863] mt-1">
                Raw data never leaves organization boundaries. Only encrypted gradients, 
                differential-privacy protected aggregates, and synthetic outputs are shared.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 rounded-lg bg-[#5A7863]/5">
            <p className="text-2xl font-bold text-[#5A7863] font-mono">256-bit</p>
            <p className="text-xs text-[#90AB8B]">Encryption</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#5A7863]/5">
            <p className="text-2xl font-bold text-[#5A7863] font-mono">ε=0.1</p>
            <p className="text-xs text-[#90AB8B]">DP Budget</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#5A7863]/5">
            <p className="text-2xl font-bold text-[#5A7863] font-mono">0 PII</p>
            <p className="text-xs text-[#90AB8B]">Exposed</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
