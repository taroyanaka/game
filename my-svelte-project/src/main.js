import App from './App.svelte';

import Slot from './Slot.svelte';

const app = new App({
	target: document.body,
	// props: {
	// 	name: 'Taro!!'
	// }
});



const slot = new Slot({	target: document.body, });



// export { app, slot };
export default app;
// export default slot;