<script>
let files = [];
let fileNames = [];
const handleFileInput = (event) => {
  files = event.target.files;
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


	
let result_gif_url = '';
$: files, (() => {
	make_file_names();
	make_img_tags();
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
	document.querySelectorAll('.original_files').forEach((element) => {
		gif.addFrame(element);
	});
	// gif.addFrame(document.querySelector('.original1'));
	// gif.addFrame(document.querySelector('.original2'));

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





<input type="file" on:change={handleFileInput} multiple webkitdirectory>
<button on:click={exe_make_gif}>exe_make_gif</button>



<img src="{result_gif_url}" alt="">

<canvas class="target_canvas"></canvas>

<!-- <div class="demo"> -->
    <!-- <div class="images"> -->
      <!-- <img class="render"> -->
      <!-- <img class="original1" src="30FE00.png" alt="">
      <img class="original2" src="FE0094.png" alt=""> -->
    <!-- </div> -->
<!-- </div> -->

<div class="target_img_tags"></div>




{#if fileNames.length > 0}
<ul>
  {#each fileNames as fileName}
	<li>{fileName}</li>
  {/each}
</ul>
{/if}


<style>
	/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
	/* :root {
		--XYZ: 'block';
		--ABC: 'none';
	} */
</style>