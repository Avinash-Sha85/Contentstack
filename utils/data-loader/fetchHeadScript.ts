import { getAllEntriesByContentType } from "../../contentstack-sdk";
import { HeadScriptProps } from "../../model/component-props/headscript.model";

export const fetchHeadScript = async (): Promise<HeadScriptProps[]> => {
  try {
    const headscriptentries: HeadScriptProps[] = await getAllEntriesByContentType("_component_head_script");
    return headscriptentries || [];
  } catch (error) {
    console.error("Error fetching head script:", error);
    return [];
  }
};
