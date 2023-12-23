import Article from "@/models/article";
import Image from "next/image";

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({article}: ArticleCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-80 h-80 bg-white rounded-xl hover:cursor-pointer">
      <div className="relative w-full h-1/2">
        <Image src={article?.medium_image[0]?.url || ""} layout="fill" objectFit="cover" alt={article.title} className="rounded-t-xl" />
      </div>
      <div className="flex flex-col w-full h-1/2 p-4">
        <time className="text-sm text-gray-400">{article.published_at.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
        <h1 className="font-bold overflow-hidden overflow-ellipsis line-clamp-3">{article.title}</h1>
      </div>
    </div>
  )
}