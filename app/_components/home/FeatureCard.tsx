import React from "react";
import { Col } from "react-bootstrap";
import Image from "next/image";
import style from "./home.module.scss";

interface FeatureCardProps {
  imgPath: string;
  imgAlt: string;
  header: string;
  phrase: string;
}

export default function FeatureCard({
  imgPath,
  imgAlt,
  header,
  phrase,
}: FeatureCardProps) {
  return (
    <Col md={4} className={style.featureCard}>
      <div className={style.iconWrapper}>
        <Image
          src={imgPath}
          alt={imgAlt}
          width={75}
          height={75}
          className={style.featureIcon}
        />
      </div>
      <div className={style.horizontalLine}></div>
      <div className={style.featureInfo}>
        <h3 className={style.featureHeader}>{header}</h3>
        <p className={style.featurePhrase}>{phrase}</p>
      </div>
    </Col>
  );
}
