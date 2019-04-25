const path = require('path')

module.exports = {
  extends: ['standard', 'standard-react', 'plugin:import/errors', 'plugin:import/warnings'],
  rules: {
    'react/prop-types': 0,
    "indent": ["error", 2]
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.6'
    }
  }
}
