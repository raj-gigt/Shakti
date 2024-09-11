import React, { useState } from "react";
import Iitmlogo from "../assets/IIT-Madras-01.svg";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div class="min-h-full">
      <nav class="bg-gray-800">
        <div class="mx-auto px-4">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex items-center space-x-6">
                <img src={Iitmlogo} alt="Your Image" class="h-12" />
                <div class="text-3xl ml-2 font-bold text-white">SHAKTI ONE</div>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/dashboard"
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/schedule"
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Schedule
                  </Link>
                  <Link
                    to="/transactions"
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Transactions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
