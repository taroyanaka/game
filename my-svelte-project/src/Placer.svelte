<script>

// 全てのXに対して引数の数を足す関数
const addX = ({num=20}) => {
	init_data = init_data.map((Image) => {
		Image['X'] += num;
		return Image;
	});
};
// 全てのXに対して引数の数を引く関数
const subX = ({num=20}) => {
	init_data = init_data.map((Image) => {
		Image['X'] -= num;
		return Image;
	});
};
// 全てのYに対して引数の数を足す関数
const addY = ({num=20}) => {
	init_data = init_data.map((Image) => {
		Image['Y'] += num;
		return Image;
	});
};
// 全てのYに対して引数の数を引く関数
const subY = ({num=20}) => {
	init_data = init_data.map((Image) => {
		Image['Y'] -= num;
		return Image;
	});
};

// init_dataの要素を一つ前の要素と入れ替える関数
const prev = (INDEX) => {
	if (INDEX === 0) return;
	const tmp = init_data[INDEX - 1];
	init_data[INDEX - 1] = init_data[INDEX];
	init_data[INDEX] = tmp;
};
// init_dataの要素を一つ次の要素と入れ替える関数
const next = (INDEX) => {
	if (INDEX === init_data.length - 1) return;
	const tmp = init_data[INDEX + 1];
	init_data[INDEX + 1] = init_data[INDEX];
	init_data[INDEX] = tmp;
};

// add_image関数で追加する画像の初期値
const delete_image = (INDEX) => {
	console.log(init_data);
	init_data = init_data.filter((_, i) => i !== INDEX);
	console.log(init_data);
};

let image_url_file_url = 'https://raw.githubusercontent.com/taroyanaka/javascript/master/HTML/pwa-builder-test3/png_file_url.txt';
let image_url_list = '';
let image_url_list_array = [];

const get_image_url_list_from_url = async () => {
    if(image_url_file_url === '') return;
    const response = await fetch(image_url_file_url);
    const url_list_text = await response.text();
    image_url_list = await url_list_text;
	if(image_url_list === '') return;
	image_url_list_array = image_url_list.split('\n');
};

let rotate_num = 0;
let canvas;

const init_img  = {
		W: 360,  // wdith
		H: 360,  // height
		X: 50,  // x
		Y: 40,  // y
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
};
let init_data = [
	{
		W: 360,  // wdith
		H: 360,  // height
		X: 10,  // x
		Y: 20,  // y
		URI: '30FE00.png',  // imageURI
		IMAGE: null,
	},
	{
		W: 360,  // wdith
		H: 360,  // height
		X: 10,  // x
		Y: 20,  // y
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
	},
	{
		W: 360,  // wdith
		H: 360,  // height
		X: 80,  // x
		Y: 20,  // y
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
	},
];
const add_image = () => init_data = init_data.concat(init_img);

// https://viliusle.github.io/miniPaint/
// めっちゃ便利。クリスタを本格的に使うまで。これ使う。てか画像の透過クリスタでできるっぽい

// https://express.adobe.com/ja-JP/tools/remove-background

let caption = 'Taro_#954e2a_zunda';

let XYZ = 'block';
// let XYZ = 'none';
let ABC = 'none';
// let ABC = 'block';
let rootElement;
$: rootElement && rootElement.style.setProperty('--XYZ', XYZ);
$: rootElement && rootElement.style.setProperty('--ABC', ABC);

import { onMount } from 'svelte';

import p5 from 'p5';
	
