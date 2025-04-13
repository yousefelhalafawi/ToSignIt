"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import LoadingComponent from "../_components/common/LoadingComponent";

const withAuthHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[] = []
) => {
  return function WithAuthHOCWrapper(props: P) {
    const { token, profileData } = useSelector(
      (state: RootState) => state.authSlice
    );
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      // Handle login/register redirect for authenticated users
      if (token && (pathname === "/login" || pathname === "/register")) {
        router.push("/");
        return;
      }

      // Handle role-based authorization
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(profileData?.role)
      ) {
        router.push("/");
        return;
      }

      // Handle unauthenticated users
      if (!token && !(pathname === "/login" || pathname === "/register")) {
        router.replace("/login");
        return;
      }

      // If all checks pass, allow rendering
      setLoading(false);
      setIsAuthorized(true);
    }, [token, pathname, router, profileData?.role, allowedRoles]);

    if (loading) {
      return <LoadingComponent />;
    }

    return isAuthorized ? (
      <WrappedComponent {...props} />
    ) : (
      <LoadingComponent />
    );
  };
};

export default withAuthHOC;
