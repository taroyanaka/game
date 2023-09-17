<script>

// let targetColorCode = '#35ff02'; // 置き換えたいカラーコード (ここでは赤色 #FF0000 に設定)

// https://viliusle.github.io/miniPaint/
// めっちゃ便利。クリスタを本格的に使うまで。これ使う。てか画像の透過クリスタでできるっぽい

// https://nlab.itmedia.co.jp/research/articles/1124494/5




// https://express.adobe.com/ja-JP/tools/remove-background

let CLR = '#35ff02';
let moji = 'Taro';
let mojiSize = 100;
let moji_x = 1200;
let moji_y = 800;
let eye_0 = [800, 1000];
let eye_1 = [1400, 1000];
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
		CLR,
		moji,
		mojiSize,
		moji_x,
		moji_y,
		eye_0,
		eye_1,
		caption,
	)
}

import p5 from 'p5';

let sketch = (p) => {
			
		// https://p5js.org/reference/#/p5/loadImage
		// function p.update() {
		p.update = () => {
			console.log('p.update');
		// moji = document.getElementById("moji").value;
		// mojiSize = document.getElementById("mojiSize").value;
		// moji_x = document.getElementById("moji_x").value;
		// moji_y = document.getElementById("moji_y").value;
		// eye_0 = [document.getElementById("eye_0_x").value, document.getElementById("eye_0_y").value];
		// eye_1 = [document.getElementById("eye_1_x").value, document.getElementById("eye_1_y").value];
		p.setup();
		}



		function download_it() {
			p.saveCanvas(caption, 'png');
		}

			let img;
			let img2;
			

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
			img = p.loadImage('./30FE00.png');
			img2 = p.loadImage('./FE0094.png');
		}

		p.setup = () => {
			// p.createCanvas(img.width, img.height);
			// p.image(img, 0, 0);

			// p.createCanvas(img2.width, img2.height);
			// p.image(img2, 0, 0);
			p.createCanvas(img.width + img2.width, p.max(img.height, img2.height));
			p.image(img, 0, 0);
		    // p.image(img2, img.width, 0);
		    p.image(img2, -10, 0);
		    p.image(img2, 100, 0);
		}



			// 指定したx,x座標に文字列mojiを描画する関数
		function drawText(x, y) {
				p.noStroke();
			//  白で塗りつぶす
			p.fill(0);
			// 文字列を描画。文字サイズは50px
			p.textSize(mojiSize);
			// 文字列の中央揃えを指定
			//   p.textAlign(CENTER);
			// フォントはメイリオ
			p.textFont('Meiryo');
			// ボールド体にする
			//   p.textStyle(BOLD);
			p.text(moji, x, y);
		}

};



let canvas;

$: {
  if (canvas) {
	canvas.remove();
  }

  canvas = new p5(sketch);
}


</script>
<div class="container" bind:this={rootElement}>



<div class="XYZ">

<!-- これらの変数をinputタグで変更して。updateボタンを押すと更新される 
let moji = 'あいうえお';
let mojiSize = 100;
let moji_x = 1200;
let moji_y = 800;
let eye_0 = [800, 1000];
let eye_1 = [1400, 1000];
 -->

 <input class="val_button" type="text" name="" id="moji" value="Taro" step="100">
  <input class="val_button" type="number" name="" id="mojiSize" value="100" step="100">
  <input class="val_button" type="number" name="" id="moji_x" value="1200" step="100">
  <input class="val_button" type="number" name="" id="moji_y" value="800" step="100">
  <input class="val_button" type="number" name="" id="eye_0_x" value="800" step="100">
  <input class="val_button" type="number" name="" id="eye_0_y" value="1000" step="100">
  <input class="val_button" type="number" name="" id="eye_1_x" value="1400" step="100">
  <input class="val_button" type="number" name="" id="eye_1_y" value="1000" step="100">
  <!-- <input class="val_button" type="button" value="update" on:click={UPD}> -->


  <button on:click={show_all} class="show_all">show_all</button>
  <!-- <input class="val_button" type="button" value="download" on:click={download_it}> -->

</div>

<div class="GG">
	ABC
</div>





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