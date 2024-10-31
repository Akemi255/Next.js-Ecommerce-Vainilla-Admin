import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateLearningModal from "./modals/create-learning-modal";
import { LearningCategory } from "@prisma/client";

interface LearningToggleProps {
    learningCategories: LearningCategory[]
}

export default function LearningToggle({ learningCategories }: LearningToggleProps) {

    const router = useRouter();

    const onCategorySelect = (category: { id: string; name: string }) => {
        router.push(`/learning/${category.id}`)
    };

    const [open, setOpen] = useState(false);

    return (
        <>
            <CreateLearningModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="sm:w-[150px] w-[100px]  flex justify-center text-center"
                    >
                        <Book className="ml-3 hidden sm:flex" />
                        <h1 className="sm:ml-0 ml-3">Histories</h1>
                        <ChevronsUpDown className="ml-auto mr-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {learningCategories?.map((category) => (
                        <DropdownMenuItem
                            key={category.id}
                            onClick={() => onCategorySelect(category)}
                            className="cursor-pointer"
                        >
                            {category.name}
                        </DropdownMenuItem>
                    ))}
                    <Separator />
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        className="cursor-pointer"
                    >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Añadir historia
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
