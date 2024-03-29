"use client"
import React, { useContext } from 'react'
import { Card } from "./card"
import { Button } from "./button"
import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PercentIcon, ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Separator } from "./separator"
import Link from "next/link"
import Cart from "./cart"
import { CartContext } from "@/providers/cart"

const Header = () => {
  const { status, data } = useSession()
  const { products } = useContext(CartContext)

  const cartQuantityItems = products.length

  const handleLoginClick = async () => {
    await signIn()
  }
  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <Card className="flex justify-between p-[1.875rem] items-center">

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">

                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && (<AvatarImage src={data.user.image} />)}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="gap-2 w-full justify-start">
                <LogInIcon size={16} /> Fazer login
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="gap-2 w-full justify-start">
                <LogOutIcon size={16} /> Fazer logout
              </Button>
            )}

            <SheetClose asChild >
              <Link href="/" >
                <Button variant="outline" className="gap-2 w-full justify-start">
                  <HomeIcon size={16} /> Início
                </Button>
              </Link>
            </SheetClose>

            {status === "authenticated" && (
              <SheetClose asChild>
                <Link href="/orders">
                  <Button
                    variant="outline"
                    className="gap-2 w-full justify-start">
                    <ShoppingBasketIcon size={16} /> Meus pedidos
                  </Button>
                </Link>
              </SheetClose>
            )}

            <SheetClose asChild >
              <Link href="/offers" >
                <Button variant="outline" className="gap-2 w-full justify-start">
                  <PercentIcon size={16} /> Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/catalog" >
                <Button variant="outline" className="gap-2 w-full justify-start">
                  <ListOrderedIcon size={16} /> Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/" >
        <h1 className="text-lg font-semibold"><span className="text-primary">FSW</span>Store</h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="relative">
            {cartQuantityItems > 0 && (
              <span className="bg-primary rounded-lg w-6 h-6 flex items-center justify-center text-sm font-bold absolute top-[calc(-1.25rem/2)] right-[calc(-1.25rem/2)]">
                {cartQuantityItems}
              </span>
            )}
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  )
}

export default Header