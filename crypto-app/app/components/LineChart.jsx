import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function LineChart({
  coinHistory,
  currentPrice,
  coinName,
  coinChange,
}) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-[50%] mb-10">
      <div>
        <h1 className="font-bold mb-3 text-xl">Line Chart for {coinName}</h1>
        <div>
          <h1 className=" flex flex-row items-center justify-center gap-3">
            Current {coinName} Price:{" "}
            <p className=" text-2xl font-bold">${currentPrice}</p>
          </h1>
          <h1
            className=" flex flex-row items-center justify-center gap-2
          "
          >
            24h Change:
            <p
              className={`text-xl font-bold ${
                coinChange > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {coinChange}%
            </p>
          </h1>
        </div>
      </div>

      <Line data={data} options={options} />
    </div>
  );
}
