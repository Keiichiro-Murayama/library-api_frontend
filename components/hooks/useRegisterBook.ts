import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { IRegisterBookService } from "@/Interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

/**
 * 演習 8-11 状態管理とサービスを繋ぐカスタムHookを実装する
 * 図書登録画面の状態管理とイベントハンドリングを行うカスタムHook
 */
export const useRegisterBook = () => {
  // DIコンテナからサービスを取得する
  const service = container.get<IRegisterBookService>(
    TYPES.IRegisterBookService,
  );
  // --- Stateの定義 ---
  const [formData, setFormData] = useState<BookRegistration>({
    title: "",
    author: "",
    stock: 0,
    categoryId: "",
  });
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 入力フォームと状態を初期化して、入力画面に戻る処理
  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      author: "",
      stock: 0,
      categoryId: "",
    });
    setErrors({});
    setIsSuccess(false); // モーダルを閉じる
  }, []);

  // --- 画面初期表示時にカテゴリ一覧を取得する ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await service.getCategories();
        setCategories(data);
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          system: "カテゴリ一覧の取得に失敗しました。",
        }));
      }
    };
    fetchCategories();
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

  // --- カテゴリ選択時に詳細情報を取得する ---
  const handleCategoryChange = useCallback(async (categoryId: string) => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.categoryId === categoryId,
      );
      if (selectedCategory) {
        setFormData((prev) => ({
          ...prev,
          categoryId: selectedCategory.categoryId,
          categoryName: selectedCategory.name,
        }));
      }
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        category: "カテゴリ詳細の取得に失敗しました。",
      }));
    }
  }, []);

  // --- [登録]ボタンクリック時にデータを永続化する ---
  const handleSubmit = useCallback(async (): Promise<Book | null> => {
    setIsLoading(true);
    try {
      // サービスの登録処理を実行し、結果を返す
      const { categoryName, ...requestData } = formData as any;
      console.log(requestData);
      const result = await service.execute(requestData);
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

  // UIコンポーネントに必要なプロパティと関数を返す
  return {
    formData,
    categories,
    errors,
    isLoading,
    isSuccess,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    resetForm,
  };
};
