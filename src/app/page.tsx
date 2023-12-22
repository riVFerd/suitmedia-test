import Article from "@/models/article";

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

export default async function Home() {
  const url = 'https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at';
  let articles: Article[] | null = await getArticles();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        articles?.map((article, index) => {
            console.log(article.content);
            return (
                <div key={index} className="flex flex-col items-center justify-center h-[200vh]">
                  {/*TODO: Display article card here*/}
                </div>
            )
          }
        )
      }
    </main>
  )
}
