import _ from 'lodash'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

// const source = _.times(5, () => ({
//   title: 'title',
//   description: 'description',
//   image: 'image',
//   price: 'price',
// }))


var WAValidator = require('wallet-address-validator');


var isChecksumAddress = function (address) {
    // Check each case
    // address = address.replace('0x','');
    // var addressHash = sha3(address.toLowerCase());
    // for (var i = 0; i < 40; i++ ) {
    //     // the nth letter should be uppercase if the nth digit of casemap is 1
    //     if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
    //         return false;
    //     }
    // }
    return true;
};
var isEthereumAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};



// var isBitcoinAddress = function(address) {
//   return address.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/i);
// }
//
// var isLitecoinAddress = function(address) {
//   return address.match(/^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/i);
// }

export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')

      var coins = {
        BTC: { name: 'bitcoin' },
        LTC: { name: 'litecoin' },
        PPC: { name: 'peercoin' },
        DOGE: { name: 'dogecoin' },
        BVC: { name: 'beavercoin' },
        // FRC: { name: 'freicoin' },
        PTS: { name: 'protoshares' },
        MEC: { name: 'megacoin' },
        XPM: { name: 'primecoin' },
        AUR: { name: 'auroracoin' },
        NMC: { name: 'namecoin'  }
      }
      var links = {
        BTC: [
          {
            name: 'Blockchain.info 🌍 Explore address ',
            url: 'https://blockchain.info/nl/address/'
          },
          {
            name: 'Handler 🔗 Redirect to bitcoin:',
            url: 'bitcoin:'
          }
        ], LTC: [
          {
            name: 'Blockcyper 🌍 Explore address ',
            url: 'https://live.blockcypher.com/ltc/address/'
          }
        ], ETH: [
          {
            name: 'Etherscan 🌍 Explore address ',
            url: 'https://etherscan.io/address/'
          }
        ]
      }

      var syms = Object.keys(coins).filter((sym) => {
        return WAValidator.validate(value, coins[sym].name)
      })

      if(isEthereumAddress(value)) {
        syms.push('ETH')
      }


      var results = []
      // var formErrors = syms.map((sym) => {
        // coins[sym].blockexplorer_url += value
        if(syms.length > 0)
        results = results.concat(links[syms[0]].map((link) => {
          link.url += value;
          link.name += value.substring(0, 7) + '...';
          return link
        }));
        // return coins[sym]
      // })
      console.log(results)

      this.setState({
        isLoading: false,
        results: results,
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        fluid={true}
        {...this.props}

      />

    )
  }
}
