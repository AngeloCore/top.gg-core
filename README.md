<div align="center">

  <p>
    <a href="https://www.npmjs.com/package/top.gg-core"><img src="https://nodei.co/npm/top.gg-core.png?downloads=true&stars=true" alt="NPM Banner"></a>
  </p>

  <p>
    <a href="https://www.npmjs.com/package/top.gg-core"><img src="https://img.shields.io/npm/v/top.gg-core?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/top.gg-core"><img src="https://img.shields.io/npm/dt/top.gg-core?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>

## Install
```sh
$ npm i top.gg-core
```

## Definite
```js
const top = require('top.gg-core');
```

## Examples

### Setup

##### Go to webhooks section of your bot</p>
<img src="https://cdn.discordapp.com/attachments/786586711819681813/819656616306671676/unknown.png">

##### Click **Show Token** and copy paste
<div style="margin: 20px;"></div>

```js
const topgg = new top.Client('TOP GG TOKEN');
```

<br>

### Post Stats
```js
topgg.post({ servers: client.guilds.cache.size }).then(console.log); //post only server count | returning: boolean

topgg.post({
    servers: client.guilds.cache.size,
    shard: {
        id: client.Shard.id,
        count: client.Shard.count
    }
}).then(console.log) //with shard info | returning: boolean

topgg.on('posted', data => {
  console.log(data);
});
```

<br>
<hr>
<br>

### Informaion
```js
topgg.bot('id of the bot').then(res => console.log(res.username + '\n' + res)); //bot who is in top.gg information

topgg.user('id of the user').then(res => console.log(res.color)); //top.gg bot developer information | color = the main hex color who user selected

topgg.votes().then(console.log); //all votes who your bot have

topgg.isVoted('id of user').then(console.log); //if the user is voted for your bot | returning: true/false (boolean)
```

## Vote

### Setup

##### Go to webhooks section of your bot</p>
<img src="https://cdn.discordapp.com/attachments/786586711819681813/819828852578320394/unknown.png">

<h5>
  <li>On <strong>Webhook URL</strong> put your domain (example.com, example.glitch.me, example.user.repl.co) and path (/topggVote) and the result is &#60;domain.com&#62;/topggVote</li>

  <li>Create a password and put into <strong>Authorization</strong></li>
</h5>

```js
const webhook = new top.Webhook('your password');
```

<br>

### Default Method
```js
webhook.login('your path | on the example: /topggVote', '3000'); //you can edit the port (only numbers) NOTE: PUT .login METHOD BEFORE THE .on('vote') METHOD

webhook.on('vote', vote => {
  console.log(`User id: ${vote.user}\nAll data: ${vote}`);
});

/**
 * returning
 * {
  bot: '767341532093087755',
  user: '728512329888825396',
  type: 'test',
  query: [Object: null prototype] { test: 'data', notRandomNumber: '8' },
  isWeekend: true
}
 */

```
### Advanced Method
```js
const express = require('express');
const app = express();

app.post('/topggVote', webhook.advanced(), (req, res) => {
    console.log(req.vote);
});

app.listen('3000', () => {
    console.log('App listening on port 3000');
});
```
## Full [Discord.js](https://npmjs.com/package/discord.js) Example
```js
const discord = require('discord.js');
const top = require('top.gg-core');

const client = new discord.Client();
const topgg = new top.Client('TOP GG TOKEN');
const webhook = new top.Webhook('your password');

client.on('ready', () => {
  console.log('Logged');

  topgg.post({
    servers: client.guilds.cache.size
  });

  setInterval(() => {
    topgg.post({
      servers: client.guilds.cache.size
    });
  }, 3600000); //posting stats every 1h | another method: https://npmjs.com/package/top.gg-auto

});

topgg.on('posted', data => {
  console.log(data);
});

webhook.login('your path | on the example: /topggVote', '3000'); //you can edit the port (only numbers) NOTE: PUT .login METHOD BEFORE THE .on('vote') METHOD

webhook.on('vote', vote => {
  console.log(`User id: ${vote.user}\nAll data: ${vote}`);
});

client.on('message', message => {
  if (message.content.startsWith('!votes')) {

    let votes = await topgg.votes();
    
    message.channel.send(`I have ${votes} votes`);

  }
});

client.login('DISCORD BOT TOKEN');
```

## Full [Eris](https://npmjs.com/package/eris) Example
```js
const Eris = require('eris');

const client = new Eris("DISCORD BOT TOKEN");

client.on("ready", () => {
  console.log('Logged');

  topgg.post({
    servers: client.guilds.size
  });

  setInterval(() => {
    topgg.post({
      servers: client.guilds.size
    });
  }, 3600000); //posting stats every 1h | another method: https://npmjs.com/package/top.gg-auto

});

topgg.on('posted', data => {
  console.log(data);
});

webhook.login('your path | on the example: /topggVote', '3000'); //you can edit the port (only numbers) NOTE: PUT .login METHOD BEFORE THE .on('vote') METHOD

webhook.on('vote', vote => {
  console.log(`User id: ${vote.user}\nAll data: ${vote}`);
});

client.on("messageCreate", message => {
  if (message.content.startsWith('!votes')) {

    let votes = await topgg.votes();
    
    client.createMessage(message.channel.id, `I have ${votes} votes`);

  }
});

client.connect();
```

<hr>

### [top.gg-core](https://npmjs.com/package/topgg) is not affiliated with **discord bot list ([top.gg](https://top.gg))**

<br>

## Contact

[Youtube](https://www.youtube.com/channel/UCxxK71QFN4_PrBhCFmH2Jmw), [Discord](https://discord.gg/5JtyYqW)