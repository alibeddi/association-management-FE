// @mui
import { Divider, MenuItem } from '@mui/material';
// components
import {
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '../../../../../components/hook-form';
// types
import { FrontType, IKpi } from '../../../../../@types/Kpi';

function RenderField(kpi: IKpi, statClientDetails?: boolean) {
  const componentName = kpi?.name;
  const components: Record<FrontType, JSX.Element> = {
    textarea: (
      <RHFTextField
        inputProps={{ readOnly: statClientDetails }}
        name={componentName}
        id={kpi?._id}
        placeholder={kpi?.name}
        multiline
        rows={5}
        label={kpi.name}
      />
    ),
    checkbox: <RHFCheckbox name={componentName} id={kpi?._id} label={kpi.name} sx={{ mt: 3 }} />,
    select: (
      <RHFSelect
        disabled={statClientDetails}
        name={componentName}
        label={kpi.name}
        placeholder={kpi?.name}
        id={kpi?._id}
      >
        <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          None
        </MenuItem>
        <Divider />
        {kpi?.options?.map((item: string | number) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </RHFSelect>
    ),
    radio: (
      <RHFRadioGroup
        row
        id={kpi?._id}
        name={componentName}
        options={
          kpi.options ? kpi.options.map((option) => ({ label: String(option), value: option })) : []
        }
        label={kpi.label}
        disabled={statClientDetails}
      />
    ),
  };

  return components[kpi?.frontType];
}
export default RenderField;
