import Link from "next/link";
import Image from "next/image";
import LinkList from "./link-list";
import Separator from "./seperator";
import SocialMediaShare from "./social-media-share";
import { FooterContentType } from "../model/component-props/footer.model";
import parse from "html-react-parser";

export default function Footer({ data }: { data?: FooterContentType }) {
  if (!data) return null;

  return (
    <footer className="bg-[var(--royalblue)] text-white pt-[30px] pb-[0]">
      <div className="container mx-auto px-2">
        {data.address && (
          <div className="flex flex-col sm:flex-row justify-between sm:text-left mb-6">
            <div className="text-sm text-white text-center sm:text-left mb-5 lg:mb-0 sm:w-1/2">
              {data.logo?.url && (
                <div className="mb-6 flex justify-center sm:justify-start md:mb-2">
                  <Link href="/">
                    <Image
                      className="w-24"
                      src={
                        data.logo.url.startsWith("//")
                          ? `https:${data.logo.url}`
                          : data.logo.url
                      }
                      alt="Footer Logo"
                      width={100}
                      height={70}
                      loading="lazy"
                    />
                  </Link>
                </div>
              )}

              <div className="address"> {parse(data?.address)}</div>
            </div>
            <div className="flex flex-col gap-y-8 mb-5 lg:mb-0 sm:w-1/2">
              <LinkList
                title={data?.quick_links?.title as string}
                link_list={data.quick_links?.link_list || []}
              />
              <SocialMediaShare
                social_media_share={
                  data?.social_media?.social_media_share || []
                }
              />

              <div className="contact-box">
                <div dangerouslySetInnerHTML={{ __html: data?.contact }} />
              </div>
            </div>
          </div>
        )}

        <Separator />
        {data.copyright_text && (
          <p className="text-center lg:text-left text-sm py-4">
            {data.copyright_text}
          </p>
        )}
      </div>
    </footer>
  );
}
