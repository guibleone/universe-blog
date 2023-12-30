'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Drawer from './framer/Drawer'


function Navbar() {

    const { data } = useSession()
    const user = data?.user

    const [matches, setMatches] = React.useState(() => {
        // Check if window is defined before using it
        if (typeof window !== 'undefined') {
            return window.matchMedia('(max-width: 768px)').matches;
        }
        // Default value if window is not defined
        return false;
    });

    useEffect(() => {
        const handler = () => {
            setMatches(window.matchMedia('(max-width: 768px)').matches);
        };

        // Add event listener only if window is defined
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handler);

            // Cleanup the event listener on component unmount
            return () => {
                window.removeEventListener('resize', handler);
            };
        }
    }, []);

    return (
        <MaxWidthWrapper>
            <nav className='py-3 flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src="/assets/logo.png" width={55} height={55} alt='logo' />
                </Link>
                <ul className='gap-4 hidden md:flex'>
                    <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                        <Link href={'/'}>
                            Início
                        </Link>
                    </li>
                    <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                        <Link href={'/noticias'}>
                            Notícias
                        </Link>
                    </li>
                    <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                        <Link href={'/'}>
                            Galeria
                        </Link>
                    </li>
                </ul>

                {matches ? (
                    <>
                        <Drawer>
                            <ul className='gap-4 flex flex-col'>
                                <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                                    <Link href={'/'}>
                                        Início
                                    </Link>
                                </li>
                                <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                                    <Link href={'/noticias'}>
                                        Notícias
                                    </Link>
                                </li>
                                <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                                    <Link href={'/'}>
                                        Galeria
                                    </Link>
                                </li>
                            </ul>
                            <div className='border border-gray-950 my-5' />

                            {!user ? (
                                <Button>
                                    <Link href={'/api/auth/signin'}>
                                        Astronauta
                                    </Link>
                                </Button>)
                                : (
                                    <ul className='gap-4 flex flex-col'>
                                        <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                                            <Link href={'/publicar'}>
                                                Publicar
                                            </Link>
                                        </li>
                                        <li className='text-gray-900 text-lg font-semibold hover:text-purple-600 hover:underline'>
                                            <Link href={'/dashboard'}>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Button variant={'destructive'}>
                                                <Link href={'/api/auth/signout'}>
                                                    Sair
                                                </Link>
                                            </Button>
                                        </li>
                                    </ul>
                                )}
                        </Drawer>
                    </>
                ) : (<>



                    {!user ? (
                        <Button>
                            <Link href={'/api/auth/signin'}>
                                Astronauta
                            </Link>
                        </Button>)
                        : (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={user.image!} />
                                        <AvatarFallback>{user.name!}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='mr-2'>
                                    <DropdownMenuLabel>{user.name?.split(' ')[0]}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={'/publicar'}>
                                            Publicar
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                    <Link href={'/dashboard'}>
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Button className='w-full h-7' variant={'destructive'} asChild>
                                            <Link href={'/api/auth/signout'}>
                                                Sair
                                            </Link>
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                </>)}

            </nav>
        </MaxWidthWrapper>
    )
}

export default Navbar