const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const matcher = async () => {
  const timeslot = ["00:00-00:15", "00:15-00:30"];
  timeslot.map(async (item, index) => {
    const sellBid = await prisma.sellOrderBook.findFirst({
      where: {
        timeSlot: item,
      },
      orderBy: {
        price: "asc",
      },
    });
    const buyBid = await prisma.buyOrderBook.findFirst({
      where: {
        timeSlot: item,
      },

      orderBy: {
        price: "desc",
      },
    });
    if (sellBid && buyBid) {
      const volume = min(sellBid.Volume, buyBid.Volume);
      const price = (sellBid.Price + buyBid.Price) / 2;
      const sellTransaction = await prisma.transactions.create({
        data: {
          timeSlot: item,
          Price: price,
          Volume: volume,
          SellerId: sellBid.SellerId,
          BuyerId: "P2P",
        },
      });
      const buyTransaction = await prisma.transactions.create({
        data: {
          timeSlot: item,
          Price: price,
          Volume: volume,
          SellerId: "P2P",
          BuyerId: buyBid.BuyerId,
        },
      });
    }
  });
};
module.exports = {
  matcher,
};
