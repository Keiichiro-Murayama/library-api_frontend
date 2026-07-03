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
import { AlertCircle, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteBook } from "@/components/hooks/useDeleteBook";
import { OctagonAlertIcon } from "lucide-react";

export const DeleteBook = () => {
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
    errors,
    isLoading: isUpdating,
    isSuccess,
    handleSelect,
    handleSubmit,
    handleCancel,
  } = useDeleteBook();

  //検索文字列長の判定
  const handleSetKeyword = (value: string) => {
    if (value.length <= maxLength) {
      setKeyword(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8  shadow-sm border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center border-b pb-4">
        図書削除
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
                        variant={"destructive"}
                        className="mx-auto "
                        onClick={() => handleSelect(book)}
                      >
                        削除
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6  shadow-lg text-center w-120">
            <h3 className="text-xl font-bold mb-4">図書を削除しますか？</h3>
            <p className="text-gray-600 mb-8">この操作は取り消せません。</p>
            <div className="bg-secondary p-6  shadow-sm text-center w-full mb-8 flex flex-col gap-2">
              <span className="font-bold text-left text-lg">
                {selectedBook.title}
              </span>
              <span className="text-gray-600">
                著者：{selectedBook.author} / 分類：{selectedBook.category.name}{" "}
                / 在庫：{selectedBook.stock}
              </span>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant={"default"} onClick={handleCancel}>
                キャンセル
              </Button>
              <Button variant={"secondary"} onClick={handleSubmit}>
                削除する
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 完了ダイアログ（削除成功時） */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 shadow-lg text-center w-120 ">
            <h3 className="text-xl font-bold mb-2">削除が完了しました</h3>
            <p className="text-sm text-gray-500 mb-6">
              図書データは正常にシステムから削除されました。
            </p>
            <div className="flex justify-center gap-4">
              {/* Homeに戻るボタン（Linkコンポーネントでラップ） */}
              <Button variant="default" asChild>
                <Link href="/">Homeに戻る</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
