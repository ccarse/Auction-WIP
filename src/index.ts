import { GetAuctions } from "./GetAuctions";
import { IAuction, IAuctionItem } from "./Models";

import * as db from './DatabaseOperations';
import { DelayPromise } from "./DelayPromise";
import { GetAuctionItems } from "./GetAuctionItems";

function RetrieveAuctions() {
  GetAuctions()
  .then(auctions => SaveAuctions(auctions));
}

function SaveAuctions(auctions: IAuction[]) {
  auctions.forEach(auction => db.InsertAuction(auction));
  RetrieveAuctionItems(auctions);
}

function RetrieveAuctionItems(auctions: IAuction[]) {
  auctions.forEach((auction, index) => {
    GetAuctionItems(auction.AuctionId)
    .then(DelayPromise(index * 100000)).then(auctionItems => SaveAuctionItems(auctionItems));
  });
}

function SaveAuctionItems(auctionItems: IAuctionItem[]) {
  auctionItems.forEach(auctionItem => db.InsertAuctionItem(auctionItem));
}

db.OpenDb();
RetrieveAuctions();
