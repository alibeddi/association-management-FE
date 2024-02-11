import { Control, Controller } from 'react-hook-form';
// @mui
import { Divider, FormHelperText, MenuItem, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// types
import { IConfig, IFieldTypes } from '../../@types/config';
import { IRentableAttribute } from '../../@types/rentableAttribute';
// utils
import convertJSONToRecord from '../../utils/convertJSONToRecord';
import transformRecordToArray from '../../utils/transformRecordToArray';
import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDateTimePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
} from '../components/hook-form';

function RenderField(
  config: IConfig | IRentableAttribute,
  componentLabel: string,
  values?: any,
  control?: Control<any, any>
) {
  const componentName = config?.code;
  const configsOptions: { label: string; value: string }[] = transformRecordToArray(
    convertJSONToRecord(config?.data)
  ).map((el) => ({
    label: el.label,
    value: el.value.toString().replace(',', '.'),
  }));
  const components: Record<IFieldTypes, JSX.Element> = {
    Text: <RHFTextField name={componentName} label={componentLabel} type="text" id={config?.id} />,
    Textarea: (
      <RHFTextField
        name={componentName}
        id={config?.id}
        placeholder={config?.name}
        multiline
        rows={5}
        label={componentLabel}
        helperText={config?.help}
      />
    ),
    Radio: (
      <RHFRadioGroup
        row
        id={config?.id}
        name={componentName}
        options={configsOptions}
        label={componentLabel}
        helperText={config?.help}
      />
    ),
    Checkbox: (
      <RHFCheckbox
        name={componentName}
        id={config?.id}
        label={componentLabel}
        sx={{ mt: 3 }}
        helperText={config?.help}
      />
    ),
    Select: (
      <RHFSelect
        name={componentName}
        label={componentLabel}
        placeholder={config?.name}
        helperText={config?.help}
        id={config?.id}
      >
        <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          None
        </MenuItem>
        <Divider />
        {transformRecordToArray(convertJSONToRecord(config?.data))?.map(
          (item: { value: any; label: any }) => (
            <MenuItem key={item.value} value={item?.value.label}>
              {item?.value.label}
            </MenuItem>
          )
        )}
      </RHFSelect>
    ),
    Multiselect: (
      <RHFAutocomplete
        name={componentName}
        label={componentLabel}
        multiple
        freeSolo
        options={transformRecordToArray(convertJSONToRecord(config?.data)).map((item: any) =>
          item?.value?.label?.toString()
        )}
        ChipProps={{ size: 'small' }}
        helperText={config?.help}
      />
    ),
    Email: (
      <RHFTextField
        name={componentName}
        label={componentLabel}
        id={config?.id}
        helperText={config?.help}
        type="email"
      />
    ),
    Password: (
      <RHFTextField
        name={componentName}
        type="password"
        label={componentLabel}
        helperText={config?.help}
      />
    ),
    URL: (
      <RHFTextField
        name={componentName}
        type="url"
        label={componentLabel}
        id={config?.id}
        helperText={config?.help}
      />
    ),
    IP: (
      <RHFTextField
        name={componentName}
        type="ip"
        label={componentLabel}
        id={config?.id}
        helperText={config?.help}
      />
    ),
    Phone: (
      <RHFTextField
        name={componentName}
        type="phone"
        label={componentLabel}
        id={config?.id}
        helperText={config?.help}
      />
    ),
    Date: (
      <Controller
        name={componentName}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Tooltip title={config?.name}>
              <DatePicker
                label={componentLabel}
                value={field.value ? new Date(field.value) : null}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
              />
            </Tooltip>
            {!!error && (
              <FormHelperText error={!!error} sx={{ px: 2 }}>
                {error?.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    ),
    DateTime: <RHFDateTimePicker name={componentName} label={componentLabel} />,
    Currency: (
      <RHFTextField
        name={componentName}
        type="number"
        label={componentLabel}
        id={config?.id}
        helperText={config?.help}
      />
    ),
    Number: (
      <RHFTextField
        name={componentName}
        type="number"
        label={componentLabel}
        id={config?.id}
        helperText={config?.help}
      />
    ),
    Switch: (
      <RHFSwitch
        name={componentName}
        labelPlacement="start"
        id={config?.id}
        helperText={config.help}
        label={componentLabel}
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
    config.code.includes('vat')
  ) {
    return components[config?.frontType];
  }

  if (
    values[AddiTionalDriverKey] !== undefined &&
    (values[AddiTionalDriverKey].toString() === 'true' ||
      values[AddiTionalDriverKey].toString() === '1') &&
    config.code.includes('extra_driver_fee')
  ) {
    return components[config?.frontType];
  }
  if (
    values[RequireTransferCostKey] !== undefined &&
    (values[RequireTransferCostKey].toString() === 'true' ||
      values[RequireTransferCostKey].toString() === '1') &&
    (config.code === 'transfer_base_cost' || config.code === 'transfer_km_cost')
  ) {
    return components[config?.frontType];
  }

  if (
    values[RequireDeposit] !== undefined &&
    (values[RequireDeposit].toString() === 'true' || values[RequireDeposit].toString() === '1') &&
    config.code === 'deposit_amount'
  ) {
    return components[config?.frontType];
  }

  if (
    !config.code.includes('extra_driver_fee') &&
    !config.code.includes('transfer_base_cost') &&
    !config.code.includes('deposit_amount') &&
    !config.code.includes('transfer_km_cost') &&
    config.code !== 'vat'
  ) {
    return components[config?.frontType];
  }
}
export default RenderField;
