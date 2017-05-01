import * as URL from 'url';
import * as request from 'request';
import nullOrEmpty from './utils/null-or-empty';
import clip from './utils/clip';

const escapeRegExp = require('escape-regexp');

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

import * as client from 'cheerio-httpcli';
client.set('referer', false);
client.set('timeout', 10000);

import Summary from './summary';

export default async (url: URL.Url): Promise<Summary> => {
	const res = await client.fetch(url.href);

	if (res.error) {
		throw 'something happened';
	}

	const contentType: string = res.response.headers['content-type'];

	// HTMLじゃなかった場合は中止
	if (contentType.indexOf('text/html') === -1) {
		return null;
	}

	const $ = res.$;

	let title =
		$('meta[property="og:title"]').attr('content') ||
		$('meta[property="twitter:title"]').attr('content') ||
		$('title').text();

	if (title === undefined || title === null) {
		return null;
	}

	title = clip(entities.decode(title), 100);

	let image =
		$('meta[property="og:image"]').attr('content') ||
		$('meta[property="twitter:image"]').attr('content') ||
		$('link[rel="image_src"]').attr('href') ||
		$('link[rel="apple-touch-icon"]').attr('href') ||
		$('link[rel="apple-touch-icon image_src"]').attr('href');

	image = image ? URL.resolve(url.href, image) : null;

	let description =
		$('meta[property="og:description"]').attr('content') ||
		$('meta[property="twitter:description"]').attr('content') ||
		$('meta[name="description"]').attr('content');

	description = description
		? clip(entities.decode(description), 300)
		: null;

	if (title === description) {
		description = null;
	}

	let siteName =
		$('meta[property="og:site_name"]').attr('content') ||
		$('meta[name="application-name"]').attr('content') ||
		url.hostname;

	siteName = siteName ? entities.decode(siteName) : null;

	const favicon =
		$('link[rel="shortcut icon"]').attr('href') ||
		$('link[rel="icon"]').attr('href') ||
		'/favicon.ico';

	const checkExistence = (checkURL: string): Promise<string> => new Promise(done => {
		request.head(checkURL, (err, res) => {
			if (err) {
				done(null);
			} else if (res.statusCode == 200) {
				done(checkURL);
			} else {
				done(null);
			}
		});
	});

	// 相対的なURL (ex. test) を絶対的 (ex. /test) に変換
	const toAbsolute = (relativeURLString: string): string => {
		const relativeURL = URL.parse(relativeURLString);
		const isAbsolute = relativeURL.slashes || relativeURL.path.indexOf("/") === 0;
		// 既に絶対的なら、即座に値を返却
		if (isAbsolute) return relativeURLString;
		// スラッシュを付けて返却
		return "/" + relativeURLString;
	};

	const icon = await checkExistence(URL.resolve(url.href, favicon)) ||
		// 相対指定を絶対指定に変換し再試行
		await checkExistence(URL.resolve(url.href, toAbsolute(favicon))) ||
		null

	if (/[\-—\|:]$/.test(title.replace(new RegExp(`${escapeRegExp(siteName)}$`), '').trim())) {
		title = title.replace(new RegExp(`${escapeRegExp(siteName)}$`), '').trim();
		title = title.replace(/[\-—\|:]$/, '').trim();
	}

	if (title === '') {
		title = siteName;
	}

	return {
		title: title || null,
		icon: icon || null,
		description: description || null,
		thumbnail: image || null,
		sitename: siteName || null
	};
};
