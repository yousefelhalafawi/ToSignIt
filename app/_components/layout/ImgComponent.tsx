import showErrorToast from "@/app/_utils/ErrorMsg";
import React, { forwardRef, useState } from "react";

interface ImgComponentProps {
  id: string; // Unique identifier for the image input
  label: string; // Label for the input
  defaultImage?: string | null; // Default image URL or base64 string
  error?: string; // Error message
  maxFileSizeInMB?: number; // Maximum file size in MB (default: 3MB)
  register: any;
  showErrorToast?: (message: string) => void; // Function to show error messages
  [key: string]: any; // Allow additional props like `register`
}

const ImgComponent = forwardRef<HTMLInputElement, ImgComponentProps>(
  (
    {
      id,
      label,
      defaultImage = null,
      error,
      maxFileSizeInMB = 3,
      showErro,
      register,
      ...props
    },
    ref
  ) => {
    const [previewImage, setPreviewImage] = useState<string | null>(
      defaultImage
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const maxFileSizeInMB = 3; // Maximum file size in MB
      const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024; // Convert MB to bytes

      if (file) {
        if (file.size > maxFileSizeInBytes) {
          showErrorToast(
            "File size exceeds 3MB. Please upload a smaller file."
          );
          e.target.value = ""; // Clear the file input
          setPreviewImage(""); // Clear the preview
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setPreviewImage(base64String); // Show image preview
          // Manually update the Base64 value in the form
          const event = {
            target: { name: "image", value: base64String },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          register("image").onChange(event);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(""); // Clear the preview if no file is selected
      }
    };

    return (
      <div className="mt-4">
        <label htmlFor={id} className="me-2">
          {label}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={ref}
          className="block w-full p-2 border rounded"
          {...props}
        />
        {previewImage && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }
);

ImgComponent.displayName = "ImgComponent";

export default ImgComponent;
