'use client'
import { formatBrLocaleDate } from "@/app/lib/utils"
import { motion } from "framer-motion"
import Image from 'next/image'
import Link from "next/link"

export default function Post({
  noticia,
  dashboard
}: {
  noticia: any
  dashboard?: boolean
}) {


  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      key={noticia.id}
      className='flex flex-col gap-2 p-4 hover:cursor-pointer'>
      <Link href={dashboard ? `/dashboard/editar/${noticia.id}` : `/noticias/${noticia.slug}`}>
        <div className="bg-purple-600 px-4 py-2 text-center text-sm tracking-tight font-medium text-white">
          {noticia.category}
        </div>
        <Image className='aspect-video' src={noticia?.image?.toString() || '/assets/no-image.jpg'} width={330} height={100} alt={noticia.title} />
        <div className='px-2 flex flex-col gap-2'>
          <h3 className='text-xl font-semibold mt-2 '>{noticia.title}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: noticia.content.slice(0, 50).concat('...') }}
          />
          <p className=''>{formatBrLocaleDate(noticia.date)}</p>
        </div>
      </Link>
    </motion.div>
  )
}
