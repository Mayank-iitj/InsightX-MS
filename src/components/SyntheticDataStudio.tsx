"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  Play,
  CheckCircle2,
  Loader2,
  FileJson,
  Table,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function SyntheticDataStudio() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
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

  const datasetOptions = [
    { name: "Transaction Patterns", records: "50,000", privacy: "ε=0.1" },
    { name: "Customer Segments", records: "10,000", privacy: "ε=0.05" },
    { name: "Risk Profiles", records: "25,000", privacy: "ε=0.15" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-[#90AB8B]/30 shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-[#90AB8B]/20 bg-gradient-to-r from-[#90AB8B] to-[#5A7863]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10">
            <Sparkles className="w-5 h-5 text-[#EBF4DD]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#EBF4DD]">Synthetic Data Studio</h3>
            <p className="text-xs text-white/70">Generate privacy-safe shareable replicas</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          {datasetOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg border border-[#90AB8B]/20 hover:bg-[#EBF4DD]/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Table className="w-4 h-4 text-[#5A7863]" />
                <div>
                  <p className="text-sm font-medium text-[#3B4953]">{option.name}</p>
                  <p className="text-xs text-[#90AB8B]">{option.records} records</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[#EBF4DD] text-[#5A7863] font-mono">
                  {option.privacy}
                </span>
                <Shield className="w-4 h-4 text-[#90AB8B]" />
              </div>
            </motion.div>
          ))}
        </div>

        {generating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5A7863]">Generating synthetic data...</span>
              <span className="font-mono text-[#3B4953]">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {generated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-lg bg-[#EBF4DD]/50 border border-[#90AB8B]/30"
          >
            <div className="flex items-center gap-2 text-[#5A7863]">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Synthetic dataset ready!</span>
            </div>
            <p className="text-xs text-[#90AB8B] mt-1">
              50,000 privacy-safe records generated with differential privacy guarantees.
            </p>
          </motion.div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="flex-1 bg-[#5A7863] hover:bg-[#3B4953] text-[#EBF4DD]"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {generating ? "Generating..." : "Generate Synthetic Data"}
          </Button>
          {generated && (
            <Button variant="outline" className="border-[#90AB8B] text-[#5A7863] hover:bg-[#EBF4DD]">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
