import React, { useEffect, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import { platformOptions } from "../constants/constants";
import "ag-charts-enterprise";
import { useRecoilState } from "recoil";
import { platformModal } from "../store/atoms";
import { selectedStartNodeData } from "../store/atoms";
import { data, rangeMode, selectedEndNodeData } from "../store/atoms";
const TodayGraph = () => {
  const [options, setOptions] = useState(platformOptions);
  const [modal, setModal] = useRecoilState(platformModal);
  const [startNode, setStartNode] = useRecoilState(selectedStartNodeData);
  const [data1, setData] = useRecoilState(data);
  const [endNode, setEndNode] = useRecoilState(selectedEndNodeData);
  const [isRange, setIsRange] = useRecoilState(rangeMode);
  const singleClick = useMemo(() => {
    return (event) => {
      let data = event.datum;

      if (!isRange) {
        setStartNode(data);
        setModal(true);
      } else if (isRange) {
        const startindex = data1.findIndex(
          (item) => item.timeslot === startNode?.timeslot
        );
        const endindex = data1.findIndex(
          (item) => item.timeslot === data?.timeslot
        );
        if (endindex >= startindex) {
          setEndNode(data);
          setModal(true);
        }
      }
    };
  }, [isRange, setModal, setStartNode, setEndNode]);

  useEffect(() => {
    let optionscopy = { ...options };
    setModal(false);
    optionscopy.series.map((item, index) => {
      item.listeners.nodeClick = singleClick;
    });

    setOptions(optionscopy);
  }, [isRange]);
  useEffect(() => {
    setModal(false);
    let optionscopy = { ...options };
    optionscopy.data = data1;

    setOptions(optionscopy);
  }, [data1, singleClick]);

  return <AgCharts options={options} />;
};

export default TodayGraph;
