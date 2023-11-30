'use client'

import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function ButtonSubmitForm({className, children, variant, type, disabled}) {   


    return (
        <div>
            <Button disabled={disabled} type={type} variant={variant} className={className} >
            {
            disabled === true ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) :
               <span>{children}</span>
            }
            </Button>
        </div>
    )
}
