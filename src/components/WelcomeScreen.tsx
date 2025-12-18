"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap } from "lucide-react";

interface Point {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

export const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const points: Point[] = [];
    const numPoints = 60;
    const radius = Math.min(width, height) * 0.35;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        px: 0,
        py: 0,
      });
    }

    let rotationX = 0;
    let rotationY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotationX += 0.002;
      rotationY += 0.003;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      points.forEach((p) => {
        // Rotate Y
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        // Rotate X
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;

        const perspective = 1000 / (1000 + z);
        p.px = width / 2 + x * perspective;
        p.py = height / 2 + y * perspective;
      });

      ctx.beginPath();
      ctx.strokeStyle = "rgba(90, 120, 99, 0.2)";
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].px - points[j].px;
          const dy = points[i].py - points[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * 0.8) {
            ctx.moveTo(points[i].px, points[i].py);
            ctx.lineTo(points[j].px, points[j].py);
          }
        }
      }
      ctx.stroke();

      points.forEach((p) => {
        const size = (p.z + radius) / (radius * 2) * 4 + 1;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 73, 83, ${0.3 + (p.z + radius) / (radius * 2)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-[#EBF4DD] flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8 p-6 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="p-3 rounded-2xl bg-[#5A7863] shadow-lg">
              <Shield className="w-8 h-8 text-[#EBF4DD]" />
            </div>
            <h1 className="text-4xl font-bold text-[#3B4953] tracking-tight">
              INSIGHT<span className="text-[#5A7863]">X</span>
            </h1>
          </div>
          <p className="text-lg text-[#5A7863] font-medium max-w-xs">
            Federated Intelligence & Privacy-Safe Analytics Hub
          </p>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="group relative flex items-center gap-3 px-8 py-4 bg-[#3B4953] text-[#EBF4DD] rounded-full font-bold text-lg shadow-xl hover:bg-[#5A7863] transition-all overflow-hidden"
        >
          <span className="relative z-10">Initialize Secure Environment</span>
          <Zap className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
          <motion.div
            className="absolute inset-0 bg-[#5A7863]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12 flex items-center gap-6 text-[#90AB8B] text-sm font-semibold"
        >
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> GDPR</span>
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> HIPAA</span>
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> SOC 2</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
