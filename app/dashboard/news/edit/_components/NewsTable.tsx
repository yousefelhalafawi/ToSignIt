"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  Button,
  Modal,
  Pagination,
  Container,
  Card,
} from "react-bootstrap";
import { Edit, Trash2 } from "lucide-react";
import styles from "../_style/News.module.scss";
import LoadingComponent from "@/app/_components/common/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/_redux/store";
import { deleteNewsById, fetchAllNews } from "@/app/_redux/slices/newsSlice";
import { formatDate } from "@/app/_utils/uttils";
import {
  errorToast,
  successToast,
} from "@/app/_components/common/alert/AlertTimer";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 8;

export default function NewsTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const {
    newsSlice: { data, loading, error, totalPages },
    authSlice: { token },
  } = useSelector((state: RootState) => state);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllNews({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [currentPage, dispatch]);

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const responseMessage = await dispatch(
          deleteNewsById(itemToDelete)
        ).unwrap();
        successToast(responseMessage);
        setShowDeleteModal(false);
        dispatch(fetchAllNews({ page: currentPage, limit: ITEMS_PER_PAGE }));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || t("newsTab.deleteError");
        errorToast(errorMessage);
        console.error("Error deleting news:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/news/edit/${id}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container>
      <Card className={styles.tableContainer}>
        <Card.Body className="p-0">
          <Table responsive hover className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>{t("newsTab.table.title")}</th>
                <th>{t("newsTab.table.createdAt")}</th>
                <th>{t("newsTab.table.updatedAt")}</th>
                <th>{t("newsTab.table.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item._id} className={styles.tableRow}>
                    <td>{item.title?.slice(0, 20)}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{formatDate(item.updatedAt)}</td>
                    <td>
                      <div className="d-flex justify-content-start gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className={`${styles.actionButton} ${styles.updateButton}`}
                          onClick={() => handleEdit(item._id)}
                        >
                          <span className="d-none d-md-inline">
                            {t("newsTab.table.update")}
                          </span>
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => {
                            setItemToDelete(item._id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <span className="d-none d-md-inline">
                            {t("newsTab.table.delete")}
                          </span>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Pagination className={`justify-content-center ${styles.pagination}`}>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
            className={styles.paginationItem}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className={styles.modal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("newsTab.modal.deleteTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("newsTab.modal.deleteBody")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {t("newsTab.modal.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("newsTab.modal.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
