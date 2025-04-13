"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Modal } from "react-bootstrap";
import { Edit, Trash2 } from "lucide-react";
import styles from "../_style/News.module.scss";
interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "published" | "draft";
}

export default function NewsTable() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Sample News 1",
      description: "This is a sample news item",
      date: "2024-01-02",
      status: "published",
    },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        // Add your delete API call here
        // await deleteNews(itemToDelete);
        setNews(news.filter((item) => item.id !== itemToDelete));
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/news/edit/${id}`);
  };

  return (
    <>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className={styles.actionButton}
                  onClick={() => handleEdit(item.id)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    setItemToDelete(item.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this news item? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
