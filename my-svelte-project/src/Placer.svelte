<script>
let result_gif_url = '';
let fileInput;
let imagePreview;

function handleFileInputChange(event) {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.addEventListener('load', (event) => {
		imagePreview.src = event.target.result;
	});

	reader.readAsDataURL(file);
}

// imagePreview.srcをinit_dataに追加する関数
const add_imagePreview_src_to_init_data = () => {
	const new_init_data = init_data.concat(R.clone(init_img));
	new_init_data[new_init_data.length - 1]['URI'] = R.clone(imagePreview.src);
	init_data = new_init_data;
};
// imagePreview.srcを空にする関数
const clear_imagePreview_src = () => imagePreview.src = '';





// file naming for download_it
const get_file_name = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const millisecond = date.getMilliseconds();
	const when = `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
	// each SIZE_WIDTH SIZE_HEIGHT URI concat
	const get_each_param = () => {
		return init_data.map((Image) => {
			const { SIZE_WIDTH, SIZE_HEIGHT, URI } = Image;
			// .pngや.jpgや.jpegや.gifや.svgや.webpを削除する
			const new_URI = URI.replaceAll(/(\.png|\.jpg|\.jpeg|\.gif|\.svg|\.webp)/g, '');
			return `W_${SIZE_WIDTH}_H_${SIZE_HEIGHT}_${new_URI}`;
		});
	}

	// return when + "_" + 'R_' + rotate_num + '_' + get_each_param().join('_');
	return 'R_' + rotate_num + '_' + get_each_param().join('_');
};


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
		SIZE_WIDTH: 0,  // image_wdith
		SIZE_HEIGHT: 0,  // image_height
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
};
let init_data = [
	{
		W: 360,  // wdith
		H: 360,  // height
		X: 10,  // x
		Y: 20,  // y
		SIZE_WIDTH: 0,  // image_wdith
		SIZE_HEIGHT: 0,  // image_height
		URI: '30FE00.png',  // imageURI
		IMAGE: null,
	},
	{
		W: 360,  // wdith
		H: 360,  // height
		X: 10,  // x
		Y: 20,  // y
		SIZE_WIDTH: 100,  // image_wdith
		SIZE_HEIGHT: 100,  // image_height
		URI: 'FE0094.png',  // imageURI
		IMAGE: null,
	},
	{
		W: 360,  // wdith
		H: 360,  // height
		X: 80,  // x
		Y: 20,  // y
		SIZE_WIDTH: 100,  // image_wdith
		SIZE_HEIGHT: 100,  // image_height
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
		// p.saveCanvas(caption, 'png');
		p.saveCanvas(get_file_name(), 'png');
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
				getMaxWH(init_data)['maxW'],
				getMaxWH(init_data)['maxH'],
				// 300,
				// 300,
		);
		// const tmp_w = R.clone(p.width);
		// const tmp_h = R.clone(p.height);
		
		p.translate(p.width/2, p.height/2);
	// p.rotate(p.PI / 180 * 180);
	p.rotate(p.PI / 180 * rotate_num);
	p.imageMode(p.CENTER);


		init_data.forEach(Image => {


	// p.imageMode(p.CENTER);


		// p.image(Image['IMAGE'], Image['X'], Image['Y']);
		p.image(Image['IMAGE'], Image['X'], Image['Y'],
			Image['SIZE_WIDTH'] === 0 ? null : Image['SIZE_WIDTH'],
			Image['SIZE_HEIGHT'] === 0 ? null : Image['SIZE_HEIGHT'],
		);
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



let lastBlobUrl;
const exe_make_gif = () => {
	var gif = new GIF({
		repeat:	0, //	repeat count, -1 = no repeat, 0 = forever
		quality:	10, //	pixel sample interval, lower is better
		workers:	2, //	number of web workers to spawn
		workerScript:	gif, //.worker.js	url to load worker script from
		//background:	'#fff', //	background color where source image is transparent
		width:	null, //	output image width
		height:	null, //	output image height
		transparent:	null, //	transparent hex color, 0x00FF00 = green
		// transparent:	'#00FF00', //	transparent hex color, 0x00FF00 = green
		dither:	false, //	dithering method, e.g. FloydSteinberg-serpentine
		debug:	false, //	whether to print debug information to console
	});
	// gif.setOptions({repeat:	-0});

	// add an image element
	gif.addFrame(document.querySelector('.original1'));
	gif.addFrame(document.querySelector('.original2'));

	// or a canvas element
	// gif.addFrame(document.querySelector('target_canvas')
	// 	, {delay: 200});

	const ctx = document.querySelector('.target_canvas').getContext('2d');

	// or copy the pixels from a canvas context
	gif.addFrame(ctx, {copy: true});

	// gif.on('finished', function(blob) {
	// window.open(URL.createObjectURL(blob));
	// });

	gif.on('finished', function(blob) {
		  // You have to call this when you no longer need that URL.
		if (lastBlobUrl) {
				URL.revokeObjectURL(lastBlobUrl)
			}
		lastBlobUrl = window.open(URL.createObjectURL(blob));
		result_gif_url = R.clone(lastBlobUrl);
	});

	gif.render();

}


</script>


<img src="{result_gif_url}" alt="">

<canvas class="target_canvas"></canvas>

<div class="demo">
    <!-- <div class="images"> -->
      <!-- <img class="render"> -->
      <img class="original1" src="30FE00.png" alt="">
      <img class="original2" src="FE0094.png" alt="">
    <!-- </div> -->
</div>
<button on:click={exe_make_gif}>exe_make_gif</button>



<input type="number" name="" id="" bind:value={rotate_num} step="1" min="-10000" max="10000">
<button on:click={() => addX({num: 20})}>addX</button>
<button on:click={() => subX({num: 20})}>subX</button>
<button on:click={() => addY({num: 20})}>addY</button>
<button on:click={() => subY({num: 20})}>subY</button>
<span>SIZE_WIDTH 0 & SIZE_HEIGHT 0 is original size</span>

	<div class="container" bind:this={rootElement}>
		{#each init_data as VAL, INDEX}
		<div>
		W: <input type="number" name="" id="" bind:value={VAL['W']} step="20" min="-10000" max="10000">
		H: <input type="number" name="" id="" bind:value={VAL['H']} step="20" min="-10000" max="10000">
		X: <input type="number" name="" id="" bind:value={VAL['X']} step="20" min="-10000" max="10000">
		Y: <input type="number" name="" id="" bind:value={VAL['Y']} step="20" min="-10000" max="10000">

		SIZE_WIDTH: <input type="number" name="" id="" bind:value={VAL['SIZE_WIDTH']} step="20" min="-10000" max="10000">
		SIZE_HEIGHT: <input type="number" name="" id="" bind:value={VAL['SIZE_HEIGHT']} step="20" min="-10000" max="10000">
		
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

<div>
	<input type="file" bind:this={fileInput} on:change={handleFileInputChange}>
	<img bind:this={imagePreview} alt="">
	<button on:click={add_imagePreview_src_to_init_data}>add_imagePreview_src_to_init_data</button>
	<button on:click={clear_imagePreview_src}>clear_imagePreview_src</button>
</div>

<style>
	/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
	:root {
		--XYZ: 'block';
		--ABC: 'none';
	}
</style>