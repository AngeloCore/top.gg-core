module.exports = {
    version: require('./package.json').version,
    Client: require('./lib/TopClient'),
    Webhook: require('./lib/Webhook')
}