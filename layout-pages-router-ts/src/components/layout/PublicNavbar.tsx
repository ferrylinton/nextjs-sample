import Link from 'next/link';
import React from 'react';
import MenuButton from '../MenuButton';
import LocaleSwitcher from '../LocaleSwitcher';

const LinkClass = 'px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75';

const PublicNavbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo">
              Logo
            </Link>
            <MenuButton navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />

          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link className={LinkClass} href="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={LinkClass} href="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className={LinkClass} href="/login">Login</Link>
              </li>
            </ul>
            <LocaleSwitcher/>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PublicNavbar