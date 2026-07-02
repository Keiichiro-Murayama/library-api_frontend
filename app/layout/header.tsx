"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Library } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="border-b border-secondary-200 bg-secondary p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Library className="h-7 w-7 text-primary" />
            <span>図書管理アプリケーション</span>
          </Link>
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            {/* ユーザーアバタードロップダウン */}
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="shadow-sm hover:shadow-lg">
                    Yamada Taro さん
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-32">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      // onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      ログアウト
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
