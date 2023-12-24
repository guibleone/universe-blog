'use client'
import React from 'react'
import Image from 'next/image'
import { noticias } from '@/lib/data'
import { motion } from 'framer-motion'
import Link from 'next/link'

function News() {
  return (
    <div className='flex flex-col items-center '>
      <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl '>Notícias recentes</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-20'>
        {noticias.slice(0, 3).map((noticia) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={noticia.id} className='flex flex-col gap-2 p-4  '>
            <Image className='aspect-video' src={noticia.image.toString()} width={330} height={100} alt={noticia.title} />
            <div className='px-2'>
              <h3 className='text-xl font-semibold '>{noticia.title}</h3>
              <p className=''>{noticia.text}</p>
              <p className=''>{noticia.date}</p>
            </div>
          </motion.div>
        ))}

      </div>

      <Link href={'/noticias'} className='sm:self-end -mt-10 pb-20'>
        <p className='text-xl font-semibold text-gray-900 underline hover:cursor-pointer md:px-5'>Ver mais</p>
      </Link>
    </div>
  )
}

export default News