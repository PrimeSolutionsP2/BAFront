"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import userIcon from "../public/icons/user-icon.png";
import inicioIcon from "../public/icons/inicio-icon-b.svg";
import asociadosIcon from "../public/icons/asociados-icon-b.svg";
import puntosAcopioIcon from "../public/icons/puntos-acopio-icon-b.svg";
import metricasIcon from "../public/icons/metricas-icon-b.svg";
import solicitudesIcon from "../public/icons/registros-icon-b.svg";
import recoleccionesIcon from "../public/icons/recolecciones-icon-b.svg";
import perfilIcon from "../public/icons/perfil-icon-b.svg";
import configuracionesIcon from "../public/icons/configuraciones-icon-b.svg";
import inicioIconRed from "../public/icons/inicio-icon-r.svg";
import asociadosIconRed from "../public/icons/asociados-icon-r.svg";
import puntosAcopioIconRed from "../public/icons/puntos-acopio-icon-r.svg";
import metricasIconRed from "../public/icons/metricas-icon-r.svg";
import solicitudesIconRed from "../public/icons/registros-icon-r.svg";
import recoleccionesIconRed from "../public/icons/recolecciones-icon-r.svg";
import perfilIconRed from "../public/icons/perfil-icon-r.svg";
import configuracionesIconRed from "../public/icons/configuraciones-icon-r.svg";

export default function SideBar() {

  const style = "px-10 py-4 flex flex-row gap-3 items-center cursor-pointer ";
  const pathName = usePathname();
  const activeTab: string | null =
  pathName.split("/")[pathName.split("/").length - 1];

  return (
    <>
      {activeTab !== "login" && activeTab !== "register" ? (
        <div className="h-screen w-[20%] shadow">
          <ul>
            <li className="px-10 py-4">
              <div className="flex flex-row gap-3">
                <div>
                  <Image src={userIcon} alt="userLogo" />
                </div>
                <div>
                  <p className="text-[18px]">Usuario</p>
                  <p className="text-[13px] text-[#A4A4A4]">Administrador</p>
                </div>
              </div>
            </li>
            <li
              className={
                style +
                (activeTab === "inicio" || activeTab === ""
                  ? "text-var-red"
                  : null)
              }
            >
              <Image
                src={
                  activeTab === "inicio" || activeTab === ""
                    ? inicioIconRed
                    : inicioIcon
                }
                alt="inicio-icon"
              />
              <Link href="/">Inicio</Link>
            </li>
            <li
              className={
                style + (activeTab === "asociados" ? "text-var-red" : null)
              }
            >
              <Image
                src={
                  activeTab === "asociados" ? asociadosIconRed : asociadosIcon
                }
                alt="asociados-icon"
              />
              <Link href="/asociados">Asociados</Link>
            </li>
            <li
              className={
                style + (activeTab === "puntos-acopio" ? "text-var-red" : null)
              }
            >
              <Image
                src={
                  activeTab === "puntos-acopio"
                    ? puntosAcopioIconRed
                    : puntosAcopioIcon
                }
                alt="puntos-acopio-icon"
              />
              <Link href="/puntos-acopio">Puntos de acopio</Link>
            </li>
            <li
              className={
                style + (activeTab === "metricas" ? "text-var-red" : null)
              }
            >
              <Image
                src={activeTab === "metricas" ? metricasIconRed : metricasIcon}
                alt="metricas-icon"
              />
              <Link href="/metricas">Metricas</Link>
            </li>
            <li
              className={
                style + (activeTab === "solicitudes" ? "text-var-red" : null)
              }
            >
              <Image
                src={
                  activeTab === "solicitudes" ? solicitudesIconRed : solicitudesIcon
                }
                alt="registros-icon"
              />
              <Link href="/solicitudes">Solicitudes</Link>
            </li>
            <li
              className={
                style + (activeTab === "recolecciones" ? "text-var-red" : null)
              }
            >
              <Image
                src={
                  activeTab === "recolecciones"
                    ? recoleccionesIconRed
                    : recoleccionesIcon
                }
                alt="recolecciones-icon"
              />
              <Link href="/recolecciones">Recolecciones</Link>
            </li>
            <li
              className={
                style + (activeTab === "perfil" ? "text-var-red" : null)
              }
            >
              <Image
                src={activeTab === "perfil" ? perfilIconRed : perfilIcon}
                alt="perfil-icon"
              />
              <Link href="/perfil">Perfil</Link>
            </li>
            <li
              className={
                style +
                (activeTab === "configuraciones" ? "text-var-red" : null)
              }
            >
              <Image
                src={
                  activeTab === "configuraciones"
                    ? configuracionesIconRed
                    : configuracionesIcon
                }
                alt="configuraciones-icon"
              />
              <Link href="/configuraciones">Configuraciones</Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
