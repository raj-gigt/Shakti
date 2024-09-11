import Sidebar from "../components/Sidebar";
import Progress from "../components/Progress";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { accountType } from "../store/atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import axios from "axios";
const Setup = () => {
  const [formval, setFormVal] = useState(0);
  const [width, setWidth] = useState("33%");
  const [accType, setAccType] = useRecoilState(accountType);
  const { register, control, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();
  useEffect(() => {
    const acc = localStorage.getItem("accountType");

    if (acc) {
      setAccType(acc);
    }
  }, []);
  const onSubmit = async (data) => {
    console.log(data);
    let token;
    token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_BACKEND}/setup`,
        data,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.message === "success") {
        console.log("success");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div class="grid grid-cols-5">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div class="col-span-4 relative h-screen">
          <div class="mb-4 text-lg font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white text-center pt-4">
            Setup your Account
          </div>
          <Progress width={width}></Progress>
          <form class=" mx-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
            {formval == 0 ? (
              <div class="flex justify-center mt-5">
                <div class="w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  {accType == "prosumer" ? (
                    <div class="mb-5 ">
                      <label
                        for="base-input"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Solar Capacity
                      </label>
                      <input
                        type="text"
                        id="SolarCapacity"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your solar capacity in W"
                        {...register("solarCapacity", {
                          required: "Please enter your capacity",
                        })}
                      ></input>
                      <p className="text-red-500">
                        {errors.solarCapacity?.message}
                      </p>
                    </div>
                  ) : null}
                  <div class="mb-5 ">
                    <label
                      for="base-input"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Connected Load
                    </label>
                    <input
                      type="text"
                      id="load"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your connected load in kW"
                      {...register("connectedLoad", {
                        required: "Please enter your load",
                      })}
                    ></input>
                    <p className="text-red-500">
                      {errors.connectedLoad?.message}
                    </p>
                  </div>
                  <div class="mb-5 ">
                    <label
                      for="city"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="City"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your city"
                      {...register("city", {
                        required: "Please enter your city",
                      })}
                    ></input>
                    <p className="text-red-500">{errors.city?.message}</p>
                  </div>
                  <div class="mb-5 ">
                    <label
                      for="state"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="State"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your state"
                      {...register("state", {
                        required: "Please enter your state",
                      })}
                    ></input>
                    <p className="text-red-500">{errors.state?.message}</p>
                  </div>
                  <div class="mb-5 ">
                    <label
                      for="state"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your pincode"
                      {...register("pincode", {
                        required: "Please enter your pincode",
                      })}
                    ></input>
                    <p className="text-red-500">{errors.pincode?.message}</p>
                  </div>
                </div>
              </div>
            ) : null}
            {formval == 1 ? (
              <div class="flex justify-center mt-5">
                <div class="w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div class="mb-5 ">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Morning Peak Power Consumption
                    </label>
                    <select
                      id="gps"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("gps", {
                        required: "Please select appropriately",
                      })}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                    <p className="text-red-500">{errors.gps?.message}</p>
                  </div>
                  <div class="mb-5 ">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Solar time power consumption
                    </label>
                    <select
                      id="brand"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("brand", {
                        required: "Please select appropriately",
                      })}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                    <p className="text-red-500">{errors.brand?.message}</p>
                  </div>
                  <div class="mb-5 ">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Evening Peak Power consumption
                    </label>
                    <select
                      id="year"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("year", {
                        required: "Please select appropriately",
                      })}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                    <p className="text-red-500">{errors.year?.message}</p>
                  </div>
                  <div class="mb-5 ">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Night hours power consumption
                    </label>
                    <select
                      id="loadDist"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("loadDist", {
                        required: "Please select appropriately",
                      })}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                    <p className="text-red-500">{errors.loadDist?.message}</p>
                  </div>
                  {accType == "prosumer" ? (
                    <div class="flex space-x-4">
                      <div class="mb-5 ">
                        <label
                          for="state"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Azimuth
                        </label>
                        <input
                          type="text"
                          id="State"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("azimuth", {
                            required: "Please enter your azimuth",
                            pattern: {
                              value:
                                /^(360|3[0-5][0-9]|[12][0-9]{1,2}|[1-9]?[0-9])$/,
                              message: "Invalid azimuth",
                            },
                          })}
                        ></input>
                        <p className="text-red-500">
                          {errors.azimuth?.message}
                        </p>
                      </div>
                      <div class="mb-5 ">
                        <label
                          for="state"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tilt of panel with ground
                        </label>
                        <input
                          type="text"
                          id="State"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register("tilt", {
                            required: "Please enter your tilt",
                            pattern: {
                              value: /^(90|[1-8]?[0-9])$/,
                              message: "invalid tilt",
                            },
                          })}
                        ></input>
                        <p className="text-red-500">{errors.tilt?.message}</p>
                      </div>
                    </div>
                  ) : null}

                  <div class="flex justify-center">
                    <button
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </form>
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 absolute bottom-10 right-10"
            onClick={() => {
              if (formval < 1) {
                setFormVal(formval + 1);
                setWidth(`${parseInt(width) + 33}%`);
              }
            }}
          >
            Next
          </button>
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 absolute bottom-10 left-10"
            onClick={() => {
              if (formval > 0) {
                setFormVal(formval - 1);
                setWidth(`${parseInt(width) - 33}%`);
              }
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default Setup;
