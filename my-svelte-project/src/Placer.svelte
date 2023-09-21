<script>
let rotate_num = 0;
let canvas;

const init_img  = {
		W: 216,  // wdith
		H: 216,  // height
		X: 50,  // x
		Y: 40,  // y
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
};
let init_data = [
	{
		W: 216,  // wdith
		H: 216,  // height
		X: 10,  // x
		Y: 20,  // y
		URI: '30FE00.png',  // imageURI
		IMAGE: null,
	},
	{
		W: 216,  // wdith
		H: 216,  // height
		X: 10,  // x
		Y: 20,  // y
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
	},
	{
		W: 216,  // wdith
		H: 216,  // height
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

<input type="number" name="" id="" bind:value={rotate_num} step="10" min="-1000" max="1000">
	<div class="container" bind:this={rootElement}>
		{#each init_data as VAL, INDEX}
		<div>
		W: <input type="number" name="" id="" bind:value={VAL['W']} step="50" min="-1000" max="1000">
		H: <input type="number" name="" id="" bind:value={VAL['H']} step="50" min="-1000" max="1000">
		X: <input type="number" name="" id="" bind:value={VAL['X']} step="10" min="-1000" max="1000">
		Y: <input type="number" name="" id="" bind:value={VAL['Y']} step="10" min="-1000" max="1000">
		URI: <input type="text" name="" id="" bind:value={VAL['URI']}>
		<!-- IMAGE: <input type="text" name="" id="" bind:value={VAL['IMAGE']}> -->
		</div>
		{/each}	
	</div>
	<button on:click={add_image}>add_image</button>
	<button on:click={download_it}>download_it</button>
<style>
	/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
	:root {
		--XYZ: 'block';
		--ABC: 'none';
	}
</style>