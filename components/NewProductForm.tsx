'use client'


import { ChangeEvent, useState} from 'react'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/store/productSlice'



export  function NewProductForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();
   const res = await dispatch(createProduct({...product, price: parseFloat(product.price)})).unwrap();
   console.log(res);
   router.push('/products');
   
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    
    setProduct({...product, [e.target.name]: e.target.value.trim()})

  }


  return (
    <form onSubmit={handleSubmit}
    className="max-w-md mx-auto p-6 bg-white rounded shadow-md space-y-4">
       <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Product Title</label>
        <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name = 'title' value={product.title} onChange={changeHandler}/>
       </div>

       <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Product Price</label>
        <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name = 'price' value={product.price} onChange={changeHandler}/>
       </div>

       <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Product Description</label>
        <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name = 'description' value={product.description} onChange={changeHandler}/>
       </div>

       <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Product Category</label>
        <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name = 'category' value={product.category} onChange={changeHandler}/>
       </div>

       <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Product Image</label>
        <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name = 'image' value={product.image} onChange={changeHandler}/>
       </div>

       <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">CREATE</button>

    </form>
  )
}
