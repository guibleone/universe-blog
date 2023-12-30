import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { getCurrentUser, getPostsByUser } from '../lib/data'
import Post from '../components/framer/Post'

export default async function Dashboar() {

  const user = await getCurrentUser()
  const noticias = await getPostsByUser(user?.id!)


  return (
    <MaxWidthWrapper className='py-10'>
      <h3 className='text-2xl sm:text-4xl'>Suas postagens</h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-20'>
        {/* @ts-ignore */}
        {noticias.map((noticia: any) => (
          <Post key={noticia.id} noticia={noticia} dashboard={true} />
        ))}
      </div>

    </MaxWidthWrapper>
  )
}
