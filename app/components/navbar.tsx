import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <MaxWidthWrapper>
            <nav className='py-3 flex justify-between items-center'>
                <Image src="/assets/logo.png" width={55} height={55} alt='logo' />
                <ul className='gap-4 hidden md:flex'>
                    <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                        <Link href={'/'}>
                            Início
                        </Link>
                    </li>
                    <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                        <Link href={'/'}>
                            Notícias
                        </Link>
                    </li>
                    <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                        <Link href={'/'}>
                            Galeria
                        </Link>
                    </li>
                </ul>
                <Button>
                    <Link href={'/login'}>
                        Astronauta
                    </Link>
                </Button>
            </nav>
        </MaxWidthWrapper>
    )
}

export default Navbar