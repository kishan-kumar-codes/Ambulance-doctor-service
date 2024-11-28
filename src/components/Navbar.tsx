"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-blue-500 to-teal-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-blue-600' : 'text-white'
              }`}
            >
              MediCare
            </Link>
          </div>

          <div className="hidden md:block items-center space-x-8">
            <NavLink href="/" scrolled={scrolled}>Home</NavLink>
            <NavLink href="/doctors" scrolled={scrolled}>Doctors</NavLink>
            <NavLink href="/ambulance" scrolled={scrolled}>Ambulance</NavLink>
          </div>

          <div className=" md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                scrolled
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  : 'text-white hover:text-teal-200 hover:bg-blue-600'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-gradient-to-r from-blue-500 to-teal-600'
          }`}
        >
          <MobileNavLink href="/" scrolled={scrolled}>Home</MobileNavLink>
          <MobileNavLink href="/doctors" scrolled={scrolled}>Doctors</MobileNavLink>
          <MobileNavLink href="/ambulance" scrolled={scrolled}>Ambulance</MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) => (
  <Link
    href={href}
    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-teal-200'
    } group`}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </Link>
)

const MobileNavLink = ({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) => (
  <Link
    href={href}
    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
      scrolled ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-teal-200 hover:bg-blue-600'
    }`}
  >
    {children}
  </Link>
)

export default Navbar
