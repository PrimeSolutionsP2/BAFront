"use client";

import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";

export default function Page() {
  return (
    <div className="overflow-auto max-h-screen">
      <h2 className="text-var-red">Metricas</h2>
      <div className="flex flex-col text-center items-center p-10">
        <BarChart
          chartTitle="Toneladas por departamento"
          labels={["ANT", "CUND", "VALL", "CAU", "CALD"]}
          values={[65, 59, 80, 81, 56]}
        />
        <LineChart
          chartTitle="Toneladas por departamento"
          labels={["ANT", "CUND", "VALL", "CAU", "CALD"]}
          values={[65, 59, 80, 81, 56]}
        />
      </div>
    </div>
  );
}
