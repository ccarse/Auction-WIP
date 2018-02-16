export interface IAuction {
  AuctionId: number; // idWlAuctions
  AuctionNumber: number; // auctionNumber
  Title: string; // title
  EndDateTime: string; // endDateTime 
  CreatedTs: string; // createdTs
  PicURL:string; // picUrl
  FtalocationName: string; // ftaLocationName
  LocationMiniName: string; // auctionMininame
  RemovalString: string; // removal
}

export interface IAuctionItem {
  ItemId: string;
  AuctionId: number;
  AuctionNumber: number;
  ItemDescription: string;
  ItemURL: string;
  ItemCurrentBid: number;
  ItemNextBid: number;
  ItemAdditionalInfo: string;
  SortOrder: number;
  Brand: string;
  Model: string;
  MSRP: number;
  Specifications: string;
  LastUpdated: string;
  Status: string;
  ItemExpiration: string;
}
