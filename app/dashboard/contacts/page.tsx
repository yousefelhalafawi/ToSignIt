"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Search,
  Phone,
  Mail,
  Grid,
  List,
  MoreVertical,
  Trash2,
} from "lucide-react";
import styles from "./_style/contacts.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { deleteContact, fetchContacts } from "./utils";
import ContactModal from "./_components/ContactModal";
import Pagination from "@/app/news/_components/Pagination";
import LoadingSpinner from "@/app/_components/layout/LoadingSpinner";
import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import CenterPosition from "@/app/_components/layout/CenterPosition";
import LoadingComponent from "@/app/_components/common/LoadingComponent";
import { useTranslation } from "react-i18next";

export default function Contacts() {
  const [contactsData, setContacts] = useState<Record<any, string> | any>({});
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const { token } = useSelector((state: RootState) => state.authSlice);
  const [isPending, startTransition] = useTransition();
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    startTransition(async () => {
      try {
        const { data } = await fetchContacts({
          token,
          limit: 9,
          page: currentPage,
        });
        setContacts(data);
      } catch (err: any) {
        console.error("Error fetching contacts:", err);
        errorToast(t("contacts.errorFetching"));
      }
    });
  }, [currentPage, refetch]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.contactsWrapper}>
      <div className={styles.header}>
        <div>
          <h1>{t("contacts.title")}</h1>
          <span className={styles.subtitle}>{t("contacts.subtitle")}</span>
        </div>
        <button
          className={`${styles["button-6"]}`}
          role="button"
          onClick={() => setShowNewContactModal(true)}
        >
          {t("contacts.newContact")}
        </button>
      </div>
      {isPending ? (
        <CenterPosition>
          <LoadingComponent />
        </CenterPosition>
      ) : (
        <div className="row g-4">
          {contactsData?.contacts?.map((contact: Record<string, any>) => (
            <div key={contact._id} className="col-md-6 col-lg-4 col-xl-4">
              <div className={styles.contactCard}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className={styles.contactInfo}>
                    <div className={styles.name}>{contact.contactUserName}</div>
                  </div>

                  <div className="dropdown">
                    <button
                      className="btn btn-link p-0"
                      data-bs-toggle="dropdown"
                    >
                      <MoreVertical size={20} />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={async () => {
                            await deleteContact({
                              id: contact._id,
                              token,
                            });
                            setRefetch((prev) => !prev);
                          }}
                        >
                          <Trash2 size={16} className="me-2" />
                          {t("contacts.delete")}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.contactDetails}>
                  <a href={`tel:${contact.contactPhoneNumber}`}>
                    <Phone size={16} />
                    {contact.contactPhoneNumber}
                  </a>
                  <a href={`mailto:${contact.contactEmail}`}>
                    <Mail size={16} />
                    {contact.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {contactsData?.contacts?.length === 0 && (
        <h5 style={{ textAlign: "center" }}>{t("contacts.noContacts")}</h5>
      )}
      {/* New Contact Modal */}
      <ContactModal
        setShowNewContactModal={setShowNewContactModal}
        showNewContactModal={showNewContactModal}
        token={token}
        setRefetch={setRefetch}
      />
      {/* Pagination */}
      {!isPending && (
        <Pagination
          currentPage={currentPage}
          totalPages={contactsData.totalPages}
          paginate={paginate}
        />
      )}
      {showNewContactModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
