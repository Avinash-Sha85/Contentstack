import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SocialMediaProps } from "../model/component-props/social-media-share.model";

const SocialMediaShare = (items: SocialMediaProps) => {
  if (
    !Array.isArray(items?.social_media_share) ||
    !items?.social_media_share.length
  ) {
    console.error("Expected 'items' to be an array but got:", items);
    return null;
  }

  return (
    

    <div className="flex items-center justify-center sm:justify-start pl-0 w-full">
      {items?.social_media_share.map((item, index) => {
        const imageUrl = item?.icon?.url;
        const altText = item?.title || "Social Media";
        const resolvedUrl = imageUrl?.startsWith("//")
          ? `https:${imageUrl}`
          : imageUrl;

        const linkHref =
          item?.url?.href?.startsWith("http") ||
          item?.url?.href?.startsWith("/")
            ? item?.url.href
            : `https://${item?.url?.href}`;

        return (
          <div className="socialmedia" key={index}>
            <Link href={linkHref} target="_blank" title={item.url?.href}>
              {resolvedUrl ? (
                <Image
                  src={resolvedUrl}
                  alt={altText}
                  width={40}
                  height={40}
                 
                />
              ) : (
                <span className="text-white text-sm">{item?.title}</span>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaShare;
