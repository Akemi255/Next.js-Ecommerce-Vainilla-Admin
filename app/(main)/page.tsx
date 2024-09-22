import Charts from "@/components/charts/charts";
import prismadb from "@/lib/prismadb";


export default async function Home() {

  const products = await prismadb.product.findMany();
  const availableProducts = products.filter(product => product.stock > 0);

  const orders = await prismadb.order.findMany();
  const paidOrders = orders.filter(order => order.isPaid === true);

  return (
    <main className="">
      <Charts products={availableProducts} orders={paidOrders} />
    </main>
  );
}
