import { BookCategory } from "@/models/BookCategory";
/**
 * 図書カテゴリリポジトリインターフェース
 */
export interface IBookCategoryRepository {
  /**
   * すべての図書カテゴリを取得する
   * @returns すべての図書カテゴリのリスト（非同期）
   */
  findAll(): Promise<BookCategory[]>;
}
