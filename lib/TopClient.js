const EventEmitter = require('events');
const request = require('../util/request');
const ApiError = require('../errors/TopGGApiError'), TypeError = require('../errors/TypeError');

class Client extends EventEmitter {
    constructor(token) {
        super()

        if (!token) {
            throw new TypeError('Missing top.gg Client Token');
        }

        if (typeof (token) !== 'string') {
            throw new TypeError('The top.gg Client Token must be a string')
        }

        this.token = token;

    }

    async post(body) {

        if (!this.token) {
            throw new TypeError('Missing top.gg Client Token');
        }

        if (typeof (this.token) !== 'string') {
            throw new TypeError('The top.gg Client Token must be a string')
        }

        if (!body || !body.servers) {
            throw new TypeError("Cannot post stats without server count")
        }

        let shard;

        if (body.shard) {

            if (!body.shard.id) {
                throw new Error('Plese give shard id');
            }

            if (!body.shard.count) {
                throw new Error('Please give shard count')
            }

            shard = true;

        }

        await request(this.token, 'POST', '/bots/stats', {
            server_count: body.servers,
            shard_id: shard ? body.shard.id : null,
            shard_count: shard ? body.shard.count : null
        });

        let data = {
            servers: body.servers,
            shard: {
                id: shard ? body.shard.id : null,
                count: shard ? body.shard.count : null
            },
            timestamp: Date.now()
        }

        this.emit('posted', data)

        return true;
    }

    async bot(id) {

        if (!this.token) {
            throw new TypeError('Missing top.gg Client Token');
        }

        if (typeof (this.token) !== 'string') {
            throw new TypeError('The top.gg Client Token must be a string')
        }

        if (!id) {
            throw new TypeError('Cannot get bot information without ID');
        }

        let res = await request(this.token, 'GET', `/bots/${id}`);

        let data = {
            defaultAvatar: res.defAvatar || null,
            invite: res.invite || null,
            website: res.website || null,
            serverCode: res.support || null,
            serverURL: `https://discord.gg/${res.support}` || null,
            github: res.github || null,
            prefix: res.prefix || null,
            library: res.lib || null,
            id: res.id || null,
            discriminator: res.discriminator || null,
            username: res.username || null,
            regirsteredDATE: res.date || null,
            shard: {
                count: res.shard_count || 0,
                shards: res.shards || null
            },
            guild: res.guild || [],
            monthlyPoints: res.monthlyPoints || 0,
            points: res.points || 0,
            certified: res.certified || false,
            owners: res.owners || [],
            tags: res.tags || [],
            donateServer: res.donatebotguildid || null,
            shortDescription: res.shortdesc || null,
            longDescription: res.longdesc || null
        }

        return data;

    }

    async user(id) {

        if (!this.token) {
            throw new TypeError('Missing top.gg Client Token');
        }

        if (typeof (this.token) !== 'string') {
            throw new TypeError('The top.gg Client Token must be a string')
        }

        if (!id) {
            throw new TypeError('Cannot get user information without ID');
        }

        let res = await request(this.token, 'GET', `/users/${id}`);

        let data = {
            avatar: res.avatar || null,
            defaultAvatar: res.defAvatar || null,
            username: res.username || null,
            discriminator: res.discriminator || null,
            bio: res.bio || null,
            color: res.color || null,
            admin: res.admin || false,
            webModerator: res.webMod || false,
            moderator: res.mod || false,
            certified: res.certifiedDev || false,
            supporter: res.supporter || false
        }

        return data;

    }

    async votes() {

        if (!this.token) {
            throw new TypeError('Missing top.gg Client Token');
        }

        if (typeof (this.token) !== 'string') {
            throw new TypeError('The top.gg Client Token must be a string')
        }

        let res = await request(this.token, 'GET', '/bots/votes');

        return res || 0;

    }

    async isVoted(id) {

        if (!this.token) {
            throw new TypeError('Missing top.gg Client Token');
        }

        if (typeof (this.token) !== 'string') {
            throw new TypeError('The top.gg Client Token must be a string')
        }

        if (!id) {
            throw new TypeError('Cannot get user information without ID');
        }

        let res = await request(this.token, 'GET', '/bots/check', { userId: id });

        return !!res.voted;

    }

}

module.exports = Client;