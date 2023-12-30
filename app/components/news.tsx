import Image from 'next/image'
import Link from 'next/link'
import { getPosts } from '../lib/data'
import Post from './framer/Post'

async function News() {

  const noticias = await getPosts()

  return (
    <div className='flex flex-col items-center '>
      <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl '>Notícias recentes</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-20'>
        {/* @ts-ignore */}
        {noticias.slice(0, 3).map((noticia: any) => (
          <Post key={noticia.id} noticia={noticia} />
        ))}

      </div>

      <Link href={'/noticias'} className='sm:self-end -mt-10 pb-20'>
        <p className='text-xl font-semibold text-gray-900 underline hover:cursor-pointer md:px-5'>Ver mais</p>
      </Link>
      
    </div>
  )
}

export default News