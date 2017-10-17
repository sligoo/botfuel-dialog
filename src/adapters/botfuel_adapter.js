const WebAdapter = require('./web_adapter');

class BotfuelAdapter extends WebAdapter {
  /**
   * Handler for webchat webhook post request
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise}
   */
  async handleMessage(req, res) {
    console.log('BotfuelAdapter.handleMessage');
    res.sendStatus(200);
    const userMessage = req.body; // the message is already in the expected format
    console.log('BotfuelAdapter.handleMessage: userMessage', userMessage);
    const userId = userMessage.user;
    await this.bot.brain.initUserIfNecessary(userId);
    await this.bot.sendResponse(userMessage);
  }

  /**
   * Build request url for a given botMessage
   * @param {Object} botMessage
   * @returns {string}
   */
  getUrl(botMessage) {
    return `${process.env.CHAT_SERVER}/bots/${this.config.id}/users/${botMessage.user}/conversation/messages`;
  }

  /**
   * @returns {Promise}
   */
  async send(botMessages) {
    console.log('BotfuelAdapter.sendText', botMessages);
    for (const botMessage of botMessages) {
      // eslint-disable-next-line no-await-in-loop
      await this.postResponse({ uri: this.getUrl(botMessage), body: botMessage });
    }
  }
}

module.exports = BotfuelAdapter;
