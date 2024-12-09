import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async () => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          productVariant: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      if (item.product) {
        return orderSum + item.product.price * item.quantity;
      } else if (item.productVariant) {
        return orderSum + item.productVariant.price * item.quantity;
      }
      return orderSum;
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
