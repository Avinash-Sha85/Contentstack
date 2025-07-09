import { PageReference } from "../common.model";

export type LinkListItem = {
  links: {
    title: string;
    page_reference: PageReference[];
    open_in_new_tab: boolean;
  };
};

export type LinkListProps = {
  title: string;
  link_list: LinkListItem[];
};
