'use client'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/productSlice';
import Link from 'next/link';
import Image from 'next/image';

import noImage from '@/public/noImage.jpeg'

export function Products() {

  const dispatch = useAppDispatch();
  const {list, error, status} = useAppSelector(state => state.products);
  
  useEffect(()=>{
    if(status==='idle'){
      dispatch(fetchProducts())
    }
  }, [dispatch]);

  if(status === 'loading') return <p>Loading...</p>;
  if(status ==='failed') return <p>Error: {error}</p>
  return (
    <div className="container mx-auto p-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`} className="block h-full">
              <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow transition-shadow duration-300 hover:shadow-lg">
                <div className="relative flex-shrink-0 h-48 bg-gray-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-contain object-center"
                    placeholder="blur"
                    blurDataURL={noImage.blurDataURL}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
                  <p className="mt-auto text-gray-800 font-semibold text-lg">
                    <span className="font-normal text-gray-500">Price: </span>
                    <span className="text-blue-600">${p.price}</span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>


  
  )
}
