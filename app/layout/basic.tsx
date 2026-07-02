/**
 * 演習 3-2 Rootレイアウトを作成する
 * Rootレイアウト（全ページ共通の枠組み）
 */
import "../globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "React & Next.js フロントエンド開発",
  description: "3-4. Next.jsの画面構成(App Router)",
};

// 💡 名前を BasicLayout に変更します
export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body className="flex flex-col min-h-screen">
        {/* === ここから：全ページ共通のヘッダー === */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">演習アプリケーション</h1>
            <nav className="mt-2 text-sm flex flex-wrap gap-4">
              {/* 💡 Linkコンポーネントを使う方がNext.js推奨ですが、<a>タグでも動作する */}
              <a href="/" className="hover:underline">
                ホーム
              </a>
              <a href="/chapter03/ex3-2/about" className="hover:underline">
                アバウト
              </a>
              <a
                href="/chapter03/ex3-2/profile/setting"
                className="hover:underline"
              >
                設定
              </a>
            </nav>
          </div>
        </header>
        {/* === ここまで：ヘッダー === */}

        {/* === ここに各ページのコンテンツ (page.tsx) が入る === */}
        <main className="flex-grow container mx-auto p-4">{children}</main>

        {/* === ここから：全ページ共通のフッター === */}
        <footer className="bg-gray-800 text-white text-center p-3 text-sm">
          © {new Date().getFullYear()} Fullness, Inc. All rights reserved.
        </footer>
        {/* === ここまで：フッター === */}
      </body>
    </html>
  );
}
