import fetchData from './fetch-data';

export default async function SearchLayout({ children }) {
  const data = fetchData('dog');

  return (
    <div className='h-screen bg-white text-black'>
      {children}
    </div>
  )
}