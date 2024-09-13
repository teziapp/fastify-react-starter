// @mui
import { RadioGroup } from '@mui/material';
//
import SvgColor from '@/component/svg-color';
import { useSettingsContext } from '@/component/settings/settingContext';
import { StyledCard, StyledWrap, MaskControl } from '@/component/settings/styles';

// ----------------------------------------------------------------------

const OPTIONS = ['light', 'dark'] as const;

export default function ModeOptions() {
  const { themeMode, onChangeMode } = useSettingsContext();

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={themeMode === mode}>
            <SvgColor
              src={`/assets/icons/setting/${mode === 'light' ? 'ic_sun' : 'ic_moon'}.svg`}
            />

            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
