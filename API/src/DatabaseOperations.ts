import * as sqlite from 'sqlite';
import { IAuction, IAuctionItem } from '../../Models/Models';
import { GetLocalDateTime } from './DateHelper';

let db: sqlite.Database;

export async function OpenDb() {
  db = await sqlite.open('../database/auctions.sqlite');
}

export async function CloseDb() {
  await db.close();
}

export async function GetAuctions() {
  const sql = `
  SELECT 
    * 
  FROM 
    auctions
  WHERE
    datetime(EndDateTime) > datetime("${GetLocalDateTime()}")
  `;

  return db.all(sql);
}

export async function GetAuctionItems(auctionId: string) {
  const sql = `
  SELECT * FROM items WHERE auctionId = ? 
  `;

  return db.all(sql, auctionId);
}
