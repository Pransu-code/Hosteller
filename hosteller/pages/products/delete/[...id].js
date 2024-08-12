import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import axios  from "axios";

export default function DeleteProductPage(){

    const router = useRouter();
    const [productInfo, setProductInfo] = useState(null);
    const {id} = router.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);

    function goBack(){ 

        router.push('/products');
    }
    async function deleteProduct() {
        axios.delete('/api/products?id=' + id).then
        goBack();
    }
    
    return (
        <Layout>
            <h1 className="text-center mt-4">Do you want to delete product 
                &nbsp;<b>"{productInfo?.title}"</b>?
            </h1>
            <div className="text-center">
            <button className="bg-red-800 text-white mr-2 px-2 rounded-md" onClick={deleteProduct}>YES</button>
            <button className="bg-blue-900 text-white px-2 rounded-md" onClick={goBack}>NO</button>
            </div>
        </Layout>
    )
}