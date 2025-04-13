import Image from "next/image";
import React from "react";

export default function LoadingComponent() {
  return (
    <div>
      <Image
        src={"/assets/images/LogoOnlyBorder.png"}
        alt="loading"
        width={100}
        height={100}
        className="d-block"
      />
      <Image
        src={"/assets/images/loader.gif"}
        alt="loading"
        width={100}
        height={100}
        className="d-block"
      />
    </div>
  );
}
