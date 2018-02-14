import * as React from 'react';
import { IAuctionItem } from '../Models';

interface IAuctionItemProps {
    item: IAuctionItem;
}

export const AuctionItem: React.SFC<IAuctionItemProps> = (props) => {

    return (
        <tr id={props.item.ItemId}>
            <td>
                <a href={props.item.ItemURL} target="_blank">
                    {props.item.ItemId}<br />
                </a>
            </td>
            <td>
                <strong>Brand: </strong>{props.item.Brand}<br />
                <strong>Description: </strong>{props.item.ItemDescription}<br />
                <strong>Specifications: </strong>{props.item.Specifications}<br />
                <strong>Additional Info: </strong>{props.item.ItemAdditionalInfo}
            </td>
            <td>
                ${props.item.ItemCurrentBid} / ${props.item.ItemNextBid}<br />
                MSRP: ${props.item.MSRP}<br />
                Bids: ?<br />High bidder: ?
            </td>
            <td>
                Ended
            </td>
            <td>
                10/09/17 3:00 PM
            </td>
            <td>
                10/09/17 3:55 PM
            </td>
        </tr>
    );
}
