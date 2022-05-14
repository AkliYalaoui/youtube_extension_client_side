import { Chart } from "react-google-charts";

const DonutChart = ({heading,data}) => {
  return (
    <div>
      <h2 className="text-center text-xl font-bold text-gray-700">
        {heading}
      </h2>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={{
            pieHole: 0.4,
            is3D: false,
          }}
      />
    </div>
  );
};

export default DonutChart;
