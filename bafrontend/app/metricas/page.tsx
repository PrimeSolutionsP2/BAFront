"use client";

import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import { useEffect, useState } from "react";

export default function Page() {
  const [activeMonth, setActiveMonth] = useState("Enero");
  const [activeDepartment, setActiveDepartment] = useState("ANT");
  const [tonsPerMonthDepartmentMonth, setTonsPerMonthDepartmentMonth] =
    useState("Enero");
  const [tonsPerMonthDepartmen, setTonsPerMonthDepartment] = useState(Array.from({ length: 33 }, () => Math.floor(Math.random() * 100)));

  useEffect(() => {
    // Fetch data for tonsPerMonthDepartmentMonth
    setTonsPerMonthDepartment(
      Array.from({ length: 33 }, () => Math.floor(Math.random() * 100))
    );
  }, [activeMonth]);

  const MONTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const COLOMBIA_DEPARTMENTS = [
    "AMA", // Amazonas
    "ANT", // Antioquia
    "ARA", // Arauca
    "ATL", // Atlántico
    "BOL", // Bolívar
    "BOY", // Boyacá
    "CAL", // Caldas
    "CAQ", // Caquetá
    "CAS", // Casanare
    "CAU", // Cauca
    "CES", // Cesar
    "CHO", // Chocó
    "COR", // Córdoba
    "CUN", // Cundinamarca
    "DC", // Bogotá, D.C.
    "GUA", // Guainía
    "GUV", // Guaviare
    "HUI", // Huila
    "LAG", // La Guajira
    "MAG", // Magdalena
    "MET", // Meta
    "NAR", // Nariño
    "NSA", // Norte de Santander
    "PUT", // Putumayo
    "QUI", // Quindío
    "RIS", // Risaralda
    "SAN", // Santander
    "SAP", // San Andrés and Providencia
    "SUC", // Sucre
    "TOL", // Tolima
    "VAC", // Valle del Cauca
    "VAU", // Vaupés
    "VID", // Vichada
  ];

  return (
    <div className="overflow-auto max-h-screen">
      <h2 className="text-var-red">Metricas</h2>
      <div className="flex flex-col gap-10 text-center items-center">
        <BarChart
          chartTitle="Toneladas por departamento"
          labels={COLOMBIA_DEPARTMENTS}
          values={tonsPerMonthDepartmen}
          activeMonth={""}
        />
        <h3>Meses</h3>
        <div className="w-[90%] rounded-l bg-slate-100 flex flex-row justify-between p-1">
          {MONTHS.map((month, index) => (
            <div
              key={index}
              onClick={() => setActiveMonth(month)}
              className={`hover:text-var-red cursor-pointer transition duration-300 ${
                month === activeMonth ? "text-var-red" : ""
              }`}
            >
              {month}
            </div>
          ))}
        </div>
        <h3>Departamentos</h3>
        <div className="w-[90%] rounded-l bg-slate-100 flex flex-row justify-between p-1">
          {COLOMBIA_DEPARTMENTS.map((department, index) => (
            <div
              key={index}
              onClick={() => setActiveDepartment(department)}
              className={`hover:text-var-red cursor-pointer transition duration-300 ${
                department === activeDepartment ? "text-var-red" : ""
              }`}
            >
              {department}
            </div>
          ))}
        </div>
        <LineChart
          chartTitle="Toneladas por departamento este mes"
          labels={Array.from({ length: 30 }, (_, i) => `${i + 1}`)}
          values={Array.from({ length: 30 }, () =>
            Math.floor(Math.random() * 100)
          )}
          activeMonth={activeMonth}
          activeDepartment={activeDepartment}
        />
      </div>
    </div>
  );
}
