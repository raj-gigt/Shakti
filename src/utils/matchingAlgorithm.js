const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const matcher = async (client1, myAccountId) => {
  const timeslot = [
    "00:00-00:15",
    "00:15-00:30",
    "00:30-00:45",
    "00:45-01:00",
    "01:00-01:15",
    "01:15-01:30",
    "01:30-01:45",
    "01:45-02:00",
    "02:00-02:15",
    "02:15-02:30",
    "02:30-02:45",
    "02:45-03:00",
    "03:00-03:15",
    "03:15-03:30",
    "03:30-03:45",
    "03:45-04:00",
    "04:00-04:15",
    "04:15-04:30",
    "04:30-04:45",
    "04:45-05:00",
    "05:00-05:15",
    "05:15-05:30",
    "05:30-05:45",
    "05:45-06:00",
    "06:00-06:15",
    "06:15-06:30",
    "06:30-06:45",
    "06:45-07:00",
    "07:00-07:15",
    "07:15-07:30",
    "07:30-07:45",
    "07:45-08:00",
    "08:00-08:15",
    "08:15-08:30",
    "08:30-08:45",
    "08:45-09:00",
    "09:00-09:15",
    "09:15-09:30",
    "09:30-09:45",
    "09:45-10:00",
    "10:00-10:15",
    "10:15-10:30",
    "10:30-10:45",
    "10:45-11:00",
    "11:00-11:15",
    "11:15-11:30",
    "11:30-11:45",
    "11:45-12:00",
    "12:00-12:15",
    "12:15-12:30",
    "12:30-12:45",
    "12:45-13:00",
    "13:00-13:15",
    "13:15-13:30",
    "13:30-13:45",
    "13:45-14:00",
    "14:00-14:15",
    "14:15-14:30",
    "14:30-14:45",
    "14:45-15:00",
    "15:00-15:15",
    "15:15-15:30",
    "15:30-15:45",
    "15:45-16:00",
    "16:00-16:15",
    "16:15-16:30",
    "16:30-16:45",
    "16:45-17:00",
    "17:00-17:15",
    "17:15-17:30",
    "17:30-17:45",
    "17:45-18:00",
    "18:00-18:15",
    "18:15-18:30",
    "18:30-18:45",
    "18:45-19:00",
    "19:00-19:15",
    "19:15-19:30",
    "19:30-19:45",
    "19:45-20:00",
    "20:00-20:15",
    "20:15-20:30",
    "20:30-20:45",
    "20:45-21:00",
    "21:00-21:15",
    "21:15-21:30",
    "21:30-21:45",
    "21:45-22:00",
    "22:00-22:15",
    "22:15-22:30",
    "22:30-22:45",
    "22:45-23:00",
    "23:00-23:15",
    "23:15-23:30",
    "23:30-23:45",
    "23:45-00:00",
  ];
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
      const sellerAccountId = sellBid.Seller.hederaAccountId;
      const buyerAccountId = buyBid.Buyer.hederaAccountId;
      const sellHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(volume)) //Sending account
        .addHbarTransfer(sellerAccountId, Hbar.fromTinybars(-volume)) //Receiving account
        .execute(client1)
        .setTransactionMemo(
          JSON.stringify({ date: dateString, timeslot: item })
        );

      const buyHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-volume)) //Sending account
        .addHbarTransfer(buyerAccountId, Hbar.fromTinybars(volume)) //Receiving account
        .execute(client1)
        .setTransactionMemo(
          JSON.stringify({ date: dateString, timeslot: item })
        );
      //Verify the transaction reached consensus
      const selltransactionReceipt = await sellHbar.getReceipt(client1);
      const buytransactionReceipt = await buyHbar.getReceipt(client1);
      console.log(
        "The sell transfer transaction from my account to the new account was: " +
          selltransactionReceipt.toString()
      );
      console.log(
        "The buy transfer transaction from my account to the new account was: " +
          buytransactionReceipt.toString()
      );
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
