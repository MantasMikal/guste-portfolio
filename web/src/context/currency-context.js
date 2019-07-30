import React from 'react'
import SnipcartButton from '../components/button/snipcart-button'

export const currencies = {
  eur: { name: 'eur', sign: '€' },
  gbp: { name: 'gbp', sign: '£' }
}

export const CurrencyContext = React.createContext({
  currency: currencies.eur,
  switchCurrency: e => {},
  rates: []
})

export class CurrencyProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: currencies.eur,
      rates: null,
      isLoading: true
    }
  }

  switchCurrency = e => {
    e.persist()
    let selectedCurrency
    switch (e.target.getAttribute('currency')) {
      case 'eur':
        selectedCurrency = currencies.eur
        break

      case 'gbp':
        selectedCurrency = currencies.gbp
        break

      default:
        break
    }

    Snipcart.setCurrency(selectedCurrency.name)
    this.setState({
      currency: selectedCurrency
    })
  }

  async componentDidMount() {
    const url = 'https://api.exchangeratesapi.io/latest?base=EUR'
    const currency = await Snipcart.api.cart.currency()
    const rates = await fetch(url).then(data => data.json())
    const cur = currencies[currency]

    this.setState({
      rates: rates.rates,
      currency: cur,
      isLoading: false
    })
    // Snipcart.subscribe('cart.ready', function() {

    // }.bind(this));
  }

  componentWillUnmount() {
    // Snipcart.unsubscribe('cart.ready')
  }

  render() {
    if (this.state.isLoading) {
      <p>Loading...</p>
    }

    return (
      <CurrencyContext.Provider
        value={{
          currency: this.state.currency,
          switchCurrency: this.switchCurrency,
          rates: this.state.rates
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export class CurrencyConsumer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <CurrencyContext.Consumer>
        {this.props.children}
      </CurrencyContext.Consumer>
    )
  }
}
