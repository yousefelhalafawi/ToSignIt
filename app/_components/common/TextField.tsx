import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface TextFieldProps {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: any;
  required?: boolean;
  pattern?: string;
  password?: boolean;
  minLength?: number;
  maxLength?: number;
  customErrorMessage?: string;
  defaultValue?: any;
  readOnly?: any;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  register,
  errors,
  required,
  pattern,
  password,
  minLength,
  maxLength,
  customErrorMessage,
  defaultValue,
  readOnly,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Form.Group controlId={name} className="mb-1">
      {label && <Form.Label>{label}</Form.Label>}
      <div style={{ position: "relative" }}>
        <Form.Control
          defaultValue={defaultValue && defaultValue}
          readOnly={readOnly && true}
          autoComplete="off"
          type={password ? (showPassword ? "text" : "password") : "text"}
          {...register(name, {
            required: required ? "This field is required" : false,
            pattern: pattern
              ? {
                  value: new RegExp(pattern),
                  message: customErrorMessage
                    ? customErrorMessage
                    : "Invalid format",
                }
              : undefined,
            minLength: minLength
              ? { value: minLength, message: `Minimum length is ${minLength}` }
              : undefined,
            maxLength: maxLength
              ? { value: maxLength, message: `Maximum length is ${maxLength}` }
              : undefined,
            onChange: (event) => {
              event.target.value = event.target.value.trimStart();
            },
          })}
          isInvalid={!!errors[name]}
        />
        {password && !errors[name] && (
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

export default TextField;
