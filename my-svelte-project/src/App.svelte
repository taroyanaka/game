<script>
const color1 = '#00FF00'; // ライムグリーン
const color2 = '#FFFFFF'; // ホワイト
const color3 = '#FF0000'; // レッド
const color4 = '#0000FF'; // ブルー
const color5 = '#FFFF00'; // イエロー

const color6 = '#00FFFF'; // シアン

let field_none = 'block';
// let field_none = 'none';
let gacha_none = 'none';
// let gacha_none = 'block';

const INIT_USR_DATA_ARRAY_0 = [{
	ID: 0,
	TYPE: 'USR',
	SPAWN_Y_X: [9, 0],
	NAME: 'USR_0',
	LFP: 100,
	ATK: 10,
	EQP: [
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0, 
			MAGIC: 
				[
					{MAGIC_COUNT: null},
					[
						[0,  0,  0],
						[0, 'U', 0],
						[0,  0,  0],
					]
				]
		},
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
		{RARITY: 4, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
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
	GOLD: 3,
}];

const INIT_USR_DATA_ARRAY_1 = [{
	ID: 1,
	TYPE: 'USR',
	SPAWN_Y_X: [0, 0],
	NAME: 'USR_1',
	LFP: 100,
	ATK: 10,
	EQP: [
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0, 
			MAGIC: 
				[
					{MAGIC_COUNT: null},
					[
						[0,  0,  0],
						[0, 'U', 0],
						[0,  0,  0],
					]
				]
		},
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
		{RARITY: 4, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
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
	GOLD: 3,
}];
const INIT_USR_DATA_ARRAY_2 = [{
	ID: 2,
	TYPE: 'USR',
	SPAWN_Y_X: [9, 9],
	NAME: 'USR_2',
	LFP: 100,
	ATK: 10,
	EQP: [
		{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0, 
			MAGIC: 
				[
					{MAGIC_COUNT: null},
					[
						[0,  0,  0],
						[0, 'U', 0],
						[0,  0,  0],
					]
				]
		},
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
		{RARITY: 4, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
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
	GOLD: 3,
}];

let START_CURRENT_Y_AND_X_ARRAY = [];
const set_USR_to_init_position = () => {	
	const all_INIT_USR_DATA_ARRAY = [INIT_USR_DATA_ARRAY_0, INIT_USR_DATA_ARRAY_1, INIT_USR_DATA_ARRAY_2];

	START_CURRENT_Y_AND_X_ARRAY = all_INIT_USR_DATA_ARRAY
		.map(V=>V.map(v=>v['SPAWN_Y_X']))
			.flat();
	// USRを初期位置に設定
		// COLLECT_VALUE2[9][0][2] = 'USR'; COLLECT_VALUE2[9][0][3] = 'background-color: color4';
	START_CURRENT_Y_AND_X_ARRAY.forEach((V, I) => {
		COLLECT_VALUE2[V[0]][V[1]][2] = 'USR';
		COLLECT_VALUE2[V[0]][V[1]][3] = 'background-color: ' + color4 +';';
	});
};
const clone_START_CURRENT_Y_AND_X_ARRAY = () => R.clone(START_CURRENT_Y_AND_X_ARRAY);

let CURRENT_Y_AND_X = clone_START_CURRENT_Y_AND_X_ARRAY();
let CURRENT_USER_ID = 0;
let UNIT_TURN = false;

// CURRENT_USER_IDを1増やし、USR_DATA_ARRAYの最大のIDを超えたら0に戻す関数
const change_CURRENT_USR_ID = () => {
	// USRが行動中はUNIT_TURNはfalseで、USRが行動を終えたらUNIT_TURNはtrueになる
	UNIT_TURN = false;

	// USR_DATA_ARRAYの最大のIDを取得する関数
	const get_max_ID = () => {
		const ID_ARY = USR_DATA_ARRAY.map(V=>V['ID']);
		const max_ID = Math.max(...ID_ARY);
		return max_ID;
	}
	const to_be_unit_turn = () => UNIT_TURN = true;
	const return_zero_for_CURRENT_USER_ID_reset = () => 0;
	const to_be_unit_turn_and_return_zero_for_CURRENT_USER_ID_reset = () => {
		to_be_unit_turn();
		return return_zero_for_CURRENT_USER_ID_reset();
	}

	// CURRENT_USER_IDを1増やす。max_IDを超えたら0に戻す
	CURRENT_USER_ID = CURRENT_USER_ID + 1 > get_max_ID() ?
		to_be_unit_turn_and_return_zero_for_CURRENT_USER_ID_reset() :
		CURRENT_USER_ID + 1;
}
	
// USR_DATA_ARRAYのデータをCOLLECT_VALUE2に反映させるための関数
const reflect_USR_DATA = () =>{
	// USR_DATA_ARRAYのNAMEとTYPEをobject形式でmap関数でreflect_DATAに追加する
	let reflect_DATA = USR_DATA_ARRAY.map(V=>{
		return {NAME: V['NAME'], TYPE: V['TYPE'], BACK_COLOR: ('background-color: ' + color4)};
	});
	// return reflect_DATA;
	reflect_DATA.forEach((V,I)=>{
		COLLECT_VALUE2[CURRENT_Y_AND_X[I][0]][CURRENT_Y_AND_X[I][1]][2] = V.TYPE;
		COLLECT_VALUE2[CURRENT_Y_AND_X[I][0]][CURRENT_Y_AND_X[I][1]][3] = V.BACK_COLOR;
		COLLECT_VALUE2[CURRENT_Y_AND_X[I][0]][CURRENT_Y_AND_X[I][1]][4] = Number(V.NAME.replaceAll('USR_', ''));
	})
}

// spawn関数はUNTを誕生させる関数
// Target_UNT_NUMに隣接するNONにUNTを誕生させる
// Target_UNT_NUMに隣接するNONが無い場合、UNT_NUMに隣接するNONにUNTを誕生させる
// Target_UNT_NUMとUNT_NUMどちらにも隣接するNONが無い場合spawnは実行されない
const spawn = (UNT_NUM, Target_UNT_NUM) => {
try {
	const unt_position = get_UNT_position(UNT_NUM);
	const UNT_ADJACENT_Y_AND_X = get_click_position(unt_position[0], unt_position[1], false);
	const Target_UNT_position = get_UNT_position(Target_UNT_NUM);
	const Target_UNT_ADJACENT_Y_AND_X = get_click_position(Target_UNT_position[0], Target_UNT_position[1], false);

	const get_NON_position = (UNT_NUM) => {
		const unt_position = get_UNT_position(UNT_NUM);
		const UNT_ADJACENT_Y_AND_X = get_click_position(unt_position[0], unt_position[1], false);
		const NEAR_NON_POSITION = UNT_ADJACENT_Y_AND_X.filter(V=>COLLECT_VALUE2[V[0]][V[1]][2] === 'NON');
		// near_non_positionが空の場合、COLLECT_VALUE2の中のNONの位置をランダムに一つ選択する
		if(NEAR_NON_POSITION.length === 0){
			const NOT_NEAR_NON_POSITION = [];
			COLLECT_VALUE2.forEach((V, I)=>{
				V.forEach((v, i)=>{
					if(v[2] === 'NON'){
						NOT_NEAR_NON_POSITION.push([I, i]);
					}
				});
			});
			// シャッフルして返す
			return shuffle(NOT_NEAR_NON_POSITION);
		}
		return NEAR_NON_POSITION;
	};


	// UNT_DATA_OBJのNAMEの最大値+1を取得する関数
	const get_new_UNT_NUM = () => {
		const UNT_NUM_ARY = Object.keys(UNT_DATA_OBJ).map(V=>Number(V.split('_')[2]));
		const max_UNT_NUM = Math.max(...UNT_NUM_ARY);
		const new_UNT_NUM = max_UNT_NUM + 1;
		return new_UNT_NUM;
	}

	// 誕生するUNTのプロパティを設定する。
	// UNTのLFPとATKはUNT_NUMとTarget_UNT_NUMのLFPとATKの合計値
	const new_UNT = {
		TYPE: 'UNT',
		NAME: 'UNT_' + (get_new_UNT_NUM()).toString(),
		LFP: UNT_DATA_OBJ['UNT_NUM_' + (UNT_NUM).toString()]['LFP'] + UNT_DATA_OBJ['UNT_NUM_' + (Target_UNT_NUM).toString()]['LFP'],
		ATK: UNT_DATA_OBJ['UNT_NUM_' + (UNT_NUM).toString()]['ATK'] + UNT_DATA_OBJ['UNT_NUM_' + (Target_UNT_NUM).toString()]['ATK'],
		GLD: UNT_DATA_OBJ['UNT_NUM_' + (UNT_NUM).toString()]['GLD'] + UNT_DATA_OBJ['UNT_NUM_' + (Target_UNT_NUM).toString()]['GLD'],
		BDP: 0,
		RBP: 0,
	};
	new_UNT['BDP'] = new_UNT['LFP'] * new_UNT['ATK'];

	// NONの位置を取得する
	const NON_POSITION = get_NON_position(UNT_NUM);
	// NONの中から一つをランダムで選択する
	const random_NON_POSITION = shuffle(NON_POSITION)[0];

	// new_UNTをUNT_DATA_OBJに追加する
	// random_NON_POSITIONにnew_UNTを追加する
	// back_groundの色を変更する
	if(
		random_NON_POSITION !== undefined &&
		COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][2] === 'NON'
	){
		UNT_DATA_OBJ['UNT_NUM_' + (get_new_UNT_NUM()).toString()] = new_UNT;
		COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][2] = new_UNT;
		COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][3] = 'background-color: ' + color1 +';';
		console.log('UNT is born!!');
	}

} catch (error) {
	console.log(error);
	// errorがあった場合、UNT_DATA_OBJからnew_UNTを削除する
	UNT_DATA_OBJ = R.omit(['UNT_NUM_' + (get_new_UNT_NUM()).toString()], UNT_DATA_OBJ);
	// errorがあった場合、COLLECT_VALUE2からnew_UNTを削除し、NONに戻す
	COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][2] = 'NON';
	// errorがあった場合、COLLECT_VALUE2からnew_UNTの背景色を削除する
	COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][3] = 'background-color: ' + color2 +';';
}
};


