import prismadb from "@/lib/prismadb";

import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";

import { Overview } from "@/components/charts/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/format";
import { CreditCard, DollarSign } from "lucide-react";
import ActiveProductsChart from "@/components/charts/active-products-chart";


export default async function Home() {

  const products = await prismadb.product.findMany();

  const totalRevenue = await getTotalRevenue();
  const salesCount = await getSalesCount();
  const graphRevenue = await getGraphRevenue();

  return (
    <main className="">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading title="Panel de administración" description="Analíticas de la tienda" />
          <Separator />
          <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{salesCount}</div>
              </CardContent>
            </Card>
            <Card>
              <div className="grid w-full flex-1 gap-6">
                <ActiveProductsChart products={products} />
              </div>
            </Card>
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardContent className="pl-2">
                <Overview data={graphRevenue} />
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
