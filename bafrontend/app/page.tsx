export const metadata = {
  title: "App Router",
};

interface PageProps {
  searchParams: {
    tab: string | null;
  }
}

export default function Page(props: PageProps) {
  return <h2 className="text-var-red">Inico Page</h2>;
}
