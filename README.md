summaly
=======

[![][npm-badge]][npm-link]
[![][mit-badge]][mit]
[![][himawari-badge]][himasaku]
[![][sakurako-badge]][himasaku]

[![NPM](https://nodei.co/npm/summaly.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/summaly)

Get any web page's summary.

Installation
------------
`$ npm install summaly`

Usage
-----
``` javascript
summaly(url[, opts])
```

### Options
| Property            | Type      | Description                 | Default |
| :------------------ | :-------- | :-------------------------- | :------ |
| **followRedirects** | *boolean* | リダイレクトを解決するかどうか | `true`  |

### Returns
| Property        | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| **description** | *string* | The description of そのWebページ          |
| **icon**        | *string* | The url of the icon of そのWebページ      |
| **sitename**    | *string* | The name of そのWebサイト                 |
| **thumbnail**   | *string* | The url of the thumbnail of そのWebページ |
| **title**       | *string* | The title of そのWebページ                |
| **url**         | *string* | The url of そのWebページ                  |

### Example
``` javascript
import summaly from 'summaly';

const summary = await summaly('http://elephant.2chblog.jp/archives/52025138.html');

console.log(summary); // will be ... ↓
/*
{
	title: 'モバＰ「ありすと言えばお漏らし。お漏らしと言えばありす」',
	icon: 'http://livedoor.blogimg.jp/tmg24news/imgs/9/5/favicon.ico',
	description: '1：以下、名無しにかわりましてVIPがお送りします：2013/03/30(土) 14:57:29.09 ID:An34eOmY0モバＰ「反論が あるやつもいるかもしれない」    モバＰ「だが俺の主張も聞いてほしい！　お漏らしさせるならありすが一番だ！」    日菜子「むふふ……いきなりそんなことを大声で',
	thumbnail: 'http://livedoor.blogimg.jp/tmg24news/imgs/8/d/8df6e1a0-s.jpg',
	sitename: 'エレファント速報：SSまとめブログ',
	url: 'http://elephant.2chblog.jp/archives/52025138.html'
}
*/
```

License
-------
[MIT](LICENSE)

[npm-link]:       https://www.npmjs.com/package/summaly
[npm-badge]:      https://img.shields.io/npm/v/summaly.svg?style=flat-square
[mit]:            http://opensource.org/licenses/MIT
[mit-badge]:      https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[himasaku]:       https://himasaku.net
[himawari-badge]: https://img.shields.io/badge/%E5%8F%A4%E8%B0%B7-%E5%90%91%E6%97%A5%E8%91%B5-1684c5.svg?style=flat-square
[sakurako-badge]: https://img.shields.io/badge/%E5%A4%A7%E5%AE%A4-%E6%AB%BB%E5%AD%90-efb02a.svg?style=flat-square
