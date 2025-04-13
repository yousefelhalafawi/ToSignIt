"use client";
import React, { useState } from "react";
import styles from "../_style/pdfSign.module.scss";
import PhoneNumber from "@/app/_components/common/PhoneNumber";
import { fetchContacts } from "../../contacts/utils";
import { useTranslation } from "react-i18next";

export default function AddContact({
  setSearchQuery,
  searchQuery,
  setPhoneNumber,
  phoneNumber,
  findContact,
  setShowContactModal,
  token,
}: {
  setSearchQuery: (arg: string) => void;
  searchQuery: string;
  setPhoneNumber: (arg: string) => void;
  phoneNumber: string;
  findContact: VoidFunction;
  setShowContactModal: (arg: boolean) => void;
  token: string;
}) {
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<any[]>([]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      setEmailError(t("addContact.emailRequired"));
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError(t("addContact.invalidEmailFormat"));
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleFindContact = () => {
    if (validateEmail(searchQuery)) {
      findContact();
    }
  };

  const handleFetchContacts = async () => {
    try {
      const { data } = await fetchContacts({
        token,
        limit: 100,
        page: 1,
      });
      setContacts(data?.contacts || [t("addContact.noContactsFound")]);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{t("addContact.title")}</h2>
        <div className={styles.searchInputWrapper}>
          <input
            type="email"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder={t("addContact.enterEmail")}
            className={styles.searchInput}
          />
          {emailError && <span style={{ color: "red" }}>{emailError}</span>}
        </div>
        <PhoneNumber
          element={{
            label: t("addContact.phoneNumber"),
            name: "phoneNumber",
            required: true,
          }}
          defaultValue={phoneNumber}
          setValue={(_: any, val: any) => setPhoneNumber(val)}
          showContactIcon={true}
          onContactIconClick={handleFetchContacts}
          contacts={contacts}
          onContactSelect={(contact: any) => {
            setSearchQuery(contact.contactEmail); // Update email field
            validateEmail(contact.contactEmail); // Validate the selected email
          }}
        />
        <div className={styles.modalActions}>
          <button
            onClick={handleFindContact}
            className={styles.findButton}
            disabled={!!emailError}
          >
            {t("addContact.addContactButton")}
          </button>
          <button
            onClick={() => setShowContactModal(false)}
            className={styles.closeModalButton}
          >
            {t("addContact.closeButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
