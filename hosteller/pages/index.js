import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  // if (!session) return; those question marks does the work of this line
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2> Hello, <b>{session?.user?.name}</b> </h2>
        <div className="flex bg-gray-300 text-black gap-1 p-1 rounded-lg">
          <img src={session?.user?.image} alt="" className="w-6 h-6 rounded-full"/>
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  );
}
