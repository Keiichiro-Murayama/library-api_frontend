import { Book } from "@/models/Book";

export interface IBookRepository {
  /**
   * 指定したキーワードで図書を検索して取得する
   * @param keyword
   */
  searchKeyword(keyword: string): Promise<Book[]>;
}
