import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    select: {
      createdAt: true,
    },
  });

  const monthlyProductCount: { [key: number]: number } = {};

  // Iterate over the fetched products to aggregate the count by month
  for (const product of products) {
    const month = product.createdAt.getMonth();
    monthlyProductCount[month] = (monthlyProductCount[month] || 0) + 1;
  }

  const graphData: GraphData[] = [
    { name: "Tháng 1", total: 0 },
    { name: "Tháng 2", total: 0 },
    { name: "Tháng 3", total: 0 },
    { name: "Tháng 4", total: 0 },
    { name: "Tháng 5", total: 0 },
    { name: "Tháng 6", total: 0 },
    { name: "Tháng 7", total: 0 },
    { name: "Tháng 8", total: 0 },
    { name: "Tháng 9", total: 0 },
    { name: "Tháng 10", total: 0 },
    { name: "Tháng 11", total: 0 },
    { name: "Tháng 12", total: 0 },
  ];

  // Update the total for each month in graphData based on the aggregated counts
  for (const month in monthlyProductCount) {
    graphData[parseInt(month)].total = monthlyProductCount[parseInt(month)];
  }

  return graphData;
};
