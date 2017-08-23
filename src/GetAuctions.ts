import * as cheerio from 'cheerio';
import { IAuction } from "Models";
import * as rp from 'request-promise-native';

// tslint:disable-next-line:no-var-requires
const chrono = require('chrono-node');

export function GetAuctions() {
  const url = 'http://bidfta.com/search?utf8=%E2%9C%93&keywords=&search%5Btagged_with%5D=&location=Columbus%2C+Oh&seller=&button=';
  const proxy = 'http://proxy.us.abb.com:8080';
  const requestOptions = {
    url,
    //proxy
  };

  return rp(requestOptions)
  .then(bodyString => {
    const $ = cheerio.load(bodyString);
    const auctions = $('.auction');
  
    const p: Array<Promise<IAuction>> = [];
    for (let index = 0; index < auctions.length; index++) {
      const element = auctions.get(index);
      const auctionDetailsURL = $(element).find('a').first().attr('href');
      const auctionId = auctionDetailsURL.substr(auctionDetailsURL.indexOf('?') + 1);

      const pr = rp({...requestOptions, url: auctionDetailsURL})
      .then(detailsString => {
        const auctionDateTimeStr = cheerio.load(detailsString)('table').last().find('tr:nth-of-type(2)').find('td:nth-of-type(2)').text();
        const auctionNotes = cheerio.load(detailsString)('table').last().find('tr:nth-of-type(6)').find('td:nth-of-type(2)').text();

        const auction: IAuction = {
          AuctionTitle: $(element).find('.auctionTitle').find('h4').text(),
          AuctionDetailsURL: auctionDetailsURL,
          AuctionId: auctionId,
          AuctionItemsURL: 'https://bid.bidfta.com/cgi-bin/mnlist.cgi?' + auctionId + '/category/ALL',
          AuctionLocation: $(element).find('.auctionLocation').text(),
          AuctionDateTime: chrono.parseDate(auctionDateTimeStr.replace("EST", "EDT")),
          AuctionNotes: auctionNotes
        };

        // console.log(auction);
        return auction;
      });
      p.push(pr);
    }
    return Promise.all(p);
  });
}
