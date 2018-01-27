import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

var WAValidator = require('wallet-address-validator');



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
var isBitcoinAddress = function(address) {
  return address.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/i);
}

var isLitecoinAddress = function(address) {
  return address.match(/^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/i);
}

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    // var addressHash = sha3(address.toLowerCase());
    // for (var i = 0; i < 40; i++ ) {
    //     // the nth letter should be uppercase if the nth digit of casemap is 1
    //     if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
    //         return false;
    //     }
    // }
    return true;
};

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v',
      password: '	LPpVeFSKvH593CChqP9qpV5toEXntekjiF',
      formErrors: { },
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

  var coins = {
    BTC: { name: 'bitcoin', blockexplorer_url: 'https://blockchain.info/nl/address/', handler_url: 'bitcoin:'},
    LTC: { name: 'litecoin', blockexplorer_url: 'https://live.blockcypher.com/ltc/address/' , handler_url: '' },
    PPC: { name: 'peercoin', blockexplorer_url: 'https://chainz.cryptoid.info/ppc/address.dws?' , handler_url: '' },
    DOGE: { name: 'dogecoin', blockexplorer_url: '' , handler_url: '' },
    BVC: { name: 'beavercoin', blockexplorer_url: '' , handler_url: '' },
    // FRC: { name: 'freicoin', blockexplorer_url: '' , handler_url: '' },
    PTS: { name: 'protoshares', blockexplorer_url: '' , handler_url: '' },
    MEC: { name: 'megacoin', blockexplorer_url: '' , handler_url: '' },
    XPM: { name: 'primecoin', blockexplorer_url: '' , handler_url: '' },
    AUR: { name: 'auroracoin', blockexplorer_url: '' , handler_url: '' },
    NMC: { name: 'namecoin', blockexplorer_url: '', handler_url: '' }
  }

  var syms = Object.keys(coins).filter((sym) => {
    return WAValidator.validate(value, coins[sym].name)
  })


    var formErrors = syms.map((sym) => {
      coins[sym].blockexplorer_url += value
      coins[sym].handler_url += value
      return coins[sym]
    })

    if(isEthereumAddress(value)) {
      formErrors['ETH'] = { name: 'Ethereum', blockexplorer_url: 'https://etherscan.io/address/' + value, handler_url: ""}
    }

    this.setState({formErrors: formErrors,

                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return 'has-error';
  }

  render () {
    return (
      <form className="demoForm">
        <div>
          <label htmlFor="email">Type in any crypto address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </form>
    )
  }
}

export default Form;
