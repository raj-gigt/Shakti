import Sidebar from "../components/Sidebar";

import { useEffect, useRef, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { dashboardOptions } from "../constants/constants";
import axios from "axios";
import { Pagination } from "flowbite-react";
axios.defaults.withCredentials = true;
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);
  const timeslotConvert = [
    "00:00-00:15",
    "00:15-00:30",
    "00:30-00:45",
    "00:45-01:00",
    "01:00-01:15",
    "01:15-01:30",
    "01:30-01:45",
    "01:45-02:00",
    "02:00-02:15",
    "02:15-02:30",
    "02:30-02:45",
    "02:45-03:00",
    "03:00-03:15",
    "03:15-03:30",
    "03:30-03:45",
    "03:45-04:00",
    "04:00-04:15",
    "04:15-04:30",
    "04:30-04:45",
    "04:45-05:00",
    "05:00-05:15",
    "05:15-05:30",
    "05:30-05:45",
    "05:45-06:00",
    "06:00-06:15",
    "06:15-06:30",
    "06:30-06:45",
    "06:45-07:00",
    "07:00-07:15",
    "07:15-07:30",
    "07:30-07:45",
    "07:45-08:00",
    "08:00-08:15",
    "08:15-08:30",
    "08:30-08:45",
    "08:45-09:00",
    "09:00-09:15",
    "09:15-09:30",
    "09:30-09:45",
    "09:45-10:00",
    "10:00-10:15",
    "10:15-10:30",
    "10:30-10:45",
    "10:45-11:00",
    "11:00-11:15",
    "11:15-11:30",
    "11:30-11:45",
    "11:45-12:00",
    "12:00-12:15",
    "12:15-12:30",
    "12:30-12:45",
    "12:45-13:00",
    "13:00-13:15",
    "13:15-13:30",
    "13:30-13:45",
    "13:45-14:00",
    "14:00-14:15",
    "14:15-14:30",
    "14:30-14:45",
    "14:45-15:00",
    "15:00-15:15",
    "15:15-15:30",
    "15:30-15:45",
    "15:45-16:00",
    "16:00-16:15",
    "16:15-16:30",
    "16:30-16:45",
    "16:45-17:00",
    "17:00-17:15",
    "17:15-17:30",
    "17:30-17:45",
    "17:45-18:00",
    "18:00-18:15",
    "18:15-18:30",
    "18:30-18:45",
    "18:45-19:00",
    "19:00-19:15",
    "19:15-19:30",
    "19:30-19:45",
    "19:45-20:00",
    "20:00-20:15",
    "20:15-20:30",
    "20:30-20:45",
    "20:45-21:00",
    "21:00-21:15",
    "21:15-21:30",
    "21:30-21:45",
    "21:45-22:00",
    "22:00-22:15",
    "22:15-22:30",
    "22:30-22:45",
    "22:45-23:00",
    "23:00-23:15",
    "23:15-23:30",
    "23:30-23:45",
    "23:45-00:00",
  ];
  const McvandMcp = [
    { timeslot: 1, price: 267, volume: 75 },
    { timeslot: 2, price: 534, volume: 92 },
    { timeslot: 3, price: 489, volume: 68 },
    { timeslot: 4, price: 628, volume: 154 },
    { timeslot: 5, price: 499, volume: 121 },
    { timeslot: 6, price: 410, volume: 135 },
    { timeslot: 7, price: 256, volume: 98 },
    { timeslot: 8, price: 645, volume: 130 },
    { timeslot: 9, price: 590, volume: 111 },
    { timeslot: 10, price: 401, volume: 64 },
    { timeslot: 11, price: 288, volume: 112 },
    { timeslot: 12, price: 325, volume: 76 },
    { timeslot: 13, price: 374, volume: 140 },
    { timeslot: 14, price: 468, volume: 96 },
    { timeslot: 15, price: 590, volume: 125 },
    { timeslot: 16, price: 477, volume: 110 },
    { timeslot: 17, price: 367, volume: 137 },
    { timeslot: 18, price: 564, volume: 94 },
    { timeslot: 19, price: 388, volume: 149 },
    { timeslot: 20, price: 623, volume: 118 },
    { timeslot: 21, price: 446, volume: 107 },
    { timeslot: 22, price: 316, volume: 99 },
    { timeslot: 23, price: 498, volume: 141 },
    { timeslot: 24, price: 622, volume: 127 },
    { timeslot: 25, price: 306, volume: 116 },
    { timeslot: 26, price: 519, volume: 78 },
    { timeslot: 27, price: 431, volume: 133 },
    { timeslot: 28, price: 382, volume: 103 },
    { timeslot: 29, price: 536, volume: 121 },
    { timeslot: 30, price: 413, volume: 95 },
    { timeslot: 31, price: 365, volume: 111 },
    { timeslot: 32, price: 574, volume: 139 },
    { timeslot: 33, price: 295, volume: 87 },
    { timeslot: 34, price: 517, volume: 132 },
    { timeslot: 35, price: 472, volume: 123 },
    { timeslot: 36, price: 609, volume: 115 },
    { timeslot: 37, price: 432, volume: 97 },
    { timeslot: 38, price: 341, volume: 126 },
    { timeslot: 39, price: 516, volume: 109 },
    { timeslot: 40, price: 653, volume: 91 },
    { timeslot: 41, price: 444, volume: 117 },
    { timeslot: 42, price: 481, volume: 120 },
    { timeslot: 43, price: 313, volume: 84 },
    { timeslot: 44, price: 389, volume: 112 },
    { timeslot: 45, price: 556, volume: 125 },
    { timeslot: 46, price: 433, volume: 138 },
    { timeslot: 47, price: 478, volume: 108 },
    { timeslot: 48, price: 498, volume: 131 },
    { timeslot: 49, price: 351, volume: 80 },
    { timeslot: 50, price: 566, volume: 144 },
    { timeslot: 51, price: 329, volume: 119 },
    { timeslot: 52, price: 609, volume: 101 },
    { timeslot: 53, price: 459, volume: 147 },
    { timeslot: 54, price: 523, volume: 104 },
    { timeslot: 55, price: 398, volume: 122 },
    { timeslot: 56, price: 594, volume: 150 },
    { timeslot: 57, price: 372, volume: 93 },
    { timeslot: 58, price: 415, volume: 124 },
    { timeslot: 59, price: 530, volume: 114 },
    { timeslot: 60, price: 487, volume: 128 },
    { timeslot: 61, price: 305, volume: 91 },
    { timeslot: 62, price: 541, volume: 145 },
    { timeslot: 63, price: 389, volume: 98 },
    { timeslot: 64, price: 631, volume: 142 },
    { timeslot: 65, price: 437, volume: 123 },
    { timeslot: 66, price: 513, volume: 97 },
    { timeslot: 67, price: 376, volume: 106 },
    { timeslot: 68, price: 564, volume: 136 },
    { timeslot: 69, price: 452, volume: 116 },
    { timeslot: 70, price: 485, volume: 132 },
    { timeslot: 71, price: 328, volume: 83 },
    { timeslot: 72, price: 499, volume: 102 },
    { timeslot: 73, price: 419, volume: 149 },
    { timeslot: 74, price: 546, volume: 94 },
    { timeslot: 75, price: 391, volume: 140 },
    { timeslot: 76, price: 462, volume: 107 },
    { timeslot: 77, price: 317, volume: 129 },
    { timeslot: 78, price: 581, volume: 146 },
    { timeslot: 79, price: 438, volume: 113 },
    { timeslot: 80, price: 525, volume: 103 },
    { timeslot: 81, price: 359, volume: 95 },
    { timeslot: 82, price: 619, volume: 148 },
    { timeslot: 83, price: 426, volume: 117 },
    { timeslot: 84, price: 487, volume: 135 },
    { timeslot: 85, price: 349, volume: 96 },
    { timeslot: 86, price: 555, volume: 120 },
    { timeslot: 87, price: 432, volume: 110 },
    { timeslot: 88, price: 605, volume: 100 },
    { timeslot: 89, price: 389, volume: 126 },
    { timeslot: 90, price: 539, volume: 133 },
    { timeslot: 91, price: 456, volume: 89 },
    { timeslot: 92, price: 621, volume: 147 },
    { timeslot: 93, price: 406, volume: 105 },
    { timeslot: 94, price: 569, volume: 130 },
    { timeslot: 95, price: 422, volume: 122 },
    { timeslot: 96, price: 483, volume: 142 },
  ];
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
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-5 mt-5">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <caption class="p-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white">
                  Cleared Schedule
                  <p class="mt-1 text-sm font-normal text-gray-500">
                    Cleared market price, volume for tomorrow
                  </p>
                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Timeslot
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Market Cleared Price(MCP)
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Market Cleared Volume(MCV)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {McvandMcp.map((item, index) => {
                    if (index >= 10 * (page - 1) && index < 10 * page) {
                      return (
                        <tr class="bg-white border-b">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {timeslotConvert[item.timeslot - 1]}
                          </th>
                          <td class="px-6 py-4 text-center">{item.price}</td>
                          <td class="px-6 py-4 text-center">{item.volume}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-5">
              <Pagination
                currentPage={page}
                onPageChange={(page) => setPage(page)}
                totalPages={Math.ceil(McvandMcp.length / 10)}
              />
            </div>
            <AgCharts options={dashboardOptions}></AgCharts>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
