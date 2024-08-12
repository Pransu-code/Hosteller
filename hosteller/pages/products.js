import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import Card from "../components/Card";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link
        className="bg-blue-900 p-2 rounded-lg text-white"
        href={"/products/new"}
      >
        Add a new product
      </Link>

      <p className="mt-3">Product Name</p>
      <table className="basic mt-2">
        {/* <thead>
          <tr>
            <td>Product Name</td>
          </tr>
        </thead> */}
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.title}</td>
              <td>
                <Link href={"/products/edit/" + product._id}>Edit</Link>

                <Link href={"/products/delete/" + product._id}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {products.map((product) => (
        <Card product={product} />
      ))} */}
    </Layout>
  );
}
