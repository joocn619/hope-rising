"use client"

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function MobileSidebar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    // Close sidebar on route change
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6 text-slate-300" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-r border-slate-800 w-72">
                {/* We render the Sidebar but strip away its outer container styling if needed, 
                    or just render it as is. 
                    Looking at sidebar.tsx, it has a flex container with specific background/border.
                    We might need to adjust it or accept className props.
                    Ideally Sidebar accepts className to override `h-screen` and `border-r`.
                */}
                <div className="h-full">
                    <Sidebar />
                </div>
            </SheetContent>
        </Sheet>
    )
}
