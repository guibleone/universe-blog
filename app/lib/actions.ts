'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./data";
import prisma from "@/app/lib/db";

const FormSchema = z.object({
    title: z.string().min(3, { message: "Muito curto" }),
    content: z.string().min(3, { message: "Muito curto" }),
    category: z.string().min(3, { message: "Selecione uma categoria" }),
});

export type State = {
    message?: string | null;
    errors?: {
        title?: string[];
        content?: string[];
        category?: string[];
    };
};

export async function createPost(prevState: State, formData: FormData) {

    const validatedData = FormSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        category: formData.get("category"),
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { title, content, category } = validatedData.data;

    const user = await getCurrentUser();

    if (!user) {
        return redirect("/login");
    }

    try {
        await prisma.post.create({
            data: {
                title,
                content,
                category,
                authorId: user.id,
                slug: title.toLowerCase().replace(/ /g, "-"),
                image: "https://source.unsplash.com/random",
            },
        });

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/noticias');
    redirect('/noticias');
}

export async function updatePost(id: string, prevState: State, formData: FormData) {

    const validatedData = FormSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        category: formData.get("category"),
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { title, content, category } = validatedData.data;

    const user = await getCurrentUser();

    if (!user) {
        return redirect("/login");
    }

    try {
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                content,
                category,
                authorId: user.id,
                slug: title.toLowerCase().replace(/ /g, "-"),
                image: "https://source.unsplash.com/random",
            },
        });

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}


export async function deletePost(id: string) {

    const user = await getCurrentUser();

    if (!user) {
        return redirect("/login");
    }

    try {
        await prisma.post.delete({
            where: {
                id: id
            }
        });

    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}