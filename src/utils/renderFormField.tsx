import { Control } from 'react-hook-form';
// @mui
import { Divider, MenuItem } from '@mui/material';
// components
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '../components/hook-form';
// types
import { FrontType, IKpi } from '../@types/Kpi';
// utils
import convertJSONToRecord from '../../utils/convertJSONToRecord';
import transformRecordToArray from '../../utils/transformRecordToArray';

function RenderField(kpi: IKpi, componentLabel: string, values?: any, control?: Control<any, any>) {
  const componentName = kpi?.name;
  const components: Record<FrontType, JSX.Element> = {
    textarea: (
      <RHFTextField
        name={componentName}
        id={kpi?._id}
        placeholder={kpi?.name}
        multiline
        rows={5}
        label={componentLabel}
        helperText={kpi?.label}
      />
    ),
    checkbox: (
      <RHFCheckbox
        name={componentName}
        id={kpi?._id}
        label={componentLabel}
        sx={{ mt: 3 }}
        helperText={kpi?.label}
      />
    ),
    select: (
      <RHFSelect
        name={componentName}
        label={componentLabel}
        placeholder={kpi?.name}
        helperText={kpi?.label}
        id={kpi?._id}
      >
        <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          None
        </MenuItem>
        <Divider />
        {transformRecordToArray(convertJSONToRecord(kpi?.options))?.map(
          (item: { value: any; label: any }) => (
            <MenuItem key={item.value} value={item?.value.label}>
              {item?.value.label}
            </MenuItem>
          )
        )}
      </RHFSelect>
    ),
    input: (
      <RHFTextField
        name={componentName}
        type="string"
        label={componentLabel}
        id={kpi?._id}
        helperText={kpi?.label}
      />
    ),
  };

  const AddiTionalDriverKey: string =
    values && Object.keys(values).find((item) => item?.includes('allow_additional_driver'));
  const AddAllowVatKey: string =
    values && Object.keys(values).find((item) => item?.includes('allow_vat'));
  const RequireTransferCostKey: string =
    values && Object.keys(values).find((item) => item.includes('require_transfer_cost'));
  const RequireDeposit: string =
    values && Object.keys(values).find((item) => item.includes('required_deposit'));

  if (
    values[AddAllowVatKey] !== undefined &&
    (values[AddAllowVatKey].toString() === 'true' || values[AddAllowVatKey].toString() === '1') &&
    kpi.name.includes('vat')
  ) {
    return components[kpi?.frontType];
  }

  if (
    values[AddiTionalDriverKey] !== undefined &&
    (values[AddiTionalDriverKey].toString() === 'true' ||
      values[AddiTionalDriverKey].toString() === '1') &&
    kpi.name.includes('extra_driver_fee')
  ) {
    return components[kpi?.frontType];
  }
  if (
    values[RequireTransferCostKey] !== undefined &&
    (values[RequireTransferCostKey].toString() === 'true' ||
      values[RequireTransferCostKey].toString() === '1') &&
    (kpi.name === 'transfer_base_cost' || kpi.name === 'transfer_km_cost')
  ) {
    return components[kpi?.frontType];
  }

  if (
    values[RequireDeposit] !== undefined &&
    (values[RequireDeposit].toString() === 'true' || values[RequireDeposit].toString() === '1') &&
    kpi.name === 'deposit_amount'
  ) {
    return components[kpi?.frontType];
  }

  if (
    !kpi.name.includes('extra_driver_fee') &&
    !kpi.name.includes('transfer_base_cost') &&
    !kpi.name.includes('deposit_amount') &&
    !kpi.name.includes('transfer_km_cost') &&
    kpi.name !== 'vat'
  ) {
    return components[kpi?.frontType];
  }
}
export default RenderField;