// breeding points(BDP)はUNTのLFPとATKを掛けた値
// BDP = LFP * ATK
// remain breeding points(RBP)の初期値は0でbreedによって加算される
// RBPがBDPを超えたらUNTが誕生する
// ATKの値がbreed関数によってRBPに加算される
const breed = (UNT_NUM, Target_UNT_NUM_Ary) => {
	// console.log(UNT_NUM, Target_UNT_NUM_Ary);
	Target_UNT_NUM_Ary.forEach(Target_UNT_NUM=>{
		const UNIT_NAME = 'UNT_NUM_' + (UNT_NUM).toString();
		const Target_UNT_NUM_NAME = 'UNT_NUM_' + (Target_UNT_NUM).toString();
		// UNT_NUMのLFPとATKの合計値
		// UNT_NUMのLFPとATKの合計値をTarget_UNT_NUMのRBPに加算する
		UNT_DATA_OBJ[Target_UNT_NUM_NAME]['RBP'] += UNT_DATA_OBJ[UNIT_NAME]['ATK']
		if(UNT_DATA_OBJ[Target_UNT_NUM_NAME]['RBP'] >= UNT_DATA_OBJ[Target_UNT_NUM_NAME]['BDP']){
			// console.log('BREED!!', UNT_NUM, Target_UNT_NUM_NAME);
			spawn(UNT_NUM, Target_UNT_NUM);
			// RBPがBDPを超えたらUNTが誕生する
			// RBPを0にする
			UNT_DATA_OBJ[Target_UNT_NUM_NAME]['RBP'] = 0;
		}
	});
};

let rootElement;


const EQP_LIMIT = 10;
let KILL_STREAK = 0;
const kill_streak_stack_get_more_gold = ({Unt_Gld=0, Kill_Streak=0}) => {
	console.log(
		Unt_Gld,
		Kill_Streak
	)
	return (Unt_Gld * Kill_Streak);
};
// UNT_DATA_OBJ[UNT_NUM_N]['GLD']

const what_sort_by_any = ({
		What=MINE,
		Any='RARITY',
		Asc_Desc='DESC',
	}) => {
		// What = What.sort((a,b)=>b['RARITY'] - a['RARITY']);
		// console.log("What");
		Asc_Desc ?
		What = What.sort((a,b)=>b[Any] - a[Any]) :
		What = What.sort((a,b)=>a[Any] - b[Any]);
};

import { onMount } from 'svelte';
// import { beforeUpdate, afterUpdate } from 'svelte';


$: MINE && what_sort_by_any({What: MINE, Any: 'RARITY', Asc_Desc: 'DESC'});
// $: USR_DATA_ARRAY && console.log('update');
$: rootElement && rootElement.style.setProperty('--field-none', field_none);
$: rootElement && rootElement.style.setProperty('--gacha-none', gacha_none);

const switch_field_gacha = () => {
	field_none = field_none === 'none' ? 'block' : 'none';
	gacha_none = gacha_none === 'none' ? 'block' : 'none';
};

const UN_EQP = (Eqp_Index, Usr_Id=0) => {
	// MINEに指定したUSR_DATA_ARRAYのEqpを追加する
	MINE = R.append(USR_DATA_ARRAY[Usr_Id]['EQP'][Eqp_Index], MINE);
	// USR_DATA_ARRAY[Usr_Id].EQPオブジェクトから指定したUSR_DATA_ARRAYのEqpを削除する
	USR_DATA_ARRAY[Usr_Id]['EQP'] = R.remove(Eqp_Index, 1, USR_DATA_ARRAY[Usr_Id]['EQP']);
}



const recharge_magic_count = (Usr_Id=0) => {
	USR_DATA_ARRAY[Usr_Id]['EQP'].map((V, Eqp_Index) => {
			if(V['MAGIC'][0]['MAGIC_COUNT'] !== null){
				V['MAGIC'][0]['MAGIC_COUNT'] = 1;
				// return V['MAGIC'][0]['MAGIC_COUNT'];
			}
		})
}


// beforeUpdate(async () => {
// 	try {
// 		recharge_magic_count();
// 	} catch (error) {
// 		console.log(error);		
// 	}
// });

const next_field = () => {
	MINE = [];
	switch_field_gacha();
	// recharge_magic_count();
};

// .field .gachaのdisplayをnoneを切り替える関数
const toggle_gacha_display = () => {
	const gacha = document.querySelector('.gacha');
	gacha.style.display = gacha.style.display === 'none' ? 'block' : 'none';
	const field = document.querySelector('.field');
	field.style.display = field.style.display === 'none' ? 'block' : 'none';
};


const LFP_ATK_Range_Array_Min_Max_Table = [
	{LFP_Min: 2,LFP_Max: 10,ATK_Min: 1,ATK_Max: 3,},
	{LFP_Min: 5,LFP_Max: 8,ATK_Min: 3,ATK_Max: 10,},
];



const make_UNT_DATA_OBJ = ({
		Repeat_Array_Num=1,
		Repeat_Array_Times=20,
		LFP_Range_Array=[2, 10],
		ATK_Range_Array=[1, 3],
		GLD_Range_Array=[1, 2],
		// BDP_Rate=1,
		BDP_Rate=5,
	}) => {
	const UNT_DATA_OBJ = {};
	// 特定の範囲の配列からランダムで1つ選択する関数
	const get_randam_range = ({Range=[1,10]}) => {
		const min = Range[0];
		const max = Range[1];
		const randam = Math.floor(Math.random() * (max + 1 - min)) + min;
		return randam;
	};

	// R.repeatで指定した数字を指定した回数繰り返す配列を返す関数
	const repeat_array = (num, times) => R.repeat(num, times);

	// breeding points(BDP)はUNTのLFPとATKを掛けた値
	// BDP = LFP * ATK
	// remain breeding points(RBP)の初期値は0でbreedによって加算される
	// RBPがBDPを超えたらUNTが誕生する
	// LFPとATKの合計値がbreed関数によってRBPに加算される
	// BDP_RateはBDPの調整する。デフォルトは1。多いほどbreedが遅くなる

	// MINEからUNT_DATA_OBJを作成する
	repeat_array(Repeat_Array_Num, Repeat_Array_Times).forEach((V, I) => {
		UNT_DATA_OBJ['UNT_NUM_' + (I).toString()] = {
			TYPE: 'UNT',
			NAME: 'UNT_' + (I).toString(),
			LFP: V * get_randam_range({Range: LFP_Range_Array}),
			ATK: V * get_randam_range({Range: ATK_Range_Array}),
			GLD: get_randam_range({Range: GLD_Range_Array}),
			BDP: 0,
			RBP: 0,
		};
		UNT_DATA_OBJ['UNT_NUM_' + (I).toString()]['BDP'] = 
			UNT_DATA_OBJ['UNT_NUM_' + (I).toString()]['LFP'] * 
			UNT_DATA_OBJ['UNT_NUM_' + (I).toString()]['ATK'] * BDP_Rate;
	});
	return UNT_DATA_OBJ;
};


let FLOOR = 0;
// let SHOW_DAMAGE = 'ON';
let SHOW_DAMAGE = 'OFF';
let USR_DATA_ARRAY = [];



