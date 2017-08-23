export interface IAuction {
    AuctionTitle: string;
    AuctionDetailsURL: string;
    AuctionId: string;
    AuctionItemsURL: string;
    AuctionLocation: string;
    AuctionDateTime: Date;
    AuctionNotes: string;
}

export interface IAuctionItem {
    ItemId: string;
    AuctionId: string;
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
    LastUpdated: Date;
    Status: string;
    ItemExpiration: Date;
}
