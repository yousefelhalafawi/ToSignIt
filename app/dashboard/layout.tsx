"use client";

import withAuthHOC from "../_Auth/wihAuth";
import LeftSide from "../_components/dashboard/leftSide";

function Layout({ children }: any) {
  return (
    <>
      <div
        className="d-flex min-vh-100 overflow-hidden"
        style={{
          // backgroundColor: "#F5F5F5",
          background: "linear-gradient(rgb(246, 245, 255), rgb(250 249 249))",
        }}
      >
        <LeftSide />
        <div className="widthOfLayout">{children}</div>
      </div>
    </>
  );
}

export default withAuthHOC(Layout, []);
