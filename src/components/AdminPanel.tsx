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
  Power,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Server,
  Key,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  organization: string;
  status: "active" | "inactive";
  lastActive: string;
}

interface SystemSetting {
  id: string;
  name: string;
  value: boolean | string | number;
  type: "boolean" | "string" | "number";
  category: string;
}

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Admin", email: "john@alphabank.com", role: "admin", organization: "Alpha Bank", status: "active", lastActive: "2 min ago" },
    { id: "2", name: "Sarah Analyst", email: "sarah@megamart.com", role: "analyst", organization: "MegaMart Retail", status: "active", lastActive: "5 min ago" },
    { id: "3", name: "Mike Viewer", email: "mike@healthguard.com", role: "viewer", organization: "HealthGuard Insurance", status: "inactive", lastActive: "1 hour ago" },
  ]);

  const [settings, setSettings] = useState<SystemSetting[]>([
    { id: "1", name: "Real-time Alerts", value: true, type: "boolean", category: "alerts" },
    { id: "2", name: "Auto-sync Nodes", value: true, type: "boolean", category: "sync" },
    { id: "3", name: "Differential Privacy", value: true, type: "boolean", category: "privacy" },
    { id: "4", name: "Privacy Budget (ε)", value: 1.0, type: "number", category: "privacy" },
    { id: "5", name: "Query Limit/Hour", value: 100, type: "number", category: "limits" },
    { id: "6", name: "Encryption Level", value: "AES-256", type: "string", category: "security" },
    { id: "7", name: "Audit Logging", value: true, type: "boolean", category: "compliance" },
    { id: "8", name: "MPC Protocol", value: true, type: "boolean", category: "security" },
  ]);

  const [systemStatus, setSystemStatus] = useState({
    nodes: 3,
    activeConnections: 127,
    queryQueue: 12,
    encryptionCycles: 1847,
    uptime: "99.97%"
  });

  const [newUserDialog, setNewUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "viewer" as const, organization: "" });
  const [editUserId, setEditUserId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        activeConnections: Math.max(100, prev.activeConnections + Math.floor(Math.random() * 10) - 5),
        queryQueue: Math.max(0, prev.queryQueue + Math.floor(Math.random() * 6) - 3),
        encryptionCycles: prev.encryptionCycles + Math.floor(Math.random() * 50)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => 
      s.id === id && s.type === "boolean" ? { ...s, value: !s.value } : s
    ));
  };

  const updateSettingValue = (id: string, value: string | number) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, value } : s
    ));
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
        lastActive: "Just now"
      };
      setUsers(prev => [...prev, user]);
      setNewUser({ name: "", email: "", role: "viewer", organization: "" });
      setNewUserDialog(false);
    }
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#5A7863]" />
            Admin Control Panel
          </DialogTitle>
          <DialogDescription>
            Manage users, system settings, and monitor real-time operations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="system" className="text-xs sm:text-sm">
              <Server className="w-4 h-4 mr-1 hidden sm:inline" />
              System
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">
              <Users className="w-4 h-4 mr-1 hidden sm:inline" />
              Users
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs sm:text-sm">
              <Shield className="w-4 h-4 mr-1 hidden sm:inline" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">
              <Lock className="w-4 h-4 mr-1 hidden sm:inline" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#EBF4DD] rounded-lg p-3 text-center"
              >
                <p className="text-2xl font-bold text-[#5A7863] font-mono">{systemStatus.nodes}</p>
                <p className="text-xs text-[#3B4953]">Active Nodes</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#EBF4DD] rounded-lg p-3 text-center"
              >
                <p className="text-2xl font-bold text-[#5A7863] font-mono">{systemStatus.activeConnections}</p>
                <p className="text-xs text-[#3B4953]">Connections</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#EBF4DD] rounded-lg p-3 text-center"
              >
                <p className="text-2xl font-bold text-[#5A7863] font-mono">{systemStatus.queryQueue}</p>
                <p className="text-xs text-[#3B4953]">Query Queue</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#EBF4DD] rounded-lg p-3 text-center"
              >
                <p className="text-2xl font-bold text-[#5A7863] font-mono">{systemStatus.encryptionCycles}</p>
                <p className="text-xs text-[#3B4953]">Enc. Cycles</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#EBF4DD] rounded-lg p-3 text-center"
              >
                <p className="text-2xl font-bold text-[#5A7863] font-mono">{systemStatus.uptime}</p>
                <p className="text-xs text-[#3B4953]">Uptime</p>
              </motion.div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-[#3B4953] flex items-center gap-2">
                <Activity className="w-4 h-4" />
                System Controls
              </h4>
              {settings.filter(s => s.category === "sync" || s.category === "alerts").map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#EBF4DD]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {setting.category === "alerts" ? <Bell className="w-4 h-4 text-[#5A7863]" /> : <RefreshCw className="w-4 h-4 text-[#5A7863]" />}
                    <span className="text-sm text-[#3B4953]">{setting.name}</span>
                  </div>
                  <Switch 
                    checked={setting.value as boolean} 
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-[#3B4953]">User Management</h4>
              <Button 
                size="sm" 
                className="bg-[#5A7863] hover:bg-[#3B4953]"
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
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#EBF4DD]/50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-[#5A7863]" : "bg-gray-300"}`} />
                    <div>
                      <p className="text-sm font-medium text-[#3B4953]">{user.name}</p>
                      <p className="text-xs text-[#90AB8B]">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-5 sm:ml-0">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      user.role === "admin" ? "bg-[#5A7863] text-white" :
                      user.role === "analyst" ? "bg-[#90AB8B] text-white" :
                      "bg-gray-200 text-gray-600"
                    }`}>{user.role}</span>
                    <span className="text-xs text-[#90AB8B] hidden md:inline">{user.organization}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      className="h-8 w-8 p-0"
                    >
                      {user.status === "active" ? <Unlock className="w-3 h-3 text-[#5A7863]" /> : <Lock className="w-3 h-3 text-red-500" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-[#3B4953] flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy Controls
              </h4>
              {settings.filter(s => s.category === "privacy" || s.category === "limits").map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#EBF4DD]/50 transition-colors">
                  <span className="text-sm text-[#3B4953]">{setting.name}</span>
                  {setting.type === "boolean" ? (
                    <Switch 
                      checked={setting.value as boolean} 
                      onCheckedChange={() => toggleSetting(setting.id)}
                    />
                  ) : (
                    <Input
                      type="number"
                      value={setting.value as number}
                      onChange={(e) => updateSettingValue(setting.id, parseFloat(e.target.value))}
                      className="w-24 h-8 text-right"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-[#EBF4DD]/50 border border-[#90AB8B]/30">
              <h5 className="font-medium text-[#3B4953] mb-2">Privacy Budget Status</h5>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-[#5A7863] font-mono">0.42</p>
                  <p className="text-xs text-[#90AB8B]">ε Used</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#5A7863] font-mono">67</p>
                  <p className="text-xs text-[#90AB8B]">Queries Today</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#5A7863] font-mono">0</p>
                  <p className="text-xs text-[#90AB8B]">PII Exposed</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-[#3B4953] flex items-center gap-2">
                <Key className="w-4 h-4" />
                Security Settings
              </h4>
              {settings.filter(s => s.category === "security" || s.category === "compliance").map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#EBF4DD]/50 transition-colors">
                  <span className="text-sm text-[#3B4953]">{setting.name}</span>
                  {setting.type === "boolean" ? (
                    <Switch 
                      checked={setting.value as boolean} 
                      onCheckedChange={() => toggleSetting(setting.id)}
                    />
                  ) : (
                    <Select value={setting.value as string} onValueChange={(v) => updateSettingValue(setting.id, v)}>
                      <SelectTrigger className="w-32">
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
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-[#5A7863] to-[#3B4953] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-medium">Encryption</span>
                </div>
                <p className="text-lg font-bold font-mono">ACTIVE</p>
                <p className="text-xs opacity-70">256-bit AES + HE</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-[#90AB8B] to-[#5A7863] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">MPC Status</span>
                </div>
                <p className="text-lg font-bold font-mono">RUNNING</p>
                <p className="text-xs opacity-70">3 parties active</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with role-based access</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#5A7863]">Name</label>
                <Input 
                  value={newUser.name} 
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="text-sm text-[#5A7863]">Email</label>
                <Input 
                  value={newUser.email} 
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="email@company.com"
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm text-[#5A7863]">Organization</label>
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
              <div>
                <label className="text-sm text-[#5A7863]">Role</label>
                <Select value={newUser.role} onValueChange={(v: "admin" | "analyst" | "viewer") => setNewUser({...newUser, role: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewUserDialog(false)}>Cancel</Button>
              <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={addUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
