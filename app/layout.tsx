import FrontMenuLayout from "./layout/frontmenu";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css"; // あなたのCSSファイル

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // 使う太さを指定
  variable: "--font-noto-sans", // CSS変数として定義
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💡 読み込んだレイアウトにページの中身(children)を渡してそのまま返す
  return <FrontMenuLayout>{children}</FrontMenuLayout>;
}
