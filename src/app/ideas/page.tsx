import Article from "@/models/article";
import Banner from "@/app/ideas/Banner";

async function getArticles(): Promise<Article[] | null> {
  const url = 'https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at';
  let articles: Article[] | null = null;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    articles = data.data.map((article: any) => {
      return Article.fromJson(article)
    });
  }

  return articles;
}

export default async function Ideas() {
  const url = 'https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at';
  let articles: Article[] | null = await getArticles();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between h-[200vh]">
      <Banner/>
      {
        articles?.map((article, index) => {
            return (
              <div key={index} className="flex flex-col items-center justify-center">
                {/*TODO: Display article card here*/}
              </div>
            )
          }
        )
      }
    </main>
  )
}
