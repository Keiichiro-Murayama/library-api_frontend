import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { ISearchBookService } from "@/Interfaces/ISearchBookService";
import { Book } from "../../models/Book";
import { useState } from "react";

export const useSearchBook = () => {
  // 状態(State)の定義
  // 検索結果の図書データを配列として保持するState
  const [books, setBooks] = useState<Book[]>([]);
  // 検索処理中(通信中)であるかを判定するためのフラグState
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラー状態を保持するStateを追加（例外発生時のエラーメッセージを保存するため）
  const [error, setError] = useState<string | null>(null);

  //DIコンテナからサービスを取り出す
  const searchBookService = container.get<ISearchBookService>(
    TYPES.ISearchBookService,
  );

  const search = async (keyword: string) => {
    //状態の初期化
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchBookService.execute(keyword);
      setBooks(result);
    } catch (e: any) {
      // リポジトリが投げたエラーをキャッチしてエラーメッセージをStateに保存する
      setError(e.message);
      setBooks([]); // エラー時はリストをクリアする
    } finally {
      // 処理の成功・失敗に関わらず、必ずローディング状態をオフに戻す
      setIsLoading(false);
    }
  };
  // UI層に対して、State(データ)と関数を公開する
  return {
    books, // コンポーネント側で表示するための商品リスト
    isLoading, // コンポーネント側でローディング表示を切り替えるための状態
    error, // コンポーネント側でエラーメッセージを表示するための状態
    search, // コンポーネント側で検索処理を実行するための関数
  };
};
