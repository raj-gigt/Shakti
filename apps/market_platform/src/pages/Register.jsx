import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const [otpSend, setOtpSend] = useState(false);
  const onSubmit = async (data, action) => {
    console.log(data);
    if (action == "otp") {
      setOtpSend(true);
      try {
        console.log(import.meta.env.VITE_BASE_BACKEND);
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_BACKEND}/sendotp`,
          data
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_BACKEND}/signup`,
          data
        );
        console.log("request");

        if (res.data.error) {
          return;
        }

        if (res.data.message === "User created successfully.") {
          localStorage.setItem("accountType", res.data.accountType);
          console.log("success");
          navigate("/login");
        }
      } catch (error) {}
      console.log("hello");
    }
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen pt-3 ">
        <div className="flex flex-col mt-10 items-center justify-center px-6 py-6 mx-auto md:h-[90%] lg:py-0 ">
          <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <div className="flex justify-between items-center ">
                <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </div>
              </div>
              <form className="space-y-4 md:space-y-6" action="/#" noValidate>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Service Connection ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your ID given by DISCOM"
                    {...register("connectionId", {
                      required: "requires ID",
                    })}
                  />
                  <p className="text-red-500">{errors.connectionId?.message}</p>
                </div>
                <div className="flex space-x-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone No.
                    </label>
                    <input
                      type="Text"
                      name="username"
                      id="username"
                      placeholder="XXXXXXXX"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      {...register("PhoneNo", {
                        required: "requires Phone",
                      })}
                    />
                    <p className="text-red-500">{errors.PhoneNo?.message}</p>
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      AccountType
                    </label>
                    <select
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("accountType", { required: true })}
                    >
                      <option value="prosumer">Prosumer</option>
                      <option value="consumer">Consumer</option>
                    </select>
                    <p className="text-red-500">
                      {errors.accountType?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    name="password"
                    id="password"
                    placeholder="Enter username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("username", {
                      required: "requires username",
                    })}
                  />
                  {/* <i onClick={togglePasswordVisiblity} className="dark:invert">
                    {eye}
                  </i>{" "} */}
                  <p className="text-red-500">{errors.username?.message}</p>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password", {
                      required: "requires password",
                    })}
                  />
                  {/* <i onClick={togglePasswordVisiblity} className="dark:invert">
                    {eye}
                  </i>{" "} */}
                  <p className="text-red-500">{errors.password?.message}</p>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    OTP
                  </label>
                  <input
                    type="Text"
                    name="username"
                    id="username"
                    placeholder="XXXXXXXX"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    {...register("otp", {
                      pattern: {
                        value: /^\d+$/,
                        message: "should be a number",
                      },
                      minLength: {
                        value: 6,
                        message: "number of digits should be 6",
                      },
                      maxLength: {
                        value: 6,
                        message: "number of digits should be 6",
                      },
                    })}
                  />
                  <p className="text-red-500">{errors.otp?.message}</p>
                </div>
                <button
                  onClick={handleSubmit((data) => onSubmit(data, "otp"))}
                  className="w-full dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-[#111827] dark:focus:ring-primary-800 dark:border dark:border-[#45464b]"
                >
                  Get Otp (Resend after 1min)
                </button>
                {otpSend ? (
                  <button
                    type="submit"
                    onClick={handleSubmit((data) => onSubmit(data, "register"))}
                    className="w-full dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-[#111827] dark:focus:ring-primary-800 dark:border dark:border-[#45464b]"
                  >
                    Create an account
                  </button>
                ) : null}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/Login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Register;
