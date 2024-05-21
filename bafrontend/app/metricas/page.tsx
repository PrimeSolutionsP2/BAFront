"use client";

import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";

export default function Page() {
  return (
    <div className="overflow-auto max-h-screen">
      <h2 className="text-var-red">Metricas</h2>
      <div className="flex flex-col gap-10 text-center items-center">
        <BarChart
          chartTitle="Toneladas por departamento"
          labels={["ANT", "CUND", "VALL", "CAU", "CALD"]}
          values={[65, 59, 80, 81, 56]}
        />
        <div className="w-full bg-slate-100">.</div>
        <LineChart
          chartTitle="Toneladas por departamento este mes"
          labels={Array.from({ length: 30 }, (_, i) => `${i + 1}`)}
          values={Array.from({ length: 30 }, () =>
            Math.floor(Math.random() * 100)
          )}
        />
      </div>
    </div>
  );
}
