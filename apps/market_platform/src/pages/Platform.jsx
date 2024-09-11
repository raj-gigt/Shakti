import BidComp from "../components/BidComp";

import Sidebar from "../components/Sidebar";
import { useRef, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Today from "../components/Today";
import Yesterday from "../components/Yesterday";
const Platform = () => {
  const navigate = useNavigate();
  const [platformStatus, setPlatformStatus] = useState("today");

  return (
    <div>
      <div class="grid grid-cols-5">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div class="p-4 col-span-4">
          <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li class="w-full focus-within:z-10 mr-2">
              <button
                onClick={() => {
                  setPlatformStatus("yesterday");
                }}
                class="rounded-lg inline-block w-full p-4 bg-gray-200 border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Yesterday
              </button>
            </li>
            <li class="w-full focus-within:z-10 rounded-lg">
              <button
                onClick={() => {
                  setPlatformStatus("today");
                }}
                class="rounded-lg inline-block w-full p-4 bg-gray-200 border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Today
              </button>
            </li>
          </ul>
          {platformStatus == "today" ? (
            <Today></Today>
          ) : (
            <Yesterday></Yesterday>
          )}
        </div>
      </div>
    </div>
  );
};
export default Platform;
