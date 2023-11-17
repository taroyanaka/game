<script>
// 表情一覧
//     喜
//     怒
//     哀
//     楽
//     驚
//     怖
//     恥
//     愛

// アニメの動き一覧
//     歩く
//     走る
//     ジャンプ
//     見回す
//     しゃがむ
//     伸びる

// https://github.com/jnordberg/gif.js

let files = [];
let fileNames = [];
let result_gif_url = '';
let sort_by_ASC = true;
let delay_num = 200;
delay_num = 30;
let repeat_bool = true;
let img = null;

const handleRepeatOrNorepeat = (event) => {
	console.log(event.target.value);
	if(event.target.value === 'repeat'){
		repeat_bool = true;
	}else if(event.target.value === 'no_repeat'){
		repeat_bool = false;
	}
}

const handleSortByChange = (event) => {
	console.log(event.target.value);
	if(event.target.value === 'asc'){
		sort_by_ASC = true;
	}else if(event.target.value === 'desc'){
		sort_by_ASC = false;
	}
}
const handleFileInput = (event) => {
	// event.target.filesにpngかjpgかjpeg以外のファイルが入っていたら取り除く
	files = Array.from(event.target.files).filter((file) => {
		const file_type = file.type;
		if(file_type === 'image/png' || file_type === 'image/jpeg' || file_type === 'image/jpg'){
			return true;
		}else{
			return false;
		}
	});

	// filesを作成日時でソートする(sort_by_ASCがtrueなら昇順、falseなら降順)
	if(sort_by_ASC){
		files.sort((a, b) => a.lastModified - b.lastModified);
	}else{
		files.sort((a, b) => b.lastModified - a.lastModified);
	}

//   files = event.target.files;


//   fileNames = Array.from(files).map((file) => file.name);
};

const make_file_names = () => fileNames = Array.from(files).map((file) => file.name);

// filesをimgタグに変換して<img class="original_files">としてtarget_img_tags直下に追加する関数
const make_img_tags = () => {
	// original_filesがあれば削除する
	const original_files = document.querySelectorAll('.original_files');
	original_files.forEach((original_file) => {
		original_file.remove();
	});
	const target_img_tags = document.querySelector('.target_img_tags');
	files.forEach((file) => {
		const img = document.createElement('img');
		img.src = URL.createObjectURL(file);
		img.classList.add('original_files');
		// alt属性にファイル名を入れる
		img.alt = file.name;
		target_img_tags.appendChild(img);
	});
}


$: files, (() => {
	make_file_names();
	make_img_tags();
})();




let lastBlobUrl;
const exe_make_gif = () => {
	var gif = new GIF({
		repeat:	repeat_bool ? 0 : -1, //	repeat count, -1 = no repeat, 0 = forever
		quality:	1, //	pixel sample interval, lower is better
		workers:	10, //	number of web workers to spawn
		// workerScript:	gif, //.worker.js	url to load worker script from
		// background:	'#fff', //	background color where source image is transparent
		width:	null, //	output image width
		height:	null, //	output image height
		transparent:	null, //	transparent hex color, 0x00FF00 = green
		// transparent:	'#00FF00', //	transparent hex color, 0x00FF00 = green
		// dither:	false, //	dithering method, e.g. FloydSteinberg-serpentine
		debug:	false, //	whether to print debug information to console
	});

	document.querySelectorAll('.original_files').forEach((element) => {
		gif.addFrame(
			element,
			{delay: delay_num}
		);
	});

	gif.on('finished', function(blob) {
		  // You have to call this when you no longer need that URL.
		if (lastBlobUrl) {
				URL.revokeObjectURL(lastBlobUrl)
			}
		lastBlobUrl = window.open(URL.createObjectURL(blob));
		// blobをimgタグに対応したファイル形式に変換してresult_gif_urlに入れる
		const blob_to_img = (blob) => {
			const result_img = document.createElement('img');
			result_img.src = URL.createObjectURL(blob);
			result_img.classList.add('result_gif');
			// alt属性にファイル名を入れる
			result_img.alt = 'result_gif';
			return result_img;
		}
		img = blob_to_img(blob);
		result_gif_url = img.src;
	});
	gif.render();
}

</script>



also directory: <input type="file" on:change={handleFileInput} multiple webkitdirectory>
<button on:click={exe_make_gif}>exe_make_gif</button>  
delay_num: <input type="number" bind:value={delay_num} min="0" max="1000" step="10" />
<fieldset>
	<label>
	  <input checked={repeat_bool===true} type="radio" name="repeat_type" value="repeat" on:change={handleRepeatOrNorepeat} />
	  repeat
	</label>
	<label>
	  <input checked={repeat_bool===false} type="radio" name="repeat_type" value="no_repeat" on:change={handleRepeatOrNorepeat} />
	  no_repeat
	</label>
</fieldset>
<fieldset>
  <label>
	<input checked={sort_by_ASC===true} type="radio" name="sort_type" value="asc" on:change={handleSortByChange} />
	ASC
  </label>
  <label>
	<input checked={sort_by_ASC===false} type="radio" name="sort_type" value="desc" on:change={handleSortByChange} />
	DESC
  </label>
</fieldset>

{#if fileNames.length > 0}
<ul>
  {#each fileNames as fileName}
	<li>{fileName}</li>
  {/each}
</ul>
{/if}

<img src="{result_gif_url}" alt="" class="result_gif">
<canvas class="target_canvas"></canvas>
<div class="target_img_tags"></div>



<style>
	/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
	/* :root {
		--XYZ: 'block';
		--ABC: 'none';
	} */
	.result_gif{
		width: 100%;
		height: 100%;
		z-index: 100;
	}
</style>