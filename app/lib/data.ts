import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"
import { NextResponse } from "next/server";
import { Post } from "@prisma/client";

// pega o usuário logado
export async function getSession() {
    return await getServerSession(authOptions);
}

// pega o usuário logado no banco de dados
export const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;

    } catch (error: any) {
        return null;
    }
};


// pegar notícias do blog
export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });

        return posts;

    } catch (error: any) {
        return { message: 'Database Error: Falha ao carregar notícias.' };
    }
};


// pegar unica notícia do blog
export const getPost = async (slug: string) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: slug
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        })

        return post;
    }
    catch (error: any) {
        return { message: 'Database Error: Falha ao carregar notícia.' };
    }
}  

export const getPostById = async (id: string) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
        })

        return post;
    }
    catch (error: any) {
        return { message: 'Database Error: Falha ao carregar notícia.' };
    }
}


// pegar noticias do blog do usuário logado
export const getPostsByUser = async (id: string) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: id
            },
            orderBy: {
                createdAt: 'desc'
            },
        }
        );

        return posts;
    }
    catch (error: any) {
        return { message: 'Database Error: Falha ao carregar notícias.' };
    }
}