export const metadata = {
  title: "App Router",
};

interface PageProps {
  searchParams: {
    tab: string | null;
  }
}

export default function Page(props: PageProps) {
  return <h2 className="text-4xl text-blue-500">App Router</h2>;
}
