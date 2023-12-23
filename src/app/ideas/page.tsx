import Banner from "@/app/ideas/Banner";
import ListArticle from "@/app/ideas/ListArticle";

export default function Ideas() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Banner/>
      <ListArticle/>
    </main>
  )
}
