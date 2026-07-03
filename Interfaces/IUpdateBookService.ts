import { Book } from "@/models/Book";
import { BookUpdate } from "@/models/BookUpdate";
export interface IUpdateBookService {
  /**
   * 更新実行
   * @param 更新する図書データ
   * @return 更新された図書（非同期）
   */
  execute(book: BookUpdate, uuid: string): Promise<Book>;
}
