"use client";

import { Category } from "@prisma/client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CategoriesTableProps {
    categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
    const router = useRouter();

    const onDelete = async (id: string) => {
        try {
            await axios.delete(`/api/categories/${id}`);
            router.refresh();
            toast.success("Categoría eliminada con éxito");
        } catch (error) {
            console.error("Error eliminando la categoría:", error);
            toast.error("Ha ocurrido un error, asegúrese de eliminar todos los productos de esta categoría.");
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Nombre</TableHead>
                    <TableHead className="text-center">Editar</TableHead>
                    <TableHead className="text-center">Borrar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell className="text-center">{category.name}</TableCell>
                        <TableCell className="text-center flex justify-center">
                            <Link href={`/categories/${category.id}`} className="text-blue-500 hover:text-blue-700">
                                <Pencil className="w-5 h-5" />
                            </Link>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-center">
                                <Trash
                                    className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => onDelete(category.id)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
