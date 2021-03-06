'use strict';

var View = require('./view');

function AdvancedSettings() {
  View.apply(this, arguments);
}
module.exports = AdvancedSettings;

AdvancedSettings.prototype = {
  __proto__: View.prototype,

  selector: '#advanced-settings-view',

  close: function() {
    this
      .findElement('menu[type="toolbar"]')
      .click();
  },

  createAccount: function() {
    this
      .findElement('[href="/select-preset/"]')
      .click();
  },

  clickAccount: function(username) {
    var account;
    this
      .findElements('.account-list > li')
      .some(function(element) {
        var text = element.text();
        if (text.indexOf(username) !== -1) {
          account = element;
          return true;
        }
      });

    if (!account) {
      throw new Error('Could not find account for user ' + username);
    }

    account.click();
  },

  waitForHide: function() {
    return this.client.waitFor(function() {
      var zIndex = this
        .getElement()
        .cssProperty('z-index');
      return zIndex === '-1';
    }.bind(this));
  }
};
