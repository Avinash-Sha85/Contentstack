import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationProps,
} from "../model/component-props/navigation-model";

export default function Navigation({ navigation_menu }: NavigationProps) {
  const resolvedMenu: NavigationMenu[] = navigation_menu.map((item) => {
    const menu = item.navigation.navigation_link?.[0] || null;
    const childMenu = item.navigation.sub_navigation || [];
    return { menu, childMenu };
  });

  if (!resolvedMenu.length) return null;

  return (
    <>
      {resolvedMenu.map((nav, index) => {
        const dropdownActiveBg = nav?.childMenu?.length > 0 ? "md:hover:bg-white" : "";
        const dropdownActiveText = nav?.childMenu?.length > 0 ? "md:group-hover:text-black" : "md:group-hover:text-white";

        return (
          <li
            key={index}
            className={`group cursor-pointer py-2 rounded-t-[5px] text-white ${dropdownActiveBg}`}
          >
            {nav.menu && (
              <Link href={nav.menu.url} className={`${dropdownActiveText}`}>
                {nav.menu.title}
              </Link>
            )}

            {/* Dropdown menu */}
            {nav.childMenu?.length > 0 && (
              <ul className="flex flex-col lg:flex-row lg:flex-wrap static lg:absolute z-50 left-0 lg:invisible lg:group-hover:visible rounded-b bg-white shadow-lg px-2 lg:px-0 mt-2 w-full">
                {nav.childMenu.map((subItem, idx) => (
                  <li key={idx} className="last:border-none">
                    <Link
                      href={subItem.url}
                      className="block text-black lg:px-10 py-2 lg:py-4"
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}
