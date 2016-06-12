'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actualise = require('typhonjs-escomplex-commons/dist/traits/actualise.js');

var _actualise2 = _interopRequireDefault(_actualise);

var _safeName = require('typhonjs-escomplex-commons/dist/traits/safeName.js');

var _safeName2 = _interopRequireDefault(_safeName);

var _PluginSyntaxESTree2 = require('escomplex-plugin-syntax-estree/dist/PluginSyntaxESTree.js');

var _PluginSyntaxESTree3 = _interopRequireDefault(_PluginSyntaxESTree2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Provides an typhonjs-escomplex-module / ESComplexModule plugin which loads syntax definitions for trait resolution
 * for unique Babylon AST not found in ESTree.
 *
 * @see https://www.npmjs.com/package/typhonjs-escomplex-module
 */

var PluginSyntaxBabylon = function (_PluginSyntaxESTree) {
  _inherits(PluginSyntaxBabylon, _PluginSyntaxESTree);

  function PluginSyntaxBabylon() {
    _classCallCheck(this, PluginSyntaxBabylon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PluginSyntaxBabylon).apply(this, arguments));
  }

  _createClass(PluginSyntaxBabylon, [{
    key: 'BindExpression',

    // Unique Babylon AST nodes --------------------------------------------------------------------------------------

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#bindexpression
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */
    value: function BindExpression() {
      return (0, _actualise2.default)(0, 0);
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#booleanliteral
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'BooleanLiteral',
    value: function BooleanLiteral() {
      return (0, _actualise2.default)(0, 0, undefined, function (node) {
        return node.value;
      });
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#classmethod
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'ClassMethod',
    value: function ClassMethod() {
      return (0, _actualise2.default)(0, 0, function (node) {
        var operators = ['function'];
        if (node.kind && (node.kind === 'get' || node.kind === 'set')) {
          operators.push(node.kind);
        }
        if (typeof node.static === 'boolean' && node.static) {
          operators.push('static');
        }
        return operators;
      }, function (node) {
        return (0, _safeName2.default)(node.key);
      }, 'key', // Note: must skip key as the assigned name is forwarded on to FunctionExpression.
      true);
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#decorator
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'Decorator',
    value: function Decorator() {
      return (0, _actualise2.default)(0, 0);
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#directive
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'Directive',
    value: function Directive() {
      return (0, _actualise2.default)(1, 0);
    }

    /**
     * Avoid conflicts between string literals and identifiers.
     *
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#directiveliteral
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'DirectiveLiteral',
    value: function DirectiveLiteral() {
      return (0, _actualise2.default)(0, 0, undefined, function (node) {
        return typeof node.value === 'string' ? '"' + node.value + '"' : node.value;
      });
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#nullliteral
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'NullLiteral',
    value: function NullLiteral() {
      return (0, _actualise2.default)(0, 0, undefined, 'null');
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#numericliteral
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'NumericLiteral',
    value: function NumericLiteral() {
      return (0, _actualise2.default)(0, 0, undefined, function (node) {
        return node.value;
      });
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#objectmethod
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'ObjectMethod',
    value: function ObjectMethod() {
      return (0, _actualise2.default)(0, 0, function (node) {
        return typeof node.kind === 'string' && (node.kind === 'get' || node.kind === 'set') ? node.kind : undefined;
      }, undefined, 'key' // Note: must skip key as the assigned name is forwarded on to FunctionExpression.
      );
    }

    /**
     * Note: that w/ ES6+ `:` may be omitted and the Property node defines `shorthand` to indicate this case.
     *
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#objectproperty
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'ObjectProperty',
    value: function ObjectProperty() {
      return (0, _actualise2.default)(1, 0, function (node) {
        return typeof node.shorthand === 'undefined' ? ':' : typeof node.shorthand === 'boolean' && !node.shorthand ? ':' : undefined;
      });
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#restproperty
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'RestProperty',
    value: function RestProperty() {
      return (0, _actualise2.default)(0, 0);
    }

    /**
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#spreadproperty
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'SpreadProperty',
    value: function SpreadProperty() {
      return (0, _actualise2.default)(0, 0);
    }

    /**
     * Avoid conflicts between string literals and identifiers.
     *
     * @see https://github.com/babel/babel/blob/master/doc/ast/spec.md#stringliteral
     * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
     */

  }, {
    key: 'StringLiteral',
    value: function StringLiteral() {
      return (0, _actualise2.default)(0, 0, undefined, function (node) {
        return '"' + node.value + '"';
      });
    }
  }]);

  return PluginSyntaxBabylon;
}(_PluginSyntaxESTree3.default);

exports.default = PluginSyntaxBabylon;
module.exports = exports['default'];