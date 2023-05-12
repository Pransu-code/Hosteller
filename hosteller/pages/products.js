import Layout from "../components/Layout";
import Link from "next/link";


export default function Products() {
  return (
    <Layout>
      <Link className="bg-blue-900 p-2 rounded-lg text-white" href={'/products/new'}>
        Add a new Product
      </Link>
    </Layout>
  );
}
