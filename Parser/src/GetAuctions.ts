import * as cheerio from 'cheerio';
import * as rp from 'request-promise-native';

import { IAuction } from "Models";

export function GetAuctions() {
  const proxy = 'http://proxy.us.abb.com:8080';
  
  const url = 'http://bidfta.bidqt.com/BidFTA/services/invoices/WlAuctions/filter';
  const requestOptions = {
    method: 'POST',
    url: 'http://bidfta.bidqt.com/BidFTA/services/invoices/WlAuctions/filter',
    qs: { page: '1', size: '1000', sort: 'endDateTime asc' },
    headers: 
     { 'cache-control': 'no-cache',
       'proxy-connection': 'keep-alive',
       'x-requested-with': 'XMLHttpRequest',
       "referer": 'http://bidfta.bidqt.com/BidFTA/',
       "accept": 'application/json, text/plain, */*',
       'content-type': 'application/x-www-form-urlencoded',
       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
       'accept-language': 'en-US,en;q=0.9',
       'accept-encoding': 'gzip, deflate',
       "origin": 'http://bidfta.bidqt.com',
       "cookie": 'X-Accept-Language=en-US%2Cen' },
    form: { q: 'showTimeRemaining=0' },
    gzip: true,
    // proxy
  };

  const p: Array<Promise<IAuction>> = [];
  
  return rp(requestOptions)
  .then(body => {
    return JSON.parse(body).content.filter((element: IAuction) => element.locId === 24 || element.locId === 5 || element.ftalocationName.includes("Columbus"));
  });
}
