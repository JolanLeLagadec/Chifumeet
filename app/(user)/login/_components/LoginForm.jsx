'use client'
import React from 'react'
import { Input } from '../../../../components/ui/input'
import ButtonSubmitForm from '../../../../components/ButtonSubmitForm'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'



export default function LoginForm() {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState(false)

  const { register, handleSubmit, formState: errors } = useForm()
  const onSubmit = async (formData) => {
    setIsLoading(true)
    signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false
    }).then(({ error }) => {
      if (error) {
        console.log(error)
        setFormError(true)
        toast.error('Les identifiants sont incorrects, veuillez réessayer!')
        setIsLoading(false)
        setTimeout(() => {
          setFormError(false)
        }, 2000)
      }
      else {
        router.push('/')
        router.refresh()
        setIsLoading(false)
      }
    })
  }

  return (

    <div className='flex justify-center items-center'>
      <form className='flex flex-col items-center justify-center w-3/4 gap-8  shadow-2xl h-full py-12 rounded-lg mt-8' onSubmit={handleSubmit(onSubmit)} >
        <h1 className='font-light tracking-widest text-2xl '>CONNEXION</h1>
        <div className='flex flex-col gap-1 w-3/4'>
          <span>Email</span>
          <Input {...register('email', { required: 'Email requis' })} className={`${formError ? 'border-red-500' : ''} focus:outline-none`} type="email" />
          {errors.email && (<p role='alert'>{errors.email.message}</p>)}
        </div>
        <div className='flex flex-col gap-1 w-3/4'>
          <span>Mot de passe</span>
          <Input {...register('password', { required: 'Mot de passe requis' })} className={`${formError ? 'border-red-500' : ''} focus:outline-none`} type="password" />
          {errors.password && (<p role='alert'>{errors.password.message}</p>)}
        </div>
        <ButtonSubmitForm disabled={isLoading} type='submit' variant='ghost' className='border-2 border-black text-lg dark:border-white disabled:cursor-not-allowed'>Je me connecte</ButtonSubmitForm>
        <p className='text-neutral-500 dark:text-neutral-400' >Tu n&apos;as pas de compte? <Link className='hover:underline mt-4 text-neutral-500 hover:text-black dark:text-white' href="/register">Inscris toi</Link></p>
      </form>
    </div>
  )
}
