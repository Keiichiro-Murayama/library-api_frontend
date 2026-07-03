import { TYPES } from "@/di/types";
import type { IBookRepository } from "@/Interfaces/IBookRepository";
import type { IUpdateBookService } from "@/Interfaces/IUpdateBookService";
import { Book } from "@/models/Book";
import { BookUpdate } from "@/models/BookUpdate";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateBookService implements IUpdateBookService {
  /**
   * コンストラクタ
   * @param bookRepository
   */
  constructor(
    @inject(TYPES.IBookRepository)
    private bookRepository: IBookRepository,
  ) {}

  /**
   * 更新実行
   * @param book 更新する図書データ
   * @returns 更新された図書
   */
  async execute(book: BookUpdate, uuid: string): Promise<Book> {
    return await this.bookRepository.Update(book, uuid);
  }
}
