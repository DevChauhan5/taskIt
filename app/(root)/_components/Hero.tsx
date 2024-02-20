import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-accent text-center space-y-8">
            <h1 className="text-5xl lg:text-9xl font-bold tracking-wider">taskit</h1>
            <h2 className="text-2xl">All you need to manage yourself!</h2>
            <Button size={'lg'} asChild>
                <Link href={"/dashboard"}>Get Started</Link>
            </Button>
        </div>
    )
}

export default Hero