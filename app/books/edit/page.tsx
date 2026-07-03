import { UpdateBook } from "@/components/api/books/UpdateBook";
/**
 * 演習 6-3 Reactコンポーネントを実装してUIを確認する
 * 商品キーワード検索ページ
 * URL: /products/search
 */
export default function BookRegisterPage() {
  return (
    <main className="container mx-auto py-8">
      {/* 先ほど作成したUIコンポーネントを呼び出す */}
      <UpdateBook />
    </main>
  );
}
