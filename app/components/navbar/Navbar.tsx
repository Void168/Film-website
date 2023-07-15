"use client";

import Image from "next/image";
import React, { useState, useCallback } from "react";

import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
        <Image
          className="h-4 lg:h-7"
          src="/images/logo.png"
          alt="logo"
          height={16}
          width={100}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-point relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className="text-white transition" />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-point">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-point">
            <BsBell />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10">
              <Image
                className="rounded-md"
                src="/images/default-green.png"
                alt="avatar"
                width={30}
                height={30}
              />
            </div>
            <BsChevronDown className="text-white transition" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
