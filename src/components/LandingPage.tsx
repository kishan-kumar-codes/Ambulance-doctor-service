"use client"
import Hero from '@/components/Hero'
import Services from '@/components/Services'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col ">
     
      <main className="flex-grow">
        <Hero />
        <Services />
      </main>
     
    </div>
  )
}

