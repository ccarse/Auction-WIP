import * as auctionController from '../controllers/AuctionController';

export function routes(app:any) {

  app.route('/auctions')
    .get(auctionController.list_upcoming_auctions);


  app.route('/auction/:auctionId')
    .get(auctionController.get_auction_details);
};
