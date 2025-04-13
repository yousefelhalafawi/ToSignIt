"use client";

import withAuthHOC from "@/app/_Auth/wihAuth";
import SignaturePad from "./_components/PdfSign";

function SignaturePage() {
  return (
    <div className="p-6">
      <SignaturePad />
    </div>
  );
}

export default withAuthHOC(SignaturePage, []);
