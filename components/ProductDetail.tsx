'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

import React from 'react'
import { deleteProduct, fetchProductById } from '@/store/productSlice';
import { clearCurrent } from '@/store/productSlice';
import Image from 'next/image';
import noImage from '@/public/noImage.jpeg'

export function ProductDetail({id}: {id:string}) {
  const dispatch = useAppDispatch();
  const {current, status, error} = useAppSelector(state=>state.products);
  const router = useRouter();
  useEffect(()=>{
    dispatch(fetchProductById(Number(id)));

    return ()=> {dispatch(clearCurrent());}
    
  }, [id, dispatch]);

    if(status === 'loading')  return <p>Loading...</p>
    if(status === 'failed')  return <p>Error:{error}</p>
    if(status === 'successed' && !current)  return <p>No Result</p>
    if (!current) return;

    const handleDelete = ()=>{
        const statusCode = dispatch(deleteProduct(current.id)).unwrap();
        console.log(statusCode);
        router.push('/products')
        
    }
 
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col space-y-4">
      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={current.image}
          alt={current.title}
          fill
          className="object-contain object-center"
          placeholder="blur"
          blurDataURL={noImage.blurDataURL}
          quality={80}
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{current.title}</h1>
      <p className="text-gray-500 italic capitalize">{current.category}</p>
      <p className="text-gray-600">{current.description}</p>
      <div className="flex justify-between items-center space-x-3">
        <p className="mt-auto text-gray-800 font-semibold text-lg">
          <span className="font-normal text-gray-500">Price: </span>
          <span className="text-blue-600">${current.price}</span>
        </p>
        {current.rating && (
         <span className="flex   space-x-1 text-sm text-gray-500">
            {[...Array(5)].map((_, i) => (
              
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${
                    i < Math.round(current.rating?.rate ?? 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927C9.347 2.076 10.653 2.076 10.951 2.927l.4 1.204a1 1 0 00.95.69h1.284c.756 0 1.067.967.515 1.447l-1.04.87a1 1 0 00-.364 1.118l.4 1.203c.298.85-.756 1.556-1.538 1.118l-1.04-.87a1 1 0 00-1.176 0l-1.04.87c-.782.438-1.836-.268-1.538-1.118l.4-1.203a1 1 0 00-.364-1.118l-1.04-.87c-.552-.48-.241-1.447.515-1.447h1.284a1 1 0 00.95-.69l.4-1.204z" />
                </svg>
              
              
            ))}
            <span className="space-x-1 text-base text-gray-900">{current.rating.rate.toFixed(1)} <span className='text-gray-600 italic'>({current.rating.count} reviews)</span> </span>
          </span>
       
        )}
      </div>
      <div className="mt-auto flex space-x-3">
        <button
          onClick={() => router.push(`/products/${id}/edit`)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
        >
          Delete
        </button>
      </div>
    </div>

  )
}
