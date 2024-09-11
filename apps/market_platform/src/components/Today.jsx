import { useEffect, useState } from "react";
import TodayGraph from "./TodayGraph";
import { useForm } from "react-hook-form";
import Platform from "../pages/Platform";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRecoilState } from "recoil";
import {
  platformModal,
  priceAtom,
  selectedStartNodeData,
  data,
  rangeMode,
  selectedEndNodeData,
} from "../store/atoms";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
const Today = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [price, setPrice] = useRecoilState(priceAtom);
  const [modal, setModal] = useRecoilState(platformModal);
  const [startNode, setStartNode] = useRecoilState(selectedStartNodeData);
  const [isRange, setIsRange] = useRecoilState(rangeMode);
  const [endNode, setEndNode] = useRecoilState(selectedEndNodeData);
  const [data1, setData] = useRecoilState(data);
  const [successModal, setSuccessModal] = useState(false);
  const { register, control, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  function onCloseModal() {
    setModal(false);
    // setEmail("");
  }

  const onSubmit = (data) => {
    if (isRange) {
      const startindex = data1.findIndex(
        (item) => item.timeslot === startNode?.timeslot
      );
      const endindex = data1.findIndex(
        (item) => item.timeslot === endNode?.timeslot
      );
      const arr = data1.map((item, index) => {
        if (index >= startindex && index <= endindex) {
          return {
            timeslot: item.timeslot,
            price: parseFloat(data.price),
            volume: parseFloat(data.volume),
          };
        } else {
          return item;
        }
      });
      setData(arr);
      setIsRange(false);
      setStartNode(null);
      setEndNode(null);
    } else {
      const dataindex = data1.findIndex(
        (item) => item.timeslot === startNode?.timeslot
      );
      console.log(dataindex);
      let data1copy = [...data1];
      data1copy[dataindex] = {
        timeslot: startNode.timeslot,
        price: parseInt(data.price),
        volume: parseInt(data.volume),
      };
      setStartNode(null);
      setData(data1copy);
    }
  };
  return (
    <div class="h-screen">
      <TodayGraph></TodayGraph>
      {/* <PlatformModal></PlatformModal> */}
      <Modal show={modal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {isRange ? (
              <h3 className="text-xl font-medium text-gray-900 dark:text-white text-align-center">
                Change data for this time range {startNode?.timeslot} -{" "}
                {endNode?.timeslot}
              </h3>
            ) : (
              <h3 className="text-xl font-medium text-gray-900 dark:text-white text-align-center">
                Change data for this timeslot {startNode?.timeslot}
              </h3>
            )}
            <form
              className="space-y-4 md:space-y-6"
              action="/#"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                {isRange ? (
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter constant price for each 15min slot in this range
                  </label>
                ) : (
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price(price for total volume in this 15min timeslot in INR)
                  </label>
                )}
                <input
                  type="number"
                  name="connectionid"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter price"
                  {...register("price", {
                    required: "requires price",
                  })}
                />
                <p className="text-red-500">{errors.price?.message}</p>
              </div>
              <div>
                {isRange ? (
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter constant volume for each 15min slot(in kWh)
                  </label>
                ) : (
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Volume (in kWh)
                  </label>
                )}
                <input
                  type="number"
                  name="username"
                  id="volume"
                  placeholder="Enter volume"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("volume", {
                    required: "requires volume",
                  })}
                />
                <p className="text-red-500">{errors.volume?.message}</p>
              </div>
              {isRange ? (
                <button
                  type="submit"
                  className="w-full dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-[#111827] dark:focus:ring-primary-800 dark:border dark:border-[#45464b]"
                >
                  Change this range
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-[#111827] dark:focus:ring-primary-800 dark:border dark:border-[#45464b]"
                >
                  Change this node
                </button>
              )}
            </form>
            {!isRange ? (
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  OR
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsRange(true);
                    setModal(false);
                  }}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                >
                  Select ending node to change values for a range
                </button>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={confirmModal}
        size="md"
        onClose={() => setConfirmModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to submit these bids?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={async () => {
                  setConfirmModal(false);
                  try {
                    const res = await axios.post(
                      `${process.env.REACT_APP_BASE_BACKEND}/placebid/dayahead`,
                      { arr: data1 },
                      {
                        headers: {
                          Authorization: `${localStorage.getItem("token")}`,
                        },
                      }
                    );
                    console.log(res.data.message);
                    if (res.data.message == "bid placed") {
                      setSuccessModal(true);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setConfirmModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={successModal}
        size="sm"
        onClose={() => setSuccessModal(false)}
      >
        <Modal.Header>Successful</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your bids have been submitted successfully!!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSuccessModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
      <div class="flex justify-center">
        <button
          type="button"
          onClick={async () => {
            setConfirmModal(true);
          }}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit bids
        </button>
      </div>
    </div>
  );
};
export default Today;
