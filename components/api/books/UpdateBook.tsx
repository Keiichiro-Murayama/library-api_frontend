"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchBook } from "@/components/hooks/useSearchBook";
import { useUpdateBook } from "@/components/hooks/useUpdateBook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const UpdateBook = () => {
  // 検索ボックスに入力されたキーワード文字列を保持するローカルState
  const [keyword, setKeyword] = useState<string>("");
  //署名検索のkeyword文字列最大長
  const maxLength = 50;
  // カスタムフックから検索結果(books)、ローディング状態(isLoading)、エラー状態(error)、検索実行関数(search)を取得する
  const { books, isLoading, error, search } = useSearchBook();
  // 検索ボタンのクリックイベントハンドラ
  const handleSearchClick = () => {
    // 入力されているキーワードを引数に渡し、実際の検索処理(ユースケース)を実行する
    search(keyword);
  };
  //変更図書選択字のカスタムフック
  // 変更図書選択時のカスタムフックを呼び出す
  // isLoadingは検索側と被るため、isUpdatingにリネームしています
  const {
    selectedBook,
    formData,
    errors,
    isLoading: isUpdating,
    isSuccess,
    handleSelect,
    handleChange,
    handleSubmit,
    resetForm,
  } = useUpdateBook();
  //検索文字列長の判定
  const handleSetKeyword = (value: string) => {
    if (value.length <= maxLength) {
      setKeyword(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8  shadow-sm border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center border-b pb-4">
        図書変更
      </h2>
      {/* エラーメッセージを表示する */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}
      {/* 検索入力エリア */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <Label htmlFor="keyword-input">書名キーワード</Label>
        <Input
          id="keyword-input"
          type="text"
          value={keyword}
          onChange={(e) => handleSetKeyword(e.target.value)}
          placeholder="検索キーワードを入力"
          className="max-w-sm"
        />
        {/* カウンター表示エリア */}
        <div className="flex justify-end text-xs text-muted-foreground">
          <span
            className={
              keyword.length >= maxLength ? "text-destructive font-medium" : ""
            }
          >
            {keyword.length}
          </span>
          <span> / {maxLength}文字</span>
        </div>

        <Button
          onClick={handleSearchClick}
          disabled={isLoading}
          className="px-8"
        >
          {isLoading ? "検索中" : "検索"}
        </Button>
      </div>

      {/* 検索結果の表示エリア */}
      <div>
        {/* 商品が見つからない場合のメッセージ */}
        {books.length === 0 && !isLoading && (
          <p className="text-center text-muted-foreground py-4">
            該当する図書が見つかりません。{" "}
          </p>
        )}

        {/* 商品が見つかった場合のテーブル表示 */}
        {books.length > 0 && (
          <div>
            <span className="text-s text-muted-foreground">
              ヒット件数：{books.length}件
            </span>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 ">
                  <TableHead className="font-semibold text-foreground">
                    図書名
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    著者
                  </TableHead>
                  <TableHead className="font-semibold text-foreground ">
                    カテゴリ
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    在庫
                  </TableHead>
                  <TableHead className="font-semibold text-foreground text-center">
                    操作
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow
                    key={book.bookId}
                    className={
                      selectedBook?.bookId === book.bookId ? "bg-muted" : ""
                    }
                  >
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell className="font-medium">{book.author}</TableCell>
                    <TableCell className="font-medium">
                      {book.category.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {book.stock}
                      <span className="text-muted-foreground text-xs">冊</span>
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Button
                        variant="outline"
                        className="mx-auto bg-secondary"
                        onClick={() => handleSelect(book)}
                      >
                        {selectedBook?.bookId === book.bookId
                          ? "選択中"
                          : "選択"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {selectedBook && (
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 画面のリロードを防ぐ
            handleSubmit();
          }}
          className="mt-8 p-6 border border-t-2 rounded bg-slate-50"
        >
          {" "}
          <h3 className="text-lg font-bold mb-4">
            「{selectedBook.title}」を変更
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="form-title">図書名</Label>
              <Input
                id="form-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="form-author">著者</Label>
              <Input
                id="form-author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="form-stock">在庫数</Label>
              <Input
                id="form-stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetForm}>
                キャンセル
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "保存中..." : "変更を保存"}
              </Button>
            </div>
          </div>
        </form>
      )}

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h3 className="text-xl font-bold mb-4">変更完了</h3>
            <p className="text-gray-600 mb-8">図書の変更が完了しました。</p>
            <Link href={"/"}>
              <Button
                // ユーザーが「確認」を押したタイミングで入力画面へ遷移する
                onClick={resetForm}
                className="w-full"
              >
                ホーム画面に戻る
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
