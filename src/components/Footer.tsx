"use client";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-600 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto py-4 md:py-5 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="space-y-1 md:space-y-2">
            <h3 className="text-lg md:text-xl font-bold">MediCare</h3>
            <p className="text-xs">Providing top-quality healthcare and emergency services 24/7.</p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-teal-200 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-teal-200 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-teal-100 hover:text-white transition-colors duration-300 text-xs md:text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="text-teal-100 hover:text-white transition-colors duration-300 text-xs md:text-sm"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/ambulance"
                  className="text-teal-100 hover:text-white transition-colors duration-300 text-xs md:text-sm"
                >
                  Ambulance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold mb-2">Contact Us</h3>
            <address className="not-italic text-xs md:text-sm">
              <p className="text-teal-100">
                123 Medical Street, Health City, HC 12345
              </p>
              <p className="text-teal-100 mt-1">Phone: (123) 456-7890</p>
              <p className="text-teal-100 mt-1">Email: info@medicare.com</p>
            </address>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-teal-500/30">
          <p className="text-center text-teal-100 text-xs">
            © {currentYear} MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
