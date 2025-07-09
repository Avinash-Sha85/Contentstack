import Image from "next/image";
import parse from "html-react-parser";
export default function BlogDetailPage({ blog }: { blog: any }) {
  if (!blog) {
    return (
      <div className="text-center text-gray-500 py-20">Blog Not Found</div>
    );
  }

  const {
    title,
    shorttitle,
    summary,
    publish_details,
    featured_image,
    tags,
    description,
  } = blog;

  const formattedDate = publish_details?.time
    ? new Date(publish_details?.time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Invalid Date";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-[400px] w-full">
        {featured_image?.url && (
          <Image
            src={featured_image.url}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            priority
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
            {shorttitle}
          </h1>
          <p className="text-sm italic">{formattedDate}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white p-8 shadow-xl rounded-lg relative z-10">
          {summary && (
            <div className="text-lg text-gray-600 mb-6 leading-relaxed">
              {parse(summary)}
            </div>
          )}

          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              {title}
            </h2>
          )}

          {description && (
            <div className="text-base text-gray-700 leading-7 whitespace-pre-line">
              {parse(description)}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {(tags?.length ? tags : ["Technology"]).map((tag: string) => (
              <span
                key={tag}
                className="bg-blue-600 text-white text-xs uppercase font-semibold px-3 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
