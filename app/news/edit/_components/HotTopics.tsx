"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Modal } from "react-bootstrap";
import { Edit, Trash2 } from "lucide-react";
import styles from "../_style/News.module.scss";
interface HotTopic {
  id: string;
  title: string;
  priority: number;
  date: string;
  status: "active" | "inactive";
}

export default function HotTopicsTable() {
  const router = useRouter();
  const [topics, setTopics] = useState<HotTopic[]>([
    {
      id: "1",
      title: "Hot Topic 1",
      priority: 1,
      date: "2024-01-02",
      status: "active",
    },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        // Add your delete API call here
        // await deleteHotTopic(itemToDelete);
        setTopics(topics.filter((item) => item.id !== itemToDelete));
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error deleting hot topic:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/hot-topics/edit/${id}`);
  };

  return (
    <>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.priority}</td>
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
          <Modal.Title>Delete Hot Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this hot topic? This action cannot be
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
