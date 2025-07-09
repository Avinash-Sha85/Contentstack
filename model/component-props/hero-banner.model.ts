import { ImageProps } from "../common.model";
import { CTAProps } from "./cta-model";

export interface HeroBanner {
  banner_title: string;
  banner_image: ImageProps;
  background_color: string;
  text_color: string;
  banner_description: string;
  is_banner_image_full_width_: boolean;
  banner_image_alignment: boolean;
  content_alignment: string;
  call_to_action: CTAProps;
}
