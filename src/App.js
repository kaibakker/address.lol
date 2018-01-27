import React, { Component } from 'react';

import './App.css';
import SearchForm from './SearchForm.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>🔍 Search, 🌏 Explorer and 💸 Pay any crypto address</h2>
          <br />
          <SearchForm />
          <br />
          <h4>
            Some example addresses to try
          </h4>
          <code>1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v</code><br />
          <code>LPpVeFSKvH593CChqP9qpV5toEXntekjiF</code><br />
          <code>0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae</code><br />

        </div>


      </div>
    );
  }
}

export default App;
