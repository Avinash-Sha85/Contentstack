import { LinkListItem } from "./link-list.model";
import { SocialMediaShare } from "./social-media-share.model";

export type FooterContentType = {
  uid: string;
  title?: string;
  logo?: { url: string };
  address: string;
  copyright_text?: string;
  quick_links?: {
    title: string;
    link_list: LinkListItem[];
  };
  social_media?: {
    social_media_share: SocialMediaShare[];
  };
  contact: string;
};
