import NavBar from "../components/NavBar";
import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { McvandMcp, timeslotConvert } from "../constants/constants";
import axios from "axios";
const Transactions = () => {
  const [Transdetails, setTransdetails] = useState({
    connectionId: null,
    startDate: null,
    endDate: null,
  });
  const [Transactions, setTransactions] = useState(null);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async () => {
    try {
      const { connectionId, startDate, endDate } = Transdetails;
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_BACKEND}/discom/getTransactions`,
        {
          params: {
            connectionId: connectionId,
            startDate: startDate,
            endDate: endDate,
          },

          headers: {
            username: username,
            password: password,
          },
        }
      );
      setTransactions(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(Transactions);
  }, [Transactions]);
  return (
    <div>
      <NavBar></NavBar>
      <form class="flex justify-center mt-5 space-x-4">
        <div class="flex space-x-4 items-center">
          <label
            for="first_name"
            class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            ConnectionId
          </label>
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Connection ID for user"
            required
            onChange={(e) => {
              let transdetailscopy = { ...Transdetails };
              transdetailscopy.connectionId = e.target.value;
              setTransdetails(transdetailscopy);
            }}
          />
        </div>
        <div class="flex space-x-4 items-center">
          <label class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            Start Date
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
              let transdetailscopy = { ...Transdetails };
              const dateString = formatDate(date);
              transdetailscopy.startDate = dateString;
              setTransdetails(transdetailscopy);
            }}
          ></Datepicker>
        </div>
        <div class="flex space-x-4 items-center">
          <label class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            End Date
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
              let transdetailscopy = { ...Transdetails };
              const dateString = formatDate(date);
              transdetailscopy.endDate = dateString;

              setTransdetails(transdetailscopy);
            }}
          ></Datepicker>
        </div>
      </form>
      <div class="flex justify-center pt-5">
        <button
          type="button"
          onClick={handleSubmit}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          View Transactions
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
        {Transactions ? (
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <caption class="p-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white">
              Transactions
              <p class="mt-1 text-sm font-normal text-gray-500">
                transactions in market for the date range:
              </p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-center">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Timeslot
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  SellerId
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  BuyerId
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Volume
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {Transactions.map((item, index) => {
                return (
                  <tr class="bg-white border-b">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.date}
                    </th>
                    <td class="px-6 py-4 text-center">
                      {timeslotConvert[item.timeslot - 1]}
                    </td>
                    <td class="px-6 py-4 text-center">{item.SellerId}</td>

                    <td class="px-6 py-4 text-center">{item.BuyerId}</td>
                    <td class="px-6 py-4 text-center">{item.Volume}</td>
                    <td class="px-6 py-4 text-center">{item.Price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};
export default Transactions;
