// import { ProductCategory } from "./ProductCategory";
// import { ProductStock } from "./ProductStock";
// /**
//  * 演習 6-2 データアクセスとサービスを実装する
//  * 商品インターフェイス
//  */
// export interface Product {
//   productUuid: string; // 商品Id(UUID)
//   name: string; // 商品名
//   price: number; // 単価
//   category: ProductCategory; // 商品カテゴリ
//   stock: ProductStock; // 商品在庫数
// }

import { BookCategory } from "./BookCategory";

/**
 * 図書interface
 */
export interface Book {
  bookId: string;
  title: string; // 図書名
  author: string; // 著者
  category: BookCategory; // 商品カテゴリ
  stock: number; // 商品在庫数
}
