'use client'
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react'
import { useFormState } from 'react-dom';
import { categorys } from '../lib/definitions';
import { createPost, updatePost } from '../lib/actions';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { DeleteButton } from './delete-button';

export default function EditForm({
  post
}: {
  post: any
}) {
  const initialState = { message: null, errors: {} };
  const updatePostWithId = updatePost.bind(null, post.id);
  // @ts-ignore
  const [state, dispatch] = useFormState(updatePostWithId, initialState);

  return (
    <form className='min-h-screen py-10' action={dispatch} >
      <h1 className='text-2xl sm:text-4xl leading-tight'>
        <span className='text-purple-800'>Notícia</span>
        <DeleteButton id={post.id} />
      </h1>
      <div className='mt-8'>
        <label className='text-md sm:text-lg font-semibold'>Titulo</label>
        <Input defaultValue={post?.title} id='title' name='title' className='py-7 text-sm border-purple-800' placeholder='JWST descrobre buraco negro' />
        <div id='title-error' aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors?.title.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className='mt-8'>
        <label className='text-lg font-semibold'>Conteúdo</label>
        <textarea defaultValue={post.content} id='content' name='content' className='py-4 text-sm w-full border px-4 border-purple-800' placeholder='Texto da notícia' />
        <div id='content-error' aria-live="polite" aria-atomic="true">
          {state.errors?.content &&
            state.errors?.content.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className='mt-8 '>
        <label className='text-lg font-semibold'>Categoria</label>
        <Select defaultValue={post?.category} name='category'>
          <SelectTrigger className="w-full text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            {categorys.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div id='category-error' aria-live="polite" aria-atomic="true">
          {state.errors?.category &&
            state.errors?.category.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className='mt-10 text-end'>
        <Button className='mr-5' asChild variant={'ghost'}>
          <Link href='/dashboard'>
            Cancelar
          </Link>
        </Button>
        <Button type='submit' >
          Editar
        </Button>
      </div>
    </form>
  )
}