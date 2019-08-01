import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

export const currencies = {
  eur: { name: 'eur', sign: '€' },
  gbp: { name: 'gbp', sign: '£' }
}

export const CurrencyContext = React.createContext({
  currency: currencies.eur,
  switchCurrency: e => {},
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
    let selectedCurrency
    // TODO:
    // Set currency as currencies[selected]
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

    localStorage.setItem('currency', selectedCurrency.name)
    console.log("Local storage: ", localStorage.getItem('currency'))
    Snipcart.setCurrency(selectedCurrency.name)

    this.setState({
      currency: selectedCurrency
    })
  }

  componentDidMount() {
    // await this.setCurrentCurrency();
    console.log("Local storage on mount: ", localStorage.getItem('currency'))
    Snipcart.setCurrency(this.state.currency.name)
  }

  componentWillUnmount() {
    // Snipcart.unsubscribe('cart.ready')
  }

  render() {
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
                rates: rates
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
