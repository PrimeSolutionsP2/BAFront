"use client"

import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export interface BarChartProps {
  chartTitle: string
  labels: string[];
  values: number[];
  activeMonth: string;
  activeDepartment: string;
}

export default function LineChart(props: BarChartProps) {
  
  const chartRef = useRef(null);

  useEffect(() => {
    if(chartRef.current){
      if(chartRef.current.chart){
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");
      const newChart = new Chart(context, {
        type: "line",
        data: {
          labels: props.labels,
          datasets: [
            {
              label: props.chartTitle,
              data: props.values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)"
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 99, 132)",
                "rgb(255, 99, 132)",
                "rgb(255, 99, 132)",
                "rgb(255, 99, 132)",
                "rgb(255, 99, 132)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          // responsive: true,
          scales: {
            x: {
              type: "category"
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });

      chartRef.current.chart = newChart;
    }
  },[props.activeMonth, props.activeDepartment])
  
  return (
    <div style={{position: "relative", width: "90%", height: "80vh"}}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}