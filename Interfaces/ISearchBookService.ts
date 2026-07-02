import { Book } from "@/models/Book";

export interface ISearchBookService {
  /**
   * 図書検索を実行する
   *
   * @param keyword 検索キーワード
   */
  execute(keyword: string): Promise<Book[]>;
}