const retry_data_setup = () =>{
	USR_DATA_ARRAY = R.clone(INIT_USR_DATA_ARRAY_0);
	const ADDITIONAL_USR_DATA_ARRAY_1 = R.clone(INIT_USR_DATA_ARRAY_1);
	const ADDITIONAL_USR_DATA_ARRAY_2 = R.clone(INIT_USR_DATA_ARRAY_2);
	USR_DATA_ARRAY = R.concat(USR_DATA_ARRAY, ADDITIONAL_USR_DATA_ARRAY_1);
	USR_DATA_ARRAY = R.concat(USR_DATA_ARRAY, ADDITIONAL_USR_DATA_ARRAY_2);
};
retry_data_setup();


const decrement_MAGIC_COUNTER = (EqpNum, Usr_Id=0) => {
	console.log(
		Usr_Id,
// USR_DATA_ARRAY[Usr_Id],
// USR_DATA_ARRAY[Usr_Id]['EQP'],
// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum],
// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'],
// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0],
// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'],
	);
	if(USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'] === null){
		return;
	}
	USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'] -= 1
};

// increment_MAGIC_COUNTERはUSR_DATA_ARRAYの指定したUSRの指定したEqpのMAGIC_COUNTを1増やす関数
const increment_MAGIC_COUNTER = (EqpNum, Usr_Id=0) => {
	USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'] += 1
};
// 全てのMAGIC_COUNTを1増やす関数
const increment_MAGIC_COUNTER_ALL = () => {
	USR_DATA_ARRAY.forEach((V, Usr_Id) => {
		V['EQP'].forEach((v, EqpNum) => {
			if(v['MAGIC'][0]['MAGIC_COUNT'] === null){
				return;
			}
			v['MAGIC'][0]['MAGIC_COUNT'] += 1
		});
	});
};

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
}

// DEV_MODEではGOLの位置を固定する。USRの位置も固定する。UNTの位置も固定する。
// 今後シードランダムを導入してNONの位置を固定する。
let DEV_MODE = true;

// const set_EQP = (NAME, EQP, LIMIT, Eqp_Index) =>{
const set_EQP = ({
	Eqp={'UNT_NUM_0': {ATK: 3,LFP: 4,NAME: "UNT_0",TYPE: "UNT"}},
	// Eqp_Limit=5,
	Eqp_Index=0,
	Usr_Id=0,
	}) =>{
		console.log(Eqp, Usr_Id);

	// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPを取得する
	const USR_EQP = Eqp;
	// USR_EQPの長さがLIMITより大きかったら、USR_EQPをLIMITの数になるまでスライスする
	if(USR_DATA_ARRAY[Usr_Id]['EQP'].length >= EQP_LIMIT){
		return;
	}
	// USR_DATA_ARRAY[Usr_Id].EQPオブジェクトにEQPをramda.jsで追加する
	USR_DATA_ARRAY[Usr_Id]['EQP'] = R.append(Eqp, USR_DATA_ARRAY[Usr_Id]['EQP']);
	// USR_DATA_ARRAY.filter(V=>V['ID']=== Usr_Id )[0]['EQP'] = R.append(Eqp, USR_DATA_ARRAY[Usr_Id]['EQP']);
	// Object.values(USR_DATA_ARRAY[Usr_Id])[4] = R.append(Eqp, USR_DATA_ARRAY[Usr_Id]['EQP']);
	// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPをUSR_EQP_SLICE_PUSHに更新する

	// console.log(MINE);
		MINE = R.remove(Eqp_Index, 1, MINE);
		// console.log(MINE);

};

const LFP_RECHARGE_NUM = 10;
let UNT_DATA_OBJ = {};

let GOLD = 3;
let MINE = [];

let KAKUHEN = false;
let KAKUHEN_COUNTER = 0;

const KAKUHEN_COUNTER_LIMIT = 30;
const RARITY_ZERO_VOLUME = 80;
const PROBABILITY_CHANGE_THRESHOLD_0 = 2;
const PROBABILITY_CHANGE_THRESHOLD_1 = 3;
const DECREASE_PERCENT = 90;
const no_magic = () => [{MAGIC_COUNT: null},[[0,  0,  0],[0, 'U', 0],[0,  0,  0],]];
const ORIGINAL_SLOT = [
	{RARITY: 0, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 1, ATK_DEBUFF: 0, MAGIC: R.clone(no_magic())},
	{RARITY: 1, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 2, ATK_DEBUFF: 0, MAGIC: R.clone(no_magic())},
	{RARITY: 2, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 3, ATK_DEBUFF: 0, MAGIC: R.clone(no_magic())},
	{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 4, ATK_DEBUFF: 0, MAGIC: R.clone(no_magic())},

	{RARITY: 90, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 10, ATK_DEBUFF: 0, MAGIC: R.clone(no_magic())},

	{RARITY: 2, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
		[
			{MAGIC_COUNT: 1},
			[
				[1,  0,  1],
				[0, 'U', 0],
				[1,  0,  1],
			]
		]
	},
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
	{RARITY: 3, LFP_BUFF: 0, LFP_DEBUFF: 0, ATK_BUFF: 0, ATK_DEBUFF: 0, MAGIC: 
		[
			{MAGIC_COUNT: 1},
			[
				[1, 0,  1,  0, 1],
				[0, 1,  1,  1, 0],
				[1, 1, 'U', 1, 1],
				[0, 1,  1,  1, 0],
				[1, 0,  1,  0, 1],
			]
		]
	},
];
// let SLOT = R.clone(ORIGINAL_SLOT);
let SLOT = ORIGINAL_SLOT;

// $: if(true) console.log('hello');

let ERROR_MESSAGE = true;

let PICKEL = 0;
let GOAL = false;
let DIED = '';
let ADJACENT_Y_AND_X = [];
let COLLECT_VALUE2 = [];

let SLOT2 = [];
let SLOT3 = [];
const make_slot = () => {
	// SLOTのRARITYの合計の値が100になるように100個ランダムで選択する。
	// ただし、RARITYが90のものは1つだけ選択し、RARITYが0はRARITY_ZERO_VOLUME個選択する。
	SLOT2 = SLOT.reduce((accumulator, currentValue) => {
		const RARITY = currentValue.RARITY;
		const RARITY_NUM = currentValue.RARITY === 90 ?
							1 : currentValue.RARITY === 0 ?
									RARITY_ZERO_VOLUME : currentValue.RARITY;
		for (let i = 0; i < RARITY_NUM; i++) {
			accumulator.push(currentValue);
		}
		return accumulator;
	}, []);
	SLOT3 = shuffle(SLOT2);
};

make_slot();
// LFP_BUFFのみ
// let SLOT4 = shuffle(SLOT2.slice(0, 100));

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


const RATE_AND_X_PAIR = [
	{Rate: 1, X: 1},
	{Rate: 4, X: 3},
	{Rate: 8, X: 5},
];
const make_high_rate_slot = ({Rate=1}) => {
	console.log('make_high_rate_slot');
	console.log(RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['Rate']);
	if (Rate === 1) {
		SLOT = R.clone(ORIGINAL_SLOT);
		const new_slot = SLOT.map(V=>{
			V['ATK_BUFF'] = V['ATK_BUFF'] * 1;
			return V;
		})
		SLOT = R.clone(new_slot);
		return;
	}
	if (Rate === RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['Rate']) {
		SLOT = R.clone(ORIGINAL_SLOT);
		const new_slot = SLOT.map(V=>{
			V['ATK_BUFF'] = V['ATK_BUFF'] * RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['X'];
			// V['RARITY'] = V['RARITY'] * RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['X'];
			return V;
		})
		SLOT = R.clone(new_slot);
	}
	// if(Rate === 4){
	// 	const new_slot = SLOT.map(V=>{
	// 		V['ATK_BUFF'] = V['ATK_BUFF'] * RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['X'];
	// 		return V;
	// 	})
	// 	SLOT = R.clone(new_slot);
	// }
	// if(Rate === 8){
	// 	const new_slot = SLOT.map(V=>{
	// 		V['ATK_BUFF'] = V['ATK_BUFF'] * RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['X'];
	// 		return V;
	// 	})
	// 	console.log(new_slot);
	// 	SLOT = R.clone(new_slot);
	// }
}

// ワロタ https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q14218518669
// 関数。SLOT3からランダムで1つ選択してMINEに追加。GOLDが足りなかったら追加しない。GOLDが足りたらGOLDを減らす。
// RARITYが1以上のものをPROBABILITY_CHANGE_THRESHOLD連続で追加できた場合、KAKUHENをtrueにする。
// KAKUHEN true状態でKAKUHEN_COUNTER_LIMIT回選択した後にKAKUHENをfalseにする。
const slot_exe_once = ({Rate_Param=1}) =>{
	console.log('slot_exe_once');
	make_high_rate_slot({Rate: Rate_Param});
	make_slot();
	// KAKUHENがtrueの時はSLOT3からRARITYが0のものを選択する確率が低下する
	const SLOT3_KAKUHEN = KAKUHEN ? decrease_any_rarity(0, DECREASE_PERCENT) : SLOT3;
	// SLOT3_KAKUHENからランダムで1つ選択する
	const random_SLOT3_KAKUHEN = shuffle(SLOT3_KAKUHEN)[0];
	// GOLDが足りなかったら追加しない。GOLDが足りたらGOLDを減らす。
	if ((GOLD - Rate_Param) <= 0) {
		return;
	}else{
		GOLD -= Rate_Param;
	}
	// MINEに追加する
	MINE = R.append(random_SLOT3_KAKUHEN, MINE);
	// RARITYが1以上のものをPROBABILITY_CHANGE_THRESHOLD(_0か_1のどちらかランダムの値)の値の回数連続で追加できた場合、KAKUHENをtrueにする。
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
	}
};








