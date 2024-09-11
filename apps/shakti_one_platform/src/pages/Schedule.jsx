import { useState } from "react";
import NavBar from "../components/NavBar";
import { McvandMcp, timeslotConvert } from "../constants/constants";
import { Datepicker } from "flowbite-react";
import axios from "axios";
const Schedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [mcvandmcp, setmcvandmcp] = useState(McvandMcp);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async () => {
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_BACKEND
        }/discom/aggregated/clearedschedule`,
        {
          params: {
            date: schedule,
          },
          headers: {
            username: username,
            password: password,
          },
        }
      );
      setmcvandmcp(res.data.message);
    } catch (error) {
      console.log(error);
    }
    console.log(schedule);
  };
  return (
    <div>
      <NavBar></NavBar>
      <div class="flex space-x-4 items-center justify-center mt-5">
        <label class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Select Schedule Date:
        </label>
        <Datepicker
          theme={{
            root: {
              base: "relative",
            },
            popup: {
              root: {
                base: "absolute top-10 z-50 block pt-2",
                inline: "relative top-0 z-auto",
              },
            },
            views: {
              days: {
                items: {
                  item: {
                    selected: "bg-cyan-600 text-white hover:bg-cyan-600",
                  },
                },
              },
            },
          }}
          onSelectedDateChanged={(date) => {
            const dateString = formatDate(date);
            setSchedule(dateString);
          }}
        ></Datepicker>
      </div>
      <div class="flex justify-center pt-5">
        <button
          type="button"
          onClick={handleSubmit}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          View Schedule
        </button>
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
            {mcvandmcp.map((item, index) => {
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Schedule;
