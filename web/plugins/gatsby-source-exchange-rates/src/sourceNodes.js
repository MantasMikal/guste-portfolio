import fetch from "node-fetch"
import qs from 'querystring'

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, configOptions ) => {
  const { createNode } = actions

  // Fetch exchange rate
  const fetchRate = async (query, config) => {
    const options = qs.stringify(config)
    const API = `https://api.exchangeratesapi.io/${query}?${options}`
    const response = await fetch(API)
    const data = response.json()
    return data
  }

  // Process data
  const processRates = (rates) => {
    const nodeId = createNodeId(`exchangerate-${rates}`)
    const nodeContent = JSON.stringify(rates)
    const nodeData = Object.assign({}, rates, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `ExchangeRate`,
        content: nodeContent,
        contentDigest: createContentDigest(rates)
      }
    })

    return nodeData
  }

  delete configOptions.plugins // Won't use any plugins

  // Insert defualt query if no configuration is defined
  if(!configOptions.latest && !configOptions.history){
    console.log("Currency echange: No base currency specified. Default")
    configOptions.latest = [{base: 'EUR'}]
  }

  // Fetch exchange rates from config
  const latest = configOptions.latest && (await fetchRate('latest', configOptions.latest))
  const history = configOptions.history && (await fetchRate('history', configOptions.history))

  const rates = {latest, history}

  return (
    createNode(processRates(rates))
  )
}
