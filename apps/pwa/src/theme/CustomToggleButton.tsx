import React, { useState } from 'react';
import { Switch, Typography, Stack } from '@mui/material';

export interface CustomToggleButtonProps {
  initialState?: boolean;
  label: string;
  direction?: 'row' | 'column';
  onToggleFunction?: (checked: boolean) => void;
}

export const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({ 
  initialState = false,
  label,
  direction = "row",
  onToggleFunction,
}) => {
  const [enabled, setEnabled] = useState(initialState);

  return (
    <Stack direction={direction} alignItems="center" justifyContent="space-between" spacing={2}>
      <Typography variant="subtitle2">{label}</Typography>
      <Switch
        checked={enabled}
        onChange={(event) => {
          const checked = event.target.checked;
          if (onToggleFunction) {
            onToggleFunction(checked);
          }
          setEnabled(checked);
        }}
        name="notifications"
        color="primary"
      />
    </Stack>
  );
};

export default CustomToggleButton;