const magic_USR_to_UNT = (Magic, Usr_Id) => {
	try {
	const magic_attack = convert_for_magic(Magic);
	magic_attack.forEach(MAGI=>{
		const magic_to_Y = CURRENT_Y_AND_X[Usr_Id][0] + MAGI[0];
		const magic_to_X = CURRENT_Y_AND_X[Usr_Id][1] + MAGI[1];
		if(
			(typeof COLLECT_VALUE2[magic_to_Y]) === 'undefined' ||
			(typeof COLLECT_VALUE2[magic_to_Y][magic_to_X]) === 'undefined'
		){return};
		reflect_USR_DATA();
		console.log(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]);
		if(
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'GOL' ||
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'BLC' ||
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'NON' ||
			COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'USR'
		){return};



		const UNT_NUM = Number(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]['NAME'].replaceAll('UNT_', ''));
		const UNT_NUM_N = 'UNT_NUM_' + (UNT_NUM).toString();
		const USR_ATK_BUFF = USR_DATA_ARRAY[Usr_Id]['EQP'].reduce((accumulator, currentValue) => {
			return accumulator + currentValue['ATK_BUFF'];
		}, 0) || 0;
		const USR_ATK = USR_DATA_ARRAY[Usr_Id].ATK;
		const USR_ATK_WITH_BUFF = USR_ATK + USR_ATK_BUFF;
		UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK_WITH_BUFF;


		if(
		COLLECT_VALUE2[magic_to_Y][magic_to_X][3] === 'background-color: ' + color1 +';'
	){
			damage_effect({Y_X_Ary: [magic_to_Y, magic_to_X],
				ms: 200,
				// Original_Color: 'color1',
				Original_Color: 
				UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0 ?
					color2 :
					color1,
				Color_0: color3,
				Color_1: color2,
			});
	}

		if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
			KILL_STREAK += 1;
			// GOLD += 1;
			GOLD += kill_streak_stack_get_more_gold({
				Unt_Gld: UNT_DATA_OBJ[UNT_NUM_N]['GLD'],
				Kill_Streak: KILL_STREAK,
			});
			// console.log('FOO', FOO);
			const UNT_Y_AND_X = 
					[
						magic_to_Y,
						magic_to_X,
					];
			// UNTの位置をNONに変更する
			change_BLC_to_NON(UNT_Y_AND_X[0], UNT_Y_AND_X[1]);
			// 色も更新する
			// COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: ' + color2 +';';
			COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: ' + color2 +';';
			// UNT_DATA_OBJからUNT_NUMを指定してUNTを削除する
			UNT_DATA_OBJ = R.omit([UNT_NUM_N], UNT_DATA_OBJ);
		}
	})
	} catch (error) {
	console.log(error);
	}
}



// クリックした位置の上下左右の配列を取得する関数
const get_click_position = (Y, X, When_Click=false) => {
	// CURRENT_Y_AND_X = [Y, X];
	const click_position = [
		[Y, X-1],
		[Y, X+1],
		[Y-1, X],
		[Y+1, X],
	];
	if(When_Click){
		console.log(
			Y,
			X,
			click_position,
		);
	}
	return click_position;
};

// Y,XをBLCからゴール(GOL)に変更する関数
const change_BLC_to_GOL = (Y, X) => {
	COLLECT_VALUE2[Y][X][2] = 'GOL';
	// 色は黄色にする
	COLLECT_VALUE2[Y][X][3] = 'background-color: ' + color5 +';';
};

// USRからGOLまでを隣接して移動できるように適宜BLCをNONに変更する関数
const change_BLC_to_NON = (Y, X) => {
	// Y,XをBLCからNONに変更する
	COLLECT_VALUE2[Y][X][2] = 'NON';
	// 色は白色にする
	COLLECT_VALUE2[Y][X][3] = 'background-color: ' + color2 +';';
};


// USRがUNTにアタックする関数(UNTのLFPをUSRのATK分減らす)(引数にはUNT_DATA_ARRAYのUNT_NUMを指定する)
// const attack_USR_to_UNT = (UNT_NUM, Go_to_Y, Go_to_X) => {
const attack_USR_to_UNT = (Go_to_Y, Go_to_X, Usr_Id=0) => {
	// Go_to_YとGo_to_XにUNTが存在しない場合はreturnする
	if (COLLECT_VALUE2[Go_to_Y][Go_to_X][2] !== 'object'){
		if (COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['TYPE'] !== 'UNT') {
			// UNTではない UNTが存在しない
			return;
		}
	}

	// Go_to_YとGo_to_XからUNT_NUMを取得する
	const UNT_NUM = Number(COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['NAME'].replaceAll('UNT_',''));
	const UNT_NUM_N = 'UNT_NUM_' + (UNT_NUM).toString();
	// USR_DATA_ARRAY[Usr_Id]の['EQP']の中から['ATK_BUFF']を累計してUSR_ATK_BUFFに代入すr
	const USR_ATK_BUFF = USR_DATA_ARRAY[Usr_Id]['EQP'].reduce((accumulator, currentValue) => {
		return accumulator + currentValue['ATK_BUFF'];
	}, 0) || 0;
	// USRのATKを取得する
	const USR_ATK = USR_DATA_ARRAY[Usr_Id].ATK;
	const USR_ATK_WITH_BUFF = USR_ATK + USR_ATK_BUFF;
	// 指定したUNTのLFPをUSRのATK分減らす
	damage_alert({
		Before_LFP: UNT_DATA_OBJ[UNT_NUM_N]['LFP'],
		After_LFP: UNT_DATA_OBJ[UNT_NUM_N]['LFP'] - USR_ATK_WITH_BUFF,
		Damage: USR_ATK_WITH_BUFF,
	});
	UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK_WITH_BUFF;
	// ダメージエフェクト
	damage_effect({Y_X_Ary: [Go_to_Y, Go_to_X],
		ms: 200,
		Original_Color: color1,
		Color_0: color3,
		Color_1: color2,
	});

	// 指定したUNTのLFPが0以下になったら、指定したUNTの位置をNONに変更する
	if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
		KILL_STREAK += 1;
		GOLD += 1;
		// GOLD += kill_streak_stack_get_more_gold({
		// 	Unt_Gld: UNT_DATA_OBJ[UNT_NUM_N]['GLD'],
		// 	Kill_Streak: KILL_STREAK,
		// });
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
		COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: ' + color2 +';';
		// UNT_DATA_OBJからUNT_NUMを指定してUNTを削除する
		UNT_DATA_OBJ = R.omit([UNT_NUM_N], UNT_DATA_OBJ);
	}
};

// UNTがUSRにアタックする関数(USRのLFPをUNTのATK分減らす)(引数にはUNT_DATA_ARRAYのUNT_NUMを指定する)
const attack_UNT_to_USR = (UNT_NUM, Usr_Id=1) => {
	// console.log('attack_UNT_to_USR');
	// console.log(UNT_NUM);
	// console.log(Usr_Id);
	increment_MAGIC_COUNTER_ALL();
	damage_effect({Y_X_Ary: [get_USR_position()[0], get_USR_position()[1]],
		ms: 200,
		Original_Color: color4,
		Color_0: color3,
		Color_1: color2,
	});
	const UNT_NUM_N = 'UNT_NUM_' + (UNT_NUM).toString();
	const UNT_ATK = UNT_DATA_OBJ[UNT_NUM_N].ATK;
	damage_alert({
		Before_LFP: USR_DATA_ARRAY[Usr_Id].LFP,
		After_LFP: USR_DATA_ARRAY[Usr_Id].LFP - UNT_ATK,
		Damage: UNT_ATK,
	});
	// 指定したUNTのATKをUSRのLFP分減らす
	USR_DATA_ARRAY[Usr_Id]['LFP'] -= UNT_ATK;
	// USRのLFPが0以下になったら、ゲームオーバーにする
	if (USR_DATA_ARRAY[Usr_Id].LFP <= 0) {
		
		// ゲームオーバーにする
		DIED = 'YOU DIED, GAME OVER';
		FLOOR = 0;
		PICKEL = 0;
		setTimeout(() => {
			// reset_or_init_map({when_mounted_time: false});
			reset_or_init_map({when_mounted_time: false, go_up: false, when_died: true});
		}, 1000);
	}
};

