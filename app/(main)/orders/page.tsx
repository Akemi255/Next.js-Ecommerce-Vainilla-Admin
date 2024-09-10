import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/format";
import { truncateText } from "@/lib/truncate-text";
import { OrderColumn } from "./types/columns";
import { OrderClient } from "./components/order-table";

export default async function OrdersPage() {

    const orders = await prismadb.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            User: true,
            orderItems: {
                include: {
                    product: true
                }
            },
        },
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: truncateText(item.address, 50),
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        email: item.User?.email
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
}
