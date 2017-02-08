/**
 * Tests!
 */

'use strict';

/* dependencies below */

const assert = require('assert');
const express = require('express');
const summaly = require('../').default;

/* settings below */

Error.stackTraceLimit = Infinity;

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Display detail of unhandled promise rejection
process.on('unhandledRejection', console.dir);

const port = 3000;
const host = `http://localhost:${port}`;

/* tests below */

it('faviconがHTML上で指定されていないが、ルートに存在する場合、正しく設定される', done => {
	const app = express();
	app.get('/', (req, res) => {
		res.sendFile(__dirname + '/htmls/no-favicon.html');
	});
	app.get('/favicon.ico', (_, res) => res.sendStatus(200));
	const server = app.listen(port, async () => {
		const summary = await summaly(host);
		assert.equal(summary.icon, `${host}/favicon.ico`);
		server.close();
		done();
	});
});

it('faviconがHTML上で指定されていなくて、ルートにも存在しなかった場合 null になる', done => {
	const app = express();
	app.get('/', (req, res) => {
		res.sendFile(__dirname + '/htmls/no-favicon.html');
	});
	const server = app.listen(port, async () => {
		const summary = await summaly(host);
		assert.equal(summary.icon, null);
		server.close();
		done();
	});
});

describe('OGP', () => {
	it('title', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/og-title.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.title, 'Strawberry Pasta');
			server.close();
			done();
		});
	});

	it('description', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/og-description.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.description, 'Strawberry Pasta');
			server.close();
			done();
		});
	});

	it('site_name', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/og-site_name.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.sitename, 'Strawberry Pasta');
			server.close();
			done();
		});
	});

	it('thumbnail', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/og-image.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.thumbnail, 'https://himasaku.net/himasaku.png');
			server.close();
			done();
		});
	});
});

describe('TwitterCard', () => {
	it('title', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/twitter-title.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.title, 'Strawberry Pasta');
			server.close();
			done();
		});
	});

	it('description', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/twitter-description.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.description, 'Strawberry Pasta');
			server.close();
			done();
		});
	});

	it('thumbnail', done => {
		const app = express();
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/htmls/twitter-image.html');
		});
		const server = app.listen(port, async () => {
			const summary = await summaly(host);
			assert.equal(summary.thumbnail, 'https://himasaku.net/himasaku.png');
			server.close();
			done();
		});
	});
});
