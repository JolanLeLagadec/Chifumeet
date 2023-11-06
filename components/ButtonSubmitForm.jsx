'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export default function ButtonSubmitForm({className, children, variant, type}) {

    const { pending } = useFormStatus()
    return (
        <div>
            <Button  disabled={pending} type={type} variant={variant} className={className} >
            {
            pending ? (
               <span>Loading...</span>
            ) :
                <span>{children}</span>
            }
            </Button>
        </div>
    )
}
