"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { CartContext } from "../Authprovider";
import { SearchIcon, ShoppingCart } from "lucide-react";
import MobNav from "./MobNav";
import SearchComponent from "./Search";

const NewNavbar = () => {

  const location = useParams();
  const session = useSession();
  const status = session?.status;
  const { cartProducts } = useContext(CartContext);
  const searchRef = useRef(null);
  const [isMenuActive, setActive] = useState(false);
  let position = true;
  const navbarStyle = {
    opacity: 1,
    transform: "none",
  };

  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Menu",
      path: "/menu",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    // {
    //   title: <SearchIcon/>,
    //   path: "/about",
    // },
  ];
  
  
  const handleClickOutside = (event) => {
    // Check if the click was inside the search component or its children
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      // Clicked outside the search component, close it
      setshowsearch(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    document.body.className = isMenuActive ? "overflow-hidden" : "";
  }, [isMenuActive]);
  
  function toggleActive() {
    if (window.innerWidth < 768) {
      if (isMenuActive) {
        setActive(false);
      } else {
        setActive(true);
      }
    }
  }
  return (
    <>
      <MobNav isMenuActive={isMenuActive} toggleActive={toggleActive} />
      <div 
        className={`${
          position ? position : "sticky"
        } inset-x-0  z-50 sticky  pt-0 top-3 hidden justify-center md:flex pointer-events-auto w-fit m-auto mb-0 border rounded-lg `}
        style={navbarStyle}
      >
        <div className="flex cursor-pointer items-center gap-4 rounded-full bg p-2">
          <Link href="/">
            <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100">
              <h1 className="text-bold ">Cafe</h1>
            </div>
          </Link>
          <div className="flex items-center">
            {navLinks.map((navLink, index) => (
              <Link
                href={navLink.path}
                // href={navLink.path}
                key={index}
                className={`px-4 py-2 text-zinc-700 cursor-pointer rounded-full transition ${
                  location.pathname === navLink.path
                    ? "bg-zinc-400 text-zinc-950"
                    : ""
                } hover:bg-zinc-200`}
              >
              <span>
              {navLink.title}
              </span> 
              </Link>
            ))}
          </div>
        
          <div className="flex justify-end gap-2">
            {status === "authenticated" && (
              <>
                <Dropdown />
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Button
                  className=" text-zinc-700 cursor-pointer rounded-full transition"
                  variant={"ghost"}
                >
                  <Link href={"/register"}>Register</Link>
                </Button>
                <Button
                  className=" text-zinc-700 cursor-pointer rounded-full transition"
                  variant={"outline"}
                >
                  <Link href={"/login"}>Login</Link>
                </Button>
              </>
            )}
          </div>
          <Link href={"/cart"}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute top-1 right-1    text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewNavbar;
