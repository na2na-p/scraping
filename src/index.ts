import {JSDOM} from 'jsdom';
import converter from 'kana2ipa';

const CONSTANTS = {
	// URIエンコードで"韻"を渡す
	rhyme: encodeURIComponent('韻'),
}

const parse = async (name: string) => {
	const fetchUri = `https://ja.azrhymes.com/?${CONSTANTS.rhyme}=${encodeURIComponent(name)}`
	const response = await fetch(fetchUri);
	if (response.status === 200) {
		const dom = new JSDOM(await response.text());
		// HTML全体の表示する
		const html = dom.window.document.documentElement.innerHTML;

		// classでresult-textを持つものを取得する
		const rhyme = dom.window.document.getElementsByClassName('result-text');
		// 一覧の表示
		for (let i = 0; i < rhyme.length; i++) {
			console.log(rhyme[i]!.textContent);
		}
	}
}

// parse('韻');

const more = async (name: string) => {
	const endpoint = 'https://ja.azrhymes.com/more_results'

	const options = {
		search_type: 'rhyme',
		search_subtype: 'rhyme',
		ending: name,
		pronunciation: `${converter.kana2ipa(name)}`,
		n_syllables: 2,
		exclude: '',
	}

	console.log(options);

	const response = await fetch(endpoint, {
		method: 'POST',
		body: JSON.stringify(options)
	});

	const json = await response.json();
	console.log(json);
	console.log(json.length);
}

more('おだのぶなが');
