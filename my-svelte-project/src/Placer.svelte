<script>

let targetColorCode = '#35ff02'; // 置き換えたいカラーコード (ここでは赤色 #FF0000 に設定)

// https://viliusle.github.io/miniPaint/
// めっちゃ便利。クリスタを本格的に使うまで。これ使う。てか画像の透過クリスタでできるっぽい

// https://nlab.itmedia.co.jp/research/articles/1124494/5
// mochikosan、活舌悪すぎ。次点のhau使う。himariは声質良いので、最後に使う。

// YMM4 台本ファイル(.txtで保存)
// Taro_#954e2a_zunda「我々は自動生成された存在だ」
// ふつースライム_#b79b5b_tumugi「そうなん？」
// モブ男_#4d5aaf_metan「何言ってんだ？」
// やばやばスライム_#2c4f54_hau「バブってウンコ漏らしてオムツ変えてほしい」
// kami_himari「神です。あなた達は1秒後消滅します」




// https://express.adobe.com/ja-JP/tools/remove-background

let CLR = '#35ff02';
// let CLR = '#30FE00';
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
import p5 from 'p5';

let sketch = (p) => {
			
		// https://p5js.org/reference/#/p5/loadImage
		// function p.update() {
		p.update = () => {
			console.log('p.update');
		moji = document.getElementById("moji").value;
		mojiSize = document.getElementById("mojiSize").value;
		moji_x = document.getElementById("moji_x").value;
		moji_y = document.getElementById("moji_y").value;
		eye_0 = [document.getElementById("eye_0_x").value, document.getElementById("eye_0_y").value];
		eye_1 = [document.getElementById("eye_1_x").value, document.getElementById("eye_1_y").value];
		p.setup();
		}



		function download_it() {
			p.saveCanvas(caption, 'png');
		}

			let img;
			

				// vivid color array
				let vividColorArray = [
			'#FF0000', // 赤
			'#FFA500', // オレンジ
			'#FFFF00', // 黄
			'#00FF00', // 緑
			'#00FFFF', // 水色
			'#0000FF', // 青
			'#800080', // 紫
			];


		// 上記のHTMLをsvelte版に下記の直して
		// 1. 画像を読み込む
		// 2. 画像内の各ピクセルをチェックして特定のカラーコードを置き換える
		// 3. 画像の背景を透過させる
		// 4. 指定したx,x座標に円を描画する関数
		// 5. 指定したx,x座標に文字列mojiを描画する関数
		// 6. ダウンロードボタンをcanvasより前に表示する
		// 7. val_buttonを縦横500px
		// 8. ボタンを押したら画像をダウンロードする


			// vividColorArrayからランダムでインデックスを選ぶ
			let randomIndex = Math.floor(Math.random() * wa_color.length);
			
			// let replacementColorCode = '#FFff00'; // 置き換えるカラーコード (ここでは緑色 #00FF00 に設定)

			// 置き換えるカラーコード (ここでは緑色 #00FF00 に設定)

			// p.preload() {
			p.preload = () => {
			// 画像を読み込む
			// img = p.loadImage('./35ff02.png');
			img = p.loadImage('./30FE00.png');
			}

			// function p.setup() {
			p.setup = () => {
			p.createCanvas(img.width, img.height);
			p.image(img, 0, 0);
			p.loadPixels();

			// 画像内の各ピクセルをチェックして特定のカラーコードを置き換える
			for (let i = 0; i < p.pixels.length; i += 4) {
				let r = p.pixels[i];
				let g = p.pixels[i + 1];
				let b = p.pixels[i + 2];
				console.log(r, g, b)
				let currentColorCode = rgbToHex(r, g, b);

				// ピクセルのカラーコードが特定のカラーコードと一致する場合、置き換える
				if (currentColorCode === targetColorCode) {
				CLR = wa_color[randomIndex];
				caption = moji + '_' + wa_color[randomIndex];
				let replacementRGB = hexToRgb(
				//  ランダムでvividColorArrayから色を選ぶ
					// vividColorArray[0]
					'#FF0000'
				);
				p.pixels[i] = replacementRGB.r;
				p.pixels[i + 1] = replacementRGB.g;
				p.pixels[i + 2] = replacementRGB.b;
				}
			}

			p.updatePixels();

			drawCircle(eye_0[0], eye_0[1]);
			drawCircle(eye_1[0], eye_1[1]);

			drawText(moji_x, moji_y);


			// 画像の背景を透過させる
			//   p.blendMode(DIFFERENCE);

			}

			// RGB値からカラーコードに変換する関数
			function rgbToHex(r, g, b) {
			return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
			}

			// カラーコードからRGB値に変換する関数
			function hexToRgb(hex) {
			let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
			}

			// 指定したx,x座標に円を描画する関数
			function drawCircle(x, y) {
				p.noStroke();
		//  白で塗りつぶす
		p.fill(255);
		// 画像の真ん中。サイズは300px,300px
		p.ellipse(x, y, 300, 300);
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

// const UPDでp.update()を呼び出す
const UPD = () => {
	p.update();
}


let canvas;

$: {
  if (canvas) {
	canvas.remove();
  }

  canvas = new p5(sketch);
}


// import p5_2 from 'p5';
// let sketch_2 = (p) => {
// 	p.setup = () => {
// 		p.createCanvas(400, 400);
// 	};

// 	p.draw = () => {
// 		p.background(220);
// 		p.fill(p.random(255), p.random(255), p.random(255));
// 		p.ellipse(p.width / 2, p.height / 2, 50, 50);
// 	};
// };
// let canvas2;
// $: {
// 	if (canvas2) {
// 		canvas2.remove();
// 	}

// 	canvas2 = new p5_2(sketch_2);
// }


// onDestroy(() => {
//   canvas.remove();
// });
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
  <input class="val_button" type="button" value="update" on:click={UPD}>

  
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

</style>