'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _awsAmplify = require('aws-amplify');

var _AuthPiece2 = require('./AuthPiece');

var _AuthPiece3 = _interopRequireDefault(_AuthPiece2);

var _AmplifyTheme = require('../AmplifyTheme');

var _AmplifyTheme2 = _interopRequireDefault(_AmplifyTheme);

var _AmplifyUI = require('../AmplifyUI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the License. A copy of the License is located at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://aws.amazon.com/apache2.0/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * and limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var logger = new _awsAmplify.Logger('ConfirmSignUp');

var ConfirmSignUp = function (_AuthPiece) {
    _inherits(ConfirmSignUp, _AuthPiece);

    function ConfirmSignUp(props) {
        _classCallCheck(this, ConfirmSignUp);

        var _this = _possibleConstructorReturn(this, (ConfirmSignUp.__proto__ || Object.getPrototypeOf(ConfirmSignUp)).call(this, props));

        _this._validAuthStates = ['confirmSignUp'];
        _this.confirm = _this.confirm.bind(_this);
        _this.resend = _this.resend.bind(_this);
        return _this;
    }

    _createClass(ConfirmSignUp, [{
        key: 'confirm',
        value: function confirm() {
            var _this2 = this;

            var username = this.usernameFromAuthData() || this.inputs.username;
            var code = this.inputs.code;

            _awsAmplify.Auth.confirmSignUp(username, code).then(function () {
                return _this2.changeState('signedUp');
            }).catch(function (err) {
                return _this2.error(err);
            });
        }
    }, {
        key: 'resend',
        value: function resend() {
            var _this3 = this;

            var username = this.usernameFromAuthData() || this.inputs.username;
            _awsAmplify.Auth.resendSignUp(username).then(function () {
                return logger.debug('code resent');
            }).catch(function (err) {
                return _this3.error(err);
            });
        }
    }, {
        key: 'showComponent',
        value: function showComponent(theme) {
            var _this4 = this;

            var hide = this.props.hide;

            var username = this.usernameFromAuthData();

            if (hide && hide.includes(ConfirmSignUp)) {
                return null;
            }

            return _react2.default.createElement(
                _AmplifyUI.FormSection,
                { theme: theme },
                _react2.default.createElement(
                    _AmplifyUI.SectionHeader,
                    { theme: theme },
                    _awsAmplify.I18n.get('Confirm'),
                    ' ',
                    _awsAmplify.I18n.get('Sign Up')
                ),
                _react2.default.createElement(
                    _AmplifyUI.SectionBody,
                    { theme: theme },
                    username ? _react2.default.createElement(
                        _AmplifyUI.MessageRow,
                        null,
                        username
                    ) : _react2.default.createElement(_AmplifyUI.InputRow, {
                        placeholder: _awsAmplify.I18n.get('Username'),
                        theme: theme,
                        key: 'username',
                        name: 'username',
                        onChange: this.handleInputChange
                    }),
                    _react2.default.createElement(_AmplifyUI.InputRow, {
                        autoFocus: true,
                        placeholder: _awsAmplify.I18n.get('Code'),
                        theme: theme,
                        key: 'code',
                        name: 'code',
                        autoComplete: 'off',
                        onChange: this.handleInputChange
                    }),
                    _react2.default.createElement(
                        _AmplifyUI.ActionRow,
                        { theme: theme },
                        _react2.default.createElement(
                            _AmplifyUI.Button,
                            { theme: theme, onClick: this.confirm },
                            _awsAmplify.I18n.get('Confirm')
                        ),
                        _react2.default.createElement(_AmplifyUI.Space, { theme: theme }),
                        _react2.default.createElement(
                            _AmplifyUI.Button,
                            { theme: theme, onClick: this.resend },
                            _awsAmplify.I18n.get('Resend Code')
                        )
                    )
                ),
                _react2.default.createElement(
                    _AmplifyUI.SectionFooter,
                    { theme: theme },
                    _react2.default.createElement(
                        _AmplifyUI.Link,
                        { theme: theme, onClick: function onClick() {
                                return _this4.changeState('signIn');
                            } },
                        _awsAmplify.I18n.get('Back to Sign In')
                    )
                )
            );
        }
    }]);

    return ConfirmSignUp;
}(_AuthPiece3.default);

exports.default = ConfirmSignUp;