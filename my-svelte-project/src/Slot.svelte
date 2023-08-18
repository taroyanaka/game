<script>
import { onMount } from 'svelte';
// $: if(true) console.log('hello');

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


	// 任意のRARITYを任意の割合減らす関数
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
	console.log(random_SLOT3_KAKUHEN);
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
</script>





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




<style>
.EQP_SPAN{
	display: inline-block;
	width: 6.5rem;
}
</style>

