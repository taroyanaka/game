// import App from './App.svelte';
// import Gacha from './Gacha.svelte';

// const app = new App({
// 	// target: document.body,
// 	target: document.body,
// 	// props: {
// 	// 	name: 'Taro!!'
// 	// }
// });



// const gacha = new Gacha({
// 	target: document.body,
// });



// export { app, gacha };
// // export default app;
// // export default gacha;











import App from './App.svelte';


const app = new App({
	target: document.body,
	// props: {
	// 	name: 'Taro!!'
	// }
});


export default app;



import Iro from './Iro.svelte';
const iro = new Iro({
	target: document.body,
	// props: {
	// 	name: 'Taro!!'
	// }
});


export default Iro;
