import Layout from "./Layout";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  // const [image, setImage] = useState(null);

  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, _id};
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImages(ev){
    const files = ev.target?.files;
    if(files?.length > 0){
      const data = new FormData();
      for (const file of files){
        data.append('file',file);
      }
      const res = await fetch('/api/upload', {
       method: 'POST',
       body: data,
      }); 
      console.log(res.data);
    }

  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>

      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>
        Photos
      </label>
      <div className="mb-2">
        <label className="w-24 h-24 border cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>

          Upload

          <input type="file" onChange={uploadImages} className="hidden"/>
        </label>
        {!images?.length && (
          <div>No photos of this product</div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>

      <label>Price</label>

      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      {/* <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="select-image"
      />
      <label htmlFor="select-image">
        <button type="button" className="btn-primary mr-2">
          Upload
        </button>
      </label> */}

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
