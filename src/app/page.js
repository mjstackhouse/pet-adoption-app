import Search from "@/components/search";

export default function Home() {
  return (
    <div className='flex flex-wrap flex-col items-center justify-center'>
      <h1 className='mb-2'>Search for adoptable pets:</h1>
      <Search />
    </div>
  )
}