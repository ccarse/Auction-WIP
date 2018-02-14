import * as React from 'react';
import { IAuctionItem } from '../Models';
import { AuctionItem } from './AuctionItem';

interface IAuctionItemTableProps {
    items: IAuctionItem[];
}

export const AuctionItemTable: React.SFC<IAuctionItemTableProps> = (props) => {

    const auctionItems = [];
    for (const auctionItem of props.items) {
        auctionItems.push(<AuctionItem item={auctionItem} />);
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <th>ItemID</th>
                    <th>Item Information</th>
                    <th>Price info<br />Current / Next</th>
                    <th>Status</th>
                    <th>Expires</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
                {auctionItems}
            </tbody>
        </table>
    );
}
