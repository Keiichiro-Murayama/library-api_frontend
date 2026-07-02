"use client";
import Link from "next/link";
import { BookPlus, BookSearch, RefreshCcw, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function MenuPage() {
  // 共通のスタイルを定義（ホバーで浮き上がり、クリックで沈む）
  const menuCardStyle = `
    flex flex-col items-center justify-center 
    w-50 h-50 bg-secondary gap-8  border border-transparent
    cursor-pointer transition-all duration-200 ease-out
    hover:bg-secondary/80 hover:scale-105 hover:shadow-lg hover:border-primary/20
    active:scale-95 active:shadow-sm
  `;

  return (
    <div className="flex flex-col mx-auto p-20 space-y-8 items-center">
      <h1 className="font-bold text-2xl tracking-wider">メニュー一覧</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* 1. 登録 */}
        <Link href="/books/create" className="block">
          <Card className={menuCardStyle}>
            <BookPlus className="w-20 h-20 text-primary transition-transform duration-200" />
            <span className="font-medium">登録</span>
          </Card>
        </Link>

        {/* 2. 検索 */}
        <Link href="/books" className="block">
          <Card className={menuCardStyle}>
            <BookSearch className="w-20 h-20 text-gray-600 transition-transform duration-200" />
            <span className="font-medium">検索</span>
          </Card>
        </Link>

        {/* 3. 更新 */}
        <Link href="/books/edit" className="block">
          <Card className={menuCardStyle}>
            <RefreshCcw className="w-20 h-20 text-gray-600 transition-transform duration-200" />
            <span className="font-medium">更新</span>
          </Card>
        </Link>

        {/* 4. 削除 */}
        <Link href="/books/delete" className="block">
          <Card className={menuCardStyle}>
            <Trash2 className="w-20 h-20 text-rose-800 transition-transform duration-200" />
            <span className="font-medium">削除</span>
          </Card>
        </Link>
      </div>
    </div>
  );
}
