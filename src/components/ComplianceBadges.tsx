"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";

export function ComplianceBadges() {
  const badges = [
    { name: "GDPR", region: "EU", status: "compliant" },
    { name: "HIPAA", region: "US", status: "compliant" },
    { name: "DPDP", region: "India", status: "compliant" },
    { name: "PCI-DSS", region: "Global", status: "compliant" },
    { name: "SOC 2", region: "Global", status: "compliant" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-[#5A7863]" />
        <h3 className="font-semibold text-[#3B4953]">Compliance Status</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EBF4DD] border border-[#90AB8B]/30"
          >
            <CheckCircle2 className="w-4 h-4 text-[#5A7863]" />
            <div>
              <p className="text-sm font-bold text-[#3B4953]">{badge.name}</p>
              <p className="text-xs text-[#90AB8B]">{badge.region}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
