import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IDeleteBookService } from "@/Interfaces/IDeleteBookService";
import { Book } from "@/models/Book";
import { BookUpdate } from "@/models/BookUpdate";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useDeleteBook = () => {
  // DIコンテナからサービスを取得する
  const service = container.get<IDeleteBookService>(TYPES.IDeleteBookService);

  //State
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 変更対象図書の選択イベント
  const handleSelect = useCallback((book: Book) => {
    setSelectedBook(book); // Stateを更新する
  }, []);

  // --- 削除ボタンクリック時にデータを永続化する ---
  const handleSubmit = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // サービスの削除処理を実行し、結果を返す
      await service.execute(selectedBook!.bookId);
      setIsSuccess(true);
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const handleCancel = useCallback(async (): Promise<void> => {
    setSelectedBook(null);
  }, []);

  return {
    selectedBook,
    errors,
    isLoading,
    isSuccess,
    handleSelect,
    handleSubmit,
    handleCancel,
  };
};
