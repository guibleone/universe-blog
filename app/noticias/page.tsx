import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { getPosts } from '../lib/data'
import Post from '../components/framer/Post'

export default async function Noticias() {

    const noticias = await getPosts()

    return (
        <MaxWidthWrapper className='py-10'>
            <h1 className='text-2xl sm:text-4xl'>Todas Notícias</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-20'>
                {/* @ts-ignore */}
                {noticias.map((noticia: any) => (
                    <Post key={noticia.id} noticia={noticia} />
                ))}
            </div>
        </MaxWidthWrapper>
    )
}
