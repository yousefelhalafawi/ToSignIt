"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Edit2, Edit3 } from "lucide-react";
import styles from "./_style/signature.module.scss";
import DrawSignature from "./_components/DrawSignature";
import SignatureForm from "./_components/WriteSignature/SignatureForm";
import withAuthHOC from "@/app/_Auth/wihAuth";

function SignatureCSR() {
  const [key, setKey] = useState<string>("draw");

  return (
    <div className={styles.signatureContainer}>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k || "draw")}
        className="mb-4"
      >
        <Tab
          eventKey="draw"
          title={
            <span>
              <Edit3 />
              Draw Signature
            </span>
          }
        >
          <DrawSignature />
        </Tab>
        <Tab
          eventKey="type"
          title={
            <span>
              <Edit2 />
              Write Signature
            </span>
          }
        >
          <SignatureForm />
        </Tab>
      </Tabs>
    </div>
  );
}
export default withAuthHOC(SignatureCSR, []);
