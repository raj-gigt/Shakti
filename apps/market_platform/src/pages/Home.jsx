import Sidebar from "../components/Sidebar";

import { useEffect, useRef, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { dashboardOptions } from "../constants/constants";
import axios from "axios";
axios.defaults.withCredentials = true;
const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_BACKEND}/userData`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(res.data.message);
        console.log("sup");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!!userData) {
      const fetchData = async () => {
        let url;
        try {
          console.log(userData);
          url = `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=JPbJp4ghHHwzqeCENv1eTvNvqIrPBSosxy4ldN1W`;
          url += `&module_type=0&losses=14&timeframe=hourly&array_type=0&azimuth=${userData.Azimuth}`;
          url += `&system_capacity=${userData.SolarCapacity}`;
          url += `&tilt=${userData.Tilt}&address=${userData.City}`;
          const res = await axios.get(url);

          console.log(res.data.outputs.ac);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [userData]);
  return (
    <div>
      <div class="grid grid-cols-5">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div class="p-4 col-span-4">
          <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="grid grid-cols-3 gap-4 mb-4">
              <article className="rounded-lg border border-gray-100 bg-white p-6">
                <div>
                  <p className="text-sm text-gray-500">Savings</p>

                  <p className="text-2xl font-medium text-gray-900">$240.94</p>
                </div>

                <div className="mt-1 flex gap-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>

                  <p className="flex gap-2 text-xs">
                    <span className="font-medium"> 67.81% </span>

                    <span className="text-gray-500"> Since last week </span>
                  </p>
                </div>
              </article>

              <article className="rounded-lg border border-gray-100 bg-white p-6">
                <div>
                  <p className="text-sm text-gray-500"></p>

                  <p className="text-2xl font-medium text-gray-900">$240.94</p>
                </div>

                <div className="mt-1 flex gap-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>

                  <p className="flex gap-2 text-xs">
                    <span className="font-medium"> 67.81% </span>

                    <span className="text-gray-500"> Since last week </span>
                  </p>
                </div>
              </article>

              <article className="rounded-lg border border-gray-100 bg-white p-6">
                <div>
                  <p className="text-sm text-gray-500">Profit</p>

                  <p className="text-2xl font-medium text-gray-900">$240.94</p>
                </div>

                <div className="mt-1 flex gap-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>

                  <p className="flex gap-2 text-xs">
                    <span className="font-medium"> 67.81% </span>

                    <span className="text-gray-500"> Since last week </span>
                  </p>
                </div>
              </article>
            </div>
            <AgCharts options={dashboardOptions}></AgCharts>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
