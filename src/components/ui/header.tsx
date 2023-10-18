import React from 'react'
import { Card } from "./card"
import { Button } from "./button"
import { HomeIcon, ListOrderedIcon, LogInIcon, MenuIcon, Percent, PercentCircleIcon, PercentIcon, ShoppingCartIcon } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet"

const Header = () => {
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
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="outline" className="gap-2 w-full justify-start">
              <LogInIcon size={16} /> Fazer login
            </Button>

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