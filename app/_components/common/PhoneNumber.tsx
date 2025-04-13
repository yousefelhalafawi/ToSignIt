import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { t } from "i18next";
import { Form } from "react-bootstrap";
import { Contact } from "lucide-react";

function PhoneNumber({
  element,
  errors,
  register,
  setValue,
  defaultValue,
  showContactIcon,
  onContactIconClick,
  contacts,
  onContactSelect,
}: any) {
  const [phone, setPhone] = useState(defaultValue ? defaultValue : "");
  const [isValid, setIsValid] = useState(true);
  const [showContacts, setShowContacts] = useState(false);

  const handleChange = (phone: string) => {
    setPhone(phone);
    setValue(element.name, phone);
    const valid = true;
    setIsValid(valid);
    if (typeof register === "function") {
      register(element.name, {});
    }
  };

  return (
    <div className="my-1" style={{ position: "relative" }}>
      {element.label && <Form.Label>{element.label}</Form.Label>}

      <div style={{ position: "relative" }}>
        <PhoneInput
          style={{ width: "100%" }}
          defaultCountry="fr"
          value={phone}
          onChange={handleChange}
        />

        {showContactIcon && (
          <button
            style={{
              position: "absolute",
              right: "35px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={() => {
              setShowContacts(!showContacts);
              onContactIconClick?.();
            }}
          >
            <Contact size={18} className="text-primary" />
          </button>
        )}
      </div>

      {showContacts && contacts?.length > 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "100%",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {contacts.map((contact: any) => (
            <div
              key={contact._id}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => {
                handleChange(contact.contactNumber);
                setShowContacts(false);
                onContactSelect?.(contact); // Call the callback here
              }}
            >
              <div>{contact.contactUserName}</div>
              <small className="text-muted">{contact.contactEmail}</small>
            </div>
          ))}
        </div>
      )}
      {showContacts && contacts?.length === 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "100%",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <div></div>
        </div>
      )}

      {!isValid && errors[element.name]?.type === "validate" && (
        <div className="text-danger">{t("Invalid format")}</div>
      )}
    </div>
  );
}

export default PhoneNumber;