// 与えるダメージ表示する関数
const damage_alert = ({
	Before_LFP=0,
	After_LFP=0,
	Damage=0
}) =>{
	if(SHOW_DAMAGE !== 'ON'){return}
	alert(
		"Before_LFP: " + (Before_LFP).toString() + ' ' +
		"Damage: " + (Damage).toString() + ' ' +
		"After_LFP: " + (After_LFP).toString() + ' '
	);
}

// LFPが減った時に対象のUSRかUNTの色を500ms点滅させる関数
const damage_effect = (
	{
		Y_X_Ary=[9, 0],
		ms=200,
		Original_Color=color4,
		Color_0=color4,
		Color_1=color2,
	}
	) =>{
	// const [Y, X] = Y_X_Ary;
	// const function1 = () => {COLLECT_VALUE2[Y][X][3] = `background-color: ${Color_0}`};
	// const function2 = () => {COLLECT_VALUE2[Y][X][3] = `background-color: ${Color_1}`};
	// const function3 = () => {COLLECT_VALUE2[Y][X][3] = `background-color: ${Original_Color}`};
	// const color_blink = (ms, Color_0, Color_1) =>{
	// 	const limitSeconds = ms / 1000;
	// 	const startTime = new Date().getTime();
	// 	let count = 0;
	// 	const intervalId = setInterval(() => {
	// 		const currentTime = new Date().getTime();
	// 		const elapsedTime = (currentTime - startTime) / 1000;

	// 		elapsedTime >= limitSeconds ? clearInterval(intervalId) :
	// 			count++ % 2 === 0 ? function1() : function2();
	// 	}, 10);
	// };
	// color_blink(ms, Color_0, Color_1);
	// // タイマーをクリアして元の色に戻す
	// setTimeout(() => {
	// 	function3();
	// }, ms);
};



// USRはlifepoint(LFP)とattack(ATK)を持つ
// LFPが0になるとゲームオーバー
// USRの初期値は{NAME: 'USR', LFP: 5, ATK: 1};
// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPにオブジェクトを追加する関数。
// オブジェクトの数はLIMITという引数の数が上限となる
// UNTが移動する関数
// ATKの値が高いUNTから順番に移動する
// 移動先にUSRがいたらアタックする
// 移動先がBLCもしくは他のUNTだったら移動しない
// 移動先にGOLがいたら移動しない
function click_or_keypress_event(
	event,
	Alt_Param={
	Key: null,
	Usr_Id: null,
	Magic: null,
	Eqp_I: null,
	}) {

	// キーボードで操作した場合はevent.keyが有る
	// 　　Alt_Paramは初期値の全てのプロパティがnullのオブジェクト
	// <button>で操作した場合はevent.keyが無い
	// 　　HTML側のclickの中でAlt_Paramの各プロパティがセットされる

	const key = event ? event.key : Alt_Param['Key'];
	const usr_id = Alt_Param['Usr_Id'] ? Alt_Param['Usr_Id'] : 0;
	const magic = Alt_Param['Magic'];
	const eqp_i = Alt_Param['Eqp_I'];

	// window.app.$capture_state()['COLLECT_VALUE2'][9][0]
	// COLLECT_VALUE2
	// [CURRENT_Y_AND_X[usr_id][0]]
	// [CURRENT_Y_AND_X[usr_id][1]]
	// [3] = 'background-color: ' + color6 +';';

// 	console.log(
// 'usr_id', usr_id,
// 'magic', magic,
// 'eqp_i', eqp_i,
// CURRENT_Y_AND_X[usr_id],
// CURRENT_USER_ID,
// COLLECT_VALUE2[CURRENT_Y_AND_X[usr_id][0]][CURRENT_Y_AND_X[usr_id][1]][3],
// 	);

	KILL_STREAK = 0;

	// // Magic引数がある場合はmagic_attackとUNT_ATTACK_OR_MOVEを実行し、
	// usr_moveとattack_USR_to_UNTを実行せず、早期リターンする
	if(magic){
		decrement_MAGIC_COUNTER(eqp_i, usr_id);
		magic_USR_to_UNT(magic[1], usr_id);		
		change_CURRENT_USR_ID();
		change_CURRENT_USR_color();
		//  Object.entries(UNT_DATA_OBJ).map((V,I)=>{UNT_ATTACK_OR_MOVE(V[1]['NAME'])});
		// UNIT_TURNがtrueなら各UNTの行動を実行する
		if(UNIT_TURN === true){
			Object.entries(UNT_DATA_OBJ).map((V,I)=>{UNT_ATTACK_OR_MOVE(V[1]['NAME'])});
			UNIT_TURN = false;
		};
		return;
	}

	const go_to_y_x_setup = (Key, Usr_Id) => {
		const keypress_position = {
			'w': [-1, 0],
			'a': [0, -1],
			's': [1, 0],
			'd': [0, 1],
			'm': null, // Magic of m
		};
		const offset_y = keypress_position[Key][0];
		const offset_x = keypress_position[Key][1];
		const result_go_to_y_x = [
			CURRENT_Y_AND_X[Usr_Id][0] + offset_y,
			CURRENT_Y_AND_X[Usr_Id][1] + offset_x,
		];
		reflect_USR_DATA();
		return result_go_to_y_x;
	}
	const go_to_y_x = go_to_y_x_setup(key, usr_id);
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
		MINE = [];

		// GOAL後の硬直を無くしてみる(setTimeoutがバグの温床になる気配があるから削除していく方針)
			// 別の方法でGOALしたことをプレイヤーに伝える
		// document.removeEventListener('keypress', click_or_keypress_event);
								// 1秒後にreset_mapを実行する
								// setTimeout(() => {
		reset_or_init_map({when_mounted_time: false, go_up: true, when_died: false});
								// }, 1000);
	}

	if(!magic){
		const usr_move = () => {
			reflect_USR_DATA();
			// go_to_y_xがNONの場合は更新する
			if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'NON') {
				COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] = 'USR';
				COLLECT_VALUE2[CURRENT_Y_AND_X[usr_id][0]][CURRENT_Y_AND_X[usr_id][1]][2] = 'NON';
				// 色も更新する
				COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][3] = 'background-color: ' + color4 +';';
				COLLECT_VALUE2[CURRENT_Y_AND_X[usr_id][0]][CURRENT_Y_AND_X[usr_id][1]][3] = 'background-color: ' + color2 +';';
				CURRENT_Y_AND_X[usr_id] = go_to_y_x;
			}
			reflect_USR_DATA();
		}
		usr_move();
		// USRがUNTにアタックする。引数はUNT_DATA_ARRAYのUNT_NUMの指定と攻撃対象のUNTのIDの指定。
		attack_USR_to_UNT(go_to_y_x[0], go_to_y_x[1]);
		change_CURRENT_USR_ID();
		change_CURRENT_USR_color();
	}


	//  Object.entries(UNT_DATA_OBJ).map((V,I)=>{UNT_ATTACK_OR_MOVE(V[1]['NAME'])});
	// UNIT_TURNがtrueなら各UNTの行動を実行する
	if(UNIT_TURN === true){
		Object.entries(UNT_DATA_OBJ).map((V,I)=>{UNT_ATTACK_OR_MOVE(V[1]['NAME'])});
		UNIT_TURN = false;
	};

};


// 現在のUSRの位置を取得する関数
const get_USR_position = () => {
	// console.log('get_USR_position');
	// UNTの位置を取得する
	reflect_USR_DATA();
	const USR_Y_AND_X = COLLECT_VALUE2
		.map(V=>V.filter(V2=>V2[2] === 'USR' ))
		.filter(V=>V.length>0);
		// [0][0];
	// console.log(USR_Y_AND_X);
	return USR_Y_AND_X;
};

let tmp = null;
// 指定したUNTの位置を取得する関数
const get_UNT_position = (UNT_NUM=0) => {
	try {
	// https://stackoverflow.com/questions/38968598/what-happened-inside-of-1-tostring-and-1-tostring-in-javascript
	const UNT_NUM_STR = (UNT_NUM).toString();
	const UNT_NUM_N = 'UNT_NUM_' + (UNT_NUM).toString();
	// UNTの位置を取得する
	// filterで['TYPE']がUNTかつ['NAME']がUNT_0等のものを抽出する
	const NUMBER_STR_AND_YX = COLLECT_VALUE2.map((V1, I1)=>V1.map((V2, I2)=>{
    	return typeof V2[2] === 'object' ?
			[V2[2]['NAME'].replaceAll('UNT_',''),[I1, I2]] :
			null;
	})).flat().filter(V=>V!==null);
tmp = NUMBER_STR_AND_YX;

	const res1 = NUMBER_STR_AND_YX.filter(V=>V[0]===UNT_NUM_STR)[0][1];
	const [Y, X] = res1;
	return [Y, X];
	} catch (error) {
		console.log('error in get_UNT_position');
		console.log(error);
	}
};



