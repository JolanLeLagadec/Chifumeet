'use client'
import { Input } from "@/components/ui/input"
import avatar from "../../../../public/avatar.jpg"
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useState, useRef } from "react"
import useEditModale from "@/hooks/useModaleEdit"
import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateInformations } from "@/app/(user)/profile/_actions/updateInformations.js"

export default function ModaleEdit({ bio, name, image, id }) {

  const [valueBio, setValueBio] = useState(bio)
  const [valueName, setValueName] = useState(name)
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(image.replace(/^"(.+(?="$))"$/, '$1') || avatar)
  const [isLoading, setIsLoading] = useState(false)

  const extractFormData = (formData) => ({
    name: formData.get('name'),
    bio: formData.get('bio')
  });


  const handleUpdate = async (e) => {

    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsLoading(true)
    const file = formData.get('file')
    console.log(file)

    let formDataWithImageUrl = extractFormData(formData)

    let res;
    if (imageFile && file) {
      console.log('ici file', file)
      res = await fetch(
        `/api/avatar/upload?filename=${file.name}`,
        {
          method: 'POST',
          body: file
        }
      )
    }
    console.log('ici res', res)

    if (res && res.ok) {
      let blob = await res.json()
      formDataWithImageUrl.image = blob?.url;
    }

    const newUser = await updateInformations(formDataWithImageUrl, id)
    setIsLoading(false)
    editModale.setIsOpen()
  }

  const refInputFile = useRef(null)

  const editModale = useEditModale()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const imgURL = URL.createObjectURL(file)
      setImageUrl(imgURL)
    }
  }
  if (!editModale.isOpen) {
    return null;
  }

  return (
    <div className={`flex  justify-center items-center border-1 p-8 bg-slate-700 fixed z-20 bg-opacity-70 overflow-x-auto overflow-y-auto inset-0`}>
      <form onSubmit={handleUpdate} className="flex flex-col bg-slate-950 p-8 rounded-lg relative">
        <X color="white" width={54} className="absolute top-4 right-0 " onClick={() => editModale.setIsOpen()} />
        <div className='flex items-center gap-8'>
          <Input ref={refInputFile} type='file' name='file' className='hidden' onChange={handleFileChange} />
          <Image
            onClick={() => refInputFile.current.click()}
            src={imageUrl}
            width={150}
            height={150}
            alt={name}
            className='rounded-lg cursor-pointer'
          />
          <Input name="name" size='sm' className='bg-slate-800 text-slate-100 text-lg' value={valueName} onChange={(e) => setValueName(e.target.value)} />

        </div>
        <div className='mt-6 w-[20rem] h-[15rem] flex justify-center items-center  '>
          <Textarea
            name="bio"
            className='h-full bg-slate-800 text-slate-100 text-md'
            value={valueBio}
            onChange={({ target }) => setValueBio(target.value)}
          />
        </div>

        <Button disabled={isLoading} type='submit' className="w-48 mt-4 mx-auto">
          {
            isLoading && (
              <Loader2 className="animate-spin h-4 w-4" />
            )
          }
          Modifier
        </Button>
      </form>

    </div>

  )
}

