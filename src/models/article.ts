import PageInfo from "@/models/page_info";

class Image {
  id: number;
  mime: string;
  file_name: string;
  url: string;

  constructor(id: number, mime: string, file_name: string, url: string) {
    this.id = id;
    this.mime = mime;
    this.file_name = file_name;
    this.url = url;
  }
}

// Enum option for sorting articles
export enum SortOption {
  Newest = '-published_at',
  Oldest = 'published_at',
}

export enum PageSize {
  Small = 10,
  Medium = 20,
  Large = 50,
}

class Article {
  id: number;
  slug: string;
  title: string;
  content: HTMLElement;
  published_at: Date;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  small_image: Image[] | null;
  medium_image: Image[] | null;

  constructor(
    id: number,
    slug: string,
    title: string,
    content: HTMLElement,
    published_at: Date,
    deleted_at: string | null,
    created_at: string,
    updated_at: string,
    small_image: Image[],
    medium_image: Image[]
  ) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.published_at = published_at;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.small_image = small_image;
    this.medium_image = medium_image;
  }

  // Static method to convert JSON to Article instance
  static fromJson(json: any): Article {
    return new Article(
      json.id,
      json.slug,
      json.title,
      json.content,
      new Date(json.published_at),
      json.deleted_at,
      json.created_at,
      json.updated_at,
      json?.small_image?.map((img: any) => new Image(img.id, img.mime, img.file_name, img.url)) || null,
      json?.medium_image?.map((img: any) => new Image(img.id, img.mime, img.file_name, img.url)) || null
    );
  }

  // Static method to get all articles
  static async getArticles(pageNumber: number = 1, pageSize: PageSize = PageSize.Small, sort: SortOption = SortOption.Newest): Promise<{ articles: Article[] | null, pageInfo: PageInfo | null }> {
    const baseUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
    const queryParams = new URLSearchParams({
      'page[number]': pageNumber.toString(),
      'page[size]': pageSize.toString(),
      'sort': sort
    });
    queryParams.append('append[]', 'small_image');
    queryParams.append('append[]', 'medium_image');

    const url = `${baseUrl}?${queryParams.toString()}`;

    let articles: Article[] | null = null;
    let pageInfo: PageInfo | null = null;

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
        return Article.fromJson(article);
      });
      pageInfo = PageInfo.fromJson(data);
    }

    return { articles, pageInfo };
  }

  static async getArticlesByUrl(url: string): Promise<{ articles: Article[] | null, pageInfo: PageInfo | null }> {
    let articles: Article[] | null = null;
    let pageInfo: PageInfo | null = null;

    // Extract query parameters from the provided URL
    const urlObj = new URL(url);
    const queryParams = urlObj.searchParams;

    // Form the internal API URL using the extracted query parameters
    const internalApiUrl = `/api/suitmedia?${queryParams.toString()}`;

    const response = await fetch(internalApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      articles = data.data.map((article: any) => Article.fromJson(article));
      pageInfo = PageInfo.fromJson(data);
    }

    return { articles, pageInfo };
  }


}

export default Article;
