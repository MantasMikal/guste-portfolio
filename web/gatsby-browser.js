/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { CurrencyProvider, currency } from './src/context/currency-context'

// TODO:
// Use wrapRootElement when it is fixed

export const wrapPageElement = ({ element }) => (
  <CurrencyProvider>{element}</CurrencyProvider>
)
