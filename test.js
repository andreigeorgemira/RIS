var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

var option;

const rawData = [
  [100, 200, 300, 400, 500, 600, 700],
  [150, 250, 350, 450, 550, 650, 750],
];

const totalData = [];
for (let i = 0; i < rawData[0].length; ++i) {
  let sum = 0;
  for (let j = 0; j < rawData.length; ++j) {
    sum += rawData[j][i];
  }
  totalData.push(sum);
}
const grid = {
  left: 100,
  right: 130,
  top: 50,
  bottom: 50,
};
const series = ["Video Ad", "Search Engine"].map((name, sid) => {
  return {
    name,
    type: "bar",
    stack: "total",
    barWidth: "60%",
    label: {
      show: true,
      formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
    },
    data: rawData[sid].map((d, did) => (totalData[did] <= 0 ? 0 : d / totalData[did])),
  };
});
option = {
  legend: {
    orient: "vertical",
    right: 0,
    top: "middle",
    selectedMode: true,
  },
  grid,
  yAxis: {
    type: "value",
  },
  xAxis: {
    type: "category",
    data: ["doctor", "doctor", "doctor", "doctor", "doctor", "doctor", "doctor"],
  },
  series,
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
