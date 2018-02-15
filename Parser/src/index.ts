import * as rp from 'request-promise-native';

import * as db from './DatabaseOperations';
import { DelayPromise } from './DelayPromise';
import { GetAuctionItems } from './GetAuctionItems';
import { GetAuctions } from './GetAuctions';

async function main() {
  try {
    db.OpenDb();
    
    const auctions = await GetAuctions();
  
    for (const [index, auction] of auctions.entries()) {
      try {
        await db.InsertAuction(auction);
        // console.log("Index: " + index + " Auction: " + auction);
        const items = await GetAuctionItems(auction); //auction.auctionUrl, auction.auctionNumber);
        // console.log("Items: " + items.length);
        //auction.itemsArray = items;
        items ? await db.SaveAuctionItems(items) : console.log('No items returned for auction.');
      } catch (error) {
        console.log('Error getting auction items or saving auction: ' + error);
      } 
    }
  } catch (error) {
    console.log('Error getting auctions: ' + error);
    console.log(JSON.stringify(error, null, 2));
  }
}

main();