// const attack_if_adjacent = (Unt_Num, Unt_Position, Usr_Position) => {
const attack_if_adjacent = (Unt_Num, Unt_Position) => {
try{
	let result_array = [];
		const res = get_USR_position()
			.map(Usr_Position => {
				const New_Usr_Position = [Usr_Position[0][0], Usr_Position[0][1], Usr_Position[0][4]];
				// console.log(
				// 	Unt_Position[0],
				// 	Unt_Position[1],
				// 	New_Usr_Position[0],
				// 	New_Usr_Position[1],
				// )
				if (
					// 上下左右にUSRがいる場合はアタックする
					(Unt_Position[1] === New_Usr_Position[1] && Unt_Position[0] === New_Usr_Position[0] - 1) ||
					(Unt_Position[1] === New_Usr_Position[1] && Unt_Position[0] === New_Usr_Position[0] + 1) ||
					(Unt_Position[0] === New_Usr_Position[0] && Unt_Position[1] === New_Usr_Position[1] - 1) ||
					(Unt_Position[0] === New_Usr_Position[0] && Unt_Position[1] === New_Usr_Position[1] + 1)
				) {
					return ['ENEMY', New_Usr_Position[2]];
				}
			})
		.filter(Boolean);
		result_array = result_array.concat(res);
		result_array.filter(result => result[0] === 'ENEMY')
					.forEach(result => attack_UNT_to_USR(Unt_Num, result[1]));
} catch (error) {
	console.log('error in attack_if_adjacent');
	console.log(error);
}

};
const breed_if_adjacent = (Unt_Num, Unt_Adjacent_Y_And_X) => {
	// Unt_Adjacent_Y_And_Xに0以下か10以上が含まれていたら、その要素は削除する。例として
	// [[9, 3],[9, 5],[8, 4],[10, 4],]は[[9, 3],[9, 5],[8, 4],]となる
	// COLLECT_VALUE2は[0,0]から[9,9]までのため
	Unt_Adjacent_Y_And_X = Unt_Adjacent_Y_And_X.filter(V=>V[0]>=0 && V[0]<=9 && V[1]>=0 && V[1]<=9);
	// 隣接しているマスにUNTがいたらbreedする
	if(
		// 上下左右にUNTがいる場合はbreedする
		Unt_Adjacent_Y_And_X.some(V=>COLLECT_VALUE2[V[0]][V[1]][2]['TYPE'] === 'UNT')
	){
	const a = Unt_Adjacent_Y_And_X.filter(V=>COLLECT_VALUE2[V[0]][V[1]][2]['TYPE'] === 'UNT');
	const b = a.map(V=>COLLECT_VALUE2[V[0]][V[1]][2]['NAME'].replaceAll('UNT_', ''));
	const target_unit_num_ary = b.map(V=>Number(V));
	breed(Unt_Num, target_unit_num_ary);
	}
};
const make_move_position = (Unt_Position) => {
	return [
		[Unt_Position[0], Unt_Position[1] - 1],
		[Unt_Position[0], Unt_Position[1] + 1],
		[Unt_Position[0] - 1, Unt_Position[1]],
		[Unt_Position[0] + 1, Unt_Position[1]],
	];
};
const move_if_NON = (Unt_Num, Unt_Position, Move_Position) => {
	// Move_Positionに0以下か10以上が含まれていたら、その要素は削除する。例として
	// [[-1, 4],[0, 3],[0, 5],[1, 4],]は[[0, 3],[0, 5],[1, 4],]となる
	// COLLECT_VALUE2は[0,0]から[9,9]までのため
	Move_Position = Move_Position.filter(V=>V[0]>=0 && V[0]<=9 && V[1]>=0 && V[1]<=9);
	// 移動先のマスがNONの場合は移動する
	let shuffled_move_position = shuffle(Move_Position);
	for(let i=0; i<shuffled_move_position.length; i++){
		let Move_to = shuffled_move_position[i];
		// Move_toがNONの場合は移動し、早期リターンする
		if (COLLECT_VALUE2[Move_to[0]][Move_to[1]][2] === 'NON') {
			// UNTの位置をNONに変更する
			change_BLC_to_NON(Unt_Position[0], Unt_Position[1]);
			// 色も更新する
			COLLECT_VALUE2[Unt_Position[0]][Unt_Position[1]][3] = 'background-color: ' + color2 +';';
			// UNTの位置を更新する
			COLLECT_VALUE2[Move_to[0]][Move_to[1]][2] = UNT_DATA_OBJ['UNT_NUM_' + Unt_Num];
			// 色も更新する
			COLLECT_VALUE2[Move_to[0]][Move_to[1]][3] = 'background-color: ' + color1 +';'
			// 早期リターンする
			shuffled_move_position = [];
		}
	}
};
// key_press関数を実行した後に、UNTの行動を実行する関数。
// 隣接しているUSRがいたらアタックする
// USRが隣接していない場合はランダムに1マス移動する
// UNTの移動順はATKの値が高いUNTから順番に行動する。ATKが同値の場合はUNT_NUMが小さい方から行動する。
const UNT_ATTACK_OR_MOVE = (NAME) => {
try {
	const UNT_NUM = NAME ? Number(NAME.replaceAll('UNT_', '')) : 0;
	const unt_position = get_UNT_position(UNT_NUM);
	attack_if_adjacent(UNT_NUM, unt_position);//, usr_position_array);
	let UNT_ADJACENT_Y_AND_X = get_click_position(unt_position[0], unt_position[1], false);
	// UNT_ADJACENT_Y_AND_Xにundefinedが含まれていたら、undefinedが含まれた要素は削除する
	UNT_ADJACENT_Y_AND_X = UNT_ADJACENT_Y_AND_X.filter(V=>V!==undefined);
	breed_if_adjacent(UNT_NUM, UNT_ADJACENT_Y_AND_X);
	// 隣接しているマスにUSRがいない場合はランダムに1マス移動する
	// NONのマスには移動できる。BLCのマスには移動できない。GOLのマスには移動できない。
	// 移動先のマスを決定する
	const move_position = make_move_position(unt_position);
	move_if_NON(UNT_NUM, unt_position, move_position);
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
		reflect_USR_DATA();
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
		let all_NON = get_NON_Y_AND_X();
		// 以下のようにUNTを配置する
		Object.entries(UNT_DATA_OBJ).forEach((V, I) => {
			const UNT_NUM_N = 'UNT_NUM_' + (I).toString();
			const random_Y_AND_X = shuffle(all_NON)[0];

// random_Y_AND_Xをall_NONから削除する
	all_NON = all_NON.filter(V=>V!==random_Y_AND_X);
				COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][2] = UNT_DATA_OBJ[UNT_NUM_N];
				COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][3] = 'background-color: ' + color1 +';'
			});
	}
	set_UNT();
};

const get_all_USR_ID = () => USR_DATA_ARRAY.map((V, I) => V['ID']);


