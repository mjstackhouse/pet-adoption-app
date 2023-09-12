import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Provider from '@/components/provider';
import SigninForm from '@/components/signin-form';

export const metadata = {
  title: 'Animal Unity',
  description: 'Connecting human animals with non-humans',
}

export default function RootLayout({ children, params }) {
  return (
    <html lang='en' className='max-h-fit bg-gray'>
      <body className='relative max-w-screen flex flex-wrap flex-col justify-center text-black'>
        <Provider>
          <SigninForm parameters={params} />
          <div id='inner-body-container' className='relative max-w-full flex flex-wrap flex-row items-start justify-center bg-gray h-[100svh] h-[100vh]'>
            <div className='h-[80px] sm:h-[90px] basis-full flex self-start max-w-full'>
              <Navbar />
            </div>
            <div id='root-layout' className='basis-full max-w-full min-h-[calc(100svh-160px)] min-h-[calc(100vh-160px)] sm:min-h-[calc(100svh-180px)] sm:min-h-[calc(100vh-180px)] flex flex-wrap flex-row items-center justify-center'>
              {children}
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  )
}