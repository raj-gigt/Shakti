export const platformOptions = {
  zoom: {
    enabled: true,
    rangeX: {
      start: "00:00-00:15",
      end: "02:00-02:15",
    },
    enableSelecting: true,
  },
  data: [],
  height: 700,
  title: {
    text: "Your Bids",
    fontSize: 28,
  },
  subtitle: {
    text: "Double click on node to change that value or single click on starting and ending node to change data for the range. Click and drag to select a range for zooming",
  },
  series: [
    {
      type: "line",
      xKey: "timeslot",
      yKey: "price",
      yName: "Price(in Rupee)",
      strokeWidth: 5,

      listeners: {
        nodeClick: (event) => {
          var datum = event.datum;
        },
        nodeDoubleClick: (event) => {
          var datum = event.datum;
        },
      },
    },
    {
      type: "line",
      xKey: "timeslot",
      yKey: "volume",
      yName: "Volume (kWh)",
      strokeWidth: 5,

      listeners: {
        nodeClick: (event) => {
          var datum = event.datum;
        },
        nodeDoubleClick: (event) => {
          var datum = event.datum;
        },
      },
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      label: {
        rotation: 80,
        minSpacing: 10,
      },
    },
    {
      type: "number",
      position: "left",
      keys: ["volume"],
      title: {
        text: "Volume (kWh)",
      },
    },
    {
      type: "number",
      position: "right",
      keys: ["price"],
      title: {
        enabled: true,
        text: "Price(in Rupee)",
      },
    },
  ],
};
export const yesterdayPlatformOptions = {
  zoom: {
    enabled: true,
    rangeX: {
      start: "00:00-00:15",
      end: "02:00-02:15",
    },
    enableSelecting: true,
  },
  data: [],
  height: 700,
  title: {
    text: "Your Confirmed Bids",
    fontSize: 28,
  },

  series: [
    {
      type: "line",
      xKey: "TimeSlot",
      yKey: "Price",
      yName: "Price(in Rupee)",
      strokeWidth: 5,
    },
    {
      type: "line",
      xKey: "TimeSlot",
      yKey: "Volume",
      yName: "Volume (kWh)",
      strokeWidth: 5,
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      label: {
        rotation: 80,
        minSpacing: 10,
      },
    },
    {
      type: "number",
      position: "left",
      keys: ["Volume"],
      title: {
        text: "Volume (kWh)",
      },
    },
    {
      type: "number",
      position: "right",
      keys: ["Price"],
      title: {
        enabled: true,
        text: "Price(in Rupee)",
      },
    },
  ],
};
export const dashboardOptions = {
  title: {
    text: "Your Production volume last month",
  },
  height: 700,
  data: [
    { day: 1, volume: 298 },
    { day: 2, volume: 312 },
    { day: 3, volume: 290 },
    { day: 4, volume: 305 },
    { day: 5, volume: 315 },
    { day: 6, volume: 297 },
    { day: 7, volume: 300 },
    { day: 8, volume: 310 },
    { day: 9, volume: 295 },
    { day: 10, volume: 320 },
    { day: 11, volume: 288 },
    { day: 12, volume: 315 },
    { day: 13, volume: 302 },
    { day: 14, volume: 310 },
    { day: 15, volume: 293 },
    { day: 16, volume: 308 },
    { day: 17, volume: 299 },
    { day: 18, volume: 312 },
    { day: 19, volume: 285 },
    { day: 20, volume: 318 },
    { day: 21, volume: 304 },
    { day: 22, volume: 300 },
    { day: 23, volume: 305 },
    { day: 24, volume: 298 },
    { day: 25, volume: 315 },
    { day: 26, volume: 297 },
    { day: 27, volume: 310 },
    { day: 28, volume: 305 },
    { day: 29, volume: 299 },
    { day: 30, volume: 303 },
  ],
  series: [
    {
      type: "line",
      xKey: "day",
      xName: "Day",
      yKey: "volume",
      yName: "Volume(in kWh)",
      interpolation: { type: "smooth" },
    },
  ],
  axes: [
    {
      type: "number",
      position: "left",
      keys: ["volume"],
      title: {
        text: "Volume (kWh)",
      },
    },
    {
      type: "number",
      position: "bottom",
      title: {
        text: "Day",
      },
    },
  ],
};
