<script>
	let num0 = 10
	let num1 = 100

	
	// let targetColorCode = '#35ff02'; // 置き換えたいカラーコード (ここでは赤色 #FF0000 に設定)
	
	// https://viliusle.github.io/miniPaint/
	// めっちゃ便利。クリスタを本格的に使うまで。これ使う。てか画像の透過クリスタでできるっぽい
	
	// https://nlab.itmedia.co.jp/research/articles/1124494/5
	
	
	
	
	// https://express.adobe.com/ja-JP/tools/remove-background
	

	let caption = 'Taro_#954e2a_zunda';
	
	let XYZ = 'block';
	// let XYZ = 'none';
	let GG = 'none';
	// let GG = 'block';
	let rootElement;
	$: rootElement && rootElement.style.setProperty('--XYZ', XYZ);
	$: rootElement && rootElement.style.setProperty('--GG', GG);
	
	import { onMount } from 'svelte';
	// onMount(async () => {
	// 	try {
	// 		console.log('onMount');
	// 		setup();
	// 	} catch (error) {
	// 		console.log(error);		
	// 	}
	// });
	
	const show_all = () => {
		console.log(
		)
	}
	

const tmp_init = () => {
	return [
		{
			W: 300,  // wdith
			H: 300,  // height
			X: 10,  // x
			Y: 20,  // y
			URI: './30FE00.png',  // imageURI
			IMAGE: null,
		},
		{
			W: 300,  // wdith
			H: 300,  // height
			X: 10,  // x
			Y: num1,  // y
			URI: './FE0094.png',  // imageURI
			IMAGE: null,
		},
		{
			W: 300,  // wdith
			H: 300,  // height
			X: 80,  // x
			Y: 20,  // y
			URI: './FE0094.png',  // imageURI
			IMAGE: null,
		},
	];
};
let tmp = tmp_init();
	
	import p5 from 'p5';
	
let sketch = (p) => {
				
			// https://p5js.org/reference/#/p5/loadImage
			// function p.update() {
			p.update = () => {
				// console.log('p.update');
				p.setup();
			}
	
	
	
			function download_it() {
				p.saveCanvas(caption, 'png');
			}
	
	let images = [];
	let img0_0, img0_1, img0_2, img0_3, img0_4, img0_5, img0_6, img0_7, img0_8, img0_9;
	let img1_0, img1_1, img1_2, img1_3, img1_4, img1_5, img1_6, img1_7, img1_8, img1_9;
	images = [img0_0, img0_1, img0_2, img0_3, img0_4, img0_5, img0_6, img0_7, img0_8, img0_9,
		img1_0, img1_1, img1_2, img1_3, img1_4, img1_5, img1_6, img1_7, img1_8, img1_9];
	
			// 上記のHTMLをsvelte版に下記の直して
			// 1. 画像を読み込む
			// 2. 追加する要素のUIを追加する
			// 3. 追加する要素の位置を指定する
			// 4. 追加する画像を要素に指定する
			// 5  2から4を画像に対して繰り返す
			// 6. ボタンを押したら画像をダウンロードする
	
	
				// let replacementColorCode = '#FFff00'; // 置き換えるカラーコード (ここでは緑色 #00FF00 に設定)
	
				// 置き換えるカラーコード (ここでは緑色 #00FF00 に設定)
	
				// p.preload() {
	p.preload = () => {
		// 画像を読み込む

		tmp.forEach((Image, Image_Index) => {
			images[Image_Index] = p.loadImage(Image['URI']);
			// IMAGE: null,にimages[Image_Index]を代入する
			Image['IMAGE'] = images[Image_Index];

			// Image['URI'] = p.loadImage(Image['URI']);
			// (Image+'0_'+(Image_Index).toString()) = p.loadImage(Image['URI']);
		});
	}
	
	p.setup = () => {
		// p.createCanvas(img.width, img.height);
		// p.image(img, 0, 0);

		// p.createCanvas(img0_1.width, img0_1.height);
		// p.image(img0_1, 0, 0);
		// images = [img0_0, img0_1];

		p.createCanvas(
				tmp.map(img => img['W']).reduce((a, b) => a + b, 0),
				tmp.map(img => img['H']).reduce((a, b) => a + b, 0)
		);
		tmp.forEach(Image => {
			// p.image(Image['URI'], Image['X'], Image['Y']);
			p.image(Image['IMAGE'], Image['X'], Image['Y']);
		});


		// p.image(img0_0, 0, 0);
		// p.image(img0_1, -10, 0);
		// p.image(img0_1, 100, 0);

	};

};
	
	
	
	let canvas;
	
	// $: {
	//   if (canvas) {
	// 	canvas.remove();
	//   }
	
	//   canvas = new p5(sketch);
	// }
	

	$: num0 && num1, (() => {
	  if (canvas) {
		canvas.remove();
	  }
	  console.log("foo");
	  canvas = null;
	  tmp = tmp_init();
	  console.log(num1);
	  console.log(tmp);
	
	  canvas = new p5(sketch);
	})();
	
	</script>
	<div class="container" bind:this={rootElement}>
	
	
	
	<div class="XYZ">
	
	
	  <!-- <input class="val_button" type="button" value="update" on:click={UPD}> -->
	
	
	  <!-- <button on:click={show_all} class="show_all">show_all</button> -->
	  <!-- <input class="val_button" type="button" value="download" on:click={download_it}> -->
	
	</div>
	
	<div class="GG">
		ABC
	</div>


{#each tmp as VAL, INDEX}
	{VAL}
{/each}	
	
<!-- input:numberでnum1を変更する -->
<input type="number" name="" id="" bind:value={num1} step="50" min="0" max="1000">
	
	
	</div>
<style>
	/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
	:root {
		--XYZ: 'block';
		--GG: 'none';
	}
	
	
	.XYZ {
		display: var(--XYZ);
	}
	.GG {
		display: var(--GG);
	}
		
	
	/* val_buttonを縦横500px */
	.val_button {
		width: 500px;
		height: 500px;
		/* 文字サイズを50px */
		font-size: 50px;
	}
	
	.show_all {
		width: 500px;
		height: 500px;
		/* 文字サイズを50px */
		font-size: 50px;
	}
</style>