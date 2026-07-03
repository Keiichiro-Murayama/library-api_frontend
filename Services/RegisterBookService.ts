import { TYPES } from "@/di/types";
import type { IBookCategoryRepository } from "@/Interfaces/IBookCategoryRepository";
import type { IBookRepository } from "@/Interfaces/IBookRepository";
import type { IRegisterBookService } from "@/Interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterBookService implements IRegisterBookService {
  /**
   * コンストラクタ
   * @param bookRepository 図書リポジトリ
   * @param categoryRepository 図書カテゴリリポジトリ
   */
  constructor(
    @inject(TYPES.IBookRepository)
    private bookRepository: IBookRepository,
    @inject(TYPES.IBookCategoryRepository)
    private categoryRepository: IBookCategoryRepository,
  ) {}

  /**
   * 画面初期表示時: すべての図書カテゴリを取得する
   * @return すべての図書カテゴリのリスト（非同期）
   */
  async getCategories(): Promise<BookCategory[]> {
    return await this.categoryRepository.findAll();
  }

  /**
   * 登録実行時: 図書データを永続化する
   * @param book 登録する図書データ
   * @return 登録された図書（非同期）
   */
  async execute(book: BookRegistration): Promise<Book> {
    return await this.bookRepository.register(book);
  }
}
