import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../components/cell-action";
import { EditAction } from "../components/edit-action";

export type OrderColumn = {
  id: string;
  name: string;
  price: string;
  stock: number;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "stock",
    header: "stock",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) =>
      <CellAction data={row.original} />
  },
  {
    id: "editActions",
    header: "Editar",
    cell: ({ row }) =>
      <EditAction data={row.original} />
  },
];