let download_it = null;
let sketch = (p) => {
	// https://p5js.org/reference/#/p5/loadImage
	// function p.update() {
	p.update = () => {
		// console.log('p.update');
		p.setup();
	}

	function download_it_in_sketch() {
		p.saveCanvas(caption, 'png');
	}

	download_it = download_it_in_sketch;

	// 上記のHTMLをsvelte版に下記の直して
	// 1. 画像を読み込む
	// 2. 追加する要素のUIを追加する
	// 3. 追加する要素の位置を指定する
	// 4. 追加する画像を要素に指定する
	// 5  2から4を画像に対して繰り返す
	// 6. ボタンを押したら画像をダウンロードする
	function getMaxWH(init_data) {
		let maxW = 0;
		let maxH = 0;
		init_data.forEach((img) => {
			if (img.W > maxW) {
			maxW = img.W;
			}
			if (img.H > maxH) {
			maxH = img.H;
			}
		});
		return { maxW, maxH };
	}

	p.preload = () => {
		// 画像を読み込む
		init_data.forEach((Image, Image_Index) => {
			Image['IMAGE'] = p.loadImage(Image['URI']);
		});
	}
	
	let rad = 90;
	p.setup = () => {
		p.createCanvas(
				// getMaxWH(init_data)['maxW'],
				// getMaxWH(init_data)['maxH'],
				300,
				300,
		);
		// const tmp_w = R.clone(p.width);
		// const tmp_h = R.clone(p.height);
		
		p.translate(p.width/2, p.height/2);
	// p.rotate(p.PI / 180 * 180);
	p.rotate(p.PI / 180 * rotate_num);
	p.imageMode(p.CENTER);


		init_data.forEach(Image => {


	// p.imageMode(p.CENTER);


		p.image(Image['IMAGE'], Image['X'], Image['Y']);
		// p.rotate(p.PI / 180);
		// p.imageMode(p.CENTER);


		// p.translate(0, 0);
		// p.rotate(0);

		});

	};


};
		
$: init_data && rotate_num, (() => {
	if (canvas) {
	canvas.remove();
	}
	canvas = null;
	canvas = new p5(sketch);
})();	
</script>

<input type="number" name="" id="" bind:value={rotate_num} step="20" min="-1000" max="1000">
<!-- addX -->
<button on:click={() => addX({num: 20})}>addX</button>
<!-- subX -->
<button on:click={() => subX({num: 20})}>subX</button>
<!-- addY -->
<button on:click={() => addY({num: 20})}>addY</button>
<!-- subY -->
<button on:click={() => subY({num: 20})}>subY</button>

	<div class="container" bind:this={rootElement}>
		{#each init_data as VAL, INDEX}
		<div>
		W: <input type="number" name="" id="" bind:value={VAL['W']} step="20" min="-1000" max="1000">
		H: <input type="number" name="" id="" bind:value={VAL['H']} step="20" min="-1000" max="1000">
		X: <input type="number" name="" id="" bind:value={VAL['X']} step="20" min="-1000" max="1000">
		Y: <input type="number" name="" id="" bind:value={VAL['Y']} step="20" min="-1000" max="1000">
		URI: <input type="text" name="" id="" bind:value={VAL['URI']}>
			{#if image_url_list_array[INDEX] !== undefined}
			<!-- option形式で表示 -->
				<select name="" id="" bind:value={VAL['URI']}>
					{#each image_url_list_array as IMAGE_URL, IMAGE_URL_INDEX}
						<option value={IMAGE_URL}>{IMAGE_URL}</option>
					{/each}
				</select>		
			{/if}

			<!-- 該当のinit_dataの要素を削除 -->
			<button on:click={() => delete_image(INDEX)}>delete</button>
			<!-- swap -->
			<button on:click={() => prev(INDEX)}>prev</button>
			<button on:click={() => next(INDEX)}>next</button>
		</div>
		{/each}	
	</div>
	<button on:click={add_image}>add_image</button>
	<button on:click={download_it}>download_it</button>

<button on:click={get_image_url_list_from_url}>get_image_url_list_from_url</button>
<input type="text" name="image_url_file_url" class="image_url_file_url" bind:value={image_url_file_url}
	on:input={get_image_url_list_from_url} on:change={get_image_url_list_from_url} placeholder="I am not crazy; my reality is just different from yours.">
<textarea name="image_url_list" class="image_url_list" cols="100" rows="10" bind:value={image_url_list} ></textarea>



<style>
	/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
	:root {
		--XYZ: 'block';
		--ABC: 'none';
	}
</style>