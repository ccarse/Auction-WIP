import * as cheerio from 'cheerio';
import * as rp from 'request-promise-native';
import { IAuction, IAuctionItem } from '../../Models/Models';
import { GetLocalDateTime } from './DateHelper';

export async function GetAuctionItems(auction: IAuction) {
  console.log(`In GetAuctionItems() for auction: ${auction.AuctionNumber}`);

  const urlPrefix = 'http://bid.bidfta.com/cgi-bin/mnlist.cgi?';
  const url = `${urlPrefix}${auction.LocationMiniName}${auction.AuctionNumber}/category/ALL`;
  const proxy = 'http://proxy.us.abb.com:8080';
  
  const requestOptions = {
    url,
    // proxy
  };

  try {
    const bodyString = await rp(requestOptions);
    const $ = cheerio.load(bodyString);
    
    const inputs = $('table#SelectPage p').find('input[type=hidden]').filter('[name!=npage]').filter('[name!=nwpage]');

    const itemIds: string[] = [];
    inputs.each((index, element) => {
      const combinedList = $(element).val();
      combinedList.split('/').forEach(val => {
        if (val !== '' && itemIds.indexOf(val) === -1) { itemIds.push(val); } // Gets rid of blanks and duplicates
      });
    });

    const p: Array<Promise<IAuctionItem>> = [];
    for (const [index, ItemId] of itemIds.entries()) {
      const ItemURL = urlPrefix + auction.LocationMiniName + auction.AuctionNumber + '/' + ItemId; 
      const pr = rp({...requestOptions, url: ItemURL})
      .then((bodyStr: any) => {
        const $2 = cheerio.load(bodyStr);
        // console.log(cheerio.load(bodyStr)('#DataTable .DataRow').text());
        const ItemDescription = $2(`#${ItemId} td:nth-of-type(3) b:contains('Description')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('Description')`)[0].nextSibling.nodeValue.substring(2) || 
                                $2(`#${ItemId} td:nth-of-type(3) b:contains('Item Desc')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('Item Desc')`)[0].nextSibling.nodeValue.substring(2) || '';
        const ItemCurrentBid = Number($2(`#${ItemId} td:nth-of-type(6)`).text());
        const ItemNextBid = Number($2(`#${ItemId} td:nth-of-type(7)`).text());
        const ItemAdditionalInfo = $2(`#${ItemId} td:nth-of-type(3) b:contains('Additional Info')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('Additional Info')`)[0].nextSibling.nodeValue.substring(2) || '';
        const SortOrder = 0;
        const Brand = $2(`#${ItemId} td:nth-of-type(3) b:contains('Brand')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('Brand')`)[0].nextSibling.nodeValue.substring(2) || '';
        const Model = $2(`#${ItemId} td:nth-of-type(3) b:contains('Model')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('Model')`)[0].nextSibling.nodeValue.substring(2) || '';
        const MSRP = Number($2(`#${ItemId} td:nth-of-type(3) b:contains('MSRP')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('MSRP')`)[0].nextSibling.nodeValue.substring(2) || 0);
        const Specifications = $2(`#${ItemId} td:nth-of-type(3) b:contains('Specifications')`)[0] && $2(`#${ItemId} td:nth-of-type(3) b:contains('Specifications')`)[0].nextSibling.nodeValue.substring(2) || '';
        const LastUpdated = GetLocalDateTime();
        const Status = '';
        const ItemExpiration = auction.EndDateTime;

        const auctionItem: IAuctionItem = {
          ItemId,
          AuctionId: auction.AuctionId,
          AuctionNumber: auction.AuctionNumber,
          ItemDescription,
          ItemURL,
          ItemCurrentBid,
          ItemNextBid,
          ItemAdditionalInfo,
          SortOrder,
          Brand,
          Model,
          MSRP,
          Specifications,
          LastUpdated,
          Status,
          ItemExpiration  
        };
        
        return auctionItem;
      });
      p.push(pr);
    }
    return Promise.all(p);

  } catch (error) {
    console.log('Error getting auction items.');
    throw error;
  }
}
