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
<<<<<<< HEAD
          <UserProvider>
            <SideBar />
            <div className="w-[100%] p-8">
              {props.children}
            </div>
          </UserProvider>
=======
          <SideBar />
          <div className="flex flex-col w-[80%]">
          {props.children}
          </div>
         
>>>>>>> feature/BOT-02
        </div>
      </body>
    </html>
  );
}
