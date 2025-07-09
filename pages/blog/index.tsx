import { GetStaticProps } from "next";
import { getAllEntriesByContentType } from "../../contentstack-sdk/index";
import BlogCards from "../../components/blogcards";
import Skeleton from "react-loading-skeleton";
import Layout from "../../components/layout";
import { getPageRes } from "../../helper";
import { Page } from "../../model/page.model";

type BlogEntry = {
  title: string;
  url: string;
  publish_details?: {
    time: string;
  };
  uid: string;
  description?: string;
  featured_image?: {
    url: string;
  };
  tags?: string[];
};

type Props = {
  blogs: BlogEntry[];
  page: Page;
  pageUrl: string;
  header;
  footer;
};

export default function BlogListing({
  page,
  pageUrl,
  header,
  footer,
  blogs,
}: Props) {
  return (
    <>
      <Layout page={page} header={header} footer={footer} entries={[]}>
        {blogs ? <BlogCards blogs={blogs} /> : <Skeleton />}
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { locale } = context;
  const entries = await getAllEntriesByContentType("header",locale?.toLowerCase() || "en-us");
  const header = entries?.[0] || null;

  const footerentries = await getAllEntriesByContentType("footer",locale?.toLowerCase() || "en-us");
  const footer = footerentries?.[0] || null;
  const blogs = await getAllEntriesByContentType("blog_post",locale?.toLowerCase() || "en-us");
  const res: Page = await getPageRes("/",'page');

  if (!res) throw new Error("Not found");
  return {
    props: {
      page: res,
      pageUrl: "/blog",
      blogs,
      header,
      footer,
    },
    revalidate: 60,
  };
};
