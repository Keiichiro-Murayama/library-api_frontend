import { IBookRepository } from "@/Interfaces/IBookRepository";
import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";
import { BookUpdate } from "@/models/BookUpdate";
import { injectable } from "inversify";

//指定したミリ秒だけ待機するsleep関数を定義
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

@injectable()
export class BookRepository implements IBookRepository {
  /**
   * キーワード検索
   * @param keyword
   * @returns
   */
  public async searchKeyword(keyword: string): Promise<Book[]> {
    ///検索時間を意図的に設ける
    console.log("処理を開始します");
    for (let i = 1; i <= 3; i++) {
      await sleep(500); // 1秒（1000ms）待機
      console.log(
        `${i}回目のスリープが完了しました (${new Date().toLocaleTimeString()})`,
      );
    }
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

  async register(book: BookRegistration): Promise<Book> {
    // const session = await getSession();
    // const token = (session as any)?.user?.token;
    const response = await fetch("/proxy-api/books/", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book), // DTOをJSON文字列に変換して送信する
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.message) {
        throw new Error(errorData.message);
      }
      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }
      throw new Error(`図書の登録に失敗しました (Status: ${response.status})`);
    }
    // 登録完了後、バックエンドから返却された完全な商品データ(UUID含む)を返す
    return await response.json();
  }

  async Update(book: BookUpdate, uuid: string): Promise<Book> {
    // const session = await getSession();
    // const token = (session as any)?.user?.token;
    const response = await fetch(`/proxy-api/books/${uuid.toString()}`, {
      method: "PUT",
      headers: {
        //   // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book), // DTOをJSON文字列に変換して送信する
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.message) {
        throw new Error(errorData.message);
      }
      if (errorData.errors) {
        const messages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(messages);
      }
      throw new Error(`図書の更新に失敗しました (Status: ${response.status})`);
    }
    // 登録完了後、バックエンドから返却された完全な商品データ(UUID含む)を返す
    return await response.json();
  }

  public async delete(uuid: string): Promise<void> {
    ///検索時間を意図的に設ける
    console.log("処理を開始します");
    for (let i = 1; i <= 3; i++) {
      await sleep(500); // 1秒（1000ms）待機
      console.log(
        `${i}回目のスリープが完了しました (${new Date().toLocaleTimeString()})`,
      );
    }
    const response = await fetch(`/proxy-api/books/${uuid.toString()}`, {
      method: "DELETE",
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
      throw new Error(`削除に失敗しました (Status: ${response.status})`);
    }
  }
}
