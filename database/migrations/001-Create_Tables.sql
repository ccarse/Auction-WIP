-- Up
CREATE TABLE auctions (
  AuctionId INTEGER PRIMARY KEY, --idWlAuctions
  AuctionNumber INTEGER, -- auctionNumber
  Title TEXT, --title
  EndDateTime TEXT, --endDateTime
  CreatedTs TEXT, -- createdTs
  PicURL TEXT, --picUrl
  FtalocationName TEXT, --ftaLocationName
  LocationMiniName TEXT, --auctionMininame
  RemovalString TEXT --removal
);
 
CREATE TABLE items (
  ItemId TEXT,
  AuctionId INTEGER,
  AuctionNumber INTEGER,
  ItemDescription TEXT,
  ItemURL TEXT,
  ItemCurrentBid REAL,
  ItemNextBid REAL,
  ItemAdditionalInfo  TEXT,
  SortOrder INTEGER,
  Brand TEXT,
  Model TEXT,
  MSRP REAL,
  Specifications TEXT,
  LastUpdated INTEGER,
  Status TEXT,
  ItemExpiration INTEGER,
  PRIMARY KEY (ItemId, AuctionId)
) WITHOUT ROWID;

-- Down
DROP TABLE auctions;
DROP TABLE items;
