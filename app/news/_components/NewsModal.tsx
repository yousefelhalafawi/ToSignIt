import { Modal, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import styles from "../_style/NewsModal.module.scss";
import { formatDate } from "@/app/_utils/uttils";
import { useTranslation } from "react-i18next";

interface NewsModalProps {
  show: boolean;
  onHide: () => void;
  newsItem: Record<string, any> | null;
}

export default function NewsModal({ show, onHide, newsItem }: NewsModalProps) {
  if (!newsItem) return null;
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className={styles.newsModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{newsItem.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.imageContainer}>
          <Image
            src={newsItem.media}
            alt={newsItem.title}
            layout="fill"
            objectFit="contain"
            className={styles.newsImage}
          />
        </div>
        <div className={styles.newsInfo}>
          <Badge bg="primary" className={styles.category}>
            {newsItem.category}
          </Badge>
          <p className={styles.date}>
            Published on: {formatDate(newsItem.createdAt)}
          </p>
        </div>
        <h2 className={styles.newsTitle}>{newsItem.title}</h2>
        <p className={styles.newsContent}>
          {newsItem.newsData ||
            "No additional content available for this news item. No additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news itemNo additional content available for this news item"}
        </p>
        {newsItem.url && (
          <a
            href={newsItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readMore}
          >
            {t("news.Read full article")}
          </a>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("news.Close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
