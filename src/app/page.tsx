"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Landmark, 
  ShoppingCart, 
  Heart,
  Shield,
  Lock,
  Cpu,
  Database,
  Zap,
  Info
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { OrganizationNode } from "@/components/OrganizationNode";
import { FraudAlertsFeed } from "@/components/FraudAlertsFeed";
import { PrivacyBudgetDashboard } from "@/components/PrivacyBudgetDashboard";
import { AnalyticsKPIs } from "@/components/AnalyticsKPIs";
import { FederatedArchitecture } from "@/components/FederatedArchitecture";
import { SyntheticDataStudio } from "@/components/SyntheticDataStudio";
import { ComplianceBadges } from "@/components/ComplianceBadges";
import { AdminPanel } from "@/components/AdminPanel";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [adminOpen, setAdminOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<{ title: string; desc: string; details: string } | null>(null);

  const organizations = [
    {
      name: "Alpha Bank",
      industry: "Financial Services",
      recordCount: 52847,
      status: "connected" as const,
      privacyBudget: 72,
      lastSync: "2 min ago",
      icon: <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />
    },
    {
      name: "MegaMart Retail",
      industry: "E-Commerce & Retail",
      recordCount: 38291,
      status: "connected" as const,
      privacyBudget: 85,
      lastSync: "5 min ago",
      icon: <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />
    },
    {
      name: "HealthGuard Insurance",
      industry: "Healthcare & Insurance",
      recordCount: 24156,
      status: "syncing" as const,
      privacyBudget: 58,
      lastSync: "1 min ago",
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A7863]" />
    }
  ];

  const privacyFeatures = [
    { 
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, 
      title: "Federated Learning", 
      desc: "Train models without data exchange",
      details: "Our federated learning approach allows multiple organizations to collaboratively train machine learning models without sharing raw data. Each organization trains on their local data, and only encrypted model updates are shared for aggregation."
    },
    { 
      icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />, 
      title: "Homomorphic Encryption", 
      desc: "Compute on encrypted data",
      details: "Using state-of-the-art homomorphic encryption (HE), we can perform computations directly on encrypted data. This means sensitive information never needs to be decrypted during analysis, maintaining privacy throughout the entire pipeline."
    },
    { 
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />, 
      title: "Secure MPC", 
      desc: "Multi-party computation",
      details: "Secure Multi-Party Computation (MPC) allows multiple parties to jointly compute functions over their inputs while keeping those inputs private. No single party ever sees the complete data."
    },
    { 
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, 
      title: "Differential Privacy", 
      desc: "Mathematical privacy guarantees",
      details: "Differential Privacy provides mathematical guarantees about privacy by adding carefully calibrated noise to query results. This ensures that the presence or absence of any individual's data cannot be determined from the output."
    },
  ];

  return (
    <div className="min-h-screen bg-[#EBF4DD] gradient-mesh">
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen key="welcome" onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onOpenAdmin={() => setAdminOpen(true)}
      />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3B4953]">Federated Analytics Dashboard</h2>
                  <p className="text-sm text-[#5A7863]">Real-time cross-company insights without data sharing</p>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#5A7863] text-[#EBF4DD] w-fit">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Live Mode</span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                {privacyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedFeature(feature)}
                    className="bg-white rounded-xl border border-[#90AB8B]/30 p-3 sm:p-4 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[#EBF4DD] text-[#5A7863] shrink-0">
                        {feature.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#3B4953] text-xs sm:text-sm truncate">{feature.title}</h3>
                        <p className="text-xs text-[#90AB8B] mt-0.5 sm:mt-1 line-clamp-2">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnalyticsKPIs />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FederatedArchitecture />
                <FraudAlertsFeed />
              </div>

              <ComplianceBadges />
            </motion.div>
          )}

          {activeTab === "organizations" && (
            <motion.div
              key="organizations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3B4953]">Connected Organizations</h2>
                <p className="text-sm text-[#5A7863]">Federated data nodes with on-premise isolation</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {organizations.map((org, index) => (
                  <OrganizationNode key={org.name} {...org} delay={index * 0.1} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FederatedArchitecture />
                <SyntheticDataStudio />
              </div>
            </motion.div>
          )}

          {activeTab === "alerts" && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3B4953]">Real-Time Alerts</h2>
                <p className="text-sm text-[#5A7863]">Privacy-safe fraud detection and anomaly monitoring</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FraudAlertsFeed />
                <div className="space-y-4 sm:space-y-6">
                  <PrivacyBudgetDashboard />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "privacy" && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3B4953]">Privacy & Compliance</h2>
                <p className="text-sm text-[#5A7863]">Differential privacy budgets and audit trails</p>
              </div>

              <ComplianceBadges />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <PrivacyBudgetDashboard />
                <div className="space-y-4 sm:space-y-6">
                  <SyntheticDataStudio />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg p-4 sm:p-6"
                  >
                    <h3 className="font-semibold text-[#3B4953] mb-3 sm:mb-4 text-sm sm:text-base">Privacy Guarantees</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { icon: Shield, title: "Zero Raw Data Egress", desc: "No PII or raw records ever leave organization boundaries" },
                        { icon: Lock, title: "Encrypted Computation", desc: "All cross-org computations use homomorphic encryption" },
                        { icon: Database, title: "Differential Privacy", desc: "Mathematical guarantees via calibrated noise injection" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 sm:gap-3 cursor-pointer hover:bg-[#EBF4DD]/50 p-2 rounded-lg transition-colors">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-[#EBF4DD] shrink-0">
                            <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#5A7863]" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-[#3B4953]">{item.title}</p>
                            <p className="text-xs text-[#90AB8B]">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3B4953]">Analytics Dashboard</h2>
                <p className="text-sm text-[#5A7863]">Collaborative KPIs and encrypted aggregate insights</p>
              </div>

              <AnalyticsKPIs />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                  <FederatedArchitecture />
                </div>
                <SyntheticDataStudio />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-[#3B4953] border-t border-[#5A7863]/30 mt-8 sm:mt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#5A7863]">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#EBF4DD]" />
              </div>
              <div>
                <p className="text-[#EBF4DD] font-semibold text-sm sm:text-base">Federated Insight Hub</p>
                <p className="text-xs text-[#90AB8B]">Privacy-Safe Cross-Company Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#90AB8B]">
              <span>GDPR</span>
              <span>HIPAA</span>
              <span>SOC 2</span>
            </div>
            <p className="text-xs text-[#90AB8B] text-center sm:text-left">
              Zero raw data exchange. Always encrypted.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#5A7863]/20 flex justify-center">
            <a 
              href="https://github.com/Mayank-iitj/InsightX-MS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs font-medium text-[#90AB8B]/40 hover:text-[#EBF4DD] transition-colors tracking-[0.2em] uppercase"
            >
              Developed by Mayank
            </a>
          </div>
        </div>
      </footer>

      <AdminPanel open={adminOpen} onOpenChange={setAdminOpen} />

      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-md">
          {selectedFeature && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#EBF4DD]">
                    <Info className="w-5 h-5 text-[#5A7863]" />
                  </div>
                  {selectedFeature.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedFeature.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 rounded-lg bg-[#EBF4DD]/50">
                <p className="text-sm text-[#3B4953] leading-relaxed">
                  {selectedFeature.details}
                </p>
              </div>
              <DialogFooter>
                <Button 
                  className="bg-[#5A7863] hover:bg-[#3B4953]"
                  onClick={() => setSelectedFeature(null)}
                >
                  Got it
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <motion.a
        href="https://github.com/Mayank-iitj/InsightX-MS"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-[9999] px-4 py-2 rounded-full bg-[#3B4953]/90 backdrop-blur-md border border-[#5A7863]/40 shadow-2xl flex items-center gap-2.5 group transition-all hover:bg-[#3B4953] hover:border-[#5A7863] active:scale-95"
      >
        <div className="w-2 h-2 rounded-full bg-[#EBF4DD] animate-pulse" />
        <span className="text-[10px] font-bold text-[#EBF4DD] tracking-[0.2em] uppercase">Developed by Mayank</span>
        <Shield className="w-3.5 h-3.5 text-[#EBF4DD] group-hover:rotate-12 transition-transform" />
      </motion.a>
    </div>
  );
}
