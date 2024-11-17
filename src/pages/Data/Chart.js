import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const HousingChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchHousingData = async () => {
      try {
        const response = await fetch(
          "https://www150.statcan.gc.ca/n1/tbl/csv/1810020501-eng.zip"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        // Parse the CSV or JSON data as needed (assume it's CSV for this example)
        const csvData = await response.text();
        const rows = csvData.split("\n").slice(1); // Skip header
        const data = rows.map((row) => row.split(","));
        
        const labels = data.map((row) => row[0]); // Extract time labels
        const prices = data.map((row) => parseFloat(row[1])); // Extract price indices

        setChartData({
          labels,
          datasets: [
            {
              label: "Housing Price Index",
              data: prices,
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching housing data:", error);
      }
    };

    fetchHousingData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Canadian Housing Price Index</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default HousingChart;
