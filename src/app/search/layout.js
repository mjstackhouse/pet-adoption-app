export default async function SearchLayout({ children }) {
  return (
    <div className='h-[90vh] h-[90svh] sm:h-auto max-w-[900px] xl:max-w-[100vw] xl:w-[100vw]'>
      {children}
    </div>
  )
}