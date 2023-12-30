import EditForm from '@/app/components/editForm'
import { getPostById } from '@/app/lib/data'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

type EditarProps = {
    params: {
        id: string
    }
}

export default async function Editar({ params }: EditarProps) {

    const { id } = params
    
    const noticia = await getPostById(id)

    return (
        <MaxWidthWrapper>
            <EditForm post={noticia} />
        </MaxWidthWrapper>
    )
}
