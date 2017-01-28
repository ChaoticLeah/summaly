import * as URL from 'url';
import tracer from 'trace-redirect';
import ISummary from './isummary';
import IPlugin from './iplugin';
import general from './general';

const plugins: IPlugin[] = [
	require('./plugins/amazon'),
	require('./plugins/wikipedia')
];

export default async (url: string): Promise<ISummary> => {
	const actualUrl = await tracer(url);

	const _url = URL.parse(actualUrl, true);

	const plugin = plugins.filter(plugin => plugin.test(_url))[0];

	const summary = plugin
		? await plugin.summary(_url)
		: await general(_url);

	Object.keys(summary).forEach(k => {
		if ((<any>summary)[k]) {
			(<any>summary)[k] = (<any>summary)[k].trim();
			if ((<any>summary)[k] === '') {
				(<any>summary)[k] = null;
			}
		}
	});

	return summary;
};
