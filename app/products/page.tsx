import React from 'react'
import { Products } from '@/components/Products'

import Link from 'next/link';



export default function ProductsPage() {
  return (
    <div>
        <h1 className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 mb-30 text-center text-3xl font-extrabold leading-none tracking-tight text- md:text-5xl lg:text-6xl text-shadow-blue-200 text-white">Products</h1>
       
       <Link href="/products/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create New Product
          </button>
        </Link>
        <Products />
    </div>
  )
}
