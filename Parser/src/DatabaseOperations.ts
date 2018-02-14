import { IAuction, IAuctionItem } from 'Models';
import * as sqlite3 from 'sqlite3';

let db: sqlite3.Database;

export function OpenDb() {
    db = new sqlite3.Database('../database/auctions.sqlite');
    db.serialize();
}

export function CloseDb() {
    db.close();
}

export function InsertAuction(auction: IAuction) {
    const sql = `
    INSERT OR REPLACE INTO auctions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    try {
        db.run(sql, 
            auction.idWlAuctions,
            auction.auctionNumber,
            auction.auctionLocationIdmf,
            auction.items,
            auction.timeRemaining,
            auction.showTimeRemaining,
            auction.endDateText,
            auction.endDate,
            auction.endTimeText,
            auction.endDateTime,
            auction.auctionUrl,
            auction.status,
            auction.createdTs,
            auction.picUrl,
            auction.timeStatus,
            auction.ftalocationName,
            auction.locId,
            auction.iframeUrl,
            auction.removal,
            auction.auctionMininame,
            auction.title,
            auction.negTime,
            auction.closedAuctionsPageDate
        );
    } catch (error) {
        console.log("Error inserting auction.");
        throw error;
    }
    
}

export function InsertAuctionItem(auctionItem: IAuctionItem) {
    const sql = `
    INSERT OR REPLACE INTO items VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.run(sql, 
            auctionItem.id,
            auctionItem.AuctionId,
            auctionItem.AuctionNumber,
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

export async function SaveAuctionItems(auctionItems: IAuctionItem[]) {
    await auctionItems.forEach(auctionItem => InsertAuctionItem(auctionItem));
}
