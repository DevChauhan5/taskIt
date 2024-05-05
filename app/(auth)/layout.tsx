import { account } from '@/lib/appwrite'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    // const user = await account.get()
    // if (user) {
    //     console.log(user)
    // }
    return (
        <div>{children}</div>
    )
}

export default AuthLayout