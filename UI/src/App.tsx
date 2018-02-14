import * as React from 'react';
import './App.css';
import { IAuction } from './Models';
import { AuctionItemTable } from './Components/AuctionItemTable';

interface IAppState {
  auctions: IAuction[];
}

class App extends React.Component<{}, IAppState> {
  
  componentDidMount() {
    fetch('https://function-auction-api.azurewebsites.net/api/auctions')
    .then(response => response.json())
    .then(json => this.setState(json));
  }

  render() {
    if (!this.state || !this.state.auctions) {
      return "Loading..."; 
    }
    return (
      
      <div className="App">
        <div className="App-header">
          <h2>Auctioneer</h2>
        </div>
        <p>
          <AuctionItemTable items={this.state.auctions[0].itemsArray} />
        </p>
      </div>
    );
  }
}

export default App;
