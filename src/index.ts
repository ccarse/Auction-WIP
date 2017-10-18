import { GetAuctions } from "./GetAuctions";
import { IAuction, IAuctionItem } from "./Models";

import * as db from './DatabaseOperations';
import { DelayPromise } from "./DelayPromise";
import { GetAuctionItems } from "./GetAuctionItems";

import * as rp from 'request-promise-native';

function SaveAuctions(auctions: IAuction[]) {
  auctions.forEach(auction => db.InsertAuction(auction));
}

function SaveAuctionItems(auctionItems: IAuctionItem[]) {
  auctionItems.forEach(auctionItem => db.InsertAuctionItem(auctionItem));
}

async function main() {
  try {

    db.OpenDb();
    const auctions = await GetAuctions();
    // console.log(JSON.stringify(auctions, null, 2));
    SaveAuctions(auctions);
  
    for (const [index, auction] of auctions.entries()) {
      console.log("Index: " + index + " Auction: " + auction);
      const items = await GetAuctionItems(auction.auctionUrl, auction.auctionNumber);
      console.log("Items: " + items.length);
      console.log(JSON.stringify(items, null, 2));
      SaveAuctionItems(items);
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

main();
