import { Chart } from "react-google-charts";

const Histogram = ({heading,data}) => {
  return (
    <div>
      <h2 className="text-center text-xl font-bold text-gray-700">
       {heading}
      </h2>
      <p className="text-center text-sm opacity-60">Polarity score est entre -1 et 1, une valeur proche de 1 signifie un commentaire positif </p>
      <Chart
        chartType="Histogram"
        width="100%"
        height="400px"
        data={data}
        options={{
          legend: { position: "none" },
        }}
      />
    </div>
  );
};

export default Histogram;
