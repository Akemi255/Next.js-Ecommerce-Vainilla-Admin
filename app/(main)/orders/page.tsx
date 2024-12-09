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
                    product: true,
                    productVariant: {
                        include: {
                            advancedProduct: true,
                        },
                    },
                },
            },
        },
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: truncateText(item.address, 50),
        products: item.orderItems
            .map((orderItem) => {
                if (orderItem.product) {
                    // Si es un producto regular
                    return orderItem.product.name;
                } else if (orderItem.productVariant) {
                    // Si es una variante, usar AdvancedProduct.name seguido de Variant.name
                    const advancedName = orderItem.productVariant.advancedProduct?.name || "Unknown Product";
                    const variantName = orderItem.productVariant.name || "Unknown Variant";
                    return `${advancedName}: ${variantName}`;
                }
                return "Deleted Item";
            })
            .join(", "),
        totalPrice: formatter.format(
            item.orderItems.reduce((total, orderItem) => {
                if (orderItem.product) {
                    return total + Number(orderItem.product.price) * orderItem.quantity;
                } else if (orderItem.productVariant) {
                    return total + Number(orderItem.productVariant.price) * orderItem.quantity;
                }
                return total;
            }, 0)
        ),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        email: item.email,
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
}
