import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IUpdateBookService } from "@/Interfaces/IUpdateBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { BookUpdate } from "@/models/BookUpdate";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useUpdateBook = () => {
  // DIコンテナからサービスを取得する
  const service = container.get<IUpdateBookService>(TYPES.IUpdateBookService);

  //State
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<BookUpdate>({
    title: "",
    author: "",
    stock: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 変更フォームと状態を初期化して、入力画面に戻る処理
  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      author: "",
      stock: 0,
    });
    setErrors({});
    setIsSuccess(false); // モーダルを閉じる
    setSelectedBook(null);
  }, []);

  // 変更対象図書の選択イベント
  const handleSelect = useCallback((book: Book) => {
    setSelectedBook(book); // Stateを更新する
    // 選択された図書のデータをフォームの初期値としてセットする
    setFormData({
      title: book.title,
      author: book.author,
      stock: book.stock,
    });
  }, []);

  // --- 入力の変更イベント ---
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      //   stockは数値に変換して保存する
      [name]: name === "stock" ? Number(value) : value,
    }));
  }, []);

  // --- [登録]ボタンクリック時にデータを永続化する ---
  const handleSubmit = useCallback(async (): Promise<Book | null> => {
    setIsLoading(true);
    try {
      // サービスの登録処理を実行し、結果を返す
      const result = await service.execute(formData, selectedBook!.bookId);
      if (result) {
        setIsSuccess(true);
      }
      return result;
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [formData, service]);

  return {
    selectedBook,
    formData,
    errors,
    isLoading,
    isSuccess,
    handleSelect,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
