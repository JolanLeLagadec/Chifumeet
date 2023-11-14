'use client' // enhancement

import useStep from "@/hooks/useStep"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import ButtonSubmitForm from "../../../components/ButtonSubmitForm"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react'
import { useEffect } from "react"
import { useState } from 'react'
import { Loader2 } from "lucide-react"

export default function Registration() {

  const { register, setValue, formState: { errors }, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)


  console.log(imageFile)


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file)
    }
  };

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
    setIsLoading(true)

    let response;
    if (imageFile) {
      response = await fetch(
        `/api/avatar/upload?filename=${imageFile.name}`,
        {
          method: 'POST',
          body: imageFile,
        },
      );
    }
    let blob;

    if (response) {
      blob = await response.json()
      console.log('ici blob', blob.url)
    }

    const formDataWithImage = {
      ...formData,
      image: blob?.url || null
    }

    try {
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formDataWithImage)
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
      } setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
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
                <Input {...register('image')} onChange={handleFileChange} className="focus:outline-none cursor-pointer" id="picture" type="file" name='image' />
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
                  <ButtonSubmitForm type='submit' disabled={isLoading} className=' text-md dark:bg-foreground-secondary disabled:opacity-30 '>
                    {
                      isLoading && (

                        <span> <Loader2 className="h-6 w-4 animate-spin" />Je soumets!</span>
                      )
                    }
                    Je soumets!
                  </ButtonSubmitForm>
                </div>
              </div>
            )
          }
        </form>
      </div>
    </div>

  )


}
