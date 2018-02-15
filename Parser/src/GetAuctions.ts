import * as cheerio from 'cheerio';
import * as rp from 'request-promise-native';

import { IAuction } from '../../Models/Models';

export async function GetAuctions() {
  const proxy = 'http://proxy.us.abb.com:8080';
  
  const url = 'http://bidfta.bidqt.com/BidFTA/services/invoices/WlAuctions/filter';
  const requestOptions = {
    method: 'POST',
    url: 'http://bidfta.bidqt.com/BidFTA/services/invoices/WlAuctions/filter',
    qs: { page: '1', size: '1000', sort: 'endDateTime asc' },
    headers: { 
      'cache-control': 'no-cache',
      'proxy-connection': 'keep-alive',
      'x-requested-with': 'XMLHttpRequest',
      'referer': 'http://bidfta.bidqt.com/BidFTA/',
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
      'accept-language': 'en-US,en;q=0.9',
      'accept-encoding': 'gzip, deflate',
      'origin': 'http://bidfta.bidqt.com',
      'cookie': 'X-Accept-Language=en-US%2Cen' },
    form: { q: 'showTimeRemaining=0' },
    gzip: true,
    json: true,
    // proxy
  };

  const p: Array<Promise<IAuction>> = [];
  
  const body = await rp(requestOptions);
  
  console.log(JSON.stringify(body, null, 2));

  const columbusAuctions: any[] = body.content.filter((element: any) => {
    return element.ftalocationName.includes('Columbus');
  });

  return columbusAuctions.map((a: any) => {
    const mappedAuction: IAuction = {
      AuctionId: a.idWlAuctions,
      AuctionNumber: a.auctionNumber,
      Title: a.title,
      EndDateTime: a.endDateTime,
      CreatedTs: a.createdTs,
      PicURL: a.picUrl,
      FtalocationName: a.ftalocationName,
      LocationMiniName: a.auctionMininame,
      RemovalString: a.removal
    };
    return mappedAuction;
  }); 
}
