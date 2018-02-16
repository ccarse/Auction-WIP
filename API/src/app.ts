import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import * as db from './DatabaseOperations';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Auction {
    AuctionId: Int
    AuctionNumber: Int
    Title: String
    EndDateTime: String
    CreatedTs: String
    PicURL:String
    FtalocationName: String
    LocationMiniName: String
    RemovalString: String
    Items: [AuctionItem]
  }
  type AuctionItem {
    ItemId: String
    AuctionId: Int
    AuctionNumber: String
    ItemDescription: String
    ItemURL: String
    ItemCurrentBid: Float
    ItemNextBid: Float
    ItemAdditionalInfo: String
    SortOrder: Int
    Brand: String
    Model: String
    MSRP: Float
    Specifications: String
    LastUpdated: String
    Status: String
    ItemExpiration: String
  }
  type Query {
    auctions: [Auction]
    auctionItems(auctionId: String): [AuctionItem]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  auctions: () => {
    return db.GetAuctions();
  },
  auctionItems: ({auctionId}: {auctionId: string}) => {
    return db.GetAuctionItems(auctionId);
  },
};

db.OpenDb();
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
