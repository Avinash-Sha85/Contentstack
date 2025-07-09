import Stack, {
  getAllContentTypes,
  resolveNestedEntry,
} from "../contentstack-sdk/index";
import { addEditableTags } from "@contentstack/utils";
import { AllEntries } from "../model/entries.model";
import { Page } from "../model/page.model";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getAllEntries = async (content_type : string): Promise<AllEntries> => {
  const response: AllEntries = (await Stack.getEntry({
    contentTypeUid: content_type,
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as AllEntries;
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "page", true));
  return response[0] as AllEntries;
};

export const getPageRes = async (
  entryUrl: string,
  contentTypeUid: string,
  locale: string = "en-us"
): Promise<Page> => {
  const response: Page[] = (await Stack.getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath: [],
    locale
  })) as Page[];
  if (!response?.length) throw new Error("Page not found");

  const resolved = await resolveNestedEntry(response[0]);

  if (liveEdit) {
    addEditableTags(resolved, "page", true);
  }

  return resolved as Page;
};

export const isPage = async (): Promise<string[]> => {
  const response = await getAllContentTypes();
  return (
    response?.content_types
      ?.filter((content_type) => content_type?.options?.is_page === true)
      .map((content_type) => content_type?.uid)
  );
};

