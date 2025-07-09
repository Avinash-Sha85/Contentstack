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

const ServerError = ({ headerData, footerData }: Props): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>
    <header>{headerData && <Header data={headerData} />}</header>
    <div className="error-page flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-semibold mb-4">500</h1>
      <p className="text-lg mb-4">Internal Server Error</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
    <footer>{footerData && <Footer data={footerData} />}</footer>
  </>
);

export default ServerError;

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
    console.error("500 staticProps error:", error);
    return {
      props: {
        headerData: null,
        footerData: null,
      },
      revalidate: 60,
    };
  }
};
