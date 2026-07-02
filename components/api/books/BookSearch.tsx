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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const BookSearch = () => {
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
  //検索文字列長の判定
  const handleSetKeyword = (value: string) => {
    if (value.length <= maxLength) {
      setKeyword(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center border-b pb-4">
        図書キーワード検索
      </h2>
      {/* 検索入力エリア */}
      <div className="flex justify-center items-center gap-4 mb-8">
        {/* エラーメッセージを表示する */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{error}</span>
          </div>
        )}
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
                <TableRow className="bg-muted/50">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.bookid}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell className="font-medium">{book.author}</TableCell>
                    <TableCell className="font-medium">
                      {book.category.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {book.stock}
                      <span className="text-muted-foreground text-xs">冊</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
