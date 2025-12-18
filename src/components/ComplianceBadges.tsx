"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, FileText, Globe, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ComplianceBadge {
  name: string;
  region: string;
  status: string;
  description: string;
  requirements: string[];
  lastAudit: string;
}

export function ComplianceBadges() {
  const [selectedBadge, setSelectedBadge] = useState<ComplianceBadge | null>(null);

  const badges: ComplianceBadge[] = [
    { 
      name: "GDPR", 
      region: "EU", 
      status: "compliant",
      description: "General Data Protection Regulation - European Union's comprehensive data protection law",
      requirements: [
        "Data minimization principles",
        "Right to erasure (Right to be forgotten)",
        "Data portability",
        "Privacy by design",
        "Consent management"
      ],
      lastAudit: "January 2024"
    },
    { 
      name: "HIPAA", 
      region: "US", 
      status: "compliant",
      description: "Health Insurance Portability and Accountability Act - US healthcare data protection",
      requirements: [
        "Protected Health Information (PHI) safeguards",
        "Access controls and audit trails",
        "Encryption in transit and at rest",
        "Business Associate Agreements",
        "Breach notification procedures"
      ],
      lastAudit: "December 2023"
    },
    { 
      name: "DPDP", 
      region: "India", 
      status: "compliant",
      description: "Digital Personal Data Protection Act - India's data protection framework",
      requirements: [
        "Purpose limitation",
        "Data principal rights",
        "Cross-border transfer controls",
        "Data fiduciary obligations",
        "Consent-based processing"
      ],
      lastAudit: "February 2024"
    },
    { 
      name: "PCI-DSS", 
      region: "Global", 
      status: "compliant",
      description: "Payment Card Industry Data Security Standard - Global payment data protection",
      requirements: [
        "Network security controls",
        "Cardholder data protection",
        "Vulnerability management",
        "Strong access control measures",
        "Regular security testing"
      ],
      lastAudit: "November 2023"
    },
    { 
      name: "SOC 2", 
      region: "Global", 
      status: "compliant",
      description: "Service Organization Control 2 - Trust service criteria for service organizations",
      requirements: [
        "Security controls",
        "Availability guarantees",
        "Processing integrity",
        "Confidentiality measures",
        "Privacy protections"
      ],
      lastAudit: "October 2023"
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg p-3 sm:p-4"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#5A7863]" />
          <h3 className="font-semibold text-[#3B4953] text-sm sm:text-base">Compliance Status</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedBadge(badge)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[#EBF4DD] border border-[#90AB8B]/30 cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#5A7863]" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#3B4953]">{badge.name}</p>
                <p className="text-xs text-[#90AB8B] hidden xs:block">{badge.region}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="max-w-md">
          {selectedBadge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#EBF4DD]">
                    <Shield className="w-5 h-5 text-[#5A7863]" />
                  </div>
                  {selectedBadge.name} Compliance
                </DialogTitle>
                <DialogDescription>
                  {selectedBadge.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#EBF4DD]/50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#5A7863]" />
                    <span className="text-sm text-[#3B4953]">Region</span>
                  </div>
                  <span className="font-medium text-[#5A7863]">{selectedBadge.region}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#EBF4DD]/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5A7863]" />
                    <span className="text-sm text-[#3B4953]">Status</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#5A7863] text-white text-xs font-medium uppercase">
                    {selectedBadge.status}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#EBF4DD]/50">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#5A7863]" />
                    <span className="text-sm text-[#3B4953]">Last Audit</span>
                  </div>
                  <span className="text-sm text-[#5A7863]">{selectedBadge.lastAudit}</span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#3B4953] mb-2">Key Requirements</h4>
                  <div className="space-y-2">
                    {selectedBadge.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                        <CheckCircle2 className="w-4 h-4 text-[#5A7863] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#3B4953]">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedBadge(null)}>Close</Button>
                <Button className="bg-[#5A7863] hover:bg-[#3B4953]">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Certificate
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
