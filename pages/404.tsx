import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { FooterContentType } from "../model/component-props/footer.model";
import { HeaderContentType } from "../model/component-props/header.model";
import { getAllEntriesByContentType } from "../contentstack-sdk";

import { GetStaticProps } from "next";

type Props = {
  headerData: HeaderContentType | null;
  footerData: FooterContentType | null;
};

const NotFound = ({ headerData, footerData }: Props): JSX.Element => (
  <>
    <Head>
      <title>404: Not Found</title>
    </Head>
    <header>{headerData && <Header data={headerData} />}</header>
    <div className="no-found flex flex-col items-center justify-center min-h-[70vh]">
      <div className="cover-not-found text-center">
        <span className="text-6xl md:text-9xl font-semibold">404</span>
        <h1 className="text-xl font-medium my-2">Page not found</h1>
        <p className="text-gray-500 my-2">This page does not exist.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4">
          Go to the Home page
        </Link>
      </div>
    </div>
    <footer>{footerData && <Footer data={footerData} />}</footer>
  </>
);

export default NotFound;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const headerEntries = await getAllEntriesByContentType("header", locale);
    const footerEntries = await getAllEntriesByContentType("footer", locale);
    const headerData = headerEntries?.[0] || null;
    const footerData = footerEntries?.[0] || null;

    return {
      props: {
        headerData,
        footerData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("404 staticProps error:", error);
    return {
      props: {
        headerData: null,
        footerData: null,
      },
      revalidate: 60,
    };
  }
};
