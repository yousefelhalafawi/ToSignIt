"use client";

import { Button as BootstrapButton } from "react-bootstrap";
import stylee from "./common.module.scss";

type buttonProps = {
  children: any;
  style?: any;
  link: string;
  className?: any;
};
export default function Button({
  children,
  style,
  link,
  className,
}: buttonProps) {
  return (
    <BootstrapButton href={link} style={style} className={stylee[className]}>
      {children}
    </BootstrapButton>
  );
}
