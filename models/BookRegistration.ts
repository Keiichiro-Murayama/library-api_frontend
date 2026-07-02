export interface BookRegistration {
  title: string; // 図書名
  author: number; // 著者
  stock: number; // 在庫数
  categoryId: string; // カテゴリId(UUID)
  categoryName: string; // カテゴリ名
}
