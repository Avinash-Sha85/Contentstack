import Layout from "../components/layout";
import App from "next/app";
import Head from "next/head";
import { AllEntries } from "../model/entries.model";
import { getAllEntries } from "../helper";
import "../styles/style.css";
import "../styles/global/footer.css";
import "../styles/global/header.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@contentstack/live-preview-utils/dist/main.css";
import HeadScriptComponent from "../components/headscript";
import { fetchHeadScript } from "../utils/data-loader/fetchHeadScript";
import { HeadScriptProps } from "../model/component-props/headscript.model";

type Seo = {
  meta_title: string;
  meta_description: string;
  keywords: string;
  enable_search_indexing: boolean;
};

function MyApp(props) {
  const { Component, pageProps, header, footer, entries, headscripts } = props;
  const { page, post, archivePost, blogPost } = pageProps;

  const blogList = post?.concat(archivePost);
  return (
    <>
      <Head>
        <meta
          name="application-name"
          content="Contentstack-Nextjs-Starter-App"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1"
        />
        <meta name="theme-color" content="#317EFB" />
        <title>Contentstack-Nextjs-SSG-Starter-App</title>
      </Head>

      {headscripts?.length > 0 &&
        headscripts.map((script) => (
          <HeadScriptComponent key={script.script_id} data={script} />
        ))}
      <Layout page={page} entries={entries} header={header} footer={footer}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const entries: AllEntries = await getAllEntries("page");
  const headscripts: HeadScriptProps[] = await fetchHeadScript();
  return { ...appProps, entries, headscripts };
};

export default MyApp;