import Search from "@/components/search";

export default function Home() {

  return (
    <div>
      <div className='flex flex-wrap max-w-[100vw] flex-col mx-auto p-6 items-center justify-center text-lg bg-white rounded-3xl'>
        <h1 className='mb-4 font-bold'>Search for adoptable pets:</h1>
        <Search />
      </div>
    </div>
  )
}