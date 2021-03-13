var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const raw_body_1 = __importDefault(require("raw-body"));
const querystring_1 = __importDefault(require("querystring"));

class Webhook {

  constructor(authorization) {

    this.auth = authorization;
    this.path = null;
    this.port = null;
  }

  _formatX(body) {
    var _a;
    if (((_a = body === null || body === void 0 ? void 0 : body.query) === null || _a === void 0 ? void 0 : _a.length) > 0)
      body.query = querystring_1.default.parse(body.query.substr(1));
    return body;
  }

  _request(req, res) {
    return new Promise(resolve => {

      if (this.auth && req.headers.authorization !== this.auth) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      if (req.body) {
        return resolve(this._formatX(req.body));
      }

      raw_body_1.default(req, {}, (error, body) => {

        if (error) {
          return res.status(422).json({ success: false, error: 'Fatal request' });
        }

        try {
          const parsed = JSON.parse(body.toString('utf8'));
          resolve(this._formatX(parsed));
        } catch (e) {
          res.status(400).json({ success: false, error: 'Invalid from body' });
          resolve(false);
        }

      });
    });

  }

  advanced() {
    return async (req, res, next) => {
      const response = await this._request(req, res);

      if (!response) {
        return;
      }

      res.sendStatus(200);
      req.vote = response;
      next();
    };
  }

  async on(event, callback) {

    if (event === 'vote') {

      if (!this.path) {
        throw new Error('Missing path | Example: /topgg/webhook');
      }

      if (typeof (this.path) !== 'string') {
        throw new TypeError('The path must be a string');
      }

      if (!this.path.startsWith('/')) {
        throw new TypeError('The path must start with "/"');
      }

      if (!this.port) {
        throw new Error('Missing port');
      }

      if (!Number(this.port)) {
        throw new TypeError('The port must be a number');
      }

      const express = require('express');
      const app = express();

      try {

        app.post(`${this.path}`, this.advanced(), (req, res) => {

          let data = {
            bot: req.vote.bot || null,
            user: req.vote.user || null,
            type: req.vote.type || null,
            query: req.vote.query || [],
            isWeekend: req.vote.isWeekend || false
          }

          callback(data);
        });

        app.listen(this.port.toString());
      } catch (e) {
        throw new Error(e);
      }
    }

  }

  async login(path, port) {
    if (!path) {
      throw new Error('Missing path | Example: /topgg/webhook');
    }

    if (typeof (path) !== 'string') {
      throw new TypeError('The path must be a string');
    }

    if (!path.startsWith('/')) {
      throw new TypeError('The path must start with "/"');
    }

    if (!port) {
      throw new Error('Missing port');
    }

    if (!Number(port)) {
      throw new TypeError('The port must be a number');
    }

    this.path = path;
    this.port = port;

    let data = {
      path: this.path,
      port: this.port,
      message: `top.gg app listening on port ${this.port} | path: <domain.com>${path}`
    }

    return data;
  }

}
module.exports = Webhook;