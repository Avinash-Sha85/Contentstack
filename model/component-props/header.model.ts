import { LinkListItem } from "./link-list.model";
import { NavigationItem } from "./navigation-model";

export type HeaderContentType = {
  uid: string;
  title?: string;
  logo?: {
    url: string;
  };
  quick_links?: {
    title: string;
    link_list: LinkListItem[];
  };
  navigation_menu: NavigationItem[];
};
