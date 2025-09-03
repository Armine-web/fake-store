'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrent, fetchProductById, updateProduct } from '@/store/productSlice';

export function EditProduct({id}: {id:string}) {
  
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {current, status} = useAppSelector(state => state.products);
    const [title, setTitle] = useState('');

    useEffect(()=>{
        dispatch(fetchProductById(Number(id)));

        return ()=>{
            dispatch(clearCurrent());
        }
    }, [id, dispatch]);

    useEffect(()=>{
        if (current){
           setTitle(current.title); 
        }
        
    }, [current]);

    if(status === 'loading' || !current) return <p>Loading...</p>;

    const handleSave = async ()=> {
      const res = await dispatch(updateProduct({id: current.id, title})).unwrap();
      console.log(res);
      
        router.push(`/products/${current.id}`)

    }
    return (
    <div className="p-4 bg-white rounded shadow-md space-y-4 w-full max-w-md mx-auto">
        <div className="flex flex-col space-y-2">
            <label htmlFor="productTitle" className="text-sm font-medium text-gray-700">
            Product Title:
            </label>
            <input
            id="productTitle"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
            SAVE
        </button>
    </div>

  )
}
