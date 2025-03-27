"use client";

import { Button } from "@repo/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export const Buttons = () => {
  const [isCopied, setIsCopied] = useState(false);
  const packageName = useMemo(() => "pnpm install onboarder", []);

  const handleCopy = () => {
    navigator.clipboard.writeText(packageName);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="flex items-center gap-4 z-10">
      <Link href="/docs">
        <Button className="rounded-full w-fit px-5 h-12 bg-neutral-700 text-white hover:bg-neutral-800 transition-colors duration-200 cursor-pointer">
          Get Started
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </Link>
      <div className="bg-neutral-200 w-fit dark:bg-neutral-900 px-5 h-12 rounded-full flex gap-x-3 font-mono text-[15px] items-center justify-center">
        <span className="select-none">$</span>
        <span>{packageName}</span>
        <AnimatePresence mode="wait">
          {isCopied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <CheckIcon className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <CopyIcon className="w-4 h-4" onClick={handleCopy} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
