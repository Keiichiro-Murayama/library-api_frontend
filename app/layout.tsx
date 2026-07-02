import BasicLayout from "./layout/basic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💡 読み込んだレイアウトにページの中身(children)を渡してそのまま返す
  return <BasicLayout>{children}</BasicLayout>;
}
