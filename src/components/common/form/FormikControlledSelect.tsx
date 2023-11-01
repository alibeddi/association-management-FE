import React from "react";
import { Field } from "formik";
import ArrowDownIconWithBorder from "../../icons/ArrowDownIconWithBorder";

type Props = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function FormikControlledSelect(props: Props) {
  const [value, setValue] = React.useState(props.options[0].value);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-black dark:text-white">
            {props.label || "Label"}
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <Field
              name={props.name || "name"}
              value={value || ""}
              component="select"
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              onChange={
                props.onChange
                  ? (e: React.ChangeEvent<HTMLSelectElement>) => {
                      props.onChange!(e);
                      setValue(e.target.value);
                    }
                  : undefined
              }
            >
              {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <ArrowDownIconWithBorder />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormikControlledSelect;
