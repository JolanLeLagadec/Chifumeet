'use client'

import React from 'react'
import { Input } from './ui/input'
import ButtonSubmitForm from './ButtonSubmitForm'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

export default function LoginForm() {

  const {register, handleSubmit, formState: errors} = useForm()
  const onSubmit = async (formData) => {
    try {
      signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/'
      })

    }catch(error){
      console.log(error)
    }

  }
  return (
    <div className='flex justify-center items-center'>
        
    <form className='flex flex-col items-center justify-center w-3/4 gap-8  shadow-2xl h-full py-12 rounded-lg mt-8' onSubmit={handleSubmit(onSubmit)} >
    <h1 className='font-light tracking-widest text-2xl '>CONNEXION</h1>
      <div className='flex flex-col gap-1 w-3/4'>
      <span>Email</span>
      <Input {...register('email', {required: true})} className=" focus:outline-none" type="email" name="email"  />
      {errors.email?.type === 'required' && ( <p role='alert'>Email requis</p>)}
      </div>
      <div className='flex flex-col gap-1 w-3/4'>
      <span>Mot de passe</span>
      <Input {...register('password', {required: true})} className="  focus:outline-none" type="password" name="password" />
      </div>
      <ButtonSubmitForm type='submit' variant='ghost' className='border-2 border-black text-lg dark:border-white'>Je me connecte</ButtonSubmitForm>
      <p className='text-neutral-500 dark:text-neutral-400' >Tu n&apos;as pas de compte? <Link className='hover:underline mt-4 text-neutral-500 hover:text-black dark:text-white' href="/register">Inscris toi</Link></p>
    </form>
  </div>
  )
}
