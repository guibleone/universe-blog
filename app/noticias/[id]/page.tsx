import { getPost } from '@/app/lib/data'
import { formatBrLocaleDate } from '@/app/lib/utils'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import React from 'react'

type Props = {
    id: string
}

export default async function page({ params }: { params: Props }) {

    const { id } = params

    const noticia: any = await getPost(id)

    return (
        <MaxWidthWrapper className='py-10 max-w-screen-md'>
            {/*// @ts-ignore */}
            <div className='flex flex-col gap-10'>
                <div>
                    <h1 className='text-2xl sm:text-4xl'>{noticia?.title}</h1>
                    <p className='text-gray-500'>{formatBrLocaleDate(noticia?.createdAt)} | {noticia?.author.name}</p>
                </div>

                <Image
                    src={noticia?.image?.toString() || '/assets/no-image.jpg'}
                    alt={noticia?.title!}
                    width={400}
                    height={400} 
                    className='aspect-video self-center'
                    />
                <p dangerouslySetInnerHTML={{__html:noticia.content}} />

            </div>
        </MaxWidthWrapper>

    )
}
