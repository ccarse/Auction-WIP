import { IAuction, IAuctionItem } from 'Models';
import { config } from '../config';

import * as DB from "documentdb-typescript";
import { Collection, StoreMode } from 'documentdb-typescript';

export async function UpsertAuction(auction: IAuction) {
    const client = new DB.Client(config.host, config.authKey);
    client.enableConsoleLog = true;

    const coll = new Collection("auction", "auctioneer", client);
    await coll.openAsync();

    auction.id = String(auction.idWlAuctions);
    
    await coll.storeDocumentAsync(auction, StoreMode.Upsert);
}

export async function UpsertAuctionItems(items: IAuctionItem[]) {
    const client = new DB.Client(config.host, config.authKey);
    client.enableConsoleLog = true;

    const coll = new Collection("auction-items", "auctioneer", client);
    await coll.openAsync();
    for (var item of items) {
        await coll.storeDocumentAsync(item, StoreMode.Upsert);
    }
    
}
