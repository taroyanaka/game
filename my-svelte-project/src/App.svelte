<script>
// const exe_any_magic_1 = (Magic) => magic_USR_to_UNT(USR_DATA_ARRAY[0]['EQP'][1]['MAGIC']);
// const exe_any_magic_1 = (Magic) => console.log(USR_DATA_ARRAY[0]['EQP'][1]['MAGIC']);
// const exe_any_magic_1 = (Magic) => console.log(Magic);
// const exe_any_magic_2 = (Magic) => console.log(USR_DATA_ARRAY[0]['EQP'][1]['MAGIC']);
// const magic_attack = (Magic) => magic_USR_to_UNT(Magic);


// import Gacha from './Gacha.svelte';
// export let message; // 受け取る側でexport宣言を行う
// export let message2; // 受け取る側でexport宣言を行う
// export let message_hoge; // 受け取る側でexport宣言を行う



import { onMount } from 'svelte';

// const range = [
// [1, 1, 0],
// [1, 'U', 1],
// [0, 1, 0],
// ]

// // 上記のrangeを以下のように変換する
// const sample = [
// 	[0,0],[0,1],[1,0],[1,2],[2,1],
// ]

// // 1の部分を配列に変換する('U'は無視)
// const range2 = [
// 	[0, 1, 1],
// 	[1, 'U', 1],
// 	[1, 1, 0],
// ];

// const sample2 = [
// 	[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],
// ]

// // 1の部分を配列に変換する('U'は無視)関数

// const range3 = [
// 	[0, 1, 1],
// 	[0, 'U', 1],
// 	[1, 1, 1],
// ];

const convert = (range) => {
	const result = [];
	range.forEach((row, y) => {
		row.forEach((col, x) => {
			if (col === 1) {
				if(range[y][x] === 'U'){
					return;
				}
				result.push([y, x]);
			}
		});
	});
	return result;
}

// convert_for_magicを5行以内の関数に書き換える
const convert_for_magic = (range) => {
	const center = range.map(V=>V.map((v, i)=>v === 'U' ? [i, V.indexOf(v)] : null))
			.flat().filter((v, i)=>v !== null)[0];
	const non_center = range.map((V, I)=>V.map((v, i)=>v === 1 ? [I, i] : null))
			.flat()
				.filter(V=>V !== null);
					// .sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);
	const Y_X_FORM_RANGE = non_center.map(V=>[ (V[0] - center[0]), (V[1] - center[1]) ] );
	return Y_X_FORM_RANGE;
	// return [center, non_center];
	//	// resをflatする
	//	const res2 = res.flat();
	//	// res2の中身をnullを除外する
	//	const res3 = res2.filter(V=>V !== null);
	//	// sortする
	//	const res4 = res3.sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);
	//	return res4;
}

	


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

let USR_DATA_ARRAY = [
	{
	NAME: 'USR',
	LFP: 20,
	ATK: 1,
	EQP: [
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0, MAGIC: [0, null]},
		{RARITY: 2, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
			[
				[0,  1,  0],
				[1, 'U', 1],
				[0,  1,  0],
			]
		},
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
			[
				[1, 1,  1,  1, 1],
				[1, 0,  0,  0, 1],
				[1, 0, 'U', 0, 1],
				[1, 0,  0,  0, 1],
				[1, 1,  1,  1, 1],
			]
		},
	],
}
];


// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPにオブジェクトを追加する関数。
// オブジェクトの数はLIMITという引数の数が上限となる
const set_EQP = (NAME, EQP, LIMIT) =>{
	// console.log(NAME, EQP, LIMIT);
	// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPを取得する
	// const USR_EQP = MINE.filter(V=>V.NAME === NAME)[0].EQP;
	const USR_EQP = EQP;
	// USR_EQPの長さがLIMITより大きかったら、USR_EQPをLIMITの数になるまでスライスする
	// const USR_EQP_SLICE = USR_DATA_ARRAY[0].EQP.length >= LIMIT ? USR_EQP.slice(0, LIMIT) : USR_EQP;

	if(USR_DATA_ARRAY[0].EQP.length >= LIMIT){
		return;
	}
	// USR_DATA_ARRAY[0].EQPオブジェクトにEQPをramda.jsで追加する
	USR_DATA_ARRAY[0].EQP = R.append(EQP, USR_DATA_ARRAY[0].EQP);


	// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPをUSR_EQP_SLICE_PUSHに更新する
	// MINE.filter(V=>V.NAME === NAME)[0].EQP = USR_EQP_SLICE_PUSH;
};
	
let UNT_DATA_OBJ = {
	// UNT_NUM_0: {TYPE: 'UNT', NAME: 'UNT_0', LFP: 3, ATK: 1},
	// UNT_NUM_1: {TYPE: 'UNT', NAME: 'UNT_1', LFP: 2, ATK: 2},
	// UNT_NUM_2: {TYPE: 'UNT', NAME: 'UNT_2', LFP: 2, ATK: 3},
	// UNT_NUM_3: {TYPE: 'UNT', NAME: 'UNT_3', LFP: 2, ATK: 4},
	// UNT_NUM_4: {TYPE: 'UNT', NAME: 'UNT_4', LFP: 4, ATK: 1},
	// UNT_NUM_5: {TYPE: 'UNT', NAME: 'UNT_5', LFP: 4, ATK: 2},
	// UNT_NUM_6: {TYPE: 'UNT', NAME: 'UNT_6', LFP: 5, ATK: 1},
};


// let UNT_DATA_ARRAY = [
// 	{UNT_NUM: 0, NAME: 'UNT', LFP: 3, ATK: 1},
// 	{UNT_NUM: 1, NAME: 'UNT', LFP: 2, ATK: 2},
// ];


let GOLD = 1000;
let MINE = [];

let KAKUHEN = false;
let KAKUHEN_COUNTER = 0;

const KAKUHEN_COUNTER_LIMIT = 30;
const RARITY_ZERO_VOLUME = 80;
const PROBABILITY_CHANGE_THRESHOLD_0 = 2;
const PROBABILITY_CHANGE_THRESHOLD_1 = 3;
const DECREASE_PERCENT = 90;
let SLOT = [
{RARITY: 0, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 1, ATK_DEBUFF: 0},
{RARITY: 1, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 2, ATK_DEBUFF: 0},
{RARITY: 2, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 3, ATK_DEBUFF: 0},
{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0},

{RARITY: 90, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 10, ATK_DEBUFF: 0},

// {RARITY: 0, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 1, ATK_DEBUFF: 0},
// {RARITY: 1, LFP_BUFF: 2, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0},
// {RARITY: 2, LFP_BUFF: 3, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0},
// {RARITY: 3, LFP_BUFF: 4, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0},

// {RARITY: 90, LFP_BUFF: 10, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0},
];



    // import { get } from 'svelte/store';
// import { afterUpdate } from 'svelte';

// $: if(true) console.log('hello');

let ERROR_MESSAGE = true;
let CURRENT_Y_AND_X = [5, 5];
let PICKEL = 0;
let GOAL = false;
let DIED = '';
let ADJACENT_Y_AND_X = [];
let COLLECT_VALUE2 = [];



// SLOTのRARITYの合計の値が100になるように100個ランダムで選択する。
// ただし、RARITYが90のものは1つだけ選択し、RARITYが0はRARITY_ZERO_VOLUME個選択する。
let SLOT2 = SLOT.reduce((accumulator, currentValue) => {
	const RARITY = currentValue.RARITY;
	const RARITY_NUM = currentValue.RARITY === 90 ?
						1 : currentValue.RARITY === 0 ?
								RARITY_ZERO_VOLUME : currentValue.RARITY;
	for (let i = 0; i < RARITY_NUM; i++) {
		accumulator.push(currentValue);
	}
	return accumulator;
}, []);
// ATK_BUFFのみ
// let SLOT3 = shuffle(SLOT2.slice(0, 100));
let SLOT3 = shuffle(SLOT2);
// LFP_BUFFのみ
let SLOT4 = shuffle(SLOT2.slice(0, 100));


// 任意のRARITYを任意のパーセンテージ減らす関数
const decrease_any_rarity = (Rarity, Percent) => {
	const res0 = SLOT3.filter(V=>V.RARITY === Rarity);
	// res0の中身をPercentで減らす
	const res1 = res0.slice(0, (res0.length - (res0.length * (Percent / 100))));;
	const res2 = SLOT3.filter(V=>V.RARITY !== Rarity);
	const res = res1.concat(res2);
	const shuffle_res = shuffle(res);
	return shuffle_res;
};



// ワロタ https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q14218518669
// 関数。SLOT3からランダムで1つ選択してMINEに追加。GOLDが足りなかったら追加しない。GOLDが足りたらGOLDを減らす。
// RARITYが1以上のものをPROBABILITY_CHANGE_THRESHOLD連続で追加できた場合、KAKUHENをtrueにする。
// KAKUHEN true状態でKAKUHEN_COUNTER_LIMIT回選択した後にKAKUHENをfalseにする。
const slot_exe_once = () =>{
	// KAKUHENがtrueの時はSLOT3からRARITYが0のものを選択する確率が低下する
	const SLOT3_KAKUHEN = KAKUHEN ? decrease_any_rarity(0, DECREASE_PERCENT) : SLOT3;
	// SLOT3_KAKUHENからランダムで1つ選択する
	const random_SLOT3_KAKUHEN = shuffle(SLOT3_KAKUHEN)[0];
	// console.log(random_SLOT3_KAKUHEN);
	// GOLDが足りなかったら追加しない。GOLDが足りたらGOLDを減らす。
	if (GOLD < 1) {
		return;
	}else{
		GOLD -= 1;
	}
	// MINEに追加する
	// MINE.push(random_SLOT3_KAKUHEN);

	// ramda.jsでMINEに{RARITY: 1, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 2, ATK_DEBUFF: 0}を追加する
	// MINE = R.append({RARITY: 1, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 2, ATK_DEBUFF: 0}, MINE);
	MINE = R.append(random_SLOT3_KAKUHEN, MINE);

	// RARITYが1以上のものをPROBABILITY_CHANGE_THRESHOLD(_0か_1のどちらかランダムの値)の値の回数連続で追加できた場合、KAKUHENをtrueにする。
	// if (MINE.slice(-(PROBABILITY_CHANGE_THRESHOLD)).every(V=>V.RARITY >= 1)) {
	if (MINE.slice(
			-(shuffle([PROBABILITY_CHANGE_THRESHOLD_0, PROBABILITY_CHANGE_THRESHOLD_1])[0])
		).every(V=>V.RARITY >= 1)) {
		KAKUHEN = true;
	}
	// KAKUHEN時はRARITYが0のものを選択する確率が半分(50%。つまりRARITY0がSLOT3から一時的に90個から45個)になる。10回選択した後にKAKUHENをfalseにする。
	if (KAKUHEN === true) {
		KAKUHEN_COUNTER += 1;
		KAKUHEN = KAKUHEN_COUNTER >= KAKUHEN_COUNTER_LIMIT ? false : true;
		KAKUHEN_COUNTER = KAKUHEN_COUNTER >= KAKUHEN_COUNTER_LIMIT ? 0 : KAKUHEN_COUNTER;
		// if (MINE.length >= 10) {
		// 	KAKUHEN = false;
		// }
	}
};



function keypress_event_for_slot(e) {
	const keypress_position = {
		'g': slot_exe_once(),
	};
	keypress_position[e.key];
};

document.addEventListener('keypress', keypress_event_for_slot);





const magic_USR_to_UNT = (Magic) => {
	// console.log(Magic);
	try {
	const magic_attack = convert_for_magic(Magic);
	// console.log(magic_attack);
	magic_attack.forEach(MAGI=>{
		// console.log(MAGI);
		const magic_to_Y = CURRENT_Y_AND_X[0] + MAGI[0];
		const magic_to_X = CURRENT_Y_AND_X[1] + MAGI[1];
		console.log(magic_to_Y, magic_to_X);
		console.log(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]);
		if(
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'GOL' ||
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'BLC' ||
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'NON' ||
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'USR'
		){return}
		// (await window.app.$capture_state().COLLECT_VALUE2)[4][5][2]['NAME'].replaceAll('UNT_', '')
		// const UNT_NUM = Number(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]['NAME'].slice(-1));
		const UNT_NUM = Number(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]['NAME'].replaceAll('UNT_', ''));
		// console.log(UNT_NUM);
		const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();
		const USR_ATK_BUFF = USR_DATA_ARRAY[0]['EQP'].reduce((accumulator, currentValue) => {
			return accumulator + currentValue['ATK_BUFF'];
		}, 0) || 0;
		const USR_ATK = USR_DATA_ARRAY[0].ATK;
		const USR_ATK_WITH_BUFF = USR_ATK + USR_ATK_BUFF;
		UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK_WITH_BUFF;
		if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
			const UNT_Y_AND_X = 
					[
						magic_to_Y,
						magic_to_X,
					];
			// UNTの位置をNONに変更する
			change_BLC_to_NON(UNT_Y_AND_X[0], UNT_Y_AND_X[1]);
			// 色も更新する
			COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: #FFFFFF';
			// UNT_DATA_OBJからUNT_NUMを指定してUNTを削除する
			UNT_DATA_OBJ = R.omit([UNT_NUM_N], UNT_DATA_OBJ);
		}
	})
	// return Magic;
	} catch (error) {
	console.log(error);
	}
}



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
// const attack_USR_to_UNT = (UNT_NUM, Go_to_Y, Go_to_X) => {
const attack_USR_to_UNT = (Go_to_Y, Go_to_X) => {
	console.log(
		"Go_to_Y, Go_to_X",
		Go_to_Y, Go_to_X
	)
	console.log('attack_USR_to_UNT');
	console.log(COLLECT_VALUE2[Go_to_Y][Go_to_X][2]);
	// Go_to_YとGo_to_XにUNTが存在しない場合はreturnする
	if (COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['TYPE'] !== 'UNT') {
		console.log('UNTが存在しない');
		return;
	}

	// Go_to_YとGo_to_XからUNT_NUMを取得する
	// const UNT_NUM = COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['UNT_NUM'];
	const UNT_NUM = Number(COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['NAME'].slice(-1));
	// (await window.app.$capture_state().COLLECT_VALUE2[4][5])[2]['NAME'].slice(-1)
	const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();
	// USR_DATA_ARRAY[0]の['EQP']の中から['ATK_BUFF']を累計してUSR_ATK_BUFFに代入すr
	const USR_ATK_BUFF = USR_DATA_ARRAY[0]['EQP'].reduce((accumulator, currentValue) => {
		return accumulator + currentValue['ATK_BUFF'];
	}, 0) || 0;
	// USRのATKを取得する
	const USR_ATK = USR_DATA_ARRAY[0].ATK;
	const USR_ATK_WITH_BUFF = USR_ATK + USR_ATK_BUFF;
	// 指定したUNTのLFPをUSRのATK分減らす
	// UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK;
	console.log(UNT_NUM_N);
	// console.log(UNT_DATA_OBJ[UNT_NUM_N]);
	// ['LFP']);
	UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK_WITH_BUFF;
	// 指定したUNTのLFPが0以下になったら、指定したUNTの位置をNONに変更する
	if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
		const UNT_Y_AND_X = 
				[
					// CURRENT_Y_AND_X[0] + Go_to_Y,
					// CURRENT_Y_AND_X[1] + Go_to_X,
					Go_to_Y,
					Go_to_X,
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
	const UNT_NUM_N = 'UNT_NUM_' + (UNT_NUM).toString();
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


let CURRENT_MAGIC = null;
const set_magic = (Magic) => CURRENT_MAGIC = Magic;
function keypress_event(e) {
	// console.log('keypress_event');

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
		'm': null, // Magic of m
	};

// // Magic引数がある場合はmagic_attackとUNT_ATTACK_OR_MOVEを実行し、
// usr_moveとattack_USR_to_UNTを実行せず、早期リターンする
if(e.Magic){
	// console.log('keypress_event');
	magic_USR_to_UNT(e.Magic);
	Object.entries(UNT_DATA_OBJ)
		.map((V,I)=>{
			UNT_ATTACK_OR_MOVE(V[1]['NAME']);
		})
	return;
}

	if(e.key === 't')
		{magic_USR_to_UNT(USR_DATA_ARRAY[0]['EQP'][1]['MAGIC'][1]);
			return;
		}
	if(e.key === 'g')
		{magic_USR_to_UNT(USR_DATA_ARRAY[0]['EQP'][2]['MAGIC']);
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

if(!e.Magic){
	const usr_move = () => {
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
				// "COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]]", COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]],
				// "CURRENT_Y_AND_X", CURRENT_Y_AND_X,
			);
			CURRENT_Y_AND_X = go_to_y_x;
		}
	}
	usr_move();
	// USRがUNTにアタックする。引数はUNT_DATA_ARRAYのUNT_NUMの指定と攻撃対象のUNTのIDの指定。
	// attack_USR_to_UNT(0, go_to_y_x[0], go_to_y_x[1]);
	attack_USR_to_UNT(go_to_y_x[0], go_to_y_x[1]);
}

	Object.entries(UNT_DATA_OBJ)
		// .map((V,I)=>I)
		.map((V,I)=>{
			UNT_ATTACK_OR_MOVE(V[1]['NAME']);
	})

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
	try {
	// https://stackoverflow.com/questions/38968598/what-happened-inside-of-1-tostring-and-1-tostring-in-javascript
	const UNT_NUM_STR = (UNT_NUM).toString();
	const UNT_NUM_N = 'UNT_NUM_' + (UNT_NUM).toString();
	// UNTの位置を取得する
	// filterで['TYPE']がUNTかつ['NAME']がUNT_0等のものを抽出する
	const UNT_Y_AND_X = COLLECT_VALUE2
		.map(V=>V.filter(V2=>V2[2]['TYPE']==='UNT' && V2[2]['NAME']===('UNT_'+UNT_NUM_STR) ))
		.filter(V=>V.length>0)
		[0][0]
		// .map(V=>V.map(V2=> [ V2[2]['TYPE'], V2[2]['NAME'] ] ))
		// .flat()
		// .map(V=>V.slice(0, 2));
		;
		// console.log(UNT_Y_AND_X);
	const [Y, X] = [UNT_Y_AND_X[0], UNT_Y_AND_X[1]];
	// console.log(UNT_Y_AND_X);
	return [Y, X];
	} catch (error) {
		// console.log(UNT_NUM);
		console.log(error);
	}
};

// key_press関数を実行した後に、UNTの行動を実行する関数。
// 隣接しているUSRがいたらアタックする
// USRが隣接していない場合はランダムに1マス移動する
// UNTの移動順はATKの値が高いUNTから順番に行動する。ATKが同値の場合はUNT_NUMが小さい方から行動する。
const UNT_ATTACK_OR_MOVE = (NAME) => {
	try {
	const UNT_NUM = NAME ? Number(NAME.replaceAll('UNT_', '')) : 0;
	const usr_position = get_USR_position();
	const unt_position = get_UNT_position(UNT_NUM);
	// console.log(unt_position);

	// console.log(
	// 'unt_position[0]', unt_position[0],
	// 'unt_position[1]', unt_position[1],
	// 'usr_position[0]', usr_position[0],
	// 'usr_position[1]', usr_position[1],

	// '( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] - 1) )', ( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] - 1) ),
	// '( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] + 1) )', ( (unt_position[1] === usr_position[1]) && (unt_position[0] === usr_position[0] + 1) ),
	// '( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) )', ( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) ),
	// '( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) )', ( (unt_position[1] === usr_position[0]) && (unt_position[0] === usr_position[1] + 1) ),
	// );

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
	} catch (error) {
		console.log(error);	
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
// const change_percent_BLC_to_NON = (Percent=30) => {
const change_percent_BLC_to_NON = (Percent=80) => {
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

// 全てのUNTをNONに配置する関数
const change_UNT_to_NON = () => {
	// 'NON'のブロックを列挙する関数
	const get_NON_Y_AND_X = () => {
		const NON_Y_AND_X = COLLECT_VALUE2
			.map(V=>V.filter(V2=>V2[2]==='NON'))
			.flat()
			.map(V=>V.slice(0, 2));
		return NON_Y_AND_X;
	};

	const set_UNT = () =>{
		const all_NON = get_NON_Y_AND_X();
		// 以下のようにUNTを配置する
		// COLLECT_VALUE2[6][4][3] = 'background-color: #00FF00';
		// COLLECT_VALUE2[6][4][2] = UNT_DATA_OBJ['UNT_NUM_0'];
		Object.entries(UNT_DATA_OBJ).forEach((V, I) => {
			const UNT_NUM_N = 'UNT_NUM_' + (I).toString();
			const random_Y_AND_X = shuffle(all_NON)[0];
			COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][2] = UNT_DATA_OBJ[UNT_NUM_N];
			COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][3] = 'background-color: #00FF00';
			// console.log(V);
		});

	}
	set_UNT();
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
// USR_DATA_ARRAY = [{NAME: 'USR', LFP: 5, ATK: 1}];

USR_DATA_ARRAY = [{
	NAME: 'USR',
	LFP: 50,
	ATK: 1,
	EQP: [
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0, MAGIC: [null, null]},
		{RARITY: 2, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
			[
				{MAGIC_COUNT: 1},
				[
					[0,  1,  0],
					[1, 'U', 1],
					[0,  1,  0],
				]
			]
		},
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
			[
				{MAGIC_COUNT: 1},
				[
					[1, 1,  1,  1, 1],
					[1, 0,  0,  0, 1],
					[1, 0, 'U', 0, 1],
					[1, 0,  0,  0, 1],
					[1, 1,  1,  1, 1],
				]
			]
		},
	],
}];





	// UNT_DATA_OBJ = {
	// 	UNT_NUM_0: {TYPE: 'UNT', NAME: 'UNT_0', LFP: 3, ATK: 1},
	// 	UNT_NUM_1: {TYPE: 'UNT', NAME: 'UNT_1', LFP: 2, ATK: 2},
	// };

	UNT_DATA_OBJ = {
		UNT_NUM_0: {TYPE: 'UNT', NAME: 'UNT_0', LFP: 3, ATK: 1},
		UNT_NUM_1: {TYPE: 'UNT', NAME: 'UNT_1', LFP: 2, ATK: 2},
		UNT_NUM_2: {TYPE: 'UNT', NAME: 'UNT_2', LFP: 2, ATK: 3},
		UNT_NUM_3: {TYPE: 'UNT', NAME: 'UNT_3', LFP: 2, ATK: 4},
		UNT_NUM_4: {TYPE: 'UNT', NAME: 'UNT_4', LFP: 4, ATK: 1},
		UNT_NUM_5: {TYPE: 'UNT', NAME: 'UNT_5', LFP: 4, ATK: 2},
		UNT_NUM_6: {TYPE: 'UNT', NAME: 'UNT_6', LFP: 5, ATK: 1},
		UNT_NUM_7: {TYPE: 'UNT', NAME: 'UNT_7', LFP: 5, ATK: 2},
		UNT_NUM_8: {TYPE: 'UNT', NAME: 'UNT_8', LFP: 5, ATK: 3},
		UNT_NUM_9: {TYPE: 'UNT', NAME: 'UNT_9', LFP: 5, ATK: 4},
		UNT_NUM_10: {TYPE: 'UNT', NAME: 'UNT_10', LFP: 6, ATK: 1},
		UNT_NUM_11: {TYPE: 'UNT', NAME: 'UNT_11', LFP: 6, ATK: 2},
		UNT_NUM_12: {TYPE: 'UNT', NAME: 'UNT_12', LFP: 6, ATK: 3},
		UNT_NUM_13: {TYPE: 'UNT', NAME: 'UNT_13', LFP: 6, ATK: 4},
		UNT_NUM_14: {TYPE: 'UNT', NAME: 'UNT_14', LFP: 1, ATK: 1},
		UNT_NUM_15: {TYPE: 'UNT', NAME: 'UNT_15', LFP: 1, ATK: 2},
		UNT_NUM_16: {TYPE: 'UNT', NAME: 'UNT_16', LFP: 1, ATK: 3},
	};


	// GOALを初期位置に戻す
	change_BLC_to_GOL(0, 9);
	// change_BLC_to_GOL(9, 0);
	// change_BLC_to_GOL(9, 9);
	// change_BLC_to_GOL(0, 0);

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
	// COLLECT_VALUE2[6][4][3] = 'background-color: #00FF00';
	// COLLECT_VALUE2[6][4][2] = UNT_DATA_OBJ['UNT_NUM_0'];
	// COLLECT_VALUE2[5][6][3] = 'background-color: #00FF00';
	// COLLECT_VALUE2[5][6][2] = UNT_DATA_OBJ['UNT_NUM_1'];

	change_UNT_to_NON();
	
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



<!-- fieldfieldfieldfieldfieldfield -->
<div class="field">

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
								
							<!-- <button on:click={() => get_USR_position()}>get_USR_position</button> -->
							<!-- <button on:click={() => get_UNT_position()}>get_UNT_position</button> -->
							<!-- <button on:click={() => UNT_ATTACK_OR_MOVE()}>UNT_ATTACK_OR_MOVE</button> -->


							<!-- 上下左右のボタン(WASDに対応する) -->
							<div>
								<button class='WASD_NULL'>◾️</button>
								<button on:click={() => keypress_event({key: 'w'})} class='WASD'>W</button>
								<button class='WASD_NULL'>◾️</button>
							</div>
							<div>
								<button on:click={() => keypress_event({key: 'a'})} class='WASD'>A</button>
								<button class='WASD_NULL'>◾️</button>
								<button on:click={() => keypress_event({key: 'd'})} class='WASD'>D</button>
							</div>
							<div>
								<button class='WASD_NULL'>◾️</button>
								<button on:click={() => keypress_event({key: 's'})} class='WASD'>S</button>
								<button class='WASD_NULL'>◾️</button>
							</div>

							<div>
								<div>
									{USR_DATA_ARRAY[0].NAME}
									LFP: {USR_DATA_ARRAY[0].LFP}
									ATK: {USR_DATA_ARRAY[0].ATK}
									{#each USR_DATA_ARRAY[0].EQP as EQP, EQP_I}
										{#if EQP}
											<div>
												<!-- {EQP_I} -->
												RARITY: {EQP.RARITY}
												LFP_BUFF: {EQP.LFP_BUFF}
												<!-- LFP_DEBUFF: {EQP.LFP_DEBUFF} -->
												ATK_BUFF: {EQP.ATK_BUFF}
												<!-- ATK_DEBUFF: {EQP.ATK_DEBUFF} -->
<!-- <button on:click={() => keypress_event(EQP.MAGIC)}>MAGIC</button> -->
<button  on:click={() => keypress_event({key: 'm', Magic: EQP.MAGIC[1]})}>MAGIC</button>
												MAGIC: {EQP.MAGIC[1]}
											</div>
										{/if}
									{/each}
								</div>
								{#each Object.keys(UNT_DATA_OBJ) as key}
									<div>{UNT_DATA_OBJ[key].NAME} LFP: {UNT_DATA_OBJ[key].LFP} ATK: {UNT_DATA_OBJ[key].ATK}</div>
								{/each}
							</div>

							<div>Ver 0.0.0.6</div>
							<a href="https://github.com/taroyanaka/game/">GitHub</a>


</div>
<!-- fieldfieldfieldfieldfieldfield -->





<!-- gachagachagachagachagachagacha -->
<div class="gacha">
		<button on:click={slot_exe_once}>slot_exe_once</button>
		<div>MINE</div>
		GOLD: {GOLD}
		KAKUHEN: {KAKUHEN}
		KAKUHEN_COUNTER: {KAKUHEN_COUNTER}
		<ul>
			<li>
				<span class="EQP_SPAN">RARITY</span>
				<span class="EQP_SPAN">LFP_BUFF</span>
				<span class="EQP_SPAN">LFP_DEBUFF</span>
				<span class="EQP_SPAN">ATK_BUFF</span>
				<span class="EQP_SPAN">ATK_DEBUFF</span>
			</li>
			{#each MINE as EQP, EQP_I}
			<li>
				{#if EQP}
					<span class="EQP_SPAN">{EQP['RARITY']}</span>
					<span class="EQP_SPAN">{EQP['LFP_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['LFP_DEBUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_DEBUFF']}</span>
					<!-- set_EQPボタン -->
					<!-- NAME, EQP, LIMITが引数 -->
					<button on:click={() => set_EQP(
						USR_DATA_ARRAY[0].NAME,
						EQP,
						3,
					)}>set_EQP</button>
				{/if}
			</li>
			{/each}
		</ul>
		<ul>
			<li>
				<span class="EQP_SPAN">RARITY</span>
				<span class="EQP_SPAN">LFP_BUFF</span>
				<span class="EQP_SPAN">LFP_DEBUFF</span>
				<span class="EQP_SPAN">ATK_BUFF</span>
				<span class="EQP_SPAN">ATK_DEBUFF</span>
			</li>
			{#each SLOT3 as EQP, EQP_I}
			<li>
				{#if EQP}
					<span class="EQP_SPAN">{EQP['RARITY']}</span>
					<span class="EQP_SPAN">{EQP['LFP_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['LFP_DEBUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_DEBUFF']}</span>
				{/if}
			</li>
			{/each}
		</ul>
</div>
<!-- gachagachagachagachagachagacha -->


<style>
.WASD, .WASD_NULL{
	font-size: 30px;
}
.WASD_NULL{
	background-color: black;
}
.EQP_SPAN{
	display: inline-block;
	width: 6.5rem;
}


/* Gacha開発中はfieldをnoneをON/OFFして非表示にする */
.field {
	/* display: none; */
}

.gacha{
	display: none;
}
</style>