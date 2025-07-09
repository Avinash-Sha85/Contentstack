export type SocialMediaShare = {
  icon: {
    url: string;
  };
  title: string;
  url: {
    href: string;
  };
};

export interface SocialMediaProps {
  social_media_share: SocialMediaShare[];
}
