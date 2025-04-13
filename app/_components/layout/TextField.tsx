import React, { forwardRef } from "react";
import Form from "react-bootstrap/Form";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  error?: string;
  defalutValue?: string;
  [key: string]: any; // Allow additional props like `register`
}

const AppInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      as = "input",
      error,
      defalutValue,
      ...props
    },
    ref
  ) => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">{label}</Form.Label>
        <Form.Control
          as={as}
          type={type}
          placeholder={placeholder}
          defalutValue={defalutValue || ""}
          ref={ref} // Bind the ref
          {...props} // Spread additional props (e.g., from `register`)
        />
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
      </Form.Group>
    );
  }
);

AppInput.displayName = "AppInput"; // Set display name for debugging

export default AppInput;