// アクティブのUSRの色を変更する関数
const change_CURRENT_USR_color = () => {
	const plot_x = CURRENT_Y_AND_X[CURRENT_USER_ID][0];
	const plot_y = CURRENT_Y_AND_X[CURRENT_USER_ID][1];
	COLLECT_VALUE2
		[plot_x][plot_y][3]
			= 'background-color: ' + color6 +';';
};
// マップを初期化してやり直す関数
// 起動時にも実行する
const reset_or_init_map = ({when_mounted_time=true, go_up=false, when_died=false}) => {
	// when_mounted_timeがfalseの時はconfirmでagainを表示する
	// againでない場合は早期リターンして、以降の処理はしない
	// if(when_mounted_time === false){
	// 	reset_or_init_map({when_mounted_time: true, go_up: false});
	// }

	// COLLECT_VALUE2を初期化する
	COLLECT_VALUE2 = R.xprod(R.range(0, 10), R.range(0, 10))
		.map(V=>V.concat(['BLC']))
		.map(V=>V.concat(['background-color: #808080']));
	COLLECT_VALUE2 = R.splitEvery(10, COLLECT_VALUE2);

	set_USR_to_init_position();

	// USRのスポーン位置にUSR_DATA_ARRAYを反映する
	// reflection_USR_DATA_ARRAY();

	DIED = '';
	if(when_mounted_time === false, go_up === false, when_died === true){

		get_all_USR_ID().forEach(Usr_Id=> recharge_magic_count(Usr_Id));

retry_data_setup();
GOLD = USR_DATA_ARRAY[0]['GOLD'];


	};
	UNT_DATA_OBJ = {
		UNT_NUM_0: {TYPE: 'UNT', NAME: 'UNT_0', LFP: 3, ATK: 1, BDP: 0, RBP: 0},
		UNT_NUM_1: {TYPE: 'UNT', NAME: 'UNT_1', LFP: 2, ATK: 2, BDP: 0, RBP: 0},
		UNT_NUM_2: {TYPE: 'UNT', NAME: 'UNT_2', LFP: 2, ATK: 3, BDP: 0, RBP: 0},
		UNT_NUM_3: {TYPE: 'UNT', NAME: 'UNT_3', LFP: 2, ATK: 4, BDP: 0, RBP: 0},
		UNT_NUM_4: {TYPE: 'UNT', NAME: 'UNT_4', LFP: 4, ATK: 1, BDP: 0, RBP: 0},
		UNT_NUM_5: {TYPE: 'UNT', NAME: 'UNT_5', LFP: 4, ATK: 2, BDP: 0, RBP: 0},
		UNT_NUM_6: {TYPE: 'UNT', NAME: 'UNT_6', LFP: 5, ATK: 1, BDP: 0, RBP: 0},
		UNT_NUM_7: {TYPE: 'UNT', NAME: 'UNT_7', LFP: 5, ATK: 2, BDP: 0, RBP: 0},
		UNT_NUM_8: {TYPE: 'UNT', NAME: 'UNT_8', LFP: 5, ATK: 3, BDP: 0, RBP: 0},
		UNT_NUM_9: {TYPE: 'UNT', NAME: 'UNT_9', LFP: 5, ATK: 4, BDP: 0, RBP: 0},
		UNT_NUM_10: {TYPE: 'UNT', NAME: 'UNT_10', LFP: 6, ATK: 1, BDP: 0, RBP: 0},
		UNT_NUM_11: {TYPE: 'UNT', NAME: 'UNT_11', LFP: 6, ATK: 2, BDP: 0, RBP: 0},
		UNT_NUM_12: {TYPE: 'UNT', NAME: 'UNT_12', LFP: 6, ATK: 3, BDP: 0, RBP: 0},
		UNT_NUM_13: {TYPE: 'UNT', NAME: 'UNT_13', LFP: 6, ATK: 4, BDP: 0, RBP: 0},
		UNT_NUM_14: {TYPE: 'UNT', NAME: 'UNT_14', LFP: 1, ATK: 1, BDP: 0, RBP: 0},
		UNT_NUM_15: {TYPE: 'UNT', NAME: 'UNT_15', LFP: 1, ATK: 2, BDP: 0, RBP: 0},
		UNT_NUM_16: {TYPE: 'UNT', NAME: 'UNT_16', LFP: 1, ATK: 3, BDP: 0, RBP: 0},
	};
	UNT_DATA_OBJ = {};
	let UNT_DATA_CONF = {};
	if(go_up===true){
		get_all_USR_ID().forEach(Usr_Id=> recharge_magic_count(Usr_Id));
		switch_field_gacha();
		get_all_USR_ID().forEach(Usr_Id=> USR_DATA_ARRAY[Usr_Id]['LFP'] += LFP_RECHARGE_NUM );
		
		FLOOR += 1;
		const FLOOR_plus_one = () => FLOOR + 1;
		const Table_Id = 0;
		const LFP_Range_Array_Min = FLOOR_plus_one() * LFP_ATK_Range_Array_Min_Max_Table[Table_Id]['LFP_Min'];
		const LFP_Range_Array_Max = FLOOR_plus_one() * LFP_ATK_Range_Array_Min_Max_Table[Table_Id]['LFP_Max'];
		const ATK_Range_Array_Min = FLOOR_plus_one() * LFP_ATK_Range_Array_Min_Max_Table[Table_Id]['ATK_Min'];
		const ATK_Range_Array_Max = FLOOR_plus_one() * LFP_ATK_Range_Array_Min_Max_Table[Table_Id]['ATK_Max'];
		console.log(ATK_Range_Array_Max);
		UNT_DATA_CONF = {
			Repeat_Array_Num: 1,
			Repeat_Array_Times: 20,
			LFP_Range_Array: [LFP_Range_Array_Min, LFP_Range_Array_Max],
			ATK_Range_Array: [ATK_Range_Array_Min, ATK_Range_Array_Max],
		}
	}
	UNT_DATA_OBJ = make_UNT_DATA_OBJ(UNT_DATA_CONF);

	// GOALを初期位置に戻す
	change_BLC_to_GOL(0, 9);

	// PICKELを初期化する
	PICKEL = 0;
	// GOALをfalseにする
	GOAL = false;
	// ADJACENT_Y_AND_Xを初期化する
	ADJACENT_Y_AND_X = [];
	// CURRENT_Y_AND_Xを初期化する
	CURRENT_Y_AND_X = clone_START_CURRENT_Y_AND_X_ARRAY();
	// BLCを30%をNONに変更する
	change_percent_BLC_to_NON();

	// バトルシステムの開発のために、初期位置の前後左右をNONに変更する
	COLLECT_VALUE2[5][4][2] = 'NON'; COLLECT_VALUE2[5][4][3] = 'background-color: ' + color2 +';';
	COLLECT_VALUE2[5][6][2] = 'NON'; COLLECT_VALUE2[5][6][3] = 'background-color: ' + color2 +';';
	COLLECT_VALUE2[4][5][2] = 'NON'; COLLECT_VALUE2[4][5][3] = 'background-color: ' + color2 +';';
	COLLECT_VALUE2[6][5][2] = 'NON'; COLLECT_VALUE2[6][5][3] = 'background-color: ' + color2 +';';

	COLLECT_VALUE2[5][3][2] = 'NON'; COLLECT_VALUE2[5][3][3] = 'background-color: ' + color2 +';';
	COLLECT_VALUE2[5][7][2] = 'NON'; COLLECT_VALUE2[5][7][3] = 'background-color: ' + color2 +';';
	COLLECT_VALUE2[3][5][2] = 'NON'; COLLECT_VALUE2[3][5][3] = 'background-color: ' + color2 +';';
	COLLECT_VALUE2[7][5][2] = 'NON'; COLLECT_VALUE2[7][5][3] = 'background-color: ' + color2 +';';

	change_UNT_to_NON();

	change_CURRENT_USR_color();
	
	document.addEventListener('keypress', ()=>click_or_keypress_event(
		event,
		{
			Key: null,
			Usr_Id: CURRENT_USER_ID,
			Magic: null,
			Eqp_I: null,
		}
	));
};

onMount(async () => {
	try {
		reset_or_init_map({when_mounted_time: true, go_up: false, when_died: false});
	} catch (error) {
		console.log(error);		
	}
});
</script>


<div class="container" bind:this={rootElement}>

<!-- fieldfieldfieldfieldfieldfield -->
<div class="field">

