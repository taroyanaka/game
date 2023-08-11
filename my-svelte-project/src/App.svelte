<script>

// !!!!!!!!!!!
// you need ramda@0.28.0.js
// !!!!!!!!!!!


import { onMount } from 'svelte';
// import { afterUpdate } from 'svelte';

// $: if(true) console.log('hello');

let ERROR_MESSAGE = true;
let CURRENT_Y_AND_X = [5, 5];
let PICKEL = 0;
let GOAL = false;
let DIED = '';
let ADJACENT_Y_AND_X = [];
let COLLECT_VALUE2 = [];

// DEV_MODEではGOLの位置を固定する。USRの位置も固定する。UNTの位置も固定する。
// 今後シードランダムを導入してNONの位置を固定する。
let DEV_MODE = true;
// DEV_MODEがtrueの時はシャッフルはseed値を固定する。falseの時はseed値をMath.randomで決める。
// const shuffle = DEV_MODE ? require('shuffle-seed') : require('shuffle-array');



// USRはlifepoint(LFP)とattack(ATK)を持つ
// LFPが0になるとゲームオーバー
// USRの初期値は{NAME: 'USR', LFP: 5, ATK: 1};

// unit1(UNT)やunit2(UNT)が存在し、任意のLFPとATKを持つ
// 例として、
// unit1は{NAME: 'UNT', LFP: 3, ATK: 1};
// unit2は{NAME: 'UNT', LFP: 2, ATK: 2};

let USR_DATA_ARRAY = [{NAME: 'USR', LFP: 5, ATK: 1}];
let	UNT_DATA_OBJ = {
	UNT_NUM_0: {NAME: 'UNT_0', LFP: 3, ATK: 1},
	UNT_NUM_1: {NAME: 'UNT_1', LFP: 2, ATK: 2},
};

// let UNT_DATA_ARRAY = [
// 	{UNT_NUM: 0, NAME: 'UNT', LFP: 3, ATK: 1},
// 	{UNT_NUM: 1, NAME: 'UNT', LFP: 2, ATK: 2},
// ];



// クリックした位置の上下左右の配列を取得する関数
const get_click_position = (Y, X) => {
	CURRENT_Y_AND_X = [Y, X];
	const click_position = [
		[X, X-1],
		[X, X+1],
		[X-1, X],
		[X+1, X],
	];
	ADJACENT_Y_AND_X = click_position;
	// console.logでX,Y,ADJACENT_X_AND_Yを確認する
	console.log(
		CURRENT_Y_AND_X[0],
		CURRENT_Y_AND_X[1],
		ADJACENT_Y_AND_X,
	);

	return click_position;
};

// Y,XをBLCからゴール(GOL)に変更する関数
const change_BLC_to_GOL = (Y, X) => {
	COLLECT_VALUE2[Y][X][2] = 'GOL';
	// 色は黄色にする
	COLLECT_VALUE2[Y][X][3] = 'background-color: #FFFF00';
};

// USRからGOLまでを隣接して移動できるように適宜BLCをNONに変更する関数
const change_BLC_to_NON = (Y, X) => {
	// Y,XをBLCからNONに変更する
	COLLECT_VALUE2[Y][X][2] = 'NON';
	// 色は白色にする
	COLLECT_VALUE2[Y][X][3] = 'background-color: #FFFFFF';
};


// USRがUNTにアタックする関数(UNTのLFPをUSRのATK分減らす)(引数にはUNT_DATA_ARRAYのUNT_NUMを指定する)
const attack_USR_to_UNT = (UNT_NUM, Go_to_Y, Go_to_X) => {
	const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();
	// USRのATKを取得する
	const USR_ATK = USR_DATA_ARRAY[0].ATK;
	// 指定したUNTのLFPをUSRのATK分減らす
	UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK;
	// 指定したUNTのLFPが0以下になったら、指定したUNTの位置をNONに変更する
	if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
		const UNT_Y_AND_X = 
				[
					CURRENT_Y_AND_X[0] + Go_to_Y,
					CURRENT_Y_AND_X[1] + Go_to_X,
				];
		// UNTの位置をNONに変更する
		change_BLC_to_NON(UNT_Y_AND_X[0], UNT_Y_AND_X[1]);
		// 色も更新する
		COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: #FFFFFF';
		// UNT_DATA_OBJからUNT_NUMを指定してUNTを削除する
		UNT_DATA_OBJ = R.omit([UNT_NUM_N], UNT_DATA_OBJ);
	}
};

// UNTがUSRにアタックする関数(USRのLFPをUNTのATK分減らす)(引数にはUNT_DATA_ARRAYのUNT_NUMを指定する)
const attack_UNT_to_USR = (UNT_NUM) => {
	const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();
	const UNT_ATK = UNT_DATA_OBJ[UNT_NUM_N].ATK;
	// 指定したUNTのATKをUSRのLFP分減らす
	USR_DATA_ARRAY[0]['LFP'] -= UNT_ATK;
	// USRのLFPが0以下になったら、ゲームオーバーにする
	if (USR_DATA_ARRAY[0].LFP <= 0) {
		// ゲームオーバーにする
		DIED = 'YOU DIED, GAME OVER';
		setTimeout(() => {
			reset_or_init_map({when_mounted_time: false});
		}, 1000);
	}
};


// UNTが移動する関数
// ATKの値が高いUNTから順番に移動する
// 移動先にUSRがいたらアタックする
// 移動先がBLCもしくは他のUNTだったら移動しない
// 移動先にGOLがいたら移動しない
// const ANY_MOVE_FN = () => 'WIP';



function keypress_event(e) {

// // UNTの配置
// COLLECT_VALUE2[5][4][2] = 'UNT'; COLLECT_VALUE2[5][4][3] = 'background-color: #00FF00';
// COLLECT_VALUE2[5][4][4] = UNT_DATA_ARRAY[0];
// COLLECT_VALUE2[5][6][2] = 'UNT'; COLLECT_VALUE2[5][6][3] = 'background-color: #00FF00';
// COLLECT_VALUE2[5][6][4] = UNT_DATA_ARRAY[1];

	// キーボードの上下左右をwasdで操作する
	// wは上、aは左、sは下、dは右
	const keypress_position = {
		'w': [-1, 0],
		'a': [0, -1],
		's': [1, 0],
		'd': [0, 1],
	};

	if(e.key === 't')
		{attack_USR_to_UNT(0, -1, 0);
			return;
		}
	if(e.key === 'g')
		{UNT_ATTACK_OR_MOVE(0);
		// {attack_UNT_to_USR(0);
			return;
		}
	if(e.key === 'b')
		{UNT_ATTACK_OR_MOVE(1);
		// {attack_UNT_to_USR(1);
			return;
		}
	// Y,Xを更新する
	const go_to_y_x = [
		CURRENT_Y_AND_X[0] + keypress_position[e.key][0],
		CURRENT_Y_AND_X[1] + keypress_position[e.key][1],
	];
	// go_to_y_xがBLCの場合はPICKELを1増やして、BLCをNONに変更する
	if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'BLC') {
		PICKEL += 1;
		change_BLC_to_NON(go_to_y_x[0], go_to_y_x[1]);
	}
	// go_to_y_xがUSRの場合は更新しない、早期リターンする処理
	if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'USR') {
		return;
	}
	// go_to_y_xがGOLの場合はGOALをtrueにする
	if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'GOL') {
		GOAL = true;
		// ゴール直後に連打できないようにするために
		// (連打するとagainが何回も表示されてしまうため)、
		// keypressを解除する
		document.removeEventListener('keypress', keypress_event);

		// 1秒後にreset_mapを実行する
		setTimeout(() => {
			reset_or_init_map({when_mounted_time: false});
		}, 1000);
	}


	// go_to_y_xがNONの場合は更新する
	if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'NON') {
		COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] = 'USR';
		COLLECT_VALUE2[CURRENT_Y_AND_X[0]][CURRENT_Y_AND_X[1]][2] = 'NON';
		// 色も更新する
		COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][3] = 'background-color: #0000FF';
		COLLECT_VALUE2[CURRENT_Y_AND_X[0]][CURRENT_Y_AND_X[1]][3] = 'background-color: #FFFFFF';

		// USR_DATA_ARRAYを更新する([4]にUSR_DATA_ARRAYを反映し、元の位置を空にする)
		// COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][4] = USR_DATA_ARRAY[0];
		// COLLECT_VALUE2[CURRENT_Y_AND_X[0]][CURRENT_Y_AND_X[1]][4] = null;

		console.log(
			// keypress_position[e.key],
			// "COLLECT_VALUE2", COLLECT_VALUE2,
			"COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]]", COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]],
			// "CURRENT_Y_AND_X", CURRENT_Y_AND_X,
		);

		CURRENT_Y_AND_X = go_to_y_x;
	}

	// console.log(
	// 	keypress_position[e.key],
	// 	CURRENT_Y_AND_X
	// );
};


// 現在のUSRの位置を取得する関数
const get_USR_position = () => {
	// UNTの位置を取得する
	const USR_Y_AND_X = COLLECT_VALUE2
		.map(V=>V.filter(V2=>V2[2] === 'USR' ))
		.filter(V=>V.length>0)
		[0][0]
		;
	return USR_Y_AND_X;
};
// 指定したUNTの位置を取得する関数
const get_UNT_position = (UNT_NUM=0) => {
	const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();
	// UNTの位置を取得する
	// filterで['TYPE']がUNTかつ['NAME']がUNT_0等のものを抽出する
	const UNT_Y_AND_X = COLLECT_VALUE2
		.map(V=>V.filter(V2=>V2[2]['TYPE']==='UNT' && V2[2]['NAME']===('UNT_'+UNT_NUM) ))
		.filter(V=>V.length>0)
		[0][0]
		// .map(V=>V.map(V2=> [ V2[2]['TYPE'], V2[2]['NAME'] ] ))
		// .flat()
		// .map(V=>V.slice(0, 2));
		;
	const [Y, X] = [UNT_Y_AND_X[0], UNT_Y_AND_X[1]];
	// console.log(UNT_Y_AND_X);
	return [Y, X];
};

// key_press関数を実行した後に、UNTの行動を実行する関数。
// 隣接しているUSRがいたらアタックする
// USRが隣接していない場合はランダムに1マス移動する
// UNTの移動順はATKの値が高いUNTから順番に行動する。ATKが同値の場合はUNT_NUMが小さい方から行動する。
const UNT_ATTACK_OR_MOVE = (UNT_NUM=0) => {
	const usr_position = get_USR_position();
	const unt_position = get_UNT_position(UNT_NUM);

	console.log(
	'unt_position[0]', unt_position[0],
	'unt_position[1]', unt_position[1],
	'usr_position[0]', usr_position[0],
	'usr_position[1]', usr_position[1],

	'( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] - 1) )', ( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] - 1) ),
	'( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] + 1) )', ( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] + 1) ),
	'( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) )', ( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) ),
	'( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) )', ( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) ),
	);

	// 隣接しているマスにUSRがいたらアタックする
	if (
		// 上下左右にUSRがいる場合はアタックする
		( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] - 1) ) ||
		( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] + 1) ) ||
		( (unt_position[0] === usr_position[0]) && (unt_position[0] === usr_position[1] - 1) ) ||
		( (unt_position[0] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) )
	){
		attack_UNT_to_USR(UNT_NUM);
		return;
	}
	// 隣接しているマスにUSRがいない場合はランダムに1マス移動する
	// NONのマスには移動できる。BLCのマスには移動できない。GOLのマスには移動できない。

	// 移動先のマスをランダムに選択する
	const random_move = Math.floor(Math.random() * 4);
	// 移動先のマスを決定する
	const move_position = [
		[unt_position[0], unt_position[1] - 1],
		[unt_position[0], unt_position[1] + 1],
		[unt_position[0] - 1, unt_position[1]],
		[unt_position[0] + 1, unt_position[1]],
	];
	// 移動先のマスがNONの場合は移動する
	let shuffled_move_position = shuffle(move_position);
	for(let i=0; i<shuffled_move_position.length; i++){
		let Move_to = shuffled_move_position[i];
		// Move_toがNONの場合は移動し、早期リターンする
		if (COLLECT_VALUE2[Move_to[0]][Move_to[1]][2] === 'NON') {
			// UNTの位置をNONに変更する
			change_BLC_to_NON(unt_position[0], unt_position[1]);
			// 色も更新する
			COLLECT_VALUE2[unt_position[0]][unt_position[1]][3] = 'background-color: #FFFFFF';
			// UNTの位置を更新する
			COLLECT_VALUE2[Move_to[0]][Move_to[1]][2] = UNT_DATA_OBJ['UNT_NUM_' + UNT_NUM];
			// 色も更新する
			COLLECT_VALUE2[Move_to[0]][Move_to[1]][3] = 'background-color: #00FF00';
			// 早期リターンする
			shuffled_move_position = [];
		}
	}
};


	


// Y,Xの指定をランダムにする
const random_BLC_Y_AND_X = () => {
	// const random_Y = Math.floor(Math.random() * 10);
	// const random_X = Math.floor(Math.random() * 10);
	const random_Y = shuffle([0,1,2,3,4,5,6,7,8,9])[0];
	const random_X = shuffle([0,1,2,3,4,5,6,7,8,9])[0];
	return [random_Y, random_X];
};
// BLCの任意の分量(パーセント)をNONに変更する関数
// :ja パーセント
// :en percent
const change_percent_BLC_to_NON = (Percent=30) => {
	// BLCの総量を取得する
	const BLC_count = COLLECT_VALUE2
		.map(V=>V.filter(V2=>V2[2]==='BLC'))
		.flat()
		.length;
	// BLC_countからPercentの分量を算出する
	const BLC_count_percent = Math.floor(BLC_count * (Percent / 100));


	// BLCの半数をNONに変更する
	for (let i = 0; i < BLC_count_percent; i++) {
		const random_Y_AND_X = random_BLC_Y_AND_X();
		// USRがある位置はNONに変更せずスキップする
		if (COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][2] === 'USR') {
			continue;
		}
		// GOLがある位置はNONに変更せずスキップする
		if (COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][2] === 'GOL') {
			continue;
		}
		change_BLC_to_NON(random_Y_AND_X[0], random_Y_AND_X[1]);
	}
};

// マップを初期化してやり直す関数
// 起動時にも実行する
const reset_or_init_map = ({when_mounted_time=true}) => {
	// when_mounted_timeがfalseの時はconfirmでagainを表示する
	// againでない場合は早期リターンして、以降の処理はしない
	if(when_mounted_time === false){
		if(confirm('Again？')){
			reset_or_init_map({when_mounted_time: true});
		}else{
			return;
		}
	}

	// COLLECT_VALUE2を初期化する
	COLLECT_VALUE2 = R.xprod(R.range(0, 10), R.range(0, 10))
		.map(V=>V.concat(['BLC']))
		.map(V=>V.concat(['background-color: #808080']));
	COLLECT_VALUE2 = R.splitEvery(10, COLLECT_VALUE2);

	// USRを初期位置に戻す
	COLLECT_VALUE2[5][5][2] = 'USR'; COLLECT_VALUE2[5][5][3] = 'background-color: #0000FF';
	// USRのスポーン位置にUSR_DATA_ARRAYを反映する
	// COLLECT_VALUE2[5][5][4] = USR_DATA_ARRAY[0];


	DIED = '';
	USR_DATA_ARRAY = [{NAME: 'USR', LFP: 5, ATK: 1}];
	UNT_DATA_OBJ = {
		UNT_NUM_0: {TYPE: 'UNT', NAME: 'UNT_0', LFP: 3, ATK: 1},
		UNT_NUM_1: {TYPE: 'UNT', NAME: 'UNT_1', LFP: 2, ATK: 2},
	};

	// GOALを初期位置に戻す
	change_BLC_to_GOL(0, 9);
	// PICKELを初期化する
	PICKEL = 0;
	// GOALをfalseにする
	GOAL = false;
	// ADJACENT_Y_AND_Xを初期化する
	ADJACENT_Y_AND_X = [];
	// CURRENT_Y_AND_Xを初期化する
	CURRENT_Y_AND_X = [5, 5];
	// BLCを30%をNONに変更する
	change_percent_BLC_to_NON();

	// バトルシステムの開発のために、初期位置の前後左右をNONに変更する
	COLLECT_VALUE2[5][4][2] = 'NON'; COLLECT_VALUE2[5][4][3] = 'background-color: #FFFFFF';
	COLLECT_VALUE2[5][6][2] = 'NON'; COLLECT_VALUE2[5][6][3] = 'background-color: #FFFFFF';
	COLLECT_VALUE2[4][5][2] = 'NON'; COLLECT_VALUE2[4][5][3] = 'background-color: #FFFFFF';
	COLLECT_VALUE2[6][5][2] = 'NON'; COLLECT_VALUE2[6][5][3] = 'background-color: #FFFFFF';

	COLLECT_VALUE2[5][3][2] = 'NON'; COLLECT_VALUE2[5][3][3] = 'background-color: #FFFFFF';
	COLLECT_VALUE2[5][7][2] = 'NON'; COLLECT_VALUE2[5][7][3] = 'background-color: #FFFFFF';
	COLLECT_VALUE2[3][5][2] = 'NON'; COLLECT_VALUE2[3][5][3] = 'background-color: #FFFFFF';
	COLLECT_VALUE2[7][5][2] = 'NON'; COLLECT_VALUE2[7][5][3] = 'background-color: #FFFFFF';

	// UNTの配置
	// COLLECT_VALUE2[6][4][2] = 'UNT'; 
	COLLECT_VALUE2[6][4][3] = 'background-color: #00FF00';
	COLLECT_VALUE2[6][4][2] = UNT_DATA_OBJ['UNT_NUM_0'];
	// COLLECT_VALUE2[5][4][2] = 'UNT'; COLLECT_VALUE2[5][4][3] = 'background-color: #00FF00';
	// COLLECT_VALUE2[5][4][4] = UNT_DATA_OBJ['UNT_NUM_0'];
	// COLLECT_VALUE2[5][6][2] = 'UNT';
	COLLECT_VALUE2[5][6][3] = 'background-color: #00FF00';
	COLLECT_VALUE2[5][6][2] = UNT_DATA_OBJ['UNT_NUM_1'];

	
	document.addEventListener('keypress', keypress_event);
};




// const fetch_get_tags_for_autocomplete = async () => {
// 	const json = (await fetch('http://localhost:8000/get_tags_for_autocomplete', get_POST_object({ name: NAME, password: PASSWORD })))
// 					.json();
// 	const RES = await json;
// 	// TMP = RES;
// 	ALL_TAGS = await RES.message;
// };

// const remove_error_message = () => ERROR_MESSAGE = "";

onMount(async () => {
	try {
		// console.log("mounted");
		reset_or_init_map({when_mounted_time: true});
	} catch (error) {
		console.log(error);		
	}
});
</script>


<div>
	<span>Ver 0.0.0.1</span>
</div>

<!-- ERROR_MESSAGEを表示するdivタグ。クリックしたら非表示になる -->
<div>
	<!-- {ERROR_MESSAGE} -->
	{#if ERROR_MESSAGE}
		<!-- <button on:click={remove_error_message}>remove_error_message</button> -->
	{/if}
</div>

<!-- GOALがtrueの場合はGOALと表示する -->
{#if GOAL}
	<div>
		GOAL
	</div>
{/if}
<!-- DIEDがtruthyの場合はDIEDと表示する -->
{#if DIED}
	<div>
		{DIED}
	</div>
{/if}

<!-- PICKELを表示するdivタグ -->
<div>
	PICKEL: {PICKEL}
</div>

<ul>
	<!-- 上記のobjを#eachでレンダリングする -->
	{#each COLLECT_VALUE2 as item, Y}
		<li class="CELL">
			{#each item as item2, X}
				<span style={item2[3]} on:keydown={()=>get_click_position(Y, X)} on:click={()=>get_click_position(Y, X)}>□</span>
			{/each}
		</li>
	{/each}
</ul>

<!-- リセットボタン。押したらreset_mapを実行する -->
<!-- <button on:click={() => reset_or_init_map({when_mounted_time: false})}>reset_map</button> -->
	

<div>
	<div>{USR_DATA_ARRAY[0].NAME} LFP: {USR_DATA_ARRAY[0].LFP} ATK: {USR_DATA_ARRAY[0].ATK}</div>
	<!-- svelte -->
	{#each Object.keys(UNT_DATA_OBJ) as key}
		<div>{UNT_DATA_OBJ[key].NAME} LFP: {UNT_DATA_OBJ[key].LFP} ATK: {UNT_DATA_OBJ[key].ATK}</div>
	{/each}
<!-- <input bind:value={NAME} type="text" placeholder="name"> -->
</div>

<!-- <button on:click={() => fetch_get_collect_value_for_test()}>fetch_get_collect_value_for_test</button> -->
<button on:click={() => get_USR_position()}>get_USR_position</button>
<button on:click={() => get_UNT_position()}>get_UNT_position</button>
<button on:click={() => UNT_ATTACK_OR_MOVE()}>UNT_ATTACK_OR_MOVE</button>







<style>

</style>