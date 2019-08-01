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

    const selectedCurrency = currencies[e.target.getAttribute('currency')]
    localStorage.setItem('currency', selectedCurrency.name)
    Snipcart.setCurrency(selectedCurrency.name)
    this.setState({
      currency: selectedCurrency
    })
  }

  componentDidMount() {
    Snipcart.setCurrency(this.state.currency.name)
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
