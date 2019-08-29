import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

export const currencies = {
  eur: { name: 'eur', sign: '€' },
  gbp: { name: 'gbp', sign: '£' }
}

export const CurrencyContext = React.createContext({
  currency: currencies.eur,
  switchCurrency: e => {},
  calcPrice: (price, rates) => {},
  rates: {}
})

const query = graphql`
  query CurrencyQuery {
    rates: allExchangeRates {
      nodes {
        GBP
      }
    }
  }
`

export class CurrencyProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: currencies[localStorage.getItem('currency')] || currencies.eur
    }
  }

  switchCurrency = e => {
    e.persist()
    const selectedCurrency = currencies[e.target.getAttribute('currency')]
    localStorage.setItem('currency', selectedCurrency.name)
    Snipcart.setCurrency(selectedCurrency.name)
    this.setState({
      currency: selectedCurrency
    })
  }


  calcPrice = (price, rates) => {
    // Use current currency if not specified
    let priceList = {}

    Object.entries(currencies).forEach(([key, val]) => {
      priceList[key] = Math.round(rates[val.name.toUpperCase()] * price)

    })
    //console.log("Prices: ", priceList)
    return priceList
  }


  // Insert base rate for genericly calculate prices
  // EUR is default
  componentDidMount() {
    //Snipcart.setCurrency(this.state.currency.name)
  }

  render() {
    console.log("Context render")
    return (
      <StaticQuery
        query={query}
        render={data => {
          if (!data.rates) {
            throw new Error('Missing currency exchange data. Try again later.')
          }

          // Insert EUR value to be able genericly calculate prices
          const rates = {'EUR': 1, ...data.rates.nodes[0]}
          return (
            <CurrencyContext.Provider
              value={{
                currency: this.state.currency,
                switchCurrency: this.switchCurrency,
                rates: rates,
                calcPrice: this.calcPrice
               }}
            >
              {this.props.children}
            </CurrencyContext.Provider>
          )
        }}
      />
    )
  }
}
