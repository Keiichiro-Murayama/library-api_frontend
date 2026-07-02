import { BookSearch } from "@/components/api/books/BookSearch";
/**
 * 図書キーワード検索ページ
 * URL: /products/search
 */
export default function ProductSearchPage() {
  return (
    <main className="container mx-auto py-8">
      <BookSearch />
    </main>
  );
}
