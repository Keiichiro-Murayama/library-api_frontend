import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";
import { BookUpdate } from "@/models/BookUpdate";
export interface IBookRepository {
  /**
   * 指定したキーワードで図書を検索して取得する
   * @param keyword
   */
  searchKeyword(keyword: string): Promise<Book[]>;
  // existsByName(name: string): Promise<void>;
  register(book: BookRegistration): Promise<Book>;
  Update(book: BookUpdate, uuid: string): Promise<Book>;
  delete(uuid: string): Promise<void>;
}
