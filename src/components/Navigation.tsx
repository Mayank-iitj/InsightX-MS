"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  LayoutDashboard,
  Building2,
  AlertTriangle,
  Lock,
  BarChart3,
  Settings,
  Bell,
  User,
  ChevronDown,
  LogOut,
  FileText,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAdmin: () => void;
}

export function Navigation({ activeTab, onTabChange, onOpenAdmin }: NavigationProps) {
  const [notifications] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "organizations", label: "Organizations", icon: <Building2 className="w-4 h-4" /> },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle className="w-4 h-4" />, badge: notifications },
    { id: "privacy", label: "Privacy", icon: <Lock className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const notificationsList = [
    { id: 1, title: "High-risk fraud pattern detected", time: "2 min ago", severity: "high" },
    { id: 2, title: "Privacy budget at 67%", time: "15 min ago", severity: "medium" },
    { id: 3, title: "New organization sync complete", time: "1 hour ago", severity: "low" },
  ];

  const auditLogs = [
    { action: "Admin login", user: "john@alphabank.com", time: "2 min ago" },
    { action: "Query executed", user: "sarah@megamart.com", time: "5 min ago" },
    { action: "Privacy budget checked", user: "system", time: "10 min ago" },
    { action: "New user added", user: "john@alphabank.com", time: "1 hour ago" },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[#3B4953] border-b border-[#5A7863]/30 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-4 lg:gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                onClick={() => onTabChange("overview")}
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#5A7863] animate-shield-pulse">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#EBF4DD]" />
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-sm sm:text-lg font-bold text-[#EBF4DD] tracking-tight">Federated Insight Hub</h1>
                  <p className="text-xs text-[#90AB8B] hidden sm:block">Privacy-Safe Analytics</p>
                </div>
              </motion.div>

              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      activeTab === item.id
                        ? "bg-[#5A7863] text-[#EBF4DD]"
                        : "text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden xl:inline">{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0 h-5 min-w-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#5A7863]/30"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#90AB8B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#90AB8B]"></span>
                </span>
                <span className="text-xs text-[#90AB8B] font-mono">3 NODES</span>
              </motion.div>

              <button 
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 rounded-lg text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#5A7863] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#EBF4DD]" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-[#EBF4DD]">Admin</p>
                      <p className="text-xs text-[#90AB8B]">Operator</p>
                    </div>
                    <ChevronDown className="w-4 h-4 hidden md:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-[#90AB8B]/30">
                  <DropdownMenuLabel className="text-[#3B4953]">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#90AB8B]/20" />
                  <DropdownMenuItem 
                    className="text-[#3B4953] hover:bg-[#EBF4DD] cursor-pointer"
                    onClick={onOpenAdmin}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-[#3B4953] hover:bg-[#EBF4DD] cursor-pointer"
                    onClick={() => setAuditOpen(true)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Audit Logs
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-[#3B4953] hover:bg-[#EBF4DD] cursor-pointer"
                    onClick={() => setDocsOpen(true)}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Documentation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#90AB8B]/20" />
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#5A7863]/30"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "bg-[#5A7863] text-[#EBF4DD]"
                        : "text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                ))}
                <div className="pt-2 border-t border-[#5A7863]/30">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30"
                  >
                    <Settings className="w-4 h-4" />
                    Admin Panel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#5A7863]" />
              Notifications
            </DialogTitle>
            <DialogDescription>Recent system alerts and updates</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {notificationsList.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                  notif.severity === "high" ? "border-red-200 bg-red-50" :
                  notif.severity === "medium" ? "border-amber-200 bg-amber-50" :
                  "border-[#90AB8B]/30 bg-[#EBF4DD]/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-[#3B4953]">{notif.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    notif.severity === "high" ? "bg-red-100 text-red-600" :
                    notif.severity === "medium" ? "bg-amber-100 text-amber-600" :
                    "bg-[#90AB8B]/20 text-[#5A7863]"
                  }`}>{notif.severity}</span>
                </div>
                <p className="text-xs text-[#90AB8B] mt-1">{notif.time}</p>
              </motion.div>
            ))}
          </div>
          <Button className="w-full bg-[#5A7863] hover:bg-[#3B4953]" onClick={() => {
            setNotificationsOpen(false);
            onTabChange("alerts");
          }}>
            View All Alerts
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={auditOpen} onOpenChange={setAuditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5A7863]" />
              Audit Logs
            </DialogTitle>
            <DialogDescription>Recent system activity and access logs</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {auditLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#EBF4DD]/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-[#3B4953]">{log.action}</p>
                  <p className="text-xs text-[#90AB8B]">{log.user}</p>
                </div>
                <span className="text-xs text-[#90AB8B]">{log.time}</span>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#5A7863]" />
              Documentation
            </DialogTitle>
            <DialogDescription>Federated Insight Hub user guide</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-[#3B4953]">
            <section>
              <h3 className="font-semibold text-[#5A7863] mb-2">Privacy Stack</h3>
              <ul className="list-disc list-inside space-y-1 text-[#5A7863]">
                <li>Federated Learning - Train models without data exchange</li>
                <li>Homomorphic Encryption - Compute on encrypted data</li>
                <li>Secure Multi-Party Computation (SMPC)</li>
                <li>Differential Privacy - Mathematical guarantees</li>
                <li>Synthetic Data Output - Risk-free replicas</li>
              </ul>
            </section>
            <section>
              <h3 className="font-semibold text-[#5A7863] mb-2">Use Cases</h3>
              <ul className="list-disc list-inside space-y-1 text-[#5A7863]">
                <li>Cross-bank fraud pattern detection</li>
                <li>Retailer + bank spending cluster analysis</li>
                <li>Healthcare insurer + pharmacy risk scoring</li>
                <li>Telecom + insurer churn-fraud correlation</li>
              </ul>
            </section>
            <section>
              <h3 className="font-semibold text-[#5A7863] mb-2">Compliance</h3>
              <p className="text-[#5A7863]">
                The platform is compliant with GDPR (EU), HIPAA (US), DPDP (India), PCI-DSS, and SOC 2 Type II standards. All data processing follows data minimization principles with zero-knowledge proof gates.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
