// ----------------------------------------------------------------------

import { defaultSettings } from "@/component/settings/config-setting";
import { defaultPreset, getPresets, presetsOption } from "@/component/settings/presets";
import { SettingsContextProps } from "@/component/settings/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, ReactNode, useCallback, useContext, useMemo } from "react";

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},
  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},
  // Color
  onChangeColorPresets: () => {},
  presetsColor: defaultPreset,
  presetsOption: [],
  // Reset
  onResetSetting: () => {},
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettingsContext must be use inside SettingsProvider');
  }

  return context;
};

// ----------------------------------------------------------------------
type SettingsProviderProps = {
  children: ReactNode;
};


export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  // Mode
  const onToggleMode = useCallback(() => {
    const themeMode = settings.themeMode === 'light' ? 'dark' : 'light';
    setSettings({ ...settings, themeMode });
  }, [setSettings, settings]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeMode = event.target.value;
      setSettings({ ...settings, themeMode });
    },
    [setSettings, settings]
  );

  // Direction
  const onToggleDirection = useCallback(() => {
    const themeDirection = settings.themeDirection === 'rtl' ? 'ltr' : 'rtl';
    setSettings({ ...settings, themeDirection });
  }, [setSettings, settings]);

  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeDirection = event.target.value;
      setSettings({ ...settings, themeDirection });
    },
    [setSettings, settings]
  );

  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      const themeDirection = lang === 'ar' ? 'rtl' : 'ltr';
      setSettings({ ...settings, themeDirection });
    },
    [setSettings, settings]
  );

  // Layout
  const onToggleLayout = useCallback(() => {
    const themeLayout = settings.themeLayout === 'vertical' ? 'mini' : 'vertical';
    setSettings({ ...settings, themeLayout });
  }, [setSettings, settings]);

  const onChangeLayout = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeLayout = event.target.value;
      setSettings({ ...settings, themeLayout });
    },
    [setSettings, settings]
  );

  // Contrast
  const onToggleContrast = useCallback(() => {
    const themeContrast = settings.themeContrast === 'default' ? 'bold' : 'default';
    setSettings({ ...settings, themeContrast });
  }, [setSettings, settings]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeContrast = event.target.value;
      setSettings({ ...settings, themeContrast });
    },
    [setSettings, settings]
  );

  // Color
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeColorPresets = event.target.value;
      setSettings({ ...settings, themeColorPresets });
    },
    [setSettings, settings]
  );

  // Reset
  const onResetSetting = useCallback(() => {
    setSettings(defaultSettings);
  }, [setSettings]);

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      // Mode
      onToggleMode,
      onChangeMode,
      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      onToggleLayout,
      onChangeLayout,
      // Contrast
      onChangeContrast,
      onToggleContrast,
      // Color
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(settings.themeColorPresets),
      // Reset
      onResetSetting,
    }),
    [
      settings,
      // Mode
      onToggleMode,
      onChangeMode,
      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      onToggleLayout,
      onChangeLayout,
      onChangeContrast,
      // Contrast
      onToggleContrast,
      // Color
      onChangeColorPresets,
      // Reset
      onResetSetting,
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}