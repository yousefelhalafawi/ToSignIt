import React, { forwardRef } from "react";

interface CheckBoxProps {
  label: string;
  id: string;
  error?: string;
  defaultChecked?: boolean;
  [key: string]: any;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, id, error, defaultChecked, ...props }, ref) => {
    return (
      <div className="mb-3 mt-4 form-check">
        {/* Input element */}
        <input
          type="checkbox"
          id={id}
          className="form-check-input"
          ref={ref} // Bind the ref
          defaultChecked={defaultChecked} // Set the initial value
          {...props} // Spread additional props (e.g., from `register`)
        />

        {/* Label element */}
        <label htmlFor={id} className="form-check-label">
          {label}
        </label>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }
);

CheckBox.displayName = "CheckBox"; // Set display name for debugging

export default CheckBox;
