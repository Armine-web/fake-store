import { EditProduct } from '@/components/EditProduct';
import React from 'react'
type Params ={
  params: Promise<{id:string}>
}

export default async function editProductPage({params}: Params) {
  const {id} = await params;
  return (
    <div>
        <EditProduct id = {id}/>
    </div>
  )
}