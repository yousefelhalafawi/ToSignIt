"use client";

import React from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import {
  LogOut,
  User,
  Key,
  Newspaper,
  PlusCircle,
  Edit,
  Contact,
  Building2,
  Boxes,
  House,
  Signature,
  Upload,
  FileCheck2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { LogoutFunction } from "@/app/_redux/slices/authSlice";
import { AppDispatch, RootState } from "@/app/_redux/store";
import { useTranslation } from "react-i18next";

export default function LeftSide() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const path = usePathname();
  const { profileData, userSignature } = useSelector(
    (state: RootState) => state.authSlice
  );

  const navigateTo = (route: string) => router.push(route);
  const isCurrentPath = (route: string) => path.includes(route);

  const handleLogout = () => {
    dispatch(LogoutFunction());
    navigateTo("/");
  };

  const NavigationIcon = ({
    icon: Icon,
    route,
    label,
    subLinks,
  }: {
    icon: React.ElementType;
    route: string;
    label: string;
    subLinks?: Array<{ label: string; route: string; icon: React.ElementType }>;
  }) => (
    <div className="mb-3">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2rem 1fr",
          alignContent: "center",
          cursor: subLinks ? "default" : "pointer",
        }}
        onClick={() => !subLinks && navigateTo(route)}
      >
        <Icon
          size={25}
          className={
            isCurrentPath(route) ? "text-sec w-100" : "text-sec pointer"
          }
        />
        <p
          className="ms-2 fw-bold mb-0"
          style={{
            fontSize: ".8rem",
            alignSelf: "center",
          }}
        >
          {t(label)}
        </p>
      </div>
      {subLinks && (
        <div className="ms-4 mt-2">
          {subLinks.map((subLink) => (
            <div
              key={subLink.route}
              className="d-flex align-items-center mb-2 pointer"
              onClick={() => navigateTo(`/dashboard/${subLink.route}`)}
              style={{ cursor: "pointer" }}
            >
              <subLink.icon
                size={18}
                className={
                  isCurrentPath(subLink.route)
                    ? "text-sec me-2"
                    : "text-sec me-2"
                }
              />
              <span
                className="fw-bold"
                style={{
                  fontSize: ".75rem",
                }}
              >
                {t(subLink.label)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="bg-main-color d-flex flex-column align-items-center py-4"
      style={{
        width: "14rem",
        borderRadius: "0rem 2rem 2rem 0rem",
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <Image
        src="/assets/images/logo.png"
        alt="Signature"
        width={70}
        height={70}
        className="mb-3 pointer"
        onClick={() => navigateTo("/dashboard")}
      />
      <div className="py-3">
        <NavigationIcon label="leftSide.home" icon={House} route="/" />
        {!userSignature && (
          <NavigationIcon
            label="leftSide.signature"
            icon={Signature}
            route="/dashboard/signature"
          />
        )}
        <NavigationIcon
          label="leftSide.profile"
          icon={User}
          route="/dashboard/profile"
        />
        <NavigationIcon
          label="leftSide.password"
          icon={Key}
          route="/dashboard/change-password"
        />
        {profileData?.role === "Admin" && (
          <NavigationIcon
            label="leftSide.news"
            icon={Newspaper}
            route="news"
            subLinks={[
              {
                label: "leftSide.createNews",
                route: "/news",
                icon: PlusCircle,
              },
              {
                label: "leftSide.editNews",
                route: "/news/edit",
                icon: Edit,
              },
            ]}
          />
        )}
        {profileData?.isManager && (
          <NavigationIcon
            label="leftSide.companyManagement"
            icon={Building2}
            route="/dashboard/company"
          />
        )}
        <NavigationIcon
          label="leftSide.packages"
          icon={Boxes}
          route="/dashboard/subscriptions"
        />
        <NavigationIcon
          label="leftSide.contacts"
          icon={Contact}
          route="/dashboard/contacts"
        />
        <NavigationIcon
          label="leftSide.addFile"
          icon={Upload}
          route="/dashboard/SignatureFile"
        />
        <NavigationIcon
          label="leftSide.myDocuments"
          icon={FileCheck2}
          route="/dashboard/documents"
        />
      </div>
      <div className="flex-grow-1" />
      <Button variant="link" className="text-black">
        <LogOut size={20} onClick={handleLogout} />
      </Button>
    </div>
  );
}
