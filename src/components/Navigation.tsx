"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  HelpCircle
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

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [notifications] = useState(3);

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "organizations", label: "Organizations", icon: <Building2 className="w-4 h-4" /> },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle className="w-4 h-4" />, badge: notifications },
    { id: "privacy", label: "Privacy", icon: <Lock className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-[#3B4953] border-b border-[#5A7863]/30 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-[#5A7863] animate-shield-pulse">
                <Shield className="w-6 h-6 text-[#EBF4DD]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#EBF4DD] tracking-tight">Federated Insight Hub</h1>
                <p className="text-xs text-[#90AB8B]">Privacy-Safe Analytics</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    activeTab === item.id
                      ? "bg-[#5A7863] text-[#EBF4DD]"
                      : "text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#5A7863] rounded-lg -z-10"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5A7863]/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#90AB8B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#90AB8B]"></span>
              </span>
              <span className="text-xs text-[#90AB8B] font-mono">3 NODES ACTIVE</span>
            </motion.div>

            <button className="relative p-2 rounded-lg text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#90AB8B] hover:text-[#EBF4DD] hover:bg-[#5A7863]/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#5A7863] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#EBF4DD]" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-[#EBF4DD]">Admin</p>
                    <p className="text-xs text-[#90AB8B]">System Operator</p>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-[#90AB8B]/30">
                <DropdownMenuLabel className="text-[#3B4953]">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#90AB8B]/20" />
                <DropdownMenuItem className="text-[#3B4953] hover:bg-[#EBF4DD] cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#3B4953] hover:bg-[#EBF4DD] cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  Audit Logs
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#3B4953] hover:bg-[#EBF4DD] cursor-pointer">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
