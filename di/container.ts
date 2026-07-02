import { Container } from "inversify";
import { TYPES } from "./types";
import { IBookRepository } from "@/Interfaces/IBookRepository";
import { BookRepository } from "@/Infrastructures/BookRepository";
import { ISearchBookService } from "@/Interfaces/ISearchBookService";
import { SearchBookService } from "@/Services/SearchBookService";
import { IBookCategoryRepository } from "@/Interfaces/IBookCategoryRepository";
import { BookCategoryRepository } from "@/Infrastructures/BookCategoryRepository";
import { IRegisterBookService } from "@/Interfaces/IRegisterBookService";
import { RegisterBookService } from "@/Services/RegisterBookService";

/**
 * 演習 6-2 データアクセスとサービスを実装する
 * DIコンテナの初期化と依存関係の登録
 */
const container = new Container();
// ---------------------------------------------------------
// バインディング（登録）設定
// ---------------------------------------------------------
// リポジトリの登録(モック版を紐付ける)
// container.bind<IProductRepository>(TYPES.IProductRepository).to(MockProductRepository);

/**
//記述例
*/
// container
//   .bind<IProductRepository>(TYPES.IProductRepository)
//   .to(ProductRepository);
container.bind<IBookRepository>(TYPES.IBookRepository).to(BookRepository);
container
  .bind<IBookCategoryRepository>(TYPES.IBookCategoryRepository)
  .to(BookCategoryRepository);
container
  .bind<ISearchBookService>(TYPES.ISearchBookService)
  .to(SearchBookService);
container
  .bind<IRegisterBookService>(TYPES.IRegisterBookService)
  .to(RegisterBookService);

export { container };
