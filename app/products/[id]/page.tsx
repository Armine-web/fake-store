import {ProductDetail } from '@/components/ProductDetail'
type Params = {
    params:Promise<{id:string}>
}
export default async function ProductPage({params}:Params) {
    const {id} = await params;
  return (
    <div>
      <h1 className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 mb-30 text-center text-3xl font-extrabold leading-none tracking-tight text- md:text-5xl lg:text-6xl text-shadow-blue-200 text-white">ProductPage</h1>
        <ProductDetail id = {id}/>
        </div>
  )
}