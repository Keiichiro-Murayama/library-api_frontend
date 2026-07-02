import { IBookRepository } from "@/Interfaces/IBookRepository";
import { ISearchBookService } from "../Interfaces/ISearchBookService";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * DIコンテナ用の識別子(Symbol)定義
 */
export const TYPES = {
  //記述例
  // IProductRepository: Symbol.for("IProductRepository"),
  IBookRepository: Symbol.for("IBookRepository"),
  ISearchBookService: Symbol.for("ISearchBookService"),
};
