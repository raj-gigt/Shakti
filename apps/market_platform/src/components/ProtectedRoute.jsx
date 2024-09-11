import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let res;
    const reqfunc = async () => {
      try {
        res = await axios.get(
          `${import.meta.env.VITE_BASE_BACKEND}/setupstatus`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
      const status = res.data.status;
      console.log(status);
      console.log(`token: ${localStorage.getItem("token")}`);
      if (!!token) {
        if (!status) {
          console.log("sup");
          navigate("/login");
        }
      }
    };
    reqfunc();
  }, [location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
