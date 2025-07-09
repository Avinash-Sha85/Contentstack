import { PageReference } from "../common.model";

export type NavigationItem = {
  navigation: {
    title: string;
    navigation_link: PageReference[];
    sub_navigation: PageReference[];
  };
};

export type NavigationProps = {
  navigation_menu: NavigationItem[];
};

export type NavigationMenu = {
  menu: PageReference | null;
  childMenu: PageReference[];
};
