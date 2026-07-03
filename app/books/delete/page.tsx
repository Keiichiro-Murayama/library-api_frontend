import { DeleteBook } from "@/components/api/books/DeleteBook";
/**
 * 図書削除

 */
export default function BookDeletePage() {
  return (
    <main className="container mx-auto py-8">
      {/* 先ほど作成したUIコンポーネントを呼び出す */}
      <DeleteBook />
    </main>
  );
}
