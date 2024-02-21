// @mui
import { Divider, MenuItem } from '@mui/material';
// components
import { RHFMultiCheckbox, RHFRadioGroup, RHFSelect, RHFSwitch, RHFTextField } from '../hook-form';
// types
import { FrontType, IKpi } from '../../@types/Kpi';

function RenderField(kpi: IKpi, statClientDetails?: boolean) {
  const componentName = kpi?.name;
  const options = (kpi.options || []).map((option) => ({ label: option, value: option }));

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
    checkbox: (
      <RHFMultiCheckbox
        disabled={statClientDetails}
        row
        name={componentName}
        label={kpi.label}
        spacing={2}
        options={options}
      />
    ),
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
    input: <RHFTextField name={componentName} label={kpi.label} type="text" id={kpi?._id} />,
    switch: (
      <RHFSwitch
        name={componentName}
        id={kpi?._id}
        label={kpi.label}
        disabled={statClientDetails}
      />
    ),
    '': <></>,
  };

  return components[kpi?.frontType];
}
export default RenderField;
