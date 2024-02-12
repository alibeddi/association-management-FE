// @mui
import { Divider, MenuItem } from '@mui/material';
// components
import { RHFCheckbox, RHFSelect, RHFTextField } from '../../../../../components/hook-form';
// types
import { FrontType, IKpi } from '../../../../../@types/Kpi';

function RenderField(kpi: IKpi, values?: any) {
  const componentName = kpi?.name;
  const components: Record<FrontType, JSX.Element> = {
    textarea: (
      <RHFTextField
        name={componentName}
        id={kpi?._id}
        placeholder={kpi?.name}
        multiline
        rows={5}
        label={kpi.name}
        helperText={kpi?.label}
      />
    ),
    checkbox: (
      <RHFCheckbox
        name={componentName}
        id={kpi?._id}
        label={kpi.name}
        sx={{ mt: 3 }}
        helperText={kpi?.label}
      />
    ),
    select: (
      <RHFSelect
        name={componentName}
        label={kpi.name}
        placeholder={kpi?.name}
        helperText={kpi?.label}
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
    input: (
      <RHFTextField
        name={componentName}
        type="string"
        label={kpi.name}
        id={kpi?._id}
        helperText={kpi?.label}
      />
    ),
  };

  return components[kpi?.frontType];
}
export default RenderField;
