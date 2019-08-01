"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.sourceNodes =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* ({
    actions,
    createNodeId,
    createContentDigest
  }, configOptions) {
    const createNode = actions.createNode; // Fetch exchange rate

    const fetchRate =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (query, config) {
        const options = _querystring.default.stringify(config);

        const API = `https://api.exchangeratesapi.io/${query}?${options}`;
        const response = yield (0, _nodeFetch.default)(API);
        const data = response.json(); //

        return data;
      });

      return function fetchRate(_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }(); // Process data


    const processRates = rates => {
      const nodeId = createNodeId(`exchangerate-${rates}`);
      const nodeContent = JSON.stringify(rates);
      const nodeData = Object.assign({}, rates, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: `ExchangeRate`,
          content: nodeContent,
          contentDigest: createContentDigest(rates)
        }
      });
      return nodeData;
    };

    delete configOptions.plugins; // Won't use any plugins
    // Insert defualt query if no configuration is defined

    if (!configOptions.latest && !configOptions.history) {
      console.log("Currency echange: No base currency specified. Default");
      configOptions.latest = [{
        base: 'EUR'
      }];
    } // Fetch exchange rates from config


    const latest = configOptions.latest && (yield fetchRate('latest', configOptions.latest));
    const history = configOptions.history && (yield fetchRate('history', configOptions.history));
    const rates = {
      latest,
      history
    };
    return createNode(processRates(rates));
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();