"use client";
import React from "react";
import withAuthHOC from "../_Auth/wihAuth";
import SportsNews from "./_components/News";

function page() {
  return (
    <div>
      <SportsNews />
    </div>
  );
}
export default withAuthHOC(page, []);