<div class="INDEX_1">
	<ul class="FLD">
		<!-- 上記のobjを#eachでレンダリングする -->
		{#each COLLECT_VALUE2 as item, Y}
			<li class="CELL1">
				{#each item as item2, X}
					<span class="CELL2" style={item2[3]} on:keydown={()=>get_click_position(Y, X, true)} on:click={()=>get_click_position(Y, X, true)}>□</span>
				{/each}
			</li>
		{/each}
	</ul>
</div>

<div class="INDEX_2">
	<!-- 上下左右のボタン(WASDに対応する) -->
	<div>
	<button class='WASD_NULL'>◾️</button>
	<button on:click={() => click_or_keypress_event(null, 
	{
	Key: 'w',
	Usr_Id: CURRENT_USER_ID,
	Magic: null,
	Eqp_I: null,
	}
	)} class='WASD'>W</button>
	<button class='WASD_NULL'>◾️</button>
	</div>
	<div>
	<button on:click={() => click_or_keypress_event(null,
	{
	Key: 'a',
	Usr_Id: CURRENT_USER_ID,
	Magic: null,
	Eqp_I: null,
	}
	)} class='WASD'>A</button>
	<button class='WASD_NULL'>◾️</button>
	<button on:click={() => click_or_keypress_event(null,
	{
	Key: 'd',
	Usr_Id: CURRENT_USER_ID,
	Magic: null,
	Eqp_I: null,
	}
	)} class='WASD'>D</button>
	</div>
	<div>
	<button class='WASD_NULL'>◾️</button>
	<button on:click={() => click_or_keypress_event(null,
	{
	Key: 's',
	Usr_Id: CURRENT_USER_ID,
	Magic: null,
	Eqp_I: null,
	}
	)} class='WASD'>S</button>
	<button class='WASD_NULL'>◾️</button>
	</div>
</div>















<!-- ERROR_MESSAGEを表示するdivタグ。クリックしたら非表示になる -->
<!-- <div> -->
	<!-- {#if ERROR_MESSAGE} -->
		<!-- <button on:click={remove_error_message}>remove_error_message</button> -->
	<!-- {/if} -->
<!-- </div> -->

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

<!-- SHOW_ALERTをON/OFFできるラジオ -->
<div>
	<fieldset>
	<span>SHOW_DAMAGE:</span>
	<span>
		<input type="radio" id="ON" name="SHOW_DAMAGE" value="ON" bind:group={SHOW_DAMAGE} />
		<label for="ON">ON</label>
	</span>
	<span>
		<input type="radio" id="OFF" name="SHOW_DAMAGE" value="OFF" bind:group={SHOW_DAMAGE} />
		<label for="OFF">OFF</label>
	</span>
	</fieldset>
</div>

{#if GOLD}
<div>
GOLD: {GOLD}
</div>
{/if}

<!-- FLOORを表示するdivタグ -->
<div>
	FLOOR: {FLOOR}
</div>

<!-- PICKELを表示するdivタグ -->
<div>
	PICKEL: {PICKEL}
</div>

<div>
	KILL_STREAK: {KILL_STREAK}
</div>












							<!-- switch_field_gachaボタン -->
							<!-- <button on:click={switch_field_gacha}>switch_field_gacha</button> -->
{#each USR_DATA_ARRAY as USR_DATA, EQP_I}
<div class="USR_DATA_span">
	{USR_DATA.NAME}
	LFP: {USR_DATA.LFP}
	ATK: {USR_DATA.ATK}
	{#each USR_DATA.EQP as EQP, EQP_I}
	<div>
		RARITY: {EQP.RARITY}
		LFP_BUFF: {EQP.LFP_BUFF}
		ATK_BUFF: {EQP.ATK_BUFF}
		{#if EQP}
		<div>
			<!-- {EQP_I} -->
			RARITY: {EQP.RARITY}
			LFP_BUFF: {EQP.LFP_BUFF}
			<!-- LFP_DEBUFF: {EQP.LFP_DEBUFF} -->
			ATK_BUFF: {EQP.ATK_BUFF}
			<!-- ATK_DEBUFF: {EQP.ATK_DEBUFF} -->
			<!-- EQP.MAGIC[0]['MAGIC_COUNT']が0以下の場合下記ブロックを非表示にする -->
			<div>
				{#if EQP.MAGIC[0]['MAGIC_COUNT'] >= 1}
				<button on:click={() => click_or_keypress_event(
					null,
					{
					Magic: EQP.MAGIC,
					Eqp_I: EQP_I,
					// Usr_Id: CURRENT_USER_ID,
					Usr_Id: USR_DATA['ID'],
					},
					)}>
				MAGIC
				</button>
				MAGIC_COUNT: {EQP.MAGIC[0]['MAGIC_COUNT']}
				<!-- MAGIC_RANGE: {EQP.MAGIC[1]} -->
					{#each EQP.MAGIC[1] as MAGIC_1, MAGIC_1_I}
					<div>
						{MAGIC_1}
					</div>
					{/each}
				{/if}
			</div>
		</div>
		{/if}
	</div>
	{/each}
</div>
{/each}


	<div>
		{#each Object.keys(UNT_DATA_OBJ) as key, IDX}
			<div id={UNT_DATA_OBJ[key].NAME} style={`background-color: ${color2};`} class='UNT_BACK'>
			{UNT_DATA_OBJ[key].NAME}
			LFP: {UNT_DATA_OBJ[key].LFP}
			ATK: {UNT_DATA_OBJ[key].ATK}
			GLD: {UNT_DATA_OBJ[key].GLD}
			BDP: {UNT_DATA_OBJ[key].BDP}
			RBP: {UNT_DATA_OBJ[key].RBP}
			</div>
		{/each}
	</div>

	<div>Ver 0.0.2.9</div>
	<a href="https://github.com/taroyanaka/game/">GitHub</a>

</div>
<!-- fieldfieldfieldfieldfieldfield -->





<!-- gachagachagachagachagachagacha -->
<div class="gacha">					
		<div>
		{#each USR_DATA_ARRAY as USR_DATA, USR_DATA_I}
		<div class="USR_DATA_span">
			{USR_DATA['NAME']}
			LFP: {USR_DATA['LFP']}
			ATK: {USR_DATA['ATK']}
			{#each USR_DATA['EQP'] as EQP, EQP_I}
				{#if EQP}
				<div>
					<!-- {EQP_I} -->
					RARITY: {EQP.RARITY}
					LFP_BUFF: {EQP.LFP_BUFF}
					<!-- LFP_DEBUFF: {EQP.LFP_DEBUFF} -->
					ATK_BUFF: {EQP.ATK_BUFF}
					<!-- ATK_DEBUFF: {EQP.ATK_DEBUFF} -->
						<!-- EQP.MAGIC[0]['MAGIC_COUNT']が0以下の場合下記ブロックを非表示にする -->
						<div>
							<button on:click={() => UN_EQP(EQP_I, 0)}>UN_EQP</button>
							MAGIC_COUNT: {EQP.MAGIC[0]['MAGIC_COUNT']}
							{#each EQP.MAGIC[1] as MAGIC_1, MAGIC_1_I}
								<div>
									{MAGIC_1}
								</div>
							{/each}
						</div>
				</div>
				{/if}
			{/each}
		</div>
		{/each}
		</div>

		<button on:click={() => slot_exe_once({Rate_Param: 1})}>slot_exe_once</button>
		<button on:click={() => slot_exe_once({Rate_Param: 4})}>x4_slot_exe_once</button>
		<button on:click={() => slot_exe_once({Rate_Param: 8})}>x8_slot_exe_once</button>
		<button on:click={next_field}>next_field</button>
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
				<span class="EQP_SPAN">MAGIC</span>
				<span class="EQP_SPAN">MAGIC_RANGE</span>
			</li>
			{#each MINE as EQP, EQP_I}
			<li>
				{#if EQP}
					<span class="EQP_SPAN">{EQP['RARITY']}</span>
					<span class="EQP_SPAN">{EQP['LFP_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['LFP_DEBUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_DEBUFF']}</span>

					<span class="EQP_SPAN">{EQP['MAGIC'][0]['MAGIC_COUNT']}</span>
					<span class="EQP_SPAN">{EQP['MAGIC'][1]}</span>
					
					{#each USR_DATA_ARRAY as USR_DATA, USR_DATA_I}
						<!-- set_EQPボタン -->
						<!-- NAME, EQP, LIMITが引数 -->
						<button on:click={() => set_EQP({
							Eqp: EQP,
							// Eqp_Limit: 5,
							Eqp_Index: EQP_I,
							// Usr_Id: 0,
							// Usr_Id: CURRENT_USER_ID,
							Usr_Id: USR_DATA_I,
						})}>set:{USR_DATA_I}</button>
					{/each}
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
				<span class="EQP_SPAN">MAGIC</span>
				<span class="EQP_SPAN">MAGIC_RANGE</span>
			</li>
			{#each SLOT3 as EQP, EQP_I}
			<li>
				{#if EQP}
					<span class="EQP_SPAN">{EQP['RARITY']}</span>
					<span class="EQP_SPAN">{EQP['LFP_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['LFP_DEBUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_BUFF']}</span>
					<span class="EQP_SPAN">{EQP['ATK_DEBUFF']}</span>
					<span class="EQP_SPAN">{EQP['MAGIC'][0]['MAGIC_COUNT']}</span>
					<span class="EQP_SPAN">{EQP['MAGIC'][1]}</span>
				{/if}
			</li>
			{/each}
		</ul>
	</div>
<!-- gachagachagachagachagachagacha -->
</div>
<style>
/* https://svelte.dev/repl/57f03a5268884c8080b286c95e9a7c52?version=4.2.0 */
:root {
	/* Gacha開発中はfieldをnoneをON/OFFして非表示にする */
	--field-none: 'block';
	--gacha-none: 'none';
}

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

.field {
	/* background-color: var(--col-1); */
	display: var(--field-none);
}
.gacha{
	display: var(--gacha-none);
}
.USR_DATA_span{
	display: inline-block;
	width: 15rem;
}
.FLD{
	/* width: 100vw; */
	/* height: 50vh; */
}
.CELL1{
	padding: 2vh 2vh;
}
.CELL2{
	padding: 2vh 2vh;
}
.WASD, .WASD_NULL{
	/* padding: 3vh 3vh; */
	/* WASDとWASD_NULLの幅はflexで画面いっぱいにする */
	width: 29vw;
	height: 20vh;

}
.WASD_NULL{
	/* 白かつ透明 */
	background-color: #FFFFFF;
	opacity: 0;
}
/* INDEX_1とINDEX_2をpositionで同じ位置に配置する */
.INDEX_1{
	position: absolute;
	top: 0;
	left: 0;
}
.INDEX_2{
	/* INDEX_2は相対位置で指定 */
	position: relative;
	top: 0;
	/* right: 0; */
	left: 0;
	/* 透過する */
	opacity: 0.3;
	/* INDEX_2の幅はflexで画面いっぱいにする */
	width: 90vw;
}
</style>