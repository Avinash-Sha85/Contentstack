import { useEffect, useState } from "react";
import NavigationItem from "./navigation";
import LinkList from "./link-list";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./searchbox";
import LanguageSelector from "./languageselector";
import { HeaderContentType } from "../model/component-props/header.model";
import Navigation from "./navigation";
import HumbargarBG from "../public/menu-mobile.svg";

export default function Header({ data }: { data?: HeaderContentType }) {
  const [ActiveValue, setActiveValue] = useState(false);
  const HumbargarOpen = () => setActiveValue(true);
  const HumbargarClose = () => setActiveValue(false);

  if (!data) return null;

  return (
    <div className="header-bg">
      <header className="pt-4 pl-2 pr-2 pb-2 container m-auto">
        <div className="flex justify-center gap-x-10 lg:block">
          {/* Quick Links */}
          <div className="hidden lg:flex items-center lg:justify-end mb-1">
            <div className="flex items-center gap-x-8 header-menu-font-size">
              <LinkList
                title={data?.quick_links?.title as string}
                link_list={data?.quick_links?.link_list || []}
              />
              <LanguageSelector />
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            {data?.logo?.url && (
              <Link href="/">
                <Image
                  src={
                    data.logo.url.startsWith("//")
                      ? `https:${data.logo.url}`
                      : data.logo.url
                  }
                  width={100}
                  height={70}
                  alt="Logo"
                  className="mr-4"
                  priority 
                />
              </Link>
            )}

             <SearchBox />

              
            <div className="flex items-center justify-evenly gap-12">
              
              <nav className="hidden relative lg:block header-menu-font-size top-menu">
                <ul className="flex [&_a]:px-6">
                  <Navigation navigation_menu={data?.navigation_menu} />
                </ul>
              </nav>


              {/* Mobile menu placeholder (not active) */}
             <div className="flex lg:hidden relative">
                <button onClick={HumbargarOpen}>
                  <Image src={HumbargarBG} className="w-[20] h-[20]" alt="Menu Icon" />
                </button>
                {ActiveValue == true ? (
                  <div className="bg-[var(--royalblue)] w-full h-full shadow fixed top-0 right-0 z-30 p-4 overflow-y-auto">
                    <div className="flex justify-end">
                      <button onClick={HumbargarClose}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-8 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <ul className="flex flex-col">
                       <Navigation navigation_menu={data?.navigation_menu} />
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
