"use client"

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TitleBar from "@/components/TitleBar";
import "@/styles/global.css";
import { UserContext, UserProvider } from "context/UserContext";

interface RootProps {
  children: React.ReactNode;
  title: string
}

export default function RootLayout(props: RootProps) {
  const pageTitle = "title";

  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex flex-row w-[100%] justify-between">

          <UserProvider>
            <SideBar />
            <div className="flex flex-col w-[100%]">
              {props.children}
            </div>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
