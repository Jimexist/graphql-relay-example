'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));
app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  graphiql: true
}));

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.info('app listening on', port);
});