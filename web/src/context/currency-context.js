import React from 'react'
import SnipcartButton from '../components/button/snipcart-button'

export const currencies = {
  EUR: { name: 'EUR', sign: '€' },
  GBP: { name: 'GBP', sign: '£' }
}

export const CurrencyContext = React.createContext({
  currency: currencies.EUR,
  switchCurrency: e => {},
  rates: []
})

export class CurrencyProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: currencies.EUR,
      rates: null
    }
  }

  switchCurrency = e => {
    e.persist()
    let selectedCurrency
    switch (e.target.getAttribute('currency')) {
      case 'EUR':
        selectedCurrency = currencies.EUR
        break

      case 'GBP':
        selectedCurrency = currencies.GBP
        break

      default:
        break
    }

    this.setState({
      currency: selectedCurrency
    })
    // Snipcart.api.setCurrency(selectedCurrency)
    //console.log("STATE", this.state)
  }

  componentDidMount() {
    const url = 'https://api.exchangeratesapi.io/latest?base=EUR'
    fetch(url)
      .then(data => data.json())
      .then(res => {
        const rates = {"EUR": 1, ...res.rates}
        this.setState({
          rates: rates
        })
      })
  }

  render() {
    //console.log("RATES", this.state.rates)
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
