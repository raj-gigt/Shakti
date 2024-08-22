const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const matcher = async (client1, myAccountId) => {
  let timeslot = [];
  for (let i = 0; i < 96; i++) {
    timeslot[i] = i + 1;
  }
  timeslot.map(async (item, index) => {
    const sellBid = await prisma.sellOrderBook.findFirst({
      where: {
        TimeSlot: item,
      },
      orderBy: {
        Price: "asc",
      },
      include: {
        Seller: true,
      },
    });
    const buyBid = await prisma.buyOrderBook.findFirst({
      where: {
        TimeSlot: item,
      },

      orderBy: {
        Price: "desc",
      },
      include: {
        Buyer: true,
      },
    });
    if (sellBid && buyBid) {
      const volume = Math.min(sellBid.Volume, buyBid.Volume);
      const price = (sellBid.Price + buyBid.Price) / 2;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      // console.log(date);
      const dateString = formatDate(date);
      // console.log(dateString);
      const sellTransaction = await prisma.transactions.create({
        data: {
          TimeSlot: item,
          Price: price,
          Volume: volume,
          SellerId: sellBid.SellerId,
          BuyerId: buyBid.BuyerId,
          date: dateString,
        },
      });
      // const sellerAccountId = sellBid.Seller.hederaAccountId;
      // const buyerAccountId = buyBid.Buyer.hederaAccountId;
      // const sellHbar = await new TransferTransaction()
      //   .addHbarTransfer(myAccountId, Hbar.fromTinybars(volume)) //Sending account
      //   .addHbarTransfer(sellerAccountId, Hbar.fromTinybars(-volume)) //Receiving account
      //   .execute(client1)
      //   .setTransactionMemo(
      //     JSON.stringify({ date: dateString, timeslot: item })
      //   );

      // const buyHbar = await new TransferTransaction()
      //   .addHbarTransfer(myAccountId, Hbar.fromTinybars(-volume)) //Sending account
      //   .addHbarTransfer(buyerAccountId, Hbar.fromTinybars(volume)) //Receiving account
      //   .execute(client1)
      //   .setTransactionMemo(
      //     JSON.stringify({ date: dateString, timeslot: item })
      //   );
      // //Verify the transaction reached consensus
      // const selltransactionReceipt = await sellHbar.getReceipt(client1);
      // const buytransactionReceipt = await buyHbar.getReceipt(client1);
      // console.log(
      //   "The sell transfer transaction from my account to the new account was: " +
      //     selltransactionReceipt.toString()
      // );
      // console.log(
      //   "The buy transfer transaction from my account to the new account was: " +
      //     buytransactionReceipt.toString()
      // );
    }
  });
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

module.exports = {
  matcher,
  formatDate,
};
