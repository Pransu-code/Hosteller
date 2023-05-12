import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  // if (!session) return; those question marks does the work of this line
  return (
    <Layout>
      <div className="text-blue-900">Hello {session?.user?.email}</div>
    </Layout>
  );
}
