import { GetAuctions } from "./GetAuctions";
import { IAuction, IAuctionItem } from "./Models";

import * as db from './DatabaseOperations';
import { DelayPromise } from "./DelayPromise";
import { GetAuctionItems } from "./GetAuctionItems";

import * as rp from 'request-promise-native';

function SaveAuctionItems(auctionItems: IAuctionItem[]) {
  auctionItems.forEach(auctionItem => db.InsertAuctionItem(auctionItem));
}
async function main() {
  try {
    db.OpenDb();
    
    const auctions = await GetAuctions();
    console.log(JSON.stringify(auctions, null, 2));
  
    for (const [index, auction] of auctions.entries()) {
      try {
        await db.InsertAuction(auction);
        // console.log("Index: " + index + " Auction: " + auction);
        const items = await GetAuctionItems(auction);//auction.auctionUrl, auction.auctionNumber);
        // console.log("Items: " + items.length);
        //auction.itemsArray = items;
        await SaveAuctionItems(items);
      } catch (error) {
        console.log("Error getting auction items or saving auction: " + error);
      }
    }
  } catch (error) {
    console.log("Error getting auctions: " + error);
    console.log(JSON.stringify(error, null, 2));
  }
}

main();
