import { getAllEntries, isPage } from "../helper";
import { AllEntries } from "../model/entries.model";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || "http://localhost:3000";
  const pageContentTypes = await isPage();
  const allPages: string[] = [];

  for (const contentType of pageContentTypes) {
    //@ts-ignore
    const entries: AllEntries[] = await getAllEntries(contentType);
    const urls = entries.map((entry) => {
      const fullUrl = `${baseUrl}${entry.url}`;
      return fullUrl;
    });
    allPages.push(...urls);
  }

  const siteMapList = allPages.sort();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${siteMapList
        .map((url) => {
          return `
          <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;