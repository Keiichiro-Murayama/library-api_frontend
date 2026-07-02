export interface BookRegistration {
  title: string; // 図書名
  author: string; // 著者
  categoryId: string; // カテゴリId(UUID)
  stock: number; // 在庫数
}
