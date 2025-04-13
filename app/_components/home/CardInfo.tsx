import React from "react";
import { Card } from "react-bootstrap";

export default function CardInfo({ style, number, head, pharse }: any) {
  return (
    <Card className={`${style["box"]} w-100 border-0 shadow-sm ms-2`}>
      <Card.Body>
        <h5>
          <span>{number}</span> {head}
        </h5>
        <p className="text-muted">{pharse}</p>
      </Card.Body>
    </Card>
  );
}
