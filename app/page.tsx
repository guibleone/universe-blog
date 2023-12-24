import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { noticias } from '@/lib/data'
import News from './components/news'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-2xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            O Universo é um lugar{` `}
            <span className='text-purple-600'>incrível e misterioso</span>
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>Explore notícias sobre nosso cosmos a partir de olhares nunca antes vistos. </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Button asChild>
              <Link href={'/noticias'}>
                Descobir mistérios
              </Link>
            </Button>
            <Button variant={'ghost'}>
              Explorar profundezas &rarr;
            </Button>

          </div>
        </div>
        {/**TODO : noticias recentes */}

      </MaxWidthWrapper>

      <MaxWidthWrapper >
        <News />
      </MaxWidthWrapper>

    </>

  )
}
