import React, { useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import DownloadableImageWithText from "./TransparentImage";
import { colorOptions } from "../../_utils/utils";

const SignatureForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [selectedFont, setSelectedFont] = useState("serif");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [loading, setLoading] = useState(false);
  const fonts = [
    { value: "serif", label: "Serif" },
    { value: "sans-serif", label: "Sans Serif" },
    { value: "Satisfy", label: "Satisfy" },
    { value: "monospace", label: "Monospace" },
    { value: "Dancing Script, sans-serif", label: "Dancing Script" },
    { value: "Cedarville Cursive, sans-serif", label: "Cedarville Cursive" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    {
      value: "'Shadows Into Light Two', serif",
      label: "Shadows Into Light Two",
    },
    { value: "'Courier New', monospace", label: "Courier New" },
    { value: "'Georgia', serif", label: "Georgia" },
    { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
    { value: "'Lucida Sans', sans-serif", label: "Lucida Sans" },
    {
      value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      label: "Palatino Linotype",
    },
    { value: "'Comic Sans MS', cursive, sans-serif", label: "Comic Sans MS" },
    { value: "'Impact', sans-serif", label: "Impact" },
    { value: "'Tahoma', sans-serif", label: "Tahoma" },
    {
      value: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
      label: "Gill Sans",
    },
    { value: "'Lucida Console', Monaco, monospace", label: "Lucida Console" },
    { value: "'Brush Script MT', cursive", label: "Brush Script" },
    { value: "'Roboto', sans-serif", label: "Roboto" },
    { value: "'Open Sans', sans-serif", label: "Open Sans" },
    { value: "'Lato', sans-serif", label: "Lato" },
    { value: "'Montserrat', sans-serif", label: "Montserrat" },
    { value: "'Poppins', sans-serif", label: "Poppins" },
    { value: "'Ubuntu', sans-serif", label: "Ubuntu" },
  ];

  const validateName = (value: any) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (value.length > 50) {
      setNameError("Name must be less than 50 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
    if (nameError) {
      validateName(value);
    }
  };

  return (
    <div className="container mt-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={() => validateName(name)}
            isInvalid={!!nameError}
            placeholder="Enter your name"
          />
          <Form.Control.Feedback type="invalid">
            {nameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Font</Form.Label>
          <Form.Select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Color</Form.Label>
          <Form.Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>

      {
        <div className="mt-4 p-3  rounded">
          <p
            style={{ fontFamily: selectedFont, color: selectedColor }}
            className="h4 mb-0"
          >
            <div>
              <DownloadableImageWithText
                text={name}
                color={selectedColor}
                fontFamily={selectedFont}
              />
            </div>
          </p>
        </div>
      }
    </div>
  );
};

export default SignatureForm;
