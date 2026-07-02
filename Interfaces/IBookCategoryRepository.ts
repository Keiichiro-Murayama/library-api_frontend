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
  /**
   * 指定したIDの図書カテゴリを取得する
   * @param id 図書カテゴリId(UUID)
   * @returns 図書カテゴリ（非同期）
   */
  findById(id: string): Promise<BookCategory>;
}
