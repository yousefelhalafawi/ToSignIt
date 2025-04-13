"use client";
import React from "react";

import ContactForm from "../_components/contact-us/ContactFrom";
import Image from "next/image";

function ContactPage() {
  return (
    <main>
      <div className="container py-4 ">
        <div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
