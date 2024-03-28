import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import "@/styles/global.css";

interface RootProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootProps) {
  

  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex flex-row w-[100%] justify-between">
          <SideBar />
          <div className="w-[100%] p-8">
            {props.children}
          </div>
        </div>
      </body>
    </html>
  );
}
