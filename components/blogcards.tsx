import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
export type BlogEntry = {
  title?: string;
  url?: string;
  description?: string;
  featured_image?: {
    url: string;
  };
  tags?: string[];
  publish_details?: {
    time: string;
  };
  uid?: string;
};

type Props = {
  blogs: BlogEntry[];
};

export default function BlogCards({ blogs }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blog Posts</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog, index) => (
          <div
            key={blog?.uid || index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <Link href={blog?.url || "#"} className="block h-full">
              <div className="relative h-48 w-full">
                {blog?.featured_image?.url && (
                  <Image
                    src={blog.featured_image.url}
                    alt={blog?.title || "Blog Image"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {blog?.title}
                </h3>

                {blog?.description && (
                  <div className="text-sm text-gray-600 line-clamp-3">
                    {parse(blog?.description)}
                  </div>
                )}

                <div className="flex justify-between items-center mt-auto pt-2 text-sm text-gray-500">
                  <span>
                    {blog?.publish_details?.time
                      ? new Date(blog.publish_details.time).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Invalid Date"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {(blog?.tags?.length ? blog.tags : ["Technology"]).map(
                    (tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
