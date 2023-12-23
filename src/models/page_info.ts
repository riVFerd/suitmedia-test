class MetaLink {
  url: string | null;
  label: string;
  active: boolean;

  constructor(url: string | null, label: string, active: boolean) {
    this.url = url;
    this.label = label;
    this.active = active;
  }

  static fromJson(json: any): MetaLink {
    return new MetaLink(json.url, json.label, json.active);
  }
}

class PageInfo {
  first: string;
  last: string;
  prev: string;
  next: string;
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
  total: number;
  links: MetaLink[];

  constructor(
    first: string,
    last: string,
    prev: string,
    next: string,
    currentPage: number,
    lastPage: number,
    from: number,
    to: number,
    total: number,
    links: MetaLink[]
  ) {
    this.first = first;
    this.last = last;
    this.prev = prev;
    this.next = next;
    this.currentPage = currentPage;
    this.lastPage = lastPage;
    this.from = from;
    this.to = to;
    this.total = total;
    this.links = links;
  }

  static fromJson(json: any): PageInfo {
    const links = json.links.map((link: any) => MetaLink.fromJson(link));
    return new PageInfo(
      json.links.first,
      json.links.last,
      json.links.prev,
      json.links.next,
      json.meta.current_page,
      json.meta.last_page,
      json.meta.from,
      json.meta.to,
      json.meta.total,
      links
    );
  }
}

export default PageInfo;
