import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("session")) navigate("sign");
    else navigate("contact");
  }, [navigate]);
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Outlet />
    </Suspense>
  );
}
