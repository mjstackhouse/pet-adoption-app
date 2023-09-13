export default async function SearchLayout({ children }) {
  return (
    <div id='search-layout' className='h-auto xl:max-w-[100vw] xl:w-[100vw]'>
      {children}
    </div>
  )
}