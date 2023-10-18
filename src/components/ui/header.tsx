"use client"
import React from 'react'
import { Card } from "./card"
import { Button } from "./button"
import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, Percent, PercentCircleIcon, PercentIcon, ShoppingCartIcon } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Separator } from "./separator"

const Header = () => {
  const { status, data } = useSession()
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
              <Button onClick={handleLoginClick} variant="outline" className="gap-2 w-full justify-start">
                <LogInIcon size={16} /> Fazer login
              </Button>
            )}

            {status === "authenticated" && (
              <Button onClick={handleLogoutClick} variant="outline" className="gap-2 w-full justify-start">
                <LogOutIcon size={16} /> Fazer logout
              </Button>
            )}
            <Button variant="outline" className="gap-2 w-full justify-start">
              <HomeIcon size={16} /> Início
            </Button>
            <Button variant="outline" className="gap-2 w-full justify-start">
              <PercentIcon size={16} /> Ofertas
            </Button>
            <Button variant="outline" className="gap-2 w-full justify-start">
              <ListOrderedIcon size={16} /> Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold"><span className="text-primary">FSW</span>Store</h1>
      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}

export default Header