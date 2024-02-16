// @mui
import { Divider, MenuItem } from '@mui/material';
// components
import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '../../../../../components/hook-form';
// types
import { FrontType, IKpi } from '../../../../../@types/Kpi';

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
        row
        name={componentName}
        label={kpi.label}
        spacing={2}
        options={[
          { value: 'option 1', label: 'Checkbox 1' },
          { value: 'option 2', label: 'Checkbox 2' },
          { value: 'option 3', label: 'Checkbox 3' },
        ]}
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
  };

  return components[kpi?.frontType];
}
export default RenderField;
