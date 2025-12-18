"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Download,
  Play,
  CheckCircle2,
  Loader2,
  FileJson,
  Table,
  Shield,
  Settings,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface DatasetOption {
  name: string;
  records: string;
  privacy: string;
  description: string;
  fields: string[];
}

export function SyntheticDataStudio() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<DatasetOption | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [config, setConfig] = useState({
    epsilon: 0.1,
    recordCount: 50000,
    includeTimestamps: true,
    anonymizeIds: true
  });

  const datasetOptions: DatasetOption[] = [
    { 
      name: "Transaction Patterns", 
      records: "50,000", 
      privacy: "ε=0.1",
      description: "Synthetic transaction data with spending patterns, merchant categories, and temporal features",
      fields: ["transaction_id", "amount", "category", "timestamp", "risk_score"]
    },
    { 
      name: "Customer Segments", 
      records: "10,000", 
      privacy: "ε=0.05",
      description: "Privacy-safe customer cohorts with behavioral clustering and demographic proxies",
      fields: ["segment_id", "cluster", "behavior_score", "churn_probability"]
    },
    { 
      name: "Risk Profiles", 
      records: "25,000", 
      privacy: "ε=0.15",
      description: "Aggregated risk indicators and fraud propensity scores across organizations",
      fields: ["profile_id", "risk_level", "fraud_score", "anomaly_count"]
    },
  ];

  const handleGenerate = (dataset?: DatasetOption) => {
    setGenerating(true);
    setProgress(0);
    setGenerated(false);
    if (dataset) setSelectedDataset(dataset);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownload = () => {
    const sampleData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        privacy: selectedDataset?.privacy || "ε=0.1",
        recordCount: config.recordCount,
        dataset: selectedDataset?.name || "Transaction Patterns"
      },
      sample: [
        { id: "synth_001", value: 125.50, category: "retail", risk: 0.12 },
        { id: "synth_002", value: 89.99, category: "food", risk: 0.08 },
        { id: "synth_003", value: 450.00, category: "travel", risk: 0.35 },
      ]
    };
    
    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthetic_${selectedDataset?.name.toLowerCase().replace(' ', '_') || 'data'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const previewData = [
    { id: "synth_001", amount: "$125.50", category: "Retail", risk: "Low (0.12)" },
    { id: "synth_002", amount: "$89.99", category: "Food", risk: "Low (0.08)" },
    { id: "synth_003", amount: "$450.00", category: "Travel", risk: "Medium (0.35)" },
    { id: "synth_004", amount: "$1,200.00", category: "Electronics", risk: "High (0.67)" },
    { id: "synth_005", amount: "$45.00", category: "Utilities", risk: "Low (0.05)" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden"
      >
        <div className="p-3 sm:p-4 border-b border-[#90AB8B]/20 bg-gradient-to-r from-[#90AB8B] to-[#5A7863]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#EBF4DD]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#EBF4DD] text-sm sm:text-base">Synthetic Data Studio</h3>
              <p className="text-xs text-white/70 hidden sm:block">Generate privacy-safe replicas</p>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="space-y-2">
            {datasetOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedDataset(option);
                  setConfigOpen(true);
                }}
                className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-[#90AB8B]/20 hover:bg-[#EBF4DD]/30 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <Table className="w-4 h-4 text-[#5A7863] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[#3B4953] truncate">{option.name}</p>
                    <p className="text-xs text-[#90AB8B]">{option.records} records</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded bg-[#EBF4DD] text-[#5A7863] font-mono">
                    {option.privacy}
                  </span>
                  <Shield className="w-4 h-4 text-[#90AB8B] hidden sm:block" />
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5A7863] text-xs sm:text-sm">Generating synthetic data...</span>
                  <span className="font-mono text-[#3B4953] text-xs sm:text-sm">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center gap-2 text-xs text-[#90AB8B]">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Training CTGAN model with differential privacy...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {generated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2 sm:p-3 rounded-lg bg-[#EBF4DD]/50 border border-[#90AB8B]/30"
              >
                <div className="flex items-center gap-2 text-[#5A7863]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">Synthetic dataset ready!</span>
                </div>
                <p className="text-xs text-[#90AB8B] mt-1">
                  {config.recordCount.toLocaleString()} privacy-safe records generated with DP guarantees.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2">
            <Button
              onClick={() => handleGenerate(datasetOptions[0])}
              disabled={generating}
              className="flex-1 bg-[#5A7863] hover:bg-[#3B4953] text-[#EBF4DD] text-xs sm:text-sm h-9"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 mr-1 sm:mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-1 sm:mr-2" />
              )}
              {generating ? "Generating..." : "Generate"}
            </Button>
            {generated && (
              <>
                <Button 
                  variant="outline" 
                  className="border-[#90AB8B] text-[#5A7863] hover:bg-[#EBF4DD] h-9 px-2 sm:px-3"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#90AB8B] text-[#5A7863] hover:bg-[#EBF4DD] h-9 px-2 sm:px-3"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={configOpen} onOpenChange={setConfigOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#5A7863]" />
              Configure Generation
            </DialogTitle>
            <DialogDescription>
              {selectedDataset?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#5A7863] mb-1 block">Dataset</label>
              <Select value={selectedDataset?.name} onValueChange={(v) => setSelectedDataset(datasetOptions.find(d => d.name === v) || null)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {datasetOptions.map((opt) => (
                    <SelectItem key={opt.name} value={opt.name}>{opt.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-[#5A7863] mb-1 block">Record Count</label>
              <Input 
                type="number" 
                value={config.recordCount}
                onChange={(e) => setConfig({...config, recordCount: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <label className="text-sm text-[#5A7863] mb-1 block">Privacy Budget (ε)</label>
              <Input 
                type="number" 
                step="0.01"
                value={config.epsilon}
                onChange={(e) => setConfig({...config, epsilon: parseFloat(e.target.value)})}
              />
              <p className="text-xs text-[#90AB8B] mt-1">Lower values = stronger privacy</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#3B4953]">Include timestamps</span>
                <Switch 
                  checked={config.includeTimestamps}
                  onCheckedChange={(v) => setConfig({...config, includeTimestamps: v})}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#3B4953]">Anonymize IDs</span>
                <Switch 
                  checked={config.anonymizeIds}
                  onCheckedChange={(v) => setConfig({...config, anonymizeIds: v})}
                />
              </div>
            </div>

            {selectedDataset && (
              <div className="p-3 rounded-lg bg-[#EBF4DD]/50">
                <p className="text-xs text-[#5A7863] mb-2">Output Fields:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedDataset.fields.map((field, i) => (
                    <span key={i} className="text-xs bg-white px-2 py-0.5 rounded border border-[#90AB8B]/30 font-mono">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigOpen(false)}>Cancel</Button>
            <Button 
              className="bg-[#5A7863] hover:bg-[#3B4953]" 
              onClick={() => {
                setConfigOpen(false);
                handleGenerate(selectedDataset || undefined);
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-[#5A7863]" />
              Data Preview
            </DialogTitle>
            <DialogDescription>
              Sample of generated synthetic data (first 5 records)
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#90AB8B]/30">
                  <th className="text-left p-2 text-[#5A7863]">ID</th>
                  <th className="text-left p-2 text-[#5A7863]">Amount</th>
                  <th className="text-left p-2 text-[#5A7863]">Category</th>
                  <th className="text-left p-2 text-[#5A7863]">Risk</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="border-b border-[#90AB8B]/10 hover:bg-[#EBF4DD]/30">
                    <td className="p-2 font-mono text-[#3B4953]">{row.id}</td>
                    <td className="p-2 text-[#3B4953]">{row.amount}</td>
                    <td className="p-2 text-[#3B4953]">{row.category}</td>
                    <td className="p-2 text-[#3B4953]">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#EBF4DD]/50 text-xs text-[#5A7863]">
            <Shield className="w-4 h-4" />
            All data generated with ε={config.epsilon} differential privacy
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
            <Button className="bg-[#5A7863] hover:bg-[#3B4953]" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download Full Dataset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
