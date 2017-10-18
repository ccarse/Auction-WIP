import * as cheerio from 'cheerio';
import * as rp from 'request-promise-native';

import { IAuction } from "Models";

// tslint:disable-next-line:no-var-requires
const chrono = require('chrono-node');

export function GetAuctions() {

  const url = 'http://bidfta.bidqt.com/BidFTA/services/invoices/WlAuctions/filter';
  const proxy = 'http://proxy.us.abb.com:8080';
  const requestOptions = {
    method: 'POST',
    url,
    qs: { page: '1', size: '1000', sort: 'endDateTime asc' },
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // proxy
  };

  const p: Array<Promise<IAuction>> = [];

  return rp(requestOptions)
  .then(body => {
    return JSON.parse(body).content.filter((element: IAuction) => element.ftalocationName.includes("Columbus"));
  })
  .catch(err => console.log("Error in GetAuctions(): " + err));
}
