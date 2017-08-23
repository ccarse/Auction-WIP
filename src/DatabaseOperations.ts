import { IAuction, IAuctionItem } from 'Models';
import * as sqlite3 from 'sqlite3';

let db: sqlite3.Database;

export function OpenDb() {
    db = new sqlite3.Database('./database/auctions.sqlite');
    db.serialize();
}

export function CloseDb() {
    db.close();
}

export function InsertAuction(auction: IAuction) {
    const sql = `
    INSERT OR REPLACE INTO auctions VALUES(?,?,?,?,?,?,?)
    `;

    db.run(sql, 
            auction.AuctionId, 
            auction.AuctionTitle, 
            auction.AuctionDetailsURL, 
            auction.AuctionItemsURL, 
            auction.AuctionLocation, 
            auction.AuctionDateTime, 
            auction.AuctionNotes);
    
}

export function InsertAuctionItem(auctionItem: IAuctionItem) {
    const sql = `
    INSERT OR REPLACE INTO items VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.run(sql, 
            auctionItem.ItemId,
            auctionItem.AuctionId,
            auctionItem.ItemDescription,
            auctionItem.ItemURL,
            auctionItem.ItemCurrentBid,
            auctionItem.ItemNextBid,
            auctionItem.ItemAdditionalInfo,
            auctionItem.SortOrder,
            auctionItem.Brand,
            auctionItem.Model,
            auctionItem.MSRP,
            auctionItem.Specifications,
            auctionItem.LastUpdated,
            auctionItem.Status,
            auctionItem.ItemExpiration);

}

export function SelectAuctionIds(callback: (rows: string[]) => any) {
    const sql = `
    SELECT AuctionId FROM auctions
    `;

    db.all(sql, (err, rows) => {
        callback(rows.map(r => r.AuctionId));
    });
}
