"use client";

import { useEffect, useState } from "react";
import { GET_ALL_BLOG_POSTS_QUERY } from "../utils/graphql/query";
import { executeGraphQLQuery } from "../contentstack-sdk";
import BlogCards, { BlogEntry } from "./blogcards";

export default function BlogListing() {
  const [entries, setEntries] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await executeGraphQLQuery(GET_ALL_BLOG_POSTS_QUERY);
        const items = response?.data?.all_blog_post?.items || [];

        const mappedEntries: BlogEntry[] = items.map((item: any) => ({
          title: item?.title,
          description: item?.description,
          url: item?.url,
          featured_image: {
            url: item?.featured_imageConnection?.edges?.[0]?.node?.url || "",
          },
          tags: item?.system?.tags || [],
          publish_details: {
            time: item?.system?.publish_details?.time || "",
          },
        }));

        setEntries(mappedEntries);
        setError(null);
      } catch (err: any) {
        setError(err.message || "GraphQL query failed");
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <p>Loading blog posts...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (entries.length === 0) return <p>No blog posts found.</p>;

  return <BlogCards blogs={entries} />;
}
