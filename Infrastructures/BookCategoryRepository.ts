import { IBookCategoryRepository } from "@/Interfaces/IBookCategoryRepository";
import { BookCategory } from "@/models/BookCategory";
import { injectable } from "inversify";
import { getSession } from "next-auth/react";

@injectable()
export class BookCategoryRepository implements IBookCategoryRepository {
  /**
   * カテゴリ一覧を取得
   * @returns
   */
  async findAll(): Promise<BookCategory[]> {
    // const session = await getSession();
    // const token = (session as any)?.user?.token;
    const response = await fetch("/proxy-api/categories", {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("図書カテゴリの取得に失敗しました。");
    }
    return await response.json();
  }
  /**
   * カテゴリIDでカテゴリを取得
   * @param id
   * @returns
   */
  async findById(id: string): Promise<BookCategory> {
    const session = await getSession();
    const token = (session as any)?.user?.token;
    const response = await fetch(
      `/proxy-api/products/register/categories/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("図書カテゴリ詳細の取得に失敗しました。");
    }
    return await response.json();
  }
}
