import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";

export interface IRegisterBookService {
  /**
   * 画面初期表示時: すべての図書カテゴリを取得する
   * @return すべての図書カテゴリのリスト（非同期）
   */
  getCategories(): Promise<BookCategory[]>;

  // /**
  //  * 入力終了時: 図書名の重複を検証する
  //  * @param name 入力された図書名
  //  * @throws 図書名が重複している場合はエラーをスローする
  //  */
  // validateBookName(name: string): Promise<void>;

  /**
   * 登録実行時: 図書データを永続化する
   * @param product 登録する図書データ
   * @return 登録された図書（非同期）
   */
  execute(product: BookRegistration): Promise<Book>;
}
