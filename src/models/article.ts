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

class Article {
  id: number;
  slug: string;
  title: string;
  content: HTMLElement;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  small_image: Image[];
  medium_image: Image[];

  constructor(
    id: number,
    slug: string,
    title: string,
    content: HTMLElement,
    published_at: string,
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
      json.published_at,
      json.deleted_at,
      json.created_at,
      json.updated_at,
      json.small_image.map((img: any) => new Image(img.id, img.mime, img.file_name, img.url)),
      json.medium_image.map((img: any) => new Image(img.id, img.mime, img.file_name, img.url))
    );
  }
}

export default Article;
