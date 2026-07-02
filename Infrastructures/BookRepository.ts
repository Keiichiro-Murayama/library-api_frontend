import { IBookRepository } from "@/Interfaces/IBookRepository";
import { Book } from "@/models/Book";
import { injectable } from "inversify";

@injectable()
export class BookRepository implements IBookRepository {
  //キーワード検索
  public async searchKeyword(keyword: string): Promise<Book[]> {
    console.log(keyword);
    const params = new URLSearchParams({ keyword: keyword });
    const response = await fetch(`/proxy-api/books?${params.toString()}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "application/json",
      // },
    });
    // ステータスコードに応じたエラーハンドリング
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // バックエンドで設定した "message" (検索キーワードを入力してください。等) があればそれを投げる
      if (errorData.message) {
        throw new Error(errorData.message);
      }
      // それ以外のエラーへの対応
      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }
      throw new Error(`検索に失敗しました (Status: ${response.status})`);
    }

    // 成功時は商品リスト(JSON)をパースして返却する
    const books: Book[] = await response.json();
    return books;
  }
}
