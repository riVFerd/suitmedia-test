'use client';
import ArticleCard from "@/components/ArticleCard";
import Article, {PageSize, SortOption} from "@/models/article";
import {useEffect, useState} from "react";
import {MoonLoader} from "react-spinners";
import Dropdown from "@/components/Dropdown";

export default function ListArticle() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(PageSize.Small);
  const [sortBy, setSortBy] = useState(SortOption.Newest);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchArticles(pageNumber = 1, pageSize = PageSize.Small, sort = SortOption.Newest) {
    try {
      const result = await Article.getArticles(pageNumber, pageSize, sort);
      setArticles(result);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePageSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const pageSize = parseInt(event.target.value);
    setPageSize(pageSize);
    setIsLoading(true);
    await fetchArticles(pageNumber, pageSize, sortBy);
  }

  async function handleSortByChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const sort = event.target.value as SortOption;
    setSortBy(sort);
    setIsLoading(true);
    await fetchArticles(pageNumber, pageSize, sort);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-16 w-full">
      <div className="flex items-center justify-between my-4 px-20 w-full">
        <p>Showing 1-10 of 100</p>
        <div id="menuButton" className="flex">
          <div id="pageSizeDropdown" className="relative flex items-center">
            <label htmlFor="pageSize">Show per page: </label>
            <Dropdown id="pageSize" onChange={handlePageSizeChange}>
              <option value={PageSize.Small}>10</option>
              <option value={PageSize.Medium}>20</option>
              <option value={PageSize.Large}>50</option>
            </Dropdown>
          </div>
          <div id="sortDropdown" className="relative flex items-center">
            <label htmlFor="sort">Sort by: </label>
            <Dropdown id="sort" onChange={handleSortByChange} className="mr-0">
              <option value={SortOption.Newest}>Newest</option>
              <option value={SortOption.Oldest}>Oldest</option>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center min-h-screen">
        {
          isLoading
            ? <MoonLoader color={'#ff6600ff'} loading={isLoading} size={50}/>
            : articles?.map((article) => (
              <ArticleCard key={article.id} article={article}/>
            ))
        }
      </div>
    </div>
  );
}