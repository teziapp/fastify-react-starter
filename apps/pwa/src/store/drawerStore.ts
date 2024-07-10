import React from "react";
import { create } from "zustand";

type DrawerPosition = "top" | "right" | "bottom" | "left";

interface DrawerState {
  isOpen: boolean;
  title: string;
  position: DrawerPosition;
  width: number | string;
  height: number | string;
  component: React.ReactNode | null;
  openDrawer: (config: Partial<DrawerConfig>) => void;
  closeDrawer: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCloseCallback: Function;
}

interface DrawerConfig {
  title?: string;
  position?: DrawerPosition;
  width?: number | string;
  height?: number | string;
  component: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCloseCallback: Function;
}

const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  title: "Drawer",
  position: "right",
  width: "35%",
  height: "100%",
  component: null,
  onCloseCallback: () => {},
  openDrawer: (config) =>
    set((state) => ({
      isOpen: true,
      title: config.title ?? state.title,
      position: config.position ?? state.position,
      width: config.width ?? state.width,
      height: config.height ?? state.height,
      component: config.component,
      onCloseCallback: config.onCloseCallback,
    })),
  closeDrawer: () => set({ isOpen: false }),
}));

// Utility functions
export const openDrawer = (config: DrawerConfig) =>
  useDrawerStore.getState().openDrawer(config);
export const closeDrawer = () => useDrawerStore.getState().closeDrawer();

export default useDrawerStore;
