"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Notification({ message, type, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <CheckCircle2 className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="notification-container">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`notification ${type}`}
          >
            {icons[type]}
            <span className="flex-1 text-sm font-medium">{message}</span>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
            >
              <X size={16} className="text-gray-400" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
