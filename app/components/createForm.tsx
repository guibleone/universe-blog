'use client'
import { Input } from '@/components/ui/input'
import React from 'react'
import { categorys } from '../lib/definitions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { createPost } from '../lib/actions'
import { useFormState } from 'react-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CreateForm() {
  const initialState = { message: null, errors: {} };
  // @ts-ignore
  const [state, dispatch] = useFormState(createPost, initialState);

  const [content, setContent] = React.useState('')

  return (
    <form className='min-h-screen py-20' action={dispatch} >
      <h1 className='text-2xl sm:text-4xl leading-tight'>
        Publicar <span className='text-purple-800'>Notícia</span>
      </h1>
      <div className='mt-8'>
        <label className='text-md sm:text-lg font-semibold'>Titulo</label>
        <Input id='title' name='title' className='py-7 text-sm border-purple-800' placeholder='JWST descrobre buraco negro' />
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
        <ReactQuill theme='snow' value={content} onChange={setContent} />
        <input name='content' value={content} className='hidden' aria-hidden='true' />
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
        <Select name='category'>
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
        <Button type='submit' >
          Postar
        </Button>
      </div>
    </form>
  )
}

export default CreateForm