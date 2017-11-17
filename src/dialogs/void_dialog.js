const logger = require('logtown')('VoidDialog');
const Dialog = require('./dialog');

/**
 * The void dialog does nothing.
 * @extends Dialog
 */
class VoidDialog extends Dialog {
  // eslint-disable-next-line require-jsdoc
  async execute(adapter, userId, messageEntities) {
    logger.debug('execute', userId, messageEntities);
    return this.STATUS_COMPLETED;
  }
}

module.exports = VoidDialog;
