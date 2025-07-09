import React from "react";
import Link from "next/link";
import { LinkListProps } from "../model/component-props/link-list.model";

export default function LinkList(data: LinkListProps) {
  if (!data?.link_list || data?.link_list?.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-10 mx-5 md:mx-0">
      {data?.link_list.map((item, index) => {
        const page = item.links.page_reference?.[0];
        if (!page || !page.url || !page.title) return null;

        return (
          <div key={index}>
            <ul>
              <li className="item0 odd first link-list">
                <Link
                  href={page.url}
                  target={item.links.open_in_new_tab ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="sub-menu"
                >
                  {page.title}
                </Link>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
