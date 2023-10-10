import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
ChartJS.register();

export const BarComp = ({ data }) => {
  const monthlyBirthDays = new Array(12).fill(0);

  Array.from(data).forEach(({ birthday }) => {
    const month = Number(birthday.substring(5, 7));
    monthlyBirthDays[month]++;
  });

  const orderData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Tələbə Ad günü sayı",
        data: monthlyBirthDays,
        backgroundColor: ["#ecf0f1", "#FF8000", "#f3ba2f", "#2a71d0"],
        borderColor: "gray",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Bar
      className="studentBirthday-bar"  
      data={orderData}
      options={{
        responsive: true,
        plugins: {
          title: {
            text: "Tələbələrin aylıq doğum günü statistıkası",
            display: true,
            font: { size: 20 },
          },
          legend: {
            labels: {
              font: { size: 15 },
            },
          },
        },
      }}
    />
  );
};
