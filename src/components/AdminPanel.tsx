"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Users,
  Shield,
  Database,
  Activity,
  Bell,
  Lock,
  Unlock,
  RefreshCw,
  Plus,
  Trash2,
  Server,
  Key,
  Wifi,
  BarChart3,
  Clock,
  Zap,
  FileText,
  Download,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  organization: string;
  status: "active" | "inactive";
  lastActive: string;
  permissions: string[];
}

interface SystemSetting {
  id: string;
  name: string;
  value: boolean | string | number;
  type: "boolean" | "string" | "number";
  category: string;
  description: string;
}

interface LogEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  level: "info" | "warning" | "error" | "success";
  details: string;
}

interface Node {
  id: string;
  name: string;
  status: "online" | "offline" | "syncing";
  cpu: number;
  memory: number;
  queries: number;
  lastPing: string;
}

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Admin", email: "john@alphabank.com", role: "admin", organization: "Alpha Bank", status: "active", lastActive: "2 min ago", permissions: ["read", "write", "delete", "admin"] },
    { id: "2", name: "Sarah Analyst", email: "sarah@megamart.com", role: "analyst", organization: "MegaMart Retail", status: "active", lastActive: "5 min ago", permissions: ["read", "write"] },
    { id: "3", name: "Mike Viewer", email: "mike@healthguard.com", role: "viewer", organization: "HealthGuard Insurance", status: "inactive", lastActive: "1 hour ago", permissions: ["read"] },
  ]);

  const [settings, setSettings] = useState<SystemSetting[]>([
    { id: "1", name: "Real-time Alerts", value: true, type: "boolean", category: "alerts", description: "Enable real-time fraud and anomaly notifications" },
    { id: "2", name: "Auto-sync Nodes", value: true, type: "boolean", category: "sync", description: "Automatically sync data between federated nodes" },
    { id: "3", name: "Differential Privacy", value: true, type: "boolean", category: "privacy", description: "Enable DP noise injection for all queries" },
    { id: "4", name: "Privacy Budget (ε)", value: 1.0, type: "number", category: "privacy", description: "Maximum privacy budget per session" },
    { id: "5", name: "Query Limit/Hour", value: 100, type: "number", category: "limits", description: "Maximum queries per organization per hour" },
    { id: "6", name: "Encryption Level", value: "AES-256", type: "string", category: "security", description: "Data encryption standard" },
    { id: "7", name: "Audit Logging", value: true, type: "boolean", category: "compliance", description: "Log all system access and operations" },
    { id: "8", name: "MPC Protocol", value: true, type: "boolean", category: "security", description: "Enable secure multi-party computation" },
    { id: "9", name: "Session Timeout (min)", value: 30, type: "number", category: "security", description: "Auto logout after inactivity" },
    { id: "10", name: "Max Data Tokens", value: 50, type: "number", category: "limits", description: "Maximum data access tokens per user" },
  ]);

  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", name: "Alpha Bank Node", status: "online", cpu: 45, memory: 62, queries: 127, lastPing: "1s" },
    { id: "2", name: "MegaMart Node", status: "online", cpu: 38, memory: 55, queries: 89, lastPing: "2s" },
    { id: "3", name: "HealthGuard Node", status: "syncing", cpu: 72, memory: 78, queries: 45, lastPing: "5s" },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", timestamp: new Date(), action: "User Login", user: "john@alphabank.com", level: "info", details: "Admin login successful" },
    { id: "2", timestamp: new Date(Date.now() - 60000), action: "Query Executed", user: "sarah@megamart.com", level: "success", details: "Fraud detection query completed" },
    { id: "3", timestamp: new Date(Date.now() - 120000), action: "Privacy Budget", user: "system", level: "warning", details: "Node 3 approaching budget limit" },
  ]);

  const [systemStatus, setSystemStatus] = useState({
    nodes: 3,
    activeConnections: 127,
    queryQueue: 12,
    encryptionCycles: 1847,
    uptime: "99.97%",
    totalQueries: 45892,
    dataProcessed: "2.4 TB",
    alertsToday: 23,
    privacyBudgetUsed: 42,
    avgLatency: 45
  });

  const [newUserDialog, setNewUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "viewer" as const, organization: "" });
  const [isLive, setIsLive] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "$ federated-hub --init",
    "[INFO] Initializing Federated Insight Hub...",
    "[OK] Connected to 3 organization nodes",
    "[OK] Encryption layer active (AES-256)",
    "[OK] Differential Privacy enabled (ε=0.1)",
    "[OK] MPC protocol running",
    "$ _"
  ]);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        activeConnections: Math.max(100, prev.activeConnections + Math.floor(Math.random() * 10) - 5),
        queryQueue: Math.max(0, prev.queryQueue + Math.floor(Math.random() * 6) - 3),
        encryptionCycles: prev.encryptionCycles + Math.floor(Math.random() * 50),
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 10),
        avgLatency: Math.max(20, Math.min(100, prev.avgLatency + Math.floor(Math.random() * 20) - 10))
      }));

      setNodes(prev => prev.map(node => ({
        ...node,
        cpu: Math.max(10, Math.min(95, node.cpu + Math.floor(Math.random() * 20) - 10)),
        memory: Math.max(30, Math.min(90, node.memory + Math.floor(Math.random() * 10) - 5)),
        queries: node.queries + Math.floor(Math.random() * 5),
        lastPing: `${Math.floor(Math.random() * 5) + 1}s`
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    if (!isLive) return;

    const logInterval = setInterval(() => {
      const actions = [
        { action: "Query Executed", level: "success" as const, details: "Federated aggregate completed" },
        { action: "Node Sync", level: "info" as const, details: "Gradient sync successful" },
        { action: "Privacy Check", level: "info" as const, details: "Budget verification passed" },
        { action: "Encryption", level: "success" as const, details: "HE computation completed" },
        { action: "Alert Triggered", level: "warning" as const, details: "Anomaly score exceeded threshold" },
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const userEmails = ["john@alphabank.com", "sarah@megamart.com", "system", "mike@healthguard.com"];
      
      setLogs(prev => [{
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        action: randomAction.action,
        user: userEmails[Math.floor(Math.random() * userEmails.length)],
        level: randomAction.level,
        details: randomAction.details
      }, ...prev.slice(0, 49)]);
    }, 5000);
    return () => clearInterval(logInterval);
  }, [isLive]);

  const addTerminalLog = (message: string) => {
    setTerminalOutput(prev => [...prev.slice(0, -1), `[${new Date().toLocaleTimeString()}] ${message}`, "$ _"]);
  };

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => 
      s.id === id && s.type === "boolean" ? { ...s, value: !s.value } : s
    ));
    addTerminalLog(`Setting "${settings.find(s => s.id === id)?.name}" toggled`);
  };

  const updateSettingValue = (id: string, value: string | number) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, value } : s
    ));
    addTerminalLog(`Setting "${settings.find(s => s.id === id)?.name}" updated to ${value}`);
  };

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        organization: newUser.organization || "Unassigned",
        status: "active",
        lastActive: "Just now",
        permissions: newUser.role === "admin" ? ["read", "write", "delete", "admin"] : 
                     newUser.role === "analyst" ? ["read", "write"] : ["read"]
      };
      setUsers(prev => [...prev, user]);
      setNewUser({ name: "", email: "", role: "viewer", organization: "" });
      setNewUserDialog(false);
      addTerminalLog(`User "${user.name}" added successfully`);
    }
  };

  const deleteUser = (id: string) => {
    const user = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    addTerminalLog(`User "${user?.name}" removed`);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ));
    const user = users.find(u => u.id === id);
    addTerminalLog(`User "${user?.name}" ${user?.status === "active" ? "deactivated" : "activated"}`);
  };

  const restartNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: "syncing" as const } : n));
    addTerminalLog(`Restarting ${node?.name}...`);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: "online" as const, cpu: 20, memory: 40 } : n));
      addTerminalLog(`${node?.name} restart complete`);
    }, 3000);
  };

  const exportLogs = () => {
    const logData = logs.map(l => `[${l.timestamp.toISOString()}] ${l.level.toUpperCase()}: ${l.action} - ${l.user} - ${l.details}`).join('\n');
    const blob = new Blob([logData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addTerminalLog("Audit logs exported");
  };

  const resetPrivacyBudget = () => {
    setSystemStatus(prev => ({ ...prev, privacyBudgetUsed: 0 }));
    addTerminalLog("Privacy budget reset to 0");
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "success": return "text-[#5A7863] bg-[#EBF4DD]";
      case "warning": return "text-amber-600 bg-amber-50";
      case "error": return "text-red-600 bg-red-50";
      default: return "text-[#3B4953] bg-gray-100";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#EBF4DD]">
                <Settings className="w-5 h-5 text-[#5A7863]" />
              </div>
              <span>Admin Control Panel</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className={`gap-2 ${isLive ? 'text-[#5A7863] border-[#5A7863]' : 'text-gray-400'}`}
              >
                {isLive ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                <span className="hidden sm:inline">{isLive ? "Live" : "Paused"}</span>
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Manage users, system settings, and monitor real-time operations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="dashboard" className="w-full">
          <div className="px-4 sm:px-6">
            <TabsList className="w-full grid grid-cols-5 h-10">
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm gap-1">
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="nodes" className="text-xs sm:text-sm gap-1">
                <Server className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Nodes</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs sm:text-sm gap-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm gap-1">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="text-xs sm:text-sm gap-1">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logs</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[60vh] px-4 sm:px-6 py-4">
            <TabsContent value="dashboard" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                {[
                  { label: "Active Nodes", value: systemStatus.nodes, icon: Server, color: "text-[#5A7863]" },
                  { label: "Connections", value: systemStatus.activeConnections, icon: Wifi, color: "text-[#5A7863]" },
                  { label: "Query Queue", value: systemStatus.queryQueue, icon: Activity, color: systemStatus.queryQueue > 20 ? "text-amber-500" : "text-[#5A7863]" },
                  { label: "Total Queries", value: systemStatus.totalQueries.toLocaleString(), icon: Database, color: "text-[#5A7863]" },
                  { label: "Avg Latency", value: `${systemStatus.avgLatency}ms`, icon: Zap, color: systemStatus.avgLatency > 80 ? "text-amber-500" : "text-[#5A7863]" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#EBF4DD]/50 rounded-lg p-3 text-center border border-[#90AB8B]/20"
                  >
                    <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                    <p className={`text-lg sm:text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-[#5A7863]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-[#90AB8B]/30 p-4">
                  <h4 className="font-medium text-[#3B4953] mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#5A7863]" />
                    Privacy Budget Usage
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5A7863]">Used</span>
                      <span className="font-mono text-[#3B4953]">{systemStatus.privacyBudgetUsed}%</span>
                    </div>
                    <Progress value={systemStatus.privacyBudgetUsed} className="h-3" />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-[#90AB8B]">ε = {(systemStatus.privacyBudgetUsed / 100).toFixed(2)} of 1.0</span>
                      <Button size="sm" variant="outline" onClick={resetPrivacyBudget} className="h-7 text-xs">
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#3B4953] rounded-lg p-4">
                  <h4 className="font-medium text-[#EBF4DD] mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    System Console
                  </h4>
                  <div className="font-mono text-[10px] sm:text-xs text-[#90AB8B] space-y-1 h-32 overflow-y-auto scrollbar-thin pr-2">
                    {terminalOutput.map((line, i) => (
                      <p key={i} className={line.includes("[OK]") ? "text-[#90AB8B]" : line.includes("[INFO]") ? "text-[#EBF4DD]" : "text-[#90AB8B]"}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Uptime", value: systemStatus.uptime, icon: Clock },
                  { label: "Encryption Cycles", value: systemStatus.encryptionCycles.toLocaleString(), icon: Key },
                  { label: "Data Processed", value: systemStatus.dataProcessed, icon: Database },
                  { label: "Alerts Today", value: systemStatus.alertsToday, icon: Bell },
                ].map((stat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-gradient-to-br from-[#5A7863] to-[#3B4953] text-white">
                    <stat.icon className="w-4 h-4 mb-1 opacity-70" />
                    <p className="text-base sm:text-lg font-bold font-mono">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs opacity-70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nodes" className="space-y-4 mt-0">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[#3B4953]">Federated Nodes</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#90AB8B]">Auto-refresh: {isLive ? "ON" : "OFF"}</span>
                </div>
              </div>

              <div className="grid gap-3">
                {nodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-[#90AB8B]/30 p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          node.status === "online" ? "bg-[#5A7863]" : 
                          node.status === "syncing" ? "bg-amber-400 animate-pulse" : 
                          "bg-red-500"
                        }`} />
                        <div>
                          <p className="font-medium text-[#3B4953]">{node.name}</p>
                          <p className="text-xs text-[#90AB8B]">Last ping: {node.lastPing}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-mono text-[#5A7863]">{node.cpu}%</p>
                          <p className="text-[10px] text-[#90AB8B]">CPU</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-mono text-[#5A7863]">{node.memory}%</p>
                          <p className="text-[10px] text-[#90AB8B]">RAM</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-mono text-[#5A7863]">{node.queries}</p>
                          <p className="text-[10px] text-[#90AB8B]">Queries</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => restartNode(node.id)}
                          disabled={node.status === "syncing"}
                          className="h-8 w-8 p-0"
                        >
                          <RefreshCw className={`w-4 h-4 ${node.status === "syncing" ? "animate-spin" : ""}`} />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] sm:text-xs">
                          <span className="text-[#90AB8B]">CPU Load</span>
                          <span className={node.cpu > 80 ? "text-red-500" : "text-[#5A7863]"}>{node.cpu}%</span>
                        </div>
                        <Progress value={node.cpu} className={`h-1.5 ${node.cpu > 80 ? "[&>div]:bg-red-500" : ""}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] sm:text-xs">
                          <span className="text-[#90AB8B]">Memory</span>
                          <span className={node.memory > 85 ? "text-amber-500" : "text-[#5A7863]"}>{node.memory}%</span>
                        </div>
                        <Progress value={node.memory} className={`h-1.5 ${node.memory > 85 ? "[&>div]:bg-amber-500" : ""}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4 mt-0">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[#3B4953]">User Management ({users.length})</h4>
                <Button 
                  size="sm" 
                  className="bg-[#5A7863] hover:bg-[#3B4953] h-8"
                  onClick={() => setNewUserDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add User
                </Button>
              </div>

              <div className="space-y-2">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white border border-[#90AB8B]/20 hover:border-[#90AB8B]/40 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0 ${
                        user.role === "admin" ? "bg-[#5A7863]" : 
                        user.role === "analyst" ? "bg-[#90AB8B]" : 
                        "bg-gray-400"
                      }`}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#3B4953] truncate">{user.name}</p>
                          <div className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-[#5A7863]" : "bg-gray-300"}`} />
                        </div>
                        <p className="text-xs text-[#90AB8B] truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 ml-13 sm:ml-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          user.role === "admin" ? "bg-[#5A7863] text-white" :
                          user.role === "analyst" ? "bg-[#90AB8B] text-white" :
                          "bg-gray-200 text-gray-600"
                        }`}>{user.role}</span>
                        <span className="text-[10px] text-[#90AB8B] hidden md:inline truncate max-w-[80px]">{user.organization}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                          className="h-8 w-8 p-0"
                        >
                          {user.status === "active" ? 
                            <Unlock className="w-4 h-4 text-[#5A7863]" /> : 
                            <Lock className="w-4 h-4 text-red-500" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-0">
              <div className="grid gap-4">
                {["privacy", "security", "limits", "sync", "alerts", "compliance"].map(category => {
                  const categorySettings = settings.filter(s => s.category === category);
                  if (categorySettings.length === 0) return null;
                  
                  return (
                    <div key={category} className="bg-white rounded-lg border border-[#90AB8B]/30 p-4">
                      <h4 className="font-medium text-[#3B4953] mb-3 capitalize flex items-center gap-2 text-sm sm:text-base">
                        {category === "privacy" && <Shield className="w-4 h-4 text-[#5A7863]" />}
                        {category === "security" && <Lock className="w-4 h-4 text-[#5A7863]" />}
                        {category === "limits" && <Activity className="w-4 h-4 text-[#5A7863]" />}
                        {category === "sync" && <RefreshCw className="w-4 h-4 text-[#5A7863]" />}
                        {category === "alerts" && <Bell className="w-4 h-4 text-[#5A7863]" />}
                        {category === "compliance" && <FileText className="w-4 h-4 text-[#5A7863]" />}
                        {category} Settings
                      </h4>
                      <div className="space-y-2">
                        {categorySettings.map(setting => (
                          <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-[#EBF4DD]/30 transition-colors gap-2">
                            <div className="min-w-0">
                              <span className="text-sm font-medium text-[#3B4953]">{setting.name}</span>
                              <p className="text-[10px] sm:text-xs text-[#90AB8B] line-clamp-1">{setting.description}</p>
                            </div>
                            <div className="shrink-0 flex justify-end">
                              {setting.type === "boolean" ? (
                                <Switch 
                                  checked={setting.value as boolean} 
                                  onCheckedChange={() => toggleSetting(setting.id)}
                                />
                              ) : setting.type === "number" ? (
                                <Input
                                  type="number"
                                  value={setting.value as number}
                                  onChange={(e) => updateSettingValue(setting.id, parseFloat(e.target.value) || 0)}
                                  className="w-20 h-7 text-right text-xs"
                                />
                              ) : (
                                <Select value={setting.value as string} onValueChange={(v) => updateSettingValue(setting.id, v)}>
                                  <SelectTrigger className="w-24 h-7 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="AES-128">AES-128</SelectItem>
                                    <SelectItem value="AES-256">AES-256</SelectItem>
                                    <SelectItem value="ChaCha20">ChaCha20</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4 mt-0">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[#3B4953]">Audit Logs</h4>
                <Button size="sm" variant="outline" onClick={exportLogs} className="h-8">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>

              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white border border-[#90AB8B]/20 gap-2"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 font-medium ${getLevelColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#3B4953] truncate">{log.action}</p>
                          <p className="text-xs text-[#90AB8B] truncate">{log.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 ml-13 sm:ml-0 shrink-0">
                        <p className="text-[10px] text-[#5A7863] font-medium">{log.user}</p>
                        <p className="text-[10px] text-[#90AB8B]">{log.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with role-based access</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#5A7863]">Name</label>
                <Input 
                  value={newUser.name} 
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#5A7863]">Email</label>
                <Input 
                  value={newUser.email} 
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="email@company.com"
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#5A7863]">Organization</label>
                <Select value={newUser.organization} onValueChange={(v) => setNewUser({...newUser, organization: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alpha Bank">Alpha Bank</SelectItem>
                    <SelectItem value="MegaMart Retail">MegaMart Retail</SelectItem>
                    <SelectItem value="HealthGuard Insurance">HealthGuard Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#5A7863]">Role</label>
                <Select value={newUser.role} onValueChange={(v: "admin" | "analyst" | "viewer") => setNewUser({...newUser, role: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin (Full Access)</SelectItem>
                    <SelectItem value="analyst">Analyst (Read/Write)</SelectItem>
                    <SelectItem value="viewer">Viewer (Read Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setNewUserDialog(false)}>Cancel</Button>
              <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={addUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
