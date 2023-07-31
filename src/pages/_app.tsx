import '@/src/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className='container relative min-h-screen m-auto text-white'>
            <Header />
            <div className='w-full flex flex-col items-center pt-24 p-3'>
                <Component {...pageProps} />
            </div>
        </div>
    )
}
