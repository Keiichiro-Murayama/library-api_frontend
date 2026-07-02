import type { ISearchBookService } from "@/Interfaces/ISearchBookService";
import { injectable, inject } from "inversify";
import type { Book } from "@/models/Book";
import type { IBookRepository } from "@/Interfaces/IBookRepository";
import { TYPES } from "@/di/types";

@injectable()
export class SearchBookService implements ISearchBookService {
  /**
   *コンストラクタ
   */
  constructor(
    @inject(TYPES.IBookRepository)
    private bookRepository: IBookRepository,
  ) {}

  /**
   * 図書検索を実行する
   * @param keyword
   * @returns
   */
  public async execute(keyword: string): Promise<Book[]> {
    return await this.bookRepository.searchKeyword(keyword);
  }
}
