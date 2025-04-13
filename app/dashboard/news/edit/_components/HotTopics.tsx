"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, Button, Modal, Container, Card } from "react-bootstrap"
import { Edit, Trash2 } from "lucide-react"
import styles from "../_style/News.module.scss"
import LoadingComponent from "@/app/_components/common/LoadingComponent"
import CenterPosition from "@/app/_components/layout/CenterPosition"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/_redux/store"
import { deleteNewsById, fetchSliderNews } from "@/app/_redux/slices/newsSlice"
import { errorToast, successToast } from "@/app/_components/common/alert/AlertTimer"
import { formatDate } from "@/app/_utils/uttils"
import { useTranslation } from "react-i18next"

export default function HotTopicsTable() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const {
    newsSlice: { loading, sliderData },
    authSlice: { token },
  } = useSelector((state: RootState) => state)

  const { t } = useTranslation()

  useEffect(() => {
    if (token && sliderData.length === 0) {
      dispatch(fetchSliderNews())
    }
  }, [token, sliderData.length, dispatch])

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const responseMessage = await dispatch(deleteNewsById(itemToDelete)).unwrap()
        successToast(responseMessage)
        setShowDeleteModal(false)
        dispatch(fetchSliderNews())
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || t("hotTopics.deleteError")
        errorToast(errorMessage)
        console.error("Error deleting news:", error)
      }
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/news/edit/${id}`)
  }

  if (loading) {
    return (
      <CenterPosition>
        <LoadingComponent />
      </CenterPosition>
    )
  }

  return (
    <Container>
      <Card className={styles.tableContainer}>
        <Card.Body className="p-0">
          <Table responsive hover className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>{t("hotTopics.table.title")}</th>
                <th>{t("hotTopics.table.createdAt")}</th>
                <th>{t("hotTopics.table.updatedAt")}</th>
                <th>{t("hotTopics.table.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {sliderData.map((item) => (
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
                        <span className="d-none d-md-inline">{t("hotTopics.table.update")}</span>
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => {
                          setItemToDelete(item._id)
                          setShowDeleteModal(true)
                        }}
                      >
                        <span className="d-none d-md-inline">{t("hotTopics.table.delete")}</span>
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className={styles.modal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("hotTopics.deleteModal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("hotTopics.deleteModal.body")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {t("hotTopics.deleteModal.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("hotTopics.deleteModal.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

