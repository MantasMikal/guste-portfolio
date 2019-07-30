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

  componentDidMount() {
    const url = 'https://api.exchangeratesapi.io/latest?base=EUR'
    //Wait for snipcart to be ready get current currency and fetch exchange rates
    Snipcart.subscribe('cart.ready', function() {
      const cur = currencies[Snipcart.api.cart.currency()]
      fetch(url)
      .then(data => data.json())
      .then(res => {
        const rates = {"EUR": 1, ...res.rates}
        this.setState({
          rates: rates,
          currency: cur,
          isLoading: false
        })
      }, (error) => {
        console.log("Error: ", error)
      })
    }.bind(this));
  }

  componentWillUnmount() {
    Snipcart.unsubscribe('cart.ready')
  }

  render() {

    if(this.state.isLoading){
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
        {this.state.rates && this.props.children}
      </CurrencyContext.Provider>
    )
  }
}
