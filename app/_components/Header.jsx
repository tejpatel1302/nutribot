'use client'

import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import App from './App'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AuthDialog from './Login_Registartion'
import { usePathname, useRouter} from 'next/navigation'

  

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
 
    console.log(pathname,'url')
  const handleRedirect = () => {
    router.push("/"); // Redirect to a different page
  };
  return (
    <div className='p-5 shadow-md flex justify-between'>
        <div className='flex items-center gap-8 '>
            <div className='text-2xl font-bold text-green-600 cursor-pointer' onClick={handleRedirect} >NutriBot</div>
            <div>
                
                <DropdownMenu>
  <DropdownMenuTrigger asChild><h2 className='md:flex hidden cursor-pointer gap-2 border-2 border-gray-50 bg-slate-200 p-2 px-10 rounded-full'>
                    <LayoutGrid className='h-5 w-5'/>
                    Features
                </h2></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Features</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Customised Diet Plan / Growth Chart</DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>

            </div>
            <div className='border rounded-full p-2 md:flex items-center gap-2 px-5 hidden'>
                <Search/>
                <input placeholder='Search' className='outline-none'/>
            </div>
        </div>
        <div className='flex gap-2'>
           <h2 className='flex gap-2 items-center'> <ShoppingBag/> 0</h2>
           <Dialog>
  <DialogTrigger asChild className="w-full">
   {pathname == '/' && <Button>Generate Plan</Button>}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription asChild>
        <App />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

           <AuthDialog/>
        </div>
    </div>
  )
}

export default Header