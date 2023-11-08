'use client' // enhancement

import useStep from "@/hooks/useStep"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import ButtonSubmitForm from "./ButtonSubmitForm"
import Link from "next/link"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react'
import { useEffect, useRef } from "react"
export default function Registration() {

  const { register, setValue, formState: { errors }, handleSubmit } = useForm();
  
  const imageInputRef = useRef()


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setValue('latitude', position.coords.latitude)
      setValue('longitude', position.coords.longitude)
    }, (error) => {
      console.error('Erreur lors de l\'obtention de la position', error)
    })

  }, [setValue])

  const stepper = useStep()

  const onSubmit = async (formData) => {

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (imageInputRef.current?.files[0]) {
      formDataToSend.append('image', imageInputRef.current.files[0]);
    }

    try {
      const res = await fetch('api/register', {
        method: 'POST',
        body: formDataToSend
      })
      if (!res.ok) {
        throw new Error('Erreur lors de l\'inscription')
      }
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        const { email, password } = formData
        signIn('credentials', {
          email,
          password,
          callbackUrl: '/'
        })
      }
    } catch (error) {
      console.log('Erreur: ', error)
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
        <form className="shadow-xl rounded-xl mt-6  p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full h-2 bg-slate-600 mt-4 rounded-full z-0 ">
            <div
              className="absolute left-0 top-0 h-2 bg-blue-500 transition-width duration-500 rounded-full z-0"
              style={{ width: `${(stepper.step + 1) * 33.33}%` }}
            ></div>
          </div>
          {
            stepper.step === 0 && (
              <div className='flex flex-col items-center justify-center min-w-[20rem] gap-8 h-full py-12 rounded-lg mt-8  transition duration-300'>
                <h1 className='text-2xl font-light tracking-widest'>INSCRIPTION</h1>
                <div className='flex flex-col gap-1 w-full'>
                  <span>Email</span>
                  <Input   {...register('email', { required: true })} type="email" name="email" aria-invalid={errors.email ? "true" : "false"} />
                  {errors.email?.type === 'required' && <p role="alert">L&apos;email est requis ici!</p>}
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <span>Mot de passe</span>
                  <Input {...register('password', { required: true })} className=" focus:outline-none" type="password" name="password" />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <span>Prénom</span>
                  <Input {...register('name', { required: true })} className="focus:outline-none" type="text" name="name" />
                </div>
                <div className='flex flex-col gap-1 w-full justify-start'>
                  <span>Age</span>
                  <Input {...register('age')} className="focus:outline-none" type="text" name="age" />
                </div>
                <input {...register('latitude')} type="hidden" />
                <input {...register('longitude')} type="hidden" />

                <div className='flex flex-col  items-center'>
                  <div className="flex gap-12 items-center justify-center mb-6">

                    <Button onClick={() => stepper.nextStep()}>Suivant</Button>
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400">Déjà inscrit ? <Link className='hover:underline text-secondary-foreground mt-4 text-gray-400 hover:text-black dark:text-white' href="/login">C&apos;est par là</Link></p>
                </div>
              </div>
            )
          }
          {
            stepper.step === 1 && (
              <div className="flex flex-col items-center justify-center  gap-8 h-full py-12 rounded-lg mt-8  transition duration-300 ">

                <Label className="text-lg font-normal" htmlFor="picture">Ajoutez une photo de profil!</Label>
                <Input ref={imageInputRef} {...register('image')} className="focus:outline-none cursor-pointer" id="picture" type="file" name='image' />
                <div className="flex justify-center gap-12 items-center">
                  <Button variant='ghost' className='border-2 border-neutral-600' onClick={() => stepper.prevStep()}>Précédent</Button>
                  <Button onClick={() => stepper.nextStep()}>Suivant</Button>
                </div>

              </div>
            )
          }
          {
            stepper.step === 2 && (
              <div className='flex flex-col items-center justify-center gap-8 h-full py-12 rounded-lg mt-8 '>

                <h1 className="font-normal text-lg">Une courte description de votre personne?</h1>
                <Textarea {...register('bio')} className="w-full h-[10rem]" placeholder='Bio...' name='bio' />
                <div className="flex justify-center gap-12 items-center">
                  <Button variant='ghost' className='border-2 border-neutral-600 text-md' onClick={() => stepper.prevStep()}>Précédent</Button>
                  <ButtonSubmitForm type='submit' className=' text-md dark:bg-foreground-secondary '>Je soumets!</ButtonSubmitForm>
                </div>
              </div>
            )
          }
        </form>
      </div>
    </div>

  )


}
