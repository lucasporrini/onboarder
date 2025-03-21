"use client";

import { useContext } from "react";
import { TourContext } from "../context/TourContext";
import type { TourContextType } from "../types";

export const useTour = (): TourContextType => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
