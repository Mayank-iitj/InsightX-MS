"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Landmark, 
  ShoppingCart, 
  Heart,
  Radio,
  Shield,
  Lock,
  Cpu,
  Database,
  Zap
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { OrganizationNode } from "@/components/OrganizationNode";
import { FraudAlertsFeed } from "@/components/FraudAlertsFeed";
import { PrivacyBudgetDashboard } from "@/components/PrivacyBudgetDashboard";
import { AnalyticsKPIs } from "@/components/AnalyticsKPIs";
import { FederatedArchitecture } from "@/components/FederatedArchitecture";
import { SyntheticDataStudio } from "@/components/SyntheticDataStudio";
import { ComplianceBadges } from "@/components/ComplianceBadges";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  const organizations = [
    {
      name: "Alpha Bank",
      industry: "Financial Services",
      recordCount: 52847,
      status: "connected" as const,
      privacyBudget: 72,
      lastSync: "2 min ago",
      icon: <Landmark className="w-6 h-6 text-[#5A7863]" />
    },
    {
      name: "MegaMart Retail",
      industry: "E-Commerce & Retail",
      recordCount: 38291,
      status: "connected" as const,
      privacyBudget: 85,
      lastSync: "5 min ago",
      icon: <ShoppingCart className="w-6 h-6 text-[#5A7863]" />
    },
    {
      name: "HealthGuard Insurance",
      industry: "Healthcare & Insurance",
      recordCount: 24156,
      status: "syncing" as const,
      privacyBudget: 58,
      lastSync: "1 min ago",
      icon: <Heart className="w-6 h-6 text-[#5A7863]" />
    }
  ];

  const privacyFeatures = [
    { icon: <Shield className="w-5 h-5" />, title: "Federated Learning", desc: "Train models without data exchange" },
    { icon: <Lock className="w-5 h-5" />, title: "Homomorphic Encryption", desc: "Compute on encrypted data" },
    { icon: <Cpu className="w-5 h-5" />, title: "Secure MPC", desc: "Multi-party computation" },
    { icon: <Database className="w-5 h-5" />, title: "Differential Privacy", desc: "Mathematical privacy guarantees" },
  ];

  return (
    <div className="min-h-screen bg-[#EBF4DD] gradient-mesh">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#3B4953]">Federated Analytics Dashboard</h2>
                  <p className="text-[#5A7863]">Real-time cross-company insights without data sharing</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5A7863] text-[#EBF4DD]">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Live Mode</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {privacyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-[#90AB8B]/30 p-4 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#EBF4DD] text-[#5A7863]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#3B4953] text-sm">{feature.title}</h3>
                        <p className="text-xs text-[#90AB8B] mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnalyticsKPIs />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#3B4953]">Connected Organizations</h2>
                <p className="text-[#5A7863]">Federated data nodes with on-premise isolation</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {organizations.map((org, index) => (
                  <OrganizationNode key={org.name} {...org} delay={index * 0.1} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#3B4953]">Real-Time Alerts</h2>
                <p className="text-[#5A7863]">Privacy-safe fraud detection and anomaly monitoring</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FraudAlertsFeed />
                <div className="space-y-6">
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
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#3B4953]">Privacy & Compliance</h2>
                <p className="text-[#5A7863]">Differential privacy budgets and audit trails</p>
              </div>

              <ComplianceBadges />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PrivacyBudgetDashboard />
                <div className="space-y-6">
                  <SyntheticDataStudio />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg p-6"
                  >
                    <h3 className="font-semibold text-[#3B4953] mb-4">Privacy Guarantees</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#EBF4DD]">
                          <Shield className="w-4 h-4 text-[#5A7863]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#3B4953]">Zero Raw Data Egress</p>
                          <p className="text-xs text-[#90AB8B]">No PII or raw records ever leave organization boundaries</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#EBF4DD]">
                          <Lock className="w-4 h-4 text-[#5A7863]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#3B4953]">Encrypted Computation</p>
                          <p className="text-xs text-[#90AB8B]">All cross-org computations use homomorphic encryption</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#EBF4DD]">
                          <Database className="w-4 h-4 text-[#5A7863]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#3B4953]">Differential Privacy</p>
                          <p className="text-xs text-[#90AB8B]">Mathematical guarantees via calibrated noise injection</p>
                        </div>
                      </div>
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
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#3B4953]">Analytics Dashboard</h2>
                <p className="text-[#5A7863]">Collaborative KPIs and encrypted aggregate insights</p>
              </div>

              <AnalyticsKPIs />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FederatedArchitecture />
                </div>
                <SyntheticDataStudio />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-[#3B4953] border-t border-[#5A7863]/30 mt-12">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#5A7863]">
                <Shield className="w-5 h-5 text-[#EBF4DD]" />
              </div>
              <div>
                <p className="text-[#EBF4DD] font-semibold">Federated Insight Hub</p>
                <p className="text-xs text-[#90AB8B]">Privacy-Safe Cross-Company Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#90AB8B]">
              <span>GDPR Compliant</span>
              <span>HIPAA Ready</span>
              <span>SOC 2 Type II</span>
            </div>
            <p className="text-xs text-[#90AB8B]">
              Zero raw data exchange. Always encrypted. Always private.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
