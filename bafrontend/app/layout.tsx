import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TitleBar from "@/components/TitleBar";
import "@/styles/global.css";

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
          <SideBar />
          <div className="flex flex-col w-[80%]">
          {props.children}
          </div>
         
        </div>
      </body>
    </html>
  );
}
