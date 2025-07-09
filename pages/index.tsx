import React, { useState, useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { getPageRes } from "../helper";
import RenderComponents from "../components/render-components";
import { Page } from "../model/page.model";
import { getAllEntriesByContentType, onEntryChange } from "../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import Layout from "../components/layout";
import { useRouter } from "next/router";
interface PageProps {
  page: Page;
  pageUrl: string;
  header;
  footer;
  locale?: string;
}

const Home: NextPage<PageProps> = ({ page, pageUrl, header, footer, locale }) => {
  const [getEntry, setEntry] = useState(page);
  const { locale: activeLocale } = useRouter();
  async function fetchData() {
    try {
      const entryRes = await getPageRes(pageUrl,"page",activeLocale);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    onEntryChange(fetchData);
  }, [activeLocale, pageUrl]);

  return (
    <Layout page={page} header={header} footer={footer} entries={[]}>
      {getEntry ? (
        <RenderComponents
          pageComponents={getEntry}
          entryUid={getEntry?.uid}
          contentTypeUid="page"
          locale={getEntry?.locale}
        />
      ) : (
        <Skeleton />
      )}
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  try {

   
  const { locale } = context; 

    const entries = await getAllEntriesByContentType("header", locale);
    const header = entries?.[0] || null;

    const footerentries = await getAllEntriesByContentType("footer", locale);
    const footer = footerentries?.[0] || null;

    const res: Page = await getPageRes("/" , "page",locale);

    if (!res) throw new Error("Not found");

    return {
      props: { page: res, pageUrl: "/", header, footer, locale },
      revalidate: 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
