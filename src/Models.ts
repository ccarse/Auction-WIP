export interface IAuction {
    idWlAuctions: number;
    auctionNumber: number;
    auctionLocationIdmf: number;
    items: number;
    timeRemaining: string;
    showTimeRemaining: boolean;
    endDateText: string;
    endDate: string;
    endTimeText: string;
    endDateTime: string;
    auctionUrl: string;
    status: string;
    createdTs: string;
    picUrl: string;
    timeStatus: number;
    ftalocationName: string;
    locId: number;
    iframeUrl: string;
    removal: string;
    auctionMininame: string;
    title: string;
    negTime: number;
    closedAuctionsPageDate: string;
    itemsArray: Array<IAuctionItem>;
    id: string;
}

export interface IAuctionItem {
    id: string;
    AuctionId: string;
    AuctionNumber: string;
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
