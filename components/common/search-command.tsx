"use client"

import {Calculator, Calendar, Smile} from "lucide-react"
import * as React from "react"
import { SearchIcon } from '@/components/ui/icons'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/command"

function SearchCommand() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(prevOpen => !prevOpen); // toggle the state
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            {/* Rasm yoki iconni ko'rsatish */}
            <div className="hidden md:block" onClick={() => setOpen(true)}>
    <img src="/images/Search.svg" alt="Search" width={40} height={40} className="cursor-pointer w-6 h-6cchfccf" />
</div>


            {/* CommandDialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <DialogTitle className="sr-only">Search Command</DialogTitle>
                    <DialogDescription className="sr-only">Search for command</DialogDescription>
                    <CommandEmpty>No result found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Drop</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile className="mr-2 h-4 w-4" />
                            <span>MEN</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>WOMAN</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>
        </>
    );
}

export default SearchCommand;
