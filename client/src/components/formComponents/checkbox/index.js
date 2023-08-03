import React from 'react';
import { Field } from 'formik';

const Checkbox = ({ name, label, ...rest }) => {
  return (
    <Field name={name}>
      {({ field }) => (
        <label>
          <input
            type="checkbox"
            {...field}
            {...rest}
            checked={field.value}
            onChange={(e) => field.onChange(e)}
          />
          {label}
        </label>
      )}
    </Field>
  );
};

export default Checkbox;