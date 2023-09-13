
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function init_binding_group(group) {
        let _inputs;
        return {
            /* push */ p(...inputs) {
                _inputs = inputs;
                _inputs.forEach(input => group.push(input));
            },
            /* remove */ r() {
                _inputs.forEach(input => group.splice(group.indexOf(input), 1));
            }
        };
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[90] = list[i];
    	child_ctx[92] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[90] = list[i];
    	child_ctx[92] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[90] = list[i];
    	child_ctx[92] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[95] = list[i];
    	child_ctx[97] = i;
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[98] = list[i];
    	child_ctx[100] = i;
    	return child_ctx;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[101] = list[i];
    	child_ctx[92] = i;
    	return child_ctx;
    }

    function get_each_context_6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[90] = list[i];
    	child_ctx[92] = i;
    	return child_ctx;
    }

    function get_each_context_7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[95] = list[i];
    	child_ctx[97] = i;
    	return child_ctx;
    }

    function get_each_context_8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[105] = list[i];
    	child_ctx[107] = i;
    	return child_ctx;
    }

    function get_each_context_9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[108] = list[i];
    	child_ctx[110] = i;
    	return child_ctx;
    }

    // (1419:7) {#if GOAL}
    function create_if_block_7(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "GOAL";
    			add_location(div, file, 1419, 8, 41551);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(1419:7) {#if GOAL}",
    		ctx
    	});

    	return block;
    }

    // (1425:7) {#if DIED}
    function create_if_block_6(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*DIED*/ ctx[13]);
    			add_location(div, file, 1425, 8, 41666);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*DIED*/ 8192) set_data_dev(t, /*DIED*/ ctx[13]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(1425:7) {#if DIED}",
    		ctx
    	});

    	return block;
    }

    // (1446:0) {#if GOLD}
    function create_if_block_5(ctx) {
    	let div;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("GOLD: ");
    			t1 = text(/*GOLD*/ ctx[8]);
    			add_location(div, file, 1446, 1, 42198);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*GOLD*/ 256) set_data_dev(t1, /*GOLD*/ ctx[8]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(1446:0) {#if GOLD}",
    		ctx
    	});

    	return block;
    }

    // (1470:10) {#each item as item2, X}
    function create_each_block_9(ctx) {
    	let span;
    	let t;
    	let span_style_value;
    	let mounted;
    	let dispose;

    	function keydown_handler() {
    		return /*keydown_handler*/ ctx[27](/*Y*/ ctx[107], /*X*/ ctx[110]);
    	}

    	function click_handler() {
    		return /*click_handler*/ ctx[28](/*Y*/ ctx[107], /*X*/ ctx[110]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text("□");
    			attr_dev(span, "style", span_style_value = /*item2*/ ctx[108][3]);
    			add_location(span, file, 1470, 11, 42632);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "keydown", keydown_handler, false, false, false, false),
    					listen_dev(span, "click", click_handler, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*COLLECT_VALUE2*/ 16384 && span_style_value !== (span_style_value = /*item2*/ ctx[108][3])) {
    				attr_dev(span, "style", span_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_9.name,
    		type: "each",
    		source: "(1470:10) {#each item as item2, X}",
    		ctx
    	});

    	return block;
    }

    // (1468:8) {#each COLLECT_VALUE2 as item, Y}
    function create_each_block_8(ctx) {
    	let li;
    	let t;
    	let each_value_9 = /*item*/ ctx[105];
    	validate_each_argument(each_value_9);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_9.length; i += 1) {
    		each_blocks[i] = create_each_block_9(get_each_context_9(ctx, each_value_9, i));
    	}

    	const block = {
    		c: function create() {
    			li = element("li");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(li, "class", "CELL");
    			add_location(li, file, 1468, 9, 42568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(li, null);
    				}
    			}

    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*COLLECT_VALUE2, get_click_position*/ 1064960) {
    				each_value_9 = /*item*/ ctx[105];
    				validate_each_argument(each_value_9);
    				let i;

    				for (i = 0; i < each_value_9.length; i += 1) {
    					const child_ctx = get_each_context_9(ctx, each_value_9, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_9(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(li, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_9.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_8.name,
    		type: "each",
    		source: "(1468:8) {#each COLLECT_VALUE2 as item, Y}",
    		ctx
    	});

    	return block;
    }

    // (1533:1) {#if EQP}
    function create_if_block_3(ctx) {
    	let div1;
    	let t0;
    	let t1_value = /*EQP*/ ctx[90].RARITY + "";
    	let t1;
    	let t2;
    	let t3_value = /*EQP*/ ctx[90].LFP_BUFF + "";
    	let t3;
    	let t4;
    	let t5_value = /*EQP*/ ctx[90].ATK_BUFF + "";
    	let t5;
    	let t6;
    	let div0;
    	let if_block = /*EQP*/ ctx[90].MAGIC[0]['MAGIC_COUNT'] >= 1 && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("RARITY: ");
    			t1 = text(t1_value);
    			t2 = text("\n\t\tLFP_BUFF: ");
    			t3 = text(t3_value);
    			t4 = text("\n\t\t\n\t\tATK_BUFF: ");
    			t5 = text(t5_value);
    			t6 = space();
    			div0 = element("div");
    			if (if_block) if_block.c();
    			add_location(div0, file, 1541, 2, 44366);
    			add_location(div1, file, 1533, 1, 44123);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, t5);
    			append_dev(div1, t6);
    			append_dev(div1, div0);
    			if (if_block) if_block.m(div0, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t1_value !== (t1_value = /*EQP*/ ctx[90].RARITY + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t3_value !== (t3_value = /*EQP*/ ctx[90].LFP_BUFF + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t5_value !== (t5_value = /*EQP*/ ctx[90].ATK_BUFF + "")) set_data_dev(t5, t5_value);

    			if (/*EQP*/ ctx[90].MAGIC[0]['MAGIC_COUNT'] >= 1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_4(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(1533:1) {#if EQP}",
    		ctx
    	});

    	return block;
    }

    // (1543:3) {#if EQP.MAGIC[0]['MAGIC_COUNT'] >= 1}
    function create_if_block_4(ctx) {
    	let button;
    	let t1;
    	let t2_value = /*EQP*/ ctx[90].MAGIC[0]['MAGIC_COUNT'] + "";
    	let t2;
    	let t3;
    	let each_1_anchor;
    	let mounted;
    	let dispose;

    	function click_handler_5() {
    		return /*click_handler_5*/ ctx[33](/*EQP*/ ctx[90], /*EQP_I*/ ctx[92], /*USR_DATA*/ ctx[101]);
    	}

    	let each_value_7 = /*EQP*/ ctx[90].MAGIC[1];
    	validate_each_argument(each_value_7);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_7.length; i += 1) {
    		each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "MAGIC";
    			t1 = text("\n\t\t\tMAGIC_COUNT: ");
    			t2 = text(t2_value);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			add_location(button, file, 1543, 3, 44417);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, t3, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_5, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t2_value !== (t2_value = /*EQP*/ ctx[90].MAGIC[0]['MAGIC_COUNT'] + "")) set_data_dev(t2, t2_value);

    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64) {
    				each_value_7 = /*EQP*/ ctx[90].MAGIC[1];
    				validate_each_argument(each_value_7);
    				let i;

    				for (i = 0; i < each_value_7.length; i += 1) {
    					const child_ctx = get_each_context_7(ctx, each_value_7, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_7(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_7.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(1543:3) {#if EQP.MAGIC[0]['MAGIC_COUNT'] >= 1}",
    		ctx
    	});

    	return block;
    }

    // (1557:4) {#each EQP.MAGIC[1] as MAGIC_1, MAGIC_1_I}
    function create_each_block_7(ctx) {
    	let div;
    	let t_value = /*MAGIC_1*/ ctx[95] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file, 1557, 4, 44757);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t_value !== (t_value = /*MAGIC_1*/ ctx[95] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_7.name,
    		type: "each",
    		source: "(1557:4) {#each EQP.MAGIC[1] as MAGIC_1, MAGIC_1_I}",
    		ctx
    	});

    	return block;
    }

    // (1528:0) {#each USR_DATA.EQP as EQP, EQP_I}
    function create_each_block_6(ctx) {
    	let div;
    	let t0;
    	let t1_value = /*EQP*/ ctx[90].RARITY + "";
    	let t1;
    	let t2;
    	let t3_value = /*EQP*/ ctx[90].LFP_BUFF + "";
    	let t3;
    	let t4;
    	let t5_value = /*EQP*/ ctx[90].ATK_BUFF + "";
    	let t5;
    	let t6;
    	let if_block = /*EQP*/ ctx[90] && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("RARITY: ");
    			t1 = text(t1_value);
    			t2 = text("\n\tLFP_BUFF: ");
    			t3 = text(t3_value);
    			t4 = text("\n\tATK_BUFF: ");
    			t5 = text(t5_value);
    			t6 = space();
    			if (if_block) if_block.c();
    			add_location(div, file, 1528, 0, 44031);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, t5);
    			append_dev(div, t6);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t1_value !== (t1_value = /*EQP*/ ctx[90].RARITY + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t3_value !== (t3_value = /*EQP*/ ctx[90].LFP_BUFF + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t5_value !== (t5_value = /*EQP*/ ctx[90].ATK_BUFF + "")) set_data_dev(t5, t5_value);

    			if (/*EQP*/ ctx[90]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_6.name,
    		type: "each",
    		source: "(1528:0) {#each USR_DATA.EQP as EQP, EQP_I}",
    		ctx
    	});

    	return block;
    }

    // (1524:0) {#each USR_DATA_ARRAY as USR_DATA, EQP_I}
    function create_each_block_5(ctx) {
    	let t0_value = /*USR_DATA*/ ctx[101].NAME + "";
    	let t0;
    	let t1;
    	let t2_value = /*USR_DATA*/ ctx[101].LFP + "";
    	let t2;
    	let t3;
    	let t4_value = /*USR_DATA*/ ctx[101].ATK + "";
    	let t4;
    	let t5;
    	let each_1_anchor;
    	let each_value_6 = /*USR_DATA*/ ctx[101].EQP;
    	validate_each_argument(each_value_6);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_6.length; i += 1) {
    		each_blocks[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = text("\nLFP: ");
    			t2 = text(t2_value);
    			t3 = text("\nATK: ");
    			t4 = text(t4_value);
    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, t5, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t0_value !== (t0_value = /*USR_DATA*/ ctx[101].NAME + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t2_value !== (t2_value = /*USR_DATA*/ ctx[101].LFP + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t4_value !== (t4_value = /*USR_DATA*/ ctx[101].ATK + "")) set_data_dev(t4, t4_value);

    			if (dirty[0] & /*USR_DATA_ARRAY, click_or_keypress_event*/ 2097216) {
    				each_value_6 = /*USR_DATA*/ ctx[101].EQP;
    				validate_each_argument(each_value_6);
    				let i;

    				for (i = 0; i < each_value_6.length; i += 1) {
    					const child_ctx = get_each_context_6(ctx, each_value_6, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_6.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(t5);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(1524:0) {#each USR_DATA_ARRAY as USR_DATA, EQP_I}",
    		ctx
    	});

    	return block;
    }

    // (1572:8) {#each Object.keys(UNT_DATA_OBJ) as key, IDX}
    function create_each_block_4(ctx) {
    	let div;
    	let t0_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].NAME + "";
    	let t0;
    	let t1;
    	let t2_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].LFP + "";
    	let t2;
    	let t3;
    	let t4_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].ATK + "";
    	let t4;
    	let t5;
    	let t6_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].GLD + "";
    	let t6;
    	let t7;
    	let t8_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].BDP + "";
    	let t8;
    	let t9;
    	let t10_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].RBP + "";
    	let t10;
    	let t11;
    	let div_id_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text("\n\t\t\t\t\t\t\t\t\tLFP: ");
    			t2 = text(t2_value);
    			t3 = text("\n\t\t\t\t\t\t\t\t\tATK: ");
    			t4 = text(t4_value);
    			t5 = text("\n\t\t\t\t\t\t\t\t\tGLD: ");
    			t6 = text(t6_value);
    			t7 = text("\n\t\t\t\t\t\t\t\t\tBDP: ");
    			t8 = text(t8_value);
    			t9 = text("\n\t\t\t\t\t\t\t\t\tRBP: ");
    			t10 = text(t10_value);
    			t11 = space();
    			attr_dev(div, "id", div_id_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].NAME);
    			set_style(div, "background-color", "#FFFFFF");
    			attr_dev(div, "class", "UNT_BACK");
    			add_location(div, file, 1572, 9, 44935);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, t5);
    			append_dev(div, t6);
    			append_dev(div, t7);
    			append_dev(div, t8);
    			append_dev(div, t9);
    			append_dev(div, t10);
    			append_dev(div, t11);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && t0_value !== (t0_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].NAME + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && t2_value !== (t2_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].LFP + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && t4_value !== (t4_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].ATK + "")) set_data_dev(t4, t4_value);
    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && t6_value !== (t6_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].GLD + "")) set_data_dev(t6, t6_value);
    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && t8_value !== (t8_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].BDP + "")) set_data_dev(t8, t8_value);
    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && t10_value !== (t10_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].RBP + "")) set_data_dev(t10, t10_value);

    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128 && div_id_value !== (div_id_value = /*UNT_DATA_OBJ*/ ctx[7][/*key*/ ctx[98]].NAME)) {
    				attr_dev(div, "id", div_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(1572:8) {#each Object.keys(UNT_DATA_OBJ) as key, IDX}",
    		ctx
    	});

    	return block;
    }

    // (1601:4) {#if EQP}
    function create_if_block_2(ctx) {
    	let div1;
    	let t0;
    	let t1_value = /*EQP*/ ctx[90].RARITY + "";
    	let t1;
    	let t2;
    	let t3_value = /*EQP*/ ctx[90].LFP_BUFF + "";
    	let t3;
    	let t4;
    	let t5_value = /*EQP*/ ctx[90].ATK_BUFF + "";
    	let t5;
    	let t6;
    	let div0;
    	let button;
    	let t8;
    	let t9_value = /*EQP*/ ctx[90].MAGIC[0]['MAGIC_COUNT'] + "";
    	let t9;
    	let t10;
    	let t11;
    	let mounted;
    	let dispose;

    	function click_handler_6() {
    		return /*click_handler_6*/ ctx[34](/*EQP_I*/ ctx[92]);
    	}

    	let each_value_3 = /*EQP*/ ctx[90].MAGIC[1];
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("RARITY: ");
    			t1 = text(t1_value);
    			t2 = text("\n\t\t\t\t\tLFP_BUFF: ");
    			t3 = text(t3_value);
    			t4 = text("\n\t\t\t\t\t\n\t\t\t\t\tATK_BUFF: ");
    			t5 = text(t5_value);
    			t6 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "UN_EQP";
    			t8 = text("\n\t\t\t\t\t\t\tMAGIC_COUNT: ");
    			t9 = text(t9_value);
    			t10 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t11 = space();
    			add_location(button, file, 1610, 0, 45944);
    			add_location(div0, file, 1609, 6, 45938);
    			add_location(div1, file, 1601, 4, 45669);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, t5);
    			append_dev(div1, t6);
    			append_dev(div1, div0);
    			append_dev(div0, button);
    			append_dev(div0, t8);
    			append_dev(div0, t9);
    			append_dev(div0, t10);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			append_dev(div1, t11);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_6, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t1_value !== (t1_value = /*EQP*/ ctx[90].RARITY + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t3_value !== (t3_value = /*EQP*/ ctx[90].LFP_BUFF + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t5_value !== (t5_value = /*EQP*/ ctx[90].ATK_BUFF + "")) set_data_dev(t5, t5_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t9_value !== (t9_value = /*EQP*/ ctx[90].MAGIC[0]['MAGIC_COUNT'] + "")) set_data_dev(t9, t9_value);

    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64) {
    				each_value_3 = /*EQP*/ ctx[90].MAGIC[1];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(1601:4) {#if EQP}",
    		ctx
    	});

    	return block;
    }

    // (1613:7) {#each EQP.MAGIC[1] as MAGIC_1, MAGIC_1_I}
    function create_each_block_3(ctx) {
    	let div;
    	let t0_value = /*MAGIC_1*/ ctx[95] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			add_location(div, file, 1613, 8, 46110);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t0_value !== (t0_value = /*MAGIC_1*/ ctx[95] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(1613:7) {#each EQP.MAGIC[1] as MAGIC_1, MAGIC_1_I}",
    		ctx
    	});

    	return block;
    }

    // (1600:3) {#each USR_DATA_ARRAY[0].EQP as EQP, EQP_I}
    function create_each_block_2(ctx) {
    	let if_block_anchor;
    	let if_block = /*EQP*/ ctx[90] && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*EQP*/ ctx[90]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(1600:3) {#each USR_DATA_ARRAY[0].EQP as EQP, EQP_I}",
    		ctx
    	});

    	return block;
    }

    // (1644:4) {#if EQP}
    function create_if_block_1(ctx) {
    	let span0;
    	let t0_value = /*EQP*/ ctx[90]['RARITY'] + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*EQP*/ ctx[90]['LFP_BUFF'] + "";
    	let t2;
    	let t3;
    	let span2;
    	let t4_value = /*EQP*/ ctx[90]['LFP_DEBUFF'] + "";
    	let t4;
    	let t5;
    	let span3;
    	let t6_value = /*EQP*/ ctx[90]['ATK_BUFF'] + "";
    	let t6;
    	let t7;
    	let span4;
    	let t8_value = /*EQP*/ ctx[90]['ATK_DEBUFF'] + "";
    	let t8;
    	let t9;
    	let span5;
    	let t10_value = /*EQP*/ ctx[90]['MAGIC'][0]['MAGIC_COUNT'] + "";
    	let t10;
    	let t11;
    	let span6;
    	let t12_value = /*EQP*/ ctx[90]['MAGIC'][1] + "";
    	let t12;
    	let t13;
    	let button;
    	let mounted;
    	let dispose;

    	function click_handler_10() {
    		return /*click_handler_10*/ ctx[38](/*EQP*/ ctx[90], /*EQP_I*/ ctx[92]);
    	}

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			span2 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			span3 = element("span");
    			t6 = text(t6_value);
    			t7 = space();
    			span4 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			span5 = element("span");
    			t10 = text(t10_value);
    			t11 = space();
    			span6 = element("span");
    			t12 = text(t12_value);
    			t13 = space();
    			button = element("button");
    			button.textContent = "set_EQP";
    			attr_dev(span0, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span0, file, 1644, 5, 46996);
    			attr_dev(span1, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span1, file, 1645, 5, 47047);
    			attr_dev(span2, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span2, file, 1646, 5, 47100);
    			attr_dev(span3, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span3, file, 1647, 5, 47155);
    			attr_dev(span4, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span4, file, 1648, 5, 47208);
    			attr_dev(span5, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span5, file, 1650, 5, 47264);
    			attr_dev(span6, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span6, file, 1651, 5, 47332);
    			add_location(button, file, 1654, 5, 47444);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, span2, anchor);
    			append_dev(span2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, span3, anchor);
    			append_dev(span3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, span4, anchor);
    			append_dev(span4, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, span5, anchor);
    			append_dev(span5, t10);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, span6, anchor);
    			append_dev(span6, t12);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_10, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*MINE*/ 2 && t0_value !== (t0_value = /*EQP*/ ctx[90]['RARITY'] + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*MINE*/ 2 && t2_value !== (t2_value = /*EQP*/ ctx[90]['LFP_BUFF'] + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*MINE*/ 2 && t4_value !== (t4_value = /*EQP*/ ctx[90]['LFP_DEBUFF'] + "")) set_data_dev(t4, t4_value);
    			if (dirty[0] & /*MINE*/ 2 && t6_value !== (t6_value = /*EQP*/ ctx[90]['ATK_BUFF'] + "")) set_data_dev(t6, t6_value);
    			if (dirty[0] & /*MINE*/ 2 && t8_value !== (t8_value = /*EQP*/ ctx[90]['ATK_DEBUFF'] + "")) set_data_dev(t8, t8_value);
    			if (dirty[0] & /*MINE*/ 2 && t10_value !== (t10_value = /*EQP*/ ctx[90]['MAGIC'][0]['MAGIC_COUNT'] + "")) set_data_dev(t10, t10_value);
    			if (dirty[0] & /*MINE*/ 2 && t12_value !== (t12_value = /*EQP*/ ctx[90]['MAGIC'][1] + "")) set_data_dev(t12, t12_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(span2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(span3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(span4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(span5);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(span6);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(1644:4) {#if EQP}",
    		ctx
    	});

    	return block;
    }

    // (1642:3) {#each MINE as EQP, EQP_I}
    function create_each_block_1(ctx) {
    	let li;
    	let t;
    	let if_block = /*EQP*/ ctx[90] && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (if_block) if_block.c();
    			t = space();
    			add_location(li, file, 1642, 3, 46972);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if (if_block) if_block.m(li, null);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (/*EQP*/ ctx[90]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(li, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(1642:3) {#each MINE as EQP, EQP_I}",
    		ctx
    	});

    	return block;
    }

    // (1678:4) {#if EQP}
    function create_if_block(ctx) {
    	let span0;
    	let t0_value = /*EQP*/ ctx[90]['RARITY'] + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*EQP*/ ctx[90]['LFP_BUFF'] + "";
    	let t2;
    	let t3;
    	let span2;
    	let t4_value = /*EQP*/ ctx[90]['LFP_DEBUFF'] + "";
    	let t4;
    	let t5;
    	let span3;
    	let t6_value = /*EQP*/ ctx[90]['ATK_BUFF'] + "";
    	let t6;
    	let t7;
    	let span4;
    	let t8_value = /*EQP*/ ctx[90]['ATK_DEBUFF'] + "";
    	let t8;
    	let t9;
    	let span5;
    	let t10_value = /*EQP*/ ctx[90]['MAGIC'][0]['MAGIC_COUNT'] + "";
    	let t10;
    	let t11;
    	let span6;
    	let t12_value = /*EQP*/ ctx[90]['MAGIC'][1] + "";
    	let t12;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			span2 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			span3 = element("span");
    			t6 = text(t6_value);
    			t7 = space();
    			span4 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			span5 = element("span");
    			t10 = text(t10_value);
    			t11 = space();
    			span6 = element("span");
    			t12 = text(t12_value);
    			attr_dev(span0, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span0, file, 1678, 5, 48041);
    			attr_dev(span1, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span1, file, 1679, 5, 48092);
    			attr_dev(span2, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span2, file, 1680, 5, 48145);
    			attr_dev(span3, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span3, file, 1681, 5, 48200);
    			attr_dev(span4, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span4, file, 1682, 5, 48253);
    			attr_dev(span5, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span5, file, 1683, 5, 48308);
    			attr_dev(span6, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span6, file, 1684, 5, 48376);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, span2, anchor);
    			append_dev(span2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, span3, anchor);
    			append_dev(span3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, span4, anchor);
    			append_dev(span4, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, span5, anchor);
    			append_dev(span5, t10);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, span6, anchor);
    			append_dev(span6, t12);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*SLOT3*/ 32768 && t0_value !== (t0_value = /*EQP*/ ctx[90]['RARITY'] + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*SLOT3*/ 32768 && t2_value !== (t2_value = /*EQP*/ ctx[90]['LFP_BUFF'] + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*SLOT3*/ 32768 && t4_value !== (t4_value = /*EQP*/ ctx[90]['LFP_DEBUFF'] + "")) set_data_dev(t4, t4_value);
    			if (dirty[0] & /*SLOT3*/ 32768 && t6_value !== (t6_value = /*EQP*/ ctx[90]['ATK_BUFF'] + "")) set_data_dev(t6, t6_value);
    			if (dirty[0] & /*SLOT3*/ 32768 && t8_value !== (t8_value = /*EQP*/ ctx[90]['ATK_DEBUFF'] + "")) set_data_dev(t8, t8_value);
    			if (dirty[0] & /*SLOT3*/ 32768 && t10_value !== (t10_value = /*EQP*/ ctx[90]['MAGIC'][0]['MAGIC_COUNT'] + "")) set_data_dev(t10, t10_value);
    			if (dirty[0] & /*SLOT3*/ 32768 && t12_value !== (t12_value = /*EQP*/ ctx[90]['MAGIC'][1] + "")) set_data_dev(t12, t12_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(span2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(span3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(span4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(span5);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(span6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(1678:4) {#if EQP}",
    		ctx
    	});

    	return block;
    }

    // (1676:3) {#each SLOT3 as EQP, EQP_I}
    function create_each_block(ctx) {
    	let li;
    	let t;
    	let if_block = /*EQP*/ ctx[90] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (if_block) if_block.c();
    			t = space();
    			add_location(li, file, 1676, 3, 48017);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if (if_block) if_block.m(li, null);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (/*EQP*/ ctx[90]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(li, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(1676:3) {#each SLOT3 as EQP, EQP_I}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div13;
    	let div9;
    	let t0;
    	let t1;
    	let div0;
    	let fieldset;
    	let span0;
    	let t3;
    	let span1;
    	let input0;
    	let t4;
    	let label0;
    	let t6;
    	let span2;
    	let input1;
    	let t7;
    	let label1;
    	let t9;
    	let t10;
    	let div1;
    	let t11;
    	let t12;
    	let t13;
    	let div2;
    	let t14;
    	let t15;
    	let t16;
    	let div3;
    	let t17;
    	let t18;
    	let t19;
    	let ul0;
    	let t20;
    	let div4;
    	let button0;
    	let t22;
    	let button1;
    	let t24;
    	let button2;
    	let t26;
    	let div5;
    	let button3;
    	let t28;
    	let button4;
    	let t30;
    	let button5;
    	let t32;
    	let div6;
    	let button6;
    	let t34;
    	let button7;
    	let t36;
    	let button8;
    	let t38;
    	let t39;
    	let div7;
    	let t40;
    	let div8;
    	let t42;
    	let a;
    	let t44;
    	let div12;
    	let div10;
    	let t45_value = /*USR_DATA_ARRAY*/ ctx[6][0].NAME + "";
    	let t45;
    	let t46;
    	let t47_value = /*USR_DATA_ARRAY*/ ctx[6][0].LFP + "";
    	let t47;
    	let t48;
    	let t49_value = /*USR_DATA_ARRAY*/ ctx[6][0].ATK + "";
    	let t49;
    	let t50;
    	let t51;
    	let button9;
    	let t53;
    	let button10;
    	let t55;
    	let button11;
    	let t57;
    	let button12;
    	let t59;
    	let div11;
    	let t61;
    	let t62;
    	let t63;
    	let t64;
    	let t65;
    	let t66;
    	let t67;
    	let ul1;
    	let li0;
    	let span3;
    	let t69;
    	let span4;
    	let t71;
    	let span5;
    	let t73;
    	let span6;
    	let t75;
    	let span7;
    	let t77;
    	let span8;
    	let t79;
    	let span9;
    	let t81;
    	let t82;
    	let ul2;
    	let li1;
    	let span10;
    	let t84;
    	let span11;
    	let t86;
    	let span12;
    	let t88;
    	let span13;
    	let t90;
    	let span14;
    	let t92;
    	let span15;
    	let t94;
    	let span16;
    	let t96;
    	let binding_group;
    	let mounted;
    	let dispose;
    	let if_block0 = /*GOAL*/ ctx[12] && create_if_block_7(ctx);
    	let if_block1 = /*DIED*/ ctx[13] && create_if_block_6(ctx);
    	let if_block2 = /*GOLD*/ ctx[8] && create_if_block_5(ctx);
    	let each_value_8 = /*COLLECT_VALUE2*/ ctx[14];
    	validate_each_argument(each_value_8);
    	let each_blocks_5 = [];

    	for (let i = 0; i < each_value_8.length; i += 1) {
    		each_blocks_5[i] = create_each_block_8(get_each_context_8(ctx, each_value_8, i));
    	}

    	let each_value_5 = /*USR_DATA_ARRAY*/ ctx[6];
    	validate_each_argument(each_value_5);
    	let each_blocks_4 = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks_4[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	let each_value_4 = Object.keys(/*UNT_DATA_OBJ*/ ctx[7]);
    	validate_each_argument(each_value_4);
    	let each_blocks_3 = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks_3[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	let each_value_2 = /*USR_DATA_ARRAY*/ ctx[6][0].EQP;
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*MINE*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*SLOT3*/ ctx[15];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[25][0]);

    	const block = {
    		c: function create() {
    			div13 = element("div");
    			div9 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			div0 = element("div");
    			fieldset = element("fieldset");
    			span0 = element("span");
    			span0.textContent = "SHOW_DAMAGE:";
    			t3 = space();
    			span1 = element("span");
    			input0 = element("input");
    			t4 = space();
    			label0 = element("label");
    			label0.textContent = "ON";
    			t6 = space();
    			span2 = element("span");
    			input1 = element("input");
    			t7 = space();
    			label1 = element("label");
    			label1.textContent = "OFF";
    			t9 = space();
    			if (if_block2) if_block2.c();
    			t10 = space();
    			div1 = element("div");
    			t11 = text("FLOOR: ");
    			t12 = text(/*FLOOR*/ ctx[4]);
    			t13 = space();
    			div2 = element("div");
    			t14 = text("PICKEL: ");
    			t15 = text(/*PICKEL*/ ctx[11]);
    			t16 = space();
    			div3 = element("div");
    			t17 = text("KILL_STREAK: ");
    			t18 = text(/*KILL_STREAK*/ ctx[3]);
    			t19 = space();
    			ul0 = element("ul");

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				each_blocks_5[i].c();
    			}

    			t20 = space();
    			div4 = element("div");
    			button0 = element("button");
    			button0.textContent = "◾️";
    			t22 = space();
    			button1 = element("button");
    			button1.textContent = "W";
    			t24 = space();
    			button2 = element("button");
    			button2.textContent = "◾️";
    			t26 = space();
    			div5 = element("div");
    			button3 = element("button");
    			button3.textContent = "A";
    			t28 = space();
    			button4 = element("button");
    			button4.textContent = "◾️";
    			t30 = space();
    			button5 = element("button");
    			button5.textContent = "D";
    			t32 = space();
    			div6 = element("div");
    			button6 = element("button");
    			button6.textContent = "◾️";
    			t34 = space();
    			button7 = element("button");
    			button7.textContent = "S";
    			t36 = space();
    			button8 = element("button");
    			button8.textContent = "◾️";
    			t38 = space();

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].c();
    			}

    			t39 = space();
    			div7 = element("div");

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				each_blocks_3[i].c();
    			}

    			t40 = space();
    			div8 = element("div");
    			div8.textContent = "Ver 0.0.2.9";
    			t42 = space();
    			a = element("a");
    			a.textContent = "GitHub";
    			t44 = space();
    			div12 = element("div");
    			div10 = element("div");
    			t45 = text(t45_value);
    			t46 = text("\n\t\t\tLFP: ");
    			t47 = text(t47_value);
    			t48 = text("\n\t\t\tATK: ");
    			t49 = text(t49_value);
    			t50 = space();

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t51 = space();
    			button9 = element("button");
    			button9.textContent = "slot_exe_once";
    			t53 = space();
    			button10 = element("button");
    			button10.textContent = "x4_slot_exe_once";
    			t55 = space();
    			button11 = element("button");
    			button11.textContent = "x8_slot_exe_once";
    			t57 = space();
    			button12 = element("button");
    			button12.textContent = "next_field";
    			t59 = space();
    			div11 = element("div");
    			div11.textContent = "MINE";
    			t61 = text("\n\t\tGOLD: ");
    			t62 = text(/*GOLD*/ ctx[8]);
    			t63 = text("\n\t\tKAKUHEN: ");
    			t64 = text(/*KAKUHEN*/ ctx[9]);
    			t65 = text("\n\t\tKAKUHEN_COUNTER: ");
    			t66 = text(/*KAKUHEN_COUNTER*/ ctx[10]);
    			t67 = space();
    			ul1 = element("ul");
    			li0 = element("li");
    			span3 = element("span");
    			span3.textContent = "RARITY";
    			t69 = space();
    			span4 = element("span");
    			span4.textContent = "LFP_BUFF";
    			t71 = space();
    			span5 = element("span");
    			span5.textContent = "LFP_DEBUFF";
    			t73 = space();
    			span6 = element("span");
    			span6.textContent = "ATK_BUFF";
    			t75 = space();
    			span7 = element("span");
    			span7.textContent = "ATK_DEBUFF";
    			t77 = space();
    			span8 = element("span");
    			span8.textContent = "MAGIC";
    			t79 = space();
    			span9 = element("span");
    			span9.textContent = "MAGIC_RANGE";
    			t81 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t82 = space();
    			ul2 = element("ul");
    			li1 = element("li");
    			span10 = element("span");
    			span10.textContent = "RARITY";
    			t84 = space();
    			span11 = element("span");
    			span11.textContent = "LFP_BUFF";
    			t86 = space();
    			span12 = element("span");
    			span12.textContent = "LFP_DEBUFF";
    			t88 = space();
    			span13 = element("span");
    			span13.textContent = "ATK_BUFF";
    			t90 = space();
    			span14 = element("span");
    			span14.textContent = "ATK_DEBUFF";
    			t92 = space();
    			span15 = element("span");
    			span15.textContent = "MAGIC";
    			t94 = space();
    			span16 = element("span");
    			span16.textContent = "MAGIC_RANGE";
    			t96 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(span0, file, 1433, 8, 41797);
    			attr_dev(input0, "type", "radio");
    			attr_dev(input0, "id", "ON");
    			attr_dev(input0, "name", "SHOW_DAMAGE");
    			input0.__value = "ON";
    			input0.value = input0.__value;
    			add_location(input0, file, 1435, 9, 41847);
    			attr_dev(label0, "for", "ON");
    			add_location(label0, file, 1436, 9, 41942);
    			add_location(span1, file, 1434, 8, 41831);
    			attr_dev(input1, "type", "radio");
    			attr_dev(input1, "id", "OFF");
    			attr_dev(input1, "name", "SHOW_DAMAGE");
    			input1.__value = "OFF";
    			input1.value = input1.__value;
    			add_location(input1, file, 1439, 9, 42009);
    			attr_dev(label1, "for", "OFF");
    			add_location(label1, file, 1440, 9, 42106);
    			add_location(span2, file, 1438, 8, 41993);
    			add_location(fieldset, file, 1432, 8, 41778);
    			add_location(div0, file, 1431, 7, 41764);
    			add_location(div1, file, 1452, 7, 42273);
    			add_location(div2, file, 1457, 7, 42357);
    			add_location(div3, file, 1461, 7, 42410);
    			add_location(ul0, file, 1465, 7, 42473);
    			attr_dev(button0, "class", "WASD_NULL svelte-13xlxpl");
    			add_location(button0, file, 1478, 8, 42878);
    			attr_dev(button1, "class", "WASD svelte-13xlxpl");
    			add_location(button1, file, 1479, 0, 42916);
    			attr_dev(button2, "class", "WASD_NULL svelte-13xlxpl");
    			add_location(button2, file, 1487, 8, 43077);
    			add_location(div4, file, 1477, 7, 42864);
    			attr_dev(button3, "class", "WASD svelte-13xlxpl");
    			add_location(button3, file, 1490, 0, 43142);
    			attr_dev(button4, "class", "WASD_NULL svelte-13xlxpl");
    			add_location(button4, file, 1498, 8, 43302);
    			attr_dev(button5, "class", "WASD svelte-13xlxpl");
    			add_location(button5, file, 1499, 0, 43340);
    			add_location(div5, file, 1489, 7, 43136);
    			attr_dev(button6, "class", "WASD_NULL svelte-13xlxpl");
    			add_location(button6, file, 1509, 8, 43527);
    			attr_dev(button7, "class", "WASD svelte-13xlxpl");
    			add_location(button7, file, 1510, 0, 43565);
    			attr_dev(button8, "class", "WASD_NULL svelte-13xlxpl");
    			add_location(button8, file, 1518, 8, 43725);
    			add_location(div6, file, 1508, 7, 43513);
    			add_location(div7, file, 1570, 7, 44866);
    			add_location(div8, file, 1583, 7, 45299);
    			attr_dev(a, "href", "https://github.com/taroyanaka/game/");
    			add_location(a, file, 1584, 7, 45329);
    			attr_dev(div9, "class", "field svelte-13xlxpl");
    			add_location(div9, file, 1409, 0, 41218);
    			add_location(div10, file, 1595, 2, 45506);
    			add_location(button9, file, 1623, 2, 46222);
    			add_location(button10, file, 1624, 2, 46303);
    			add_location(button11, file, 1625, 2, 46387);
    			add_location(button12, file, 1626, 2, 46471);
    			add_location(div11, file, 1627, 2, 46523);
    			attr_dev(span3, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span3, file, 1633, 4, 46631);
    			attr_dev(span4, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span4, file, 1634, 4, 46672);
    			attr_dev(span5, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span5, file, 1635, 4, 46715);
    			attr_dev(span6, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span6, file, 1636, 4, 46760);
    			attr_dev(span7, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span7, file, 1637, 4, 46803);
    			attr_dev(span8, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span8, file, 1638, 4, 46848);
    			attr_dev(span9, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span9, file, 1639, 4, 46888);
    			add_location(li0, file, 1632, 3, 46622);
    			add_location(ul1, file, 1631, 2, 46614);
    			attr_dev(span10, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span10, file, 1667, 4, 47675);
    			attr_dev(span11, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span11, file, 1668, 4, 47716);
    			attr_dev(span12, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span12, file, 1669, 4, 47759);
    			attr_dev(span13, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span13, file, 1670, 4, 47804);
    			attr_dev(span14, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span14, file, 1671, 4, 47847);
    			attr_dev(span15, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span15, file, 1672, 4, 47892);
    			attr_dev(span16, "class", "EQP_SPAN svelte-13xlxpl");
    			add_location(span16, file, 1673, 4, 47932);
    			add_location(li1, file, 1666, 3, 47666);
    			add_location(ul2, file, 1665, 2, 47658);
    			attr_dev(div12, "class", "gacha svelte-13xlxpl");
    			add_location(div12, file, 1594, 0, 45479);
    			attr_dev(div13, "class", "container");
    			add_location(div13, file, 1406, 0, 41129);
    			binding_group.p(input0, input1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div13, anchor);
    			append_dev(div13, div9);
    			if (if_block0) if_block0.m(div9, null);
    			append_dev(div9, t0);
    			if (if_block1) if_block1.m(div9, null);
    			append_dev(div9, t1);
    			append_dev(div9, div0);
    			append_dev(div0, fieldset);
    			append_dev(fieldset, span0);
    			append_dev(fieldset, t3);
    			append_dev(fieldset, span1);
    			append_dev(span1, input0);
    			input0.checked = input0.__value === /*SHOW_DAMAGE*/ ctx[5];
    			append_dev(span1, t4);
    			append_dev(span1, label0);
    			append_dev(fieldset, t6);
    			append_dev(fieldset, span2);
    			append_dev(span2, input1);
    			input1.checked = input1.__value === /*SHOW_DAMAGE*/ ctx[5];
    			append_dev(span2, t7);
    			append_dev(span2, label1);
    			append_dev(div9, t9);
    			if (if_block2) if_block2.m(div9, null);
    			append_dev(div9, t10);
    			append_dev(div9, div1);
    			append_dev(div1, t11);
    			append_dev(div1, t12);
    			append_dev(div9, t13);
    			append_dev(div9, div2);
    			append_dev(div2, t14);
    			append_dev(div2, t15);
    			append_dev(div9, t16);
    			append_dev(div9, div3);
    			append_dev(div3, t17);
    			append_dev(div3, t18);
    			append_dev(div9, t19);
    			append_dev(div9, ul0);

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				if (each_blocks_5[i]) {
    					each_blocks_5[i].m(ul0, null);
    				}
    			}

    			append_dev(div9, t20);
    			append_dev(div9, div4);
    			append_dev(div4, button0);
    			append_dev(div4, t22);
    			append_dev(div4, button1);
    			append_dev(div4, t24);
    			append_dev(div4, button2);
    			append_dev(div9, t26);
    			append_dev(div9, div5);
    			append_dev(div5, button3);
    			append_dev(div5, t28);
    			append_dev(div5, button4);
    			append_dev(div5, t30);
    			append_dev(div5, button5);
    			append_dev(div9, t32);
    			append_dev(div9, div6);
    			append_dev(div6, button6);
    			append_dev(div6, t34);
    			append_dev(div6, button7);
    			append_dev(div6, t36);
    			append_dev(div6, button8);
    			append_dev(div9, t38);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				if (each_blocks_4[i]) {
    					each_blocks_4[i].m(div9, null);
    				}
    			}

    			append_dev(div9, t39);
    			append_dev(div9, div7);

    			for (let i = 0; i < each_blocks_3.length; i += 1) {
    				if (each_blocks_3[i]) {
    					each_blocks_3[i].m(div7, null);
    				}
    			}

    			append_dev(div9, t40);
    			append_dev(div9, div8);
    			append_dev(div9, t42);
    			append_dev(div9, a);
    			append_dev(div13, t44);
    			append_dev(div13, div12);
    			append_dev(div12, div10);
    			append_dev(div10, t45);
    			append_dev(div10, t46);
    			append_dev(div10, t47);
    			append_dev(div10, t48);
    			append_dev(div10, t49);
    			append_dev(div10, t50);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				if (each_blocks_2[i]) {
    					each_blocks_2[i].m(div10, null);
    				}
    			}

    			append_dev(div12, t51);
    			append_dev(div12, button9);
    			append_dev(div12, t53);
    			append_dev(div12, button10);
    			append_dev(div12, t55);
    			append_dev(div12, button11);
    			append_dev(div12, t57);
    			append_dev(div12, button12);
    			append_dev(div12, t59);
    			append_dev(div12, div11);
    			append_dev(div12, t61);
    			append_dev(div12, t62);
    			append_dev(div12, t63);
    			append_dev(div12, t64);
    			append_dev(div12, t65);
    			append_dev(div12, t66);
    			append_dev(div12, t67);
    			append_dev(div12, ul1);
    			append_dev(ul1, li0);
    			append_dev(li0, span3);
    			append_dev(li0, t69);
    			append_dev(li0, span4);
    			append_dev(li0, t71);
    			append_dev(li0, span5);
    			append_dev(li0, t73);
    			append_dev(li0, span6);
    			append_dev(li0, t75);
    			append_dev(li0, span7);
    			append_dev(li0, t77);
    			append_dev(li0, span8);
    			append_dev(li0, t79);
    			append_dev(li0, span9);
    			append_dev(ul1, t81);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(ul1, null);
    				}
    			}

    			append_dev(div12, t82);
    			append_dev(div12, ul2);
    			append_dev(ul2, li1);
    			append_dev(li1, span10);
    			append_dev(li1, t84);
    			append_dev(li1, span11);
    			append_dev(li1, t86);
    			append_dev(li1, span12);
    			append_dev(li1, t88);
    			append_dev(li1, span13);
    			append_dev(li1, t90);
    			append_dev(li1, span14);
    			append_dev(li1, t92);
    			append_dev(li1, span15);
    			append_dev(li1, t94);
    			append_dev(li1, span16);
    			append_dev(ul2, t96);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul2, null);
    				}
    			}

    			/*div13_binding*/ ctx[39](div13);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_handler*/ ctx[24]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[26]),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[29], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_2*/ ctx[30], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_3*/ ctx[31], false, false, false, false),
    					listen_dev(button7, "click", /*click_handler_4*/ ctx[32], false, false, false, false),
    					listen_dev(button9, "click", /*click_handler_7*/ ctx[35], false, false, false, false),
    					listen_dev(button10, "click", /*click_handler_8*/ ctx[36], false, false, false, false),
    					listen_dev(button11, "click", /*click_handler_9*/ ctx[37], false, false, false, false),
    					listen_dev(button12, "click", /*next_field*/ ctx[17], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*GOAL*/ ctx[12]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					if_block0.m(div9, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*DIED*/ ctx[13]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_6(ctx);
    					if_block1.c();
    					if_block1.m(div9, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty[0] & /*SHOW_DAMAGE*/ 32) {
    				input0.checked = input0.__value === /*SHOW_DAMAGE*/ ctx[5];
    			}

    			if (dirty[0] & /*SHOW_DAMAGE*/ 32) {
    				input1.checked = input1.__value === /*SHOW_DAMAGE*/ ctx[5];
    			}

    			if (/*GOLD*/ ctx[8]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_5(ctx);
    					if_block2.c();
    					if_block2.m(div9, t10);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty[0] & /*FLOOR*/ 16) set_data_dev(t12, /*FLOOR*/ ctx[4]);
    			if (dirty[0] & /*PICKEL*/ 2048) set_data_dev(t15, /*PICKEL*/ ctx[11]);
    			if (dirty[0] & /*KILL_STREAK*/ 8) set_data_dev(t18, /*KILL_STREAK*/ ctx[3]);

    			if (dirty[0] & /*COLLECT_VALUE2, get_click_position*/ 1064960) {
    				each_value_8 = /*COLLECT_VALUE2*/ ctx[14];
    				validate_each_argument(each_value_8);
    				let i;

    				for (i = 0; i < each_value_8.length; i += 1) {
    					const child_ctx = get_each_context_8(ctx, each_value_8, i);

    					if (each_blocks_5[i]) {
    						each_blocks_5[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_5[i] = create_each_block_8(child_ctx);
    						each_blocks_5[i].c();
    						each_blocks_5[i].m(ul0, null);
    					}
    				}

    				for (; i < each_blocks_5.length; i += 1) {
    					each_blocks_5[i].d(1);
    				}

    				each_blocks_5.length = each_value_8.length;
    			}

    			if (dirty[0] & /*USR_DATA_ARRAY, click_or_keypress_event*/ 2097216) {
    				each_value_5 = /*USR_DATA_ARRAY*/ ctx[6];
    				validate_each_argument(each_value_5);
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks_4[i]) {
    						each_blocks_4[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_4[i] = create_each_block_5(child_ctx);
    						each_blocks_4[i].c();
    						each_blocks_4[i].m(div9, t39);
    					}
    				}

    				for (; i < each_blocks_4.length; i += 1) {
    					each_blocks_4[i].d(1);
    				}

    				each_blocks_4.length = each_value_5.length;
    			}

    			if (dirty[0] & /*UNT_DATA_OBJ*/ 128) {
    				each_value_4 = Object.keys(/*UNT_DATA_OBJ*/ ctx[7]);
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks_3[i]) {
    						each_blocks_3[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_3[i] = create_each_block_4(child_ctx);
    						each_blocks_3[i].c();
    						each_blocks_3[i].m(div7, null);
    					}
    				}

    				for (; i < each_blocks_3.length; i += 1) {
    					each_blocks_3[i].d(1);
    				}

    				each_blocks_3.length = each_value_4.length;
    			}

    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t45_value !== (t45_value = /*USR_DATA_ARRAY*/ ctx[6][0].NAME + "")) set_data_dev(t45, t45_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t47_value !== (t47_value = /*USR_DATA_ARRAY*/ ctx[6][0].LFP + "")) set_data_dev(t47, t47_value);
    			if (dirty[0] & /*USR_DATA_ARRAY*/ 64 && t49_value !== (t49_value = /*USR_DATA_ARRAY*/ ctx[6][0].ATK + "")) set_data_dev(t49, t49_value);

    			if (dirty[0] & /*USR_DATA_ARRAY, UN_EQP*/ 65600) {
    				each_value_2 = /*USR_DATA_ARRAY*/ ctx[6][0].EQP;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(div10, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty[0] & /*GOLD*/ 256) set_data_dev(t62, /*GOLD*/ ctx[8]);
    			if (dirty[0] & /*KAKUHEN*/ 512) set_data_dev(t64, /*KAKUHEN*/ ctx[9]);
    			if (dirty[0] & /*KAKUHEN_COUNTER*/ 1024) set_data_dev(t66, /*KAKUHEN_COUNTER*/ ctx[10]);

    			if (dirty[0] & /*set_EQP, MINE, CURRENT_USER_ID*/ 262150) {
    				each_value_1 = /*MINE*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul1, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty[0] & /*SLOT3*/ 32768) {
    				each_value = /*SLOT3*/ ctx[15];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div13);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			destroy_each(each_blocks_5, detaching);
    			destroy_each(each_blocks_4, detaching);
    			destroy_each(each_blocks_3, detaching);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			/*div13_binding*/ ctx[39](null);
    			binding_group.r();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const EQP_LIMIT = 10;
    const LFP_RECHARGE_NUM = 10;
    const KAKUHEN_COUNTER_LIMIT = 30;
    const RARITY_ZERO_VOLUME = 80;
    const PROBABILITY_CHANGE_THRESHOLD_0 = 2;
    const PROBABILITY_CHANGE_THRESHOLD_1 = 3;
    const DECREASE_PERCENT = 90;

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let field_none = 'block';

    	// let field_none = 'none';
    	let gacha_none = 'none';

    	// let gacha_none = 'block';
    	const INIT_USR_DATA_ARRAY_0 = [
    		{
    			ID: 0,
    			TYPE: 'USR',
    			SPAWN_Y_X: [9, 0],
    			NAME: 'USR_0',
    			LFP: 100,
    			ATK: 10,
    			EQP: [
    				{
    					RARITY: 3,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 4,
    					ATK_DEBUFF: 0,
    					MAGIC: [{ MAGIC_COUNT: null }, [[0, 0, 0], [0, 'U', 0], [0, 0, 0]]]
    				},
    				{
    					RARITY: 2,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 0,
    					ATK_DEBUFF: 0,
    					MAGIC: [{ MAGIC_COUNT: 1 }, [[0, 1, 0], [1, 'U', 1], [0, 1, 0]]]
    				},
    				{
    					RARITY: 4,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 0,
    					ATK_DEBUFF: 0,
    					MAGIC: [
    						{ MAGIC_COUNT: 1 },
    						[
    							[1, 1, 1, 1, 1],
    							[1, 0, 0, 0, 1],
    							[1, 0, 'U', 0, 1],
    							[1, 0, 0, 0, 1],
    							[1, 1, 1, 1, 1]
    						]
    					]
    				}
    			],
    			GOLD: 3
    		}
    	];

    	const INIT_USR_DATA_ARRAY_1 = [
    		{
    			ID: 1,
    			TYPE: 'USR',
    			SPAWN_Y_X: [0, 0],
    			NAME: 'USR_1',
    			LFP: 100,
    			ATK: 10,
    			EQP: [
    				{
    					RARITY: 3,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 4,
    					ATK_DEBUFF: 0,
    					MAGIC: [{ MAGIC_COUNT: null }, [[0, 0, 0], [0, 'U', 0], [0, 0, 0]]]
    				},
    				{
    					RARITY: 2,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 0,
    					ATK_DEBUFF: 0,
    					MAGIC: [{ MAGIC_COUNT: 1 }, [[0, 1, 0], [1, 'U', 1], [0, 1, 0]]]
    				},
    				{
    					RARITY: 4,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 0,
    					ATK_DEBUFF: 0,
    					MAGIC: [
    						{ MAGIC_COUNT: 1 },
    						[
    							[1, 1, 1, 1, 1],
    							[1, 0, 0, 0, 1],
    							[1, 0, 'U', 0, 1],
    							[1, 0, 0, 0, 1],
    							[1, 1, 1, 1, 1]
    						]
    					]
    				}
    			],
    			GOLD: 3
    		}
    	];

    	const INIT_USR_DATA_ARRAY_2 = [
    		{
    			ID: 2,
    			TYPE: 'USR',
    			SPAWN_Y_X: [9, 9],
    			NAME: 'USR_2',
    			LFP: 100,
    			ATK: 10,
    			EQP: [
    				{
    					RARITY: 3,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 4,
    					ATK_DEBUFF: 0,
    					MAGIC: [{ MAGIC_COUNT: null }, [[0, 0, 0], [0, 'U', 0], [0, 0, 0]]]
    				},
    				{
    					RARITY: 2,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 0,
    					ATK_DEBUFF: 0,
    					MAGIC: [{ MAGIC_COUNT: 1 }, [[0, 1, 0], [1, 'U', 1], [0, 1, 0]]]
    				},
    				{
    					RARITY: 4,
    					LFP_BUFF: 0,
    					LFP_DEBUFF: 0,
    					ATK_BUFF: 0,
    					ATK_DEBUFF: 0,
    					MAGIC: [
    						{ MAGIC_COUNT: 1 },
    						[
    							[1, 1, 1, 1, 1],
    							[1, 0, 0, 0, 1],
    							[1, 0, 'U', 0, 1],
    							[1, 0, 0, 0, 1],
    							[1, 1, 1, 1, 1]
    						]
    					]
    				}
    			],
    			GOLD: 3
    		}
    	];

    	let START_CURRENT_Y_AND_X_ARRAY = [];

    	const set_USR_to_init_position = () => {
    		const all_INIT_USR_DATA_ARRAY = [INIT_USR_DATA_ARRAY_0, INIT_USR_DATA_ARRAY_1, INIT_USR_DATA_ARRAY_2];
    		START_CURRENT_Y_AND_X_ARRAY = all_INIT_USR_DATA_ARRAY.map(V => V.map(v => v['SPAWN_Y_X'])).flat();

    		// USRを初期位置に設定
    		// COLLECT_VALUE2[9][0][2] = 'USR'; COLLECT_VALUE2[9][0][3] = 'background-color: #0000FF';
    		START_CURRENT_Y_AND_X_ARRAY.forEach((V, I) => {
    			$$invalidate(14, COLLECT_VALUE2[V[0]][V[1]][2] = 'USR', COLLECT_VALUE2);
    			$$invalidate(14, COLLECT_VALUE2[V[0]][V[1]][3] = 'background-color: #0000FF', COLLECT_VALUE2);
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
    			const ID_ARY = USR_DATA_ARRAY.map(V => V['ID']);
    			const max_ID = Math.max(...ID_ARY);
    			return max_ID;
    		};

    		const to_be_unit_turn = () => UNIT_TURN = true;
    		const return_zero_for_CURRENT_USER_ID_reset = () => 0;

    		const to_be_unit_turn_and_return_zero_for_CURRENT_USER_ID_reset = () => {
    			to_be_unit_turn();
    			return return_zero_for_CURRENT_USER_ID_reset();
    		};

    		// CURRENT_USER_IDを1増やす。max_IDを超えたら0に戻す
    		$$invalidate(2, CURRENT_USER_ID = CURRENT_USER_ID + 1 > get_max_ID()
    		? to_be_unit_turn_and_return_zero_for_CURRENT_USER_ID_reset()
    		: CURRENT_USER_ID + 1);
    	};

    	// USR_DATA_ARRAYのデータをCOLLECT_VALUE2に反映させるための関数
    	const reflect_USR_DATA = () => {
    		// USR_DATA_ARRAYのNAMEとTYPEをobject形式でmap関数でreflect_DATAに追加する
    		let reflect_DATA = USR_DATA_ARRAY.map(V => {
    			return {
    				NAME: V['NAME'],
    				TYPE: V['TYPE'],
    				BACK_COLOR: 'background-color: #0000FF'
    			};
    		});

    		// return reflect_DATA;
    		reflect_DATA.forEach((V, I) => {
    			$$invalidate(14, COLLECT_VALUE2[CURRENT_Y_AND_X[I][0]][CURRENT_Y_AND_X[I][1]][2] = V.TYPE, COLLECT_VALUE2);
    			$$invalidate(14, COLLECT_VALUE2[CURRENT_Y_AND_X[I][0]][CURRENT_Y_AND_X[I][1]][3] = V.BACK_COLOR, COLLECT_VALUE2);
    		});
    	};

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

    			const get_NON_position = UNT_NUM => {
    				const unt_position = get_UNT_position(UNT_NUM);
    				const UNT_ADJACENT_Y_AND_X = get_click_position(unt_position[0], unt_position[1], false);
    				const NEAR_NON_POSITION = UNT_ADJACENT_Y_AND_X.filter(V => COLLECT_VALUE2[V[0]][V[1]][2] === 'NON');

    				// near_non_positionが空の場合、COLLECT_VALUE2の中のNONの位置をランダムに一つ選択する
    				if (NEAR_NON_POSITION.length === 0) {
    					const NOT_NEAR_NON_POSITION = [];

    					COLLECT_VALUE2.forEach((V, I) => {
    						V.forEach((v, i) => {
    							if (v[2] === 'NON') {
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
    				const UNT_NUM_ARY = Object.keys(UNT_DATA_OBJ).map(V => Number(V.split('_')[2]));
    				const max_UNT_NUM = Math.max(...UNT_NUM_ARY);
    				const new_UNT_NUM = max_UNT_NUM + 1;
    				return new_UNT_NUM;
    			};

    			// 誕生するUNTのプロパティを設定する。
    			// UNTのLFPとATKはUNT_NUMとTarget_UNT_NUMのLFPとATKの合計値
    			const new_UNT = {
    				TYPE: 'UNT',
    				NAME: 'UNT_' + get_new_UNT_NUM().toString(),
    				LFP: UNT_DATA_OBJ['UNT_NUM_' + UNT_NUM.toString()]['LFP'] + UNT_DATA_OBJ['UNT_NUM_' + Target_UNT_NUM.toString()]['LFP'],
    				ATK: UNT_DATA_OBJ['UNT_NUM_' + UNT_NUM.toString()]['ATK'] + UNT_DATA_OBJ['UNT_NUM_' + Target_UNT_NUM.toString()]['ATK'],
    				GLD: UNT_DATA_OBJ['UNT_NUM_' + UNT_NUM.toString()]['GLD'] + UNT_DATA_OBJ['UNT_NUM_' + Target_UNT_NUM.toString()]['GLD'],
    				BDP: 0,
    				RBP: 0
    			};

    			new_UNT['BDP'] = new_UNT['LFP'] * new_UNT['ATK'];

    			// NONの位置を取得する
    			const NON_POSITION = get_NON_position(UNT_NUM);

    			// NONの中から一つをランダムで選択する
    			const random_NON_POSITION = shuffle(NON_POSITION)[0];

    			// new_UNTをUNT_DATA_OBJに追加する
    			// random_NON_POSITIONにnew_UNTを追加する
    			// back_groundの色を変更する
    			if (random_NON_POSITION !== undefined && COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][2] === 'NON') {
    				$$invalidate(7, UNT_DATA_OBJ['UNT_NUM_' + get_new_UNT_NUM().toString()] = new_UNT, UNT_DATA_OBJ);
    				$$invalidate(14, COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][2] = new_UNT, COLLECT_VALUE2);
    				$$invalidate(14, COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][3] = 'background-color: #00FF00;', COLLECT_VALUE2);
    				console.log('UNT is born!!');
    			}
    		} catch(error) {
    			console.log(error);

    			// errorがあった場合、UNT_DATA_OBJからnew_UNTを削除する
    			$$invalidate(7, UNT_DATA_OBJ = R.omit(['UNT_NUM_' + get_new_UNT_NUM().toString()], UNT_DATA_OBJ));

    			// errorがあった場合、COLLECT_VALUE2からnew_UNTを削除し、NONに戻す
    			$$invalidate(14, COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][2] = 'NON', COLLECT_VALUE2);

    			// errorがあった場合、COLLECT_VALUE2からnew_UNTの背景色を削除する
    			$$invalidate(14, COLLECT_VALUE2[random_NON_POSITION[0]][random_NON_POSITION[1]][3] = 'background-color: #FFFFFF;', COLLECT_VALUE2);
    		}
    	};

    	// breeding points(BDP)はUNTのLFPとATKを掛けた値
    	// BDP = LFP * ATK
    	// remain breeding points(RBP)の初期値は0でbreedによって加算される
    	// RBPがBDPを超えたらUNTが誕生する
    	// ATKの値がbreed関数によってRBPに加算される
    	const breed = (UNT_NUM, Target_UNT_NUM_Ary) => {
    		// console.log(UNT_NUM, Target_UNT_NUM_Ary);
    		Target_UNT_NUM_Ary.forEach(Target_UNT_NUM => {
    			const UNIT_NAME = 'UNT_NUM_' + UNT_NUM.toString();
    			const Target_UNT_NUM_NAME = 'UNT_NUM_' + Target_UNT_NUM.toString();

    			// UNT_NUMのLFPとATKの合計値
    			// UNT_NUMのLFPとATKの合計値をTarget_UNT_NUMのRBPに加算する
    			$$invalidate(7, UNT_DATA_OBJ[Target_UNT_NUM_NAME]['RBP'] += UNT_DATA_OBJ[UNIT_NAME]['ATK'], UNT_DATA_OBJ);

    			if (UNT_DATA_OBJ[Target_UNT_NUM_NAME]['RBP'] >= UNT_DATA_OBJ[Target_UNT_NUM_NAME]['BDP']) {
    				// console.log('BREED!!', UNT_NUM, Target_UNT_NUM_NAME);
    				spawn(UNT_NUM, Target_UNT_NUM);

    				// RBPがBDPを超えたらUNTが誕生する
    				// RBPを0にする
    				$$invalidate(7, UNT_DATA_OBJ[Target_UNT_NUM_NAME]['RBP'] = 0, UNT_DATA_OBJ);
    			}
    		});
    	};

    	let rootElement;
    	let KILL_STREAK = 0;

    	const kill_streak_stack_get_more_gold = ({ Unt_Gld = 0, Kill_Streak = 0 }) => {
    		console.log(Unt_Gld, Kill_Streak);
    		return Unt_Gld * Kill_Streak;
    	};

    	// UNT_DATA_OBJ[UNT_NUM_N]['GLD']
    	const what_sort_by_any = ({ What = MINE, Any = 'RARITY', Asc_Desc = 'DESC' }) => {
    		// What = What.sort((a,b)=>b['RARITY'] - a['RARITY']);
    		// console.log("What");
    		Asc_Desc
    		? What = What.sort((a, b) => b[Any] - a[Any])
    		: What = What.sort((a, b) => a[Any] - b[Any]);
    	};

    	const switch_field_gacha = () => {
    		$$invalidate(22, field_none = field_none === 'none' ? 'block' : 'none');
    		$$invalidate(23, gacha_none = gacha_none === 'none' ? 'block' : 'none');
    	};

    	const UN_EQP = (Eqp_Index, Usr_Id = 0) => {
    		// MINEに指定したUSR_DATA_ARRAYのEqpを追加する
    		$$invalidate(1, MINE = R.append(USR_DATA_ARRAY[Usr_Id]['EQP'][Eqp_Index], MINE));

    		// USR_DATA_ARRAY[Usr_Id].EQPオブジェクトから指定したUSR_DATA_ARRAYのEqpを削除する
    		$$invalidate(6, USR_DATA_ARRAY[Usr_Id]['EQP'] = R.remove(Eqp_Index, 1, USR_DATA_ARRAY[Usr_Id]['EQP']), USR_DATA_ARRAY);
    	};

    	const recharge_magic_count = (Usr_Id = 0) => {
    		USR_DATA_ARRAY[Usr_Id]['EQP'].map((V, Eqp_Index) => {
    			if (V['MAGIC'][0]['MAGIC_COUNT'] !== null) {
    				V['MAGIC'][0]['MAGIC_COUNT'] = 1;
    			} // return V['MAGIC'][0]['MAGIC_COUNT'];
    		});
    	};

    	// beforeUpdate(async () => {
    	// 	try {
    	// 		recharge_magic_count();
    	// 	} catch (error) {
    	// 		console.log(error);		
    	// 	}
    	// });
    	const next_field = () => {
    		$$invalidate(1, MINE = []);
    		switch_field_gacha();
    	}; // recharge_magic_count();

    	// .field .gachaのdisplayをnoneを切り替える関数
    	const toggle_gacha_display = () => {
    		const gacha = document.querySelector('.gacha');
    		gacha.style.display = gacha.style.display === 'none' ? 'block' : 'none';
    		const field = document.querySelector('.field');
    		field.style.display = field.style.display === 'none' ? 'block' : 'none';
    	};

    	const LFP_ATK_Range_Array_Min_Max_Table = [
    		{
    			LFP_Min: 2,
    			LFP_Max: 10,
    			ATK_Min: 1,
    			ATK_Max: 3
    		},
    		{
    			LFP_Min: 5,
    			LFP_Max: 8,
    			ATK_Min: 3,
    			ATK_Max: 10
    		}
    	];

    	const make_UNT_DATA_OBJ = ({ Repeat_Array_Num = 1, Repeat_Array_Times = 20, LFP_Range_Array = [2, 10], ATK_Range_Array = [1, 3], GLD_Range_Array = [1, 2], // BDP_Rate=1,
    		BDP_Rate = 5 }) => {
    		const UNT_DATA_OBJ = {};

    		// 特定の範囲の配列からランダムで1つ選択する関数
    		const get_randam_range = ({ Range = [1, 10] }) => {
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
    			UNT_DATA_OBJ['UNT_NUM_' + I.toString()] = {
    				TYPE: 'UNT',
    				NAME: 'UNT_' + I.toString(),
    				LFP: V * get_randam_range({ Range: LFP_Range_Array }),
    				ATK: V * get_randam_range({ Range: ATK_Range_Array }),
    				GLD: get_randam_range({ Range: GLD_Range_Array }),
    				BDP: 0,
    				RBP: 0
    			};

    			UNT_DATA_OBJ['UNT_NUM_' + I.toString()]['BDP'] = UNT_DATA_OBJ['UNT_NUM_' + I.toString()]['LFP'] * UNT_DATA_OBJ['UNT_NUM_' + I.toString()]['ATK'] * BDP_Rate;
    		});

    		return UNT_DATA_OBJ;
    	};

    	let FLOOR = 0;

    	// let SHOW_DAMAGE = 'ON';
    	let SHOW_DAMAGE = 'OFF';

    	let USR_DATA_ARRAY = [];

    	const retry_data_setup = () => {
    		$$invalidate(6, USR_DATA_ARRAY = R.clone(INIT_USR_DATA_ARRAY_0));
    		const ADDITIONAL_USR_DATA_ARRAY_1 = R.clone(INIT_USR_DATA_ARRAY_1);
    		const ADDITIONAL_USR_DATA_ARRAY_2 = R.clone(INIT_USR_DATA_ARRAY_2);
    		$$invalidate(6, USR_DATA_ARRAY = R.concat(USR_DATA_ARRAY, ADDITIONAL_USR_DATA_ARRAY_1));
    		$$invalidate(6, USR_DATA_ARRAY = R.concat(USR_DATA_ARRAY, ADDITIONAL_USR_DATA_ARRAY_2));
    	};

    	retry_data_setup();

    	const decrement_MAGIC_COUNTER = (EqpNum, Usr_Id = 0) => {
    		console.log(Usr_Id); // USR_DATA_ARRAY[Usr_Id],
    		// USR_DATA_ARRAY[Usr_Id]['EQP'],

    		// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum],
    		// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'],
    		// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0],
    		// USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'],
    		if (USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'] === null) {
    			return;
    		}

    		$$invalidate(6, USR_DATA_ARRAY[Usr_Id]['EQP'][EqpNum]['MAGIC'][0]['MAGIC_COUNT'] -= 1, USR_DATA_ARRAY);
    	};

    	const convert = range => {
    		const result = [];

    		range.forEach((row, y) => {
    			row.forEach((col, x) => {
    				if (col === 1) {
    					if (range[y][x] === 'U') {
    						return;
    					}

    					result.push([y, x]);
    				}
    			});
    		});

    		return result;
    	};

    	// convert_for_magicを5行以内の関数に書き換える
    	const convert_for_magic = range => {
    		const center = range.map(V => V.map((v, i) => v === 'U' ? [i, V.indexOf(v)] : null)).flat().filter((v, i) => v !== null)[0];
    		const non_center = range.map((V, I) => V.map((v, i) => v === 1 ? [I, i] : null)).flat().filter(V => V !== null);

    		// .sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);
    		const Y_X_FORM_RANGE = non_center.map(V => [V[0] - center[0], V[1] - center[1]]);

    		return Y_X_FORM_RANGE;
    	};

    	// DEV_MODEではGOLの位置を固定する。USRの位置も固定する。UNTの位置も固定する。
    	// 今後シードランダムを導入してNONの位置を固定する。
    	let DEV_MODE = true;

    	// const set_EQP = (NAME, EQP, LIMIT, Eqp_Index) =>{
    	const set_EQP = ({ Eqp = {
    			'UNT_NUM_0': {
    				ATK: 3,
    				LFP: 4,
    				NAME: "UNT_0",
    				TYPE: "UNT"
    			}
    		}, // Eqp_Limit=5,
    		Eqp_Index = 0, Usr_Id = 0 }) => {
    		console.log(Eqp, Usr_Id);

    		// USR_EQPの長さがLIMITより大きかったら、USR_EQPをLIMITの数になるまでスライスする
    		if (USR_DATA_ARRAY[Usr_Id]['EQP'].length >= EQP_LIMIT) {
    			return;
    		}

    		// USR_DATA_ARRAY[Usr_Id].EQPオブジェクトにEQPをramda.jsで追加する
    		$$invalidate(6, USR_DATA_ARRAY[Usr_Id]['EQP'] = R.append(Eqp, USR_DATA_ARRAY[Usr_Id]['EQP']), USR_DATA_ARRAY);

    		// USR_DATA_ARRAY.filter(V=>V['ID']=== Usr_Id )[0]['EQP'] = R.append(Eqp, USR_DATA_ARRAY[Usr_Id]['EQP']);
    		// Object.values(USR_DATA_ARRAY[Usr_Id])[4] = R.append(Eqp, USR_DATA_ARRAY[Usr_Id]['EQP']);
    		// MINEから指定したUSR_DATA_ARRAYのNAMEのEQPをUSR_EQP_SLICE_PUSHに更新する
    		// console.log(MINE);
    		$$invalidate(1, MINE = R.remove(Eqp_Index, 1, MINE));
    	}; // console.log(MINE);

    	let UNT_DATA_OBJ = {};
    	let GOLD = 3;
    	let MINE = [];
    	let KAKUHEN = false;
    	let KAKUHEN_COUNTER = 0;
    	const no_magic = () => [{ MAGIC_COUNT: null }, [[0, 0, 0], [0, 'U', 0], [0, 0, 0]]];

    	const ORIGINAL_SLOT = [
    		{
    			RARITY: 0,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 1,
    			ATK_DEBUFF: 0,
    			MAGIC: R.clone(no_magic())
    		},
    		{
    			RARITY: 1,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 2,
    			ATK_DEBUFF: 0,
    			MAGIC: R.clone(no_magic())
    		},
    		{
    			RARITY: 2,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 3,
    			ATK_DEBUFF: 0,
    			MAGIC: R.clone(no_magic())
    		},
    		{
    			RARITY: 3,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 4,
    			ATK_DEBUFF: 0,
    			MAGIC: R.clone(no_magic())
    		},
    		{
    			RARITY: 90,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 10,
    			ATK_DEBUFF: 0,
    			MAGIC: R.clone(no_magic())
    		},
    		{
    			RARITY: 2,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 0,
    			ATK_DEBUFF: 0,
    			MAGIC: [{ MAGIC_COUNT: 1 }, [[1, 0, 1], [0, 'U', 0], [1, 0, 1]]]
    		},
    		{
    			RARITY: 2,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 0,
    			ATK_DEBUFF: 0,
    			MAGIC: [{ MAGIC_COUNT: 1 }, [[0, 1, 0], [1, 'U', 1], [0, 1, 0]]]
    		},
    		{
    			RARITY: 3,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 0,
    			ATK_DEBUFF: 0,
    			MAGIC: [
    				{ MAGIC_COUNT: 1 },
    				[
    					[1, 1, 1, 1, 1],
    					[1, 0, 0, 0, 1],
    					[1, 0, 'U', 0, 1],
    					[1, 0, 0, 0, 1],
    					[1, 1, 1, 1, 1]
    				]
    			]
    		},
    		{
    			RARITY: 3,
    			LFP_BUFF: 0,
    			LFP_DEBUFF: 0,
    			ATK_BUFF: 0,
    			ATK_DEBUFF: 0,
    			MAGIC: [
    				{ MAGIC_COUNT: 1 },
    				[
    					[1, 0, 1, 0, 1],
    					[0, 1, 1, 1, 0],
    					[1, 1, 'U', 1, 1],
    					[0, 1, 1, 1, 0],
    					[1, 0, 1, 0, 1]
    				]
    			]
    		}
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
    		SLOT2 = SLOT.reduce(
    			(accumulator, currentValue) => {
    				currentValue.RARITY;

    				const RARITY_NUM = currentValue.RARITY === 90
    				? 1
    				: currentValue.RARITY === 0
    					? RARITY_ZERO_VOLUME
    					: currentValue.RARITY;

    				for (let i = 0; i < RARITY_NUM; i++) {
    					accumulator.push(currentValue);
    				}

    				return accumulator;
    			},
    			[]
    		);

    		$$invalidate(15, SLOT3 = shuffle(SLOT2));
    	};

    	make_slot();

    	// LFP_BUFFのみ
    	// let SLOT4 = shuffle(SLOT2.slice(0, 100));
    	// 任意のRARITYを任意のパーセンテージ減らす関数
    	const decrease_any_rarity = (Rarity, Percent) => {
    		const res0 = SLOT3.filter(V => V.RARITY === Rarity);

    		// res0の中身をPercentで減らす
    		const res1 = res0.slice(0, res0.length - res0.length * (Percent / 100));
    		const res2 = SLOT3.filter(V => V.RARITY !== Rarity);
    		const res = res1.concat(res2);
    		const shuffle_res = shuffle(res);
    		return shuffle_res;
    	};

    	const RATE_AND_X_PAIR = [{ Rate: 1, X: 1 }, { Rate: 4, X: 3 }, { Rate: 8, X: 5 }];

    	const make_high_rate_slot = ({ Rate = 1 }) => {
    		console.log('make_high_rate_slot');
    		console.log(RATE_AND_X_PAIR.filter(V => V.Rate === Rate)[0]['Rate']);

    		if (Rate === 1) {
    			SLOT = R.clone(ORIGINAL_SLOT);

    			const new_slot = SLOT.map(V => {
    				V['ATK_BUFF'] = V['ATK_BUFF'] * 1;
    				return V;
    			});

    			SLOT = R.clone(new_slot);
    			return;
    		}

    		if (Rate === RATE_AND_X_PAIR.filter(V => V.Rate === Rate)[0]['Rate']) {
    			SLOT = R.clone(ORIGINAL_SLOT);

    			const new_slot = SLOT.map(V => {
    				V['ATK_BUFF'] = V['ATK_BUFF'] * RATE_AND_X_PAIR.filter(V => V.Rate === Rate)[0]['X'];

    				// V['RARITY'] = V['RARITY'] * RATE_AND_X_PAIR.filter(V=>V.Rate === Rate)[0]['X'];
    				return V;
    			});

    			SLOT = R.clone(new_slot);
    		}
    	}; // if(Rate === 4){
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
    	// ワロタ https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q14218518669
    	// 関数。SLOT3からランダムで1つ選択してMINEに追加。GOLDが足りなかったら追加しない。GOLDが足りたらGOLDを減らす。
    	// RARITYが1以上のものをPROBABILITY_CHANGE_THRESHOLD連続で追加できた場合、KAKUHENをtrueにする。
    	// KAKUHEN true状態でKAKUHEN_COUNTER_LIMIT回選択した後にKAKUHENをfalseにする。
    	const slot_exe_once = ({ Rate_Param = 1 }) => {
    		console.log('slot_exe_once');
    		make_high_rate_slot({ Rate: Rate_Param });
    		make_slot();

    		// KAKUHENがtrueの時はSLOT3からRARITYが0のものを選択する確率が低下する
    		const SLOT3_KAKUHEN = KAKUHEN
    		? decrease_any_rarity(0, DECREASE_PERCENT)
    		: SLOT3;

    		// SLOT3_KAKUHENからランダムで1つ選択する
    		const random_SLOT3_KAKUHEN = shuffle(SLOT3_KAKUHEN)[0];

    		// GOLDが足りなかったら追加しない。GOLDが足りたらGOLDを減らす。
    		if (GOLD - Rate_Param <= 0) {
    			return;
    		} else {
    			$$invalidate(8, GOLD -= Rate_Param);
    		}

    		// MINEに追加する
    		$$invalidate(1, MINE = R.append(random_SLOT3_KAKUHEN, MINE));

    		// RARITYが1以上のものをPROBABILITY_CHANGE_THRESHOLD(_0か_1のどちらかランダムの値)の値の回数連続で追加できた場合、KAKUHENをtrueにする。
    		if (MINE.slice(-shuffle([PROBABILITY_CHANGE_THRESHOLD_0, PROBABILITY_CHANGE_THRESHOLD_1])[0]).every(V => V.RARITY >= 1)) {
    			$$invalidate(9, KAKUHEN = true);
    		}

    		// KAKUHEN時はRARITYが0のものを選択する確率が半分(50%。つまりRARITY0がSLOT3から一時的に90個から45個)になる。10回選択した後にKAKUHENをfalseにする。
    		if (KAKUHEN === true) {
    			$$invalidate(10, KAKUHEN_COUNTER += 1);
    			$$invalidate(9, KAKUHEN = KAKUHEN_COUNTER >= KAKUHEN_COUNTER_LIMIT ? false : true);

    			$$invalidate(10, KAKUHEN_COUNTER = KAKUHEN_COUNTER >= KAKUHEN_COUNTER_LIMIT
    			? 0
    			: KAKUHEN_COUNTER);
    		}
    	};

    	const magic_USR_to_UNT = (Magic, Usr_Id) => {
    		try {
    			const magic_attack = convert_for_magic(Magic);

    			magic_attack.forEach(MAGI => {
    				const magic_to_Y = CURRENT_Y_AND_X[Usr_Id][0] + MAGI[0];
    				const magic_to_X = CURRENT_Y_AND_X[Usr_Id][1] + MAGI[1];

    				if (typeof COLLECT_VALUE2[magic_to_Y] === 'undefined' || typeof COLLECT_VALUE2[magic_to_Y][magic_to_X] === 'undefined') {
    					return;
    				}

    				;
    				reflect_USR_DATA();
    				console.log(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]);

    				if (COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'GOL' || COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'BLC' || COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'NON' || COLLECT_VALUE2[magic_to_Y][magic_to_X][2] === 'USR') {
    					return;
    				}

    				;
    				const UNT_NUM = Number(COLLECT_VALUE2[magic_to_Y][magic_to_X][2]['NAME'].replaceAll('UNT_', ''));
    				const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();

    				const USR_ATK_BUFF = USR_DATA_ARRAY[Usr_Id]['EQP'].reduce(
    					(accumulator, currentValue) => {
    						return accumulator + currentValue['ATK_BUFF'];
    					},
    					0
    				) || 0;

    				const USR_ATK = USR_DATA_ARRAY[Usr_Id].ATK;
    				const USR_ATK_WITH_BUFF = USR_ATK + USR_ATK_BUFF;
    				$$invalidate(7, UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK_WITH_BUFF, UNT_DATA_OBJ);

    				if (COLLECT_VALUE2[magic_to_Y][magic_to_X][3] === 'background-color: #00FF00') {
    					damage_effect({
    						Y_X_Ary: [magic_to_Y, magic_to_X],
    						ms: 200,
    						// Original_Color: '#00FF00',
    						Original_Color: UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0
    						? '#FFFFFF'
    						: '#00FF00',
    						Color_0: '#FF0000',
    						Color_1: '#FFFFFF'
    					});
    				}

    				if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
    					$$invalidate(3, KILL_STREAK += 1);

    					// GOLD += 1;
    					$$invalidate(8, GOLD += kill_streak_stack_get_more_gold({
    						Unt_Gld: UNT_DATA_OBJ[UNT_NUM_N]['GLD'],
    						Kill_Streak: KILL_STREAK
    					}));

    					// console.log('FOO', FOO);
    					const UNT_Y_AND_X = [magic_to_Y, magic_to_X];

    					// UNTの位置をNONに変更する
    					change_BLC_to_NON(UNT_Y_AND_X[0], UNT_Y_AND_X[1]);

    					// 色も更新する
    					$$invalidate(14, COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);

    					// UNT_DATA_OBJからUNT_NUMを指定してUNTを削除する
    					$$invalidate(7, UNT_DATA_OBJ = R.omit([UNT_NUM_N], UNT_DATA_OBJ));
    				}
    			});
    		} catch(error) {
    			console.log(error);
    		}
    	};

    	// クリックした位置の上下左右の配列を取得する関数
    	const get_click_position = (Y, X, When_Click = false) => {
    		// CURRENT_Y_AND_X = [Y, X];
    		const click_position = [[Y, X - 1], [Y, X + 1], [Y - 1, X], [Y + 1, X]];

    		if (When_Click) {
    			console.log(Y, X, click_position);
    		}

    		return click_position;
    	};

    	// Y,XをBLCからゴール(GOL)に変更する関数
    	const change_BLC_to_GOL = (Y, X) => {
    		$$invalidate(14, COLLECT_VALUE2[Y][X][2] = 'GOL', COLLECT_VALUE2);

    		// 色は黄色にする
    		$$invalidate(14, COLLECT_VALUE2[Y][X][3] = 'background-color: #FFFF00', COLLECT_VALUE2);
    	};

    	// USRからGOLまでを隣接して移動できるように適宜BLCをNONに変更する関数
    	const change_BLC_to_NON = (Y, X) => {
    		// Y,XをBLCからNONに変更する
    		$$invalidate(14, COLLECT_VALUE2[Y][X][2] = 'NON', COLLECT_VALUE2);

    		// 色は白色にする
    		$$invalidate(14, COLLECT_VALUE2[Y][X][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    	};

    	// USRがUNTにアタックする関数(UNTのLFPをUSRのATK分減らす)(引数にはUNT_DATA_ARRAYのUNT_NUMを指定する)
    	// const attack_USR_to_UNT = (UNT_NUM, Go_to_Y, Go_to_X) => {
    	const attack_USR_to_UNT = (Go_to_Y, Go_to_X, Usr_Id = 0) => {
    		// Go_to_YとGo_to_XにUNTが存在しない場合はreturnする
    		if (COLLECT_VALUE2[Go_to_Y][Go_to_X][2] !== 'object') {
    			if (COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['TYPE'] !== 'UNT') {
    				// UNTではない UNTが存在しない
    				return;
    			}
    		}

    		// Go_to_YとGo_to_XからUNT_NUMを取得する
    		const UNT_NUM = Number(COLLECT_VALUE2[Go_to_Y][Go_to_X][2]['NAME'].replaceAll('UNT_', ''));

    		const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();

    		// USR_DATA_ARRAY[Usr_Id]の['EQP']の中から['ATK_BUFF']を累計してUSR_ATK_BUFFに代入すr
    		const USR_ATK_BUFF = USR_DATA_ARRAY[Usr_Id]['EQP'].reduce(
    			(accumulator, currentValue) => {
    				return accumulator + currentValue['ATK_BUFF'];
    			},
    			0
    		) || 0;

    		// USRのATKを取得する
    		const USR_ATK = USR_DATA_ARRAY[Usr_Id].ATK;

    		const USR_ATK_WITH_BUFF = USR_ATK + USR_ATK_BUFF;

    		// 指定したUNTのLFPをUSRのATK分減らす
    		damage_alert({
    			Before_LFP: UNT_DATA_OBJ[UNT_NUM_N]['LFP'],
    			After_LFP: UNT_DATA_OBJ[UNT_NUM_N]['LFP'] - USR_ATK_WITH_BUFF,
    			Damage: USR_ATK_WITH_BUFF
    		});

    		$$invalidate(7, UNT_DATA_OBJ[UNT_NUM_N]['LFP'] -= USR_ATK_WITH_BUFF, UNT_DATA_OBJ);

    		// ダメージエフェクト
    		damage_effect({
    			Y_X_Ary: [Go_to_Y, Go_to_X],
    			ms: 200,
    			Original_Color: '#00FF00',
    			Color_0: '#FF0000',
    			Color_1: '#FFFFFF'
    		});

    		// 指定したUNTのLFPが0以下になったら、指定したUNTの位置をNONに変更する
    		if (UNT_DATA_OBJ[UNT_NUM_N]['LFP'] <= 0) {
    			$$invalidate(3, KILL_STREAK += 1);
    			$$invalidate(8, GOLD += 1);

    			// GOLD += kill_streak_stack_get_more_gold({
    			// 	Unt_Gld: UNT_DATA_OBJ[UNT_NUM_N]['GLD'],
    			// 	Kill_Streak: KILL_STREAK,
    			// });
    			const UNT_Y_AND_X = [
    				// CURRENT_Y_AND_X[0] + Go_to_Y,
    				// CURRENT_Y_AND_X[1] + Go_to_X,
    				Go_to_Y,
    				Go_to_X
    			];

    			// UNTの位置をNONに変更する
    			change_BLC_to_NON(UNT_Y_AND_X[0], UNT_Y_AND_X[1]);

    			// 色も更新する
    			$$invalidate(14, COLLECT_VALUE2[UNT_Y_AND_X[0]][UNT_Y_AND_X[1]][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);

    			// UNT_DATA_OBJからUNT_NUMを指定してUNTを削除する
    			$$invalidate(7, UNT_DATA_OBJ = R.omit([UNT_NUM_N], UNT_DATA_OBJ));
    		}
    	};

    	// UNTがUSRにアタックする関数(USRのLFPをUNTのATK分減らす)(引数にはUNT_DATA_ARRAYのUNT_NUMを指定する)
    	const attack_UNT_to_USR = (UNT_NUM, Usr_Id = 0) => {
    		damage_effect({
    			Y_X_Ary: [get_USR_position()[0], get_USR_position()[1]],
    			ms: 200,
    			Original_Color: '#0000FF',
    			Color_0: '#FF0000',
    			Color_1: '#FFFFFF'
    		});

    		const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();
    		const UNT_ATK = UNT_DATA_OBJ[UNT_NUM_N].ATK;

    		damage_alert({
    			Before_LFP: USR_DATA_ARRAY[Usr_Id].LFP,
    			After_LFP: USR_DATA_ARRAY[Usr_Id].LFP - UNT_ATK,
    			Damage: UNT_ATK
    		});

    		// 指定したUNTのATKをUSRのLFP分減らす
    		$$invalidate(6, USR_DATA_ARRAY[Usr_Id]['LFP'] -= UNT_ATK, USR_DATA_ARRAY);

    		// USRのLFPが0以下になったら、ゲームオーバーにする
    		if (USR_DATA_ARRAY[Usr_Id].LFP <= 0) {
    			// ゲームオーバーにする
    			$$invalidate(13, DIED = 'YOU DIED, GAME OVER');

    			$$invalidate(4, FLOOR = 0);
    			$$invalidate(11, PICKEL = 0);

    			setTimeout(
    				() => {
    					// reset_or_init_map({when_mounted_time: false});
    					reset_or_init_map({
    						when_mounted_time: false,
    						go_up: false,
    						when_died: true
    					});
    				},
    				1000
    			);
    		}
    	};

    	// 与えるダメージ表示する関数
    	const damage_alert = ({ Before_LFP = 0, After_LFP = 0, Damage = 0 }) => {
    		if (SHOW_DAMAGE !== 'ON') {
    			return;
    		}

    		alert("Before_LFP: " + Before_LFP.toString() + ' ' + "Damage: " + Damage.toString() + ' ' + "After_LFP: " + After_LFP.toString() + ' ');
    	};

    	// LFPが減った時に対象のUSRかUNTの色を500ms点滅させる関数
    	const damage_effect = ({ Y_X_Ary = [9, 0], ms = 200, Original_Color = '#0000FF', Color_0 = '#0000FF', Color_1 = '#FFFFFF' }) => {
    		const [Y, X] = Y_X_Ary;

    		const function1 = () => {
    			$$invalidate(14, COLLECT_VALUE2[Y][X][3] = `background-color: ${Color_0}`, COLLECT_VALUE2);
    		};

    		const function2 = () => {
    			$$invalidate(14, COLLECT_VALUE2[Y][X][3] = `background-color: ${Color_1}`, COLLECT_VALUE2);
    		};

    		const function3 = () => {
    			$$invalidate(14, COLLECT_VALUE2[Y][X][3] = `background-color: ${Original_Color}`, COLLECT_VALUE2);
    		};

    		const color_blink = (ms, Color_0, Color_1) => {
    			const limitSeconds = ms / 1000;
    			const startTime = new Date().getTime();
    			let count = 0;

    			const intervalId = setInterval(
    				() => {
    					const currentTime = new Date().getTime();
    					const elapsedTime = (currentTime - startTime) / 1000;

    					elapsedTime >= limitSeconds
    					? clearInterval(intervalId)
    					: count++ % 2 === 0 ? function1() : function2();
    				},
    				10
    			);
    		};

    		color_blink(ms);

    		// タイマーをクリアして元の色に戻す
    		setTimeout(
    			() => {
    				function3();
    			},
    			ms
    		);
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
    	Alt_Param = {
    			Key: null,
    			Usr_Id: null,
    			Magic: null,
    			Eqp_I: null
    		}
    	) {
    		// キーボードで操作した場合はevent.keyが有る
    		// 　　Alt_Paramは初期値の全てのプロパティがnullのオブジェクト
    		// <button>で操作した場合はevent.keyが無い
    		// 　　HTML側のclickの中でAlt_Paramの各プロパティがセットされる
    		const key = event ? event.key : Alt_Param['Key'];

    		const usr_id = Alt_Param['Usr_Id'] ? Alt_Param['Usr_Id'] : 0;
    		const magic = Alt_Param['Magic'];
    		const eqp_i = Alt_Param['Eqp_I'];
    		console.log('usr_id', usr_id, 'magic', magic, 'eqp_i', eqp_i);
    		$$invalidate(3, KILL_STREAK = 0);

    		// // Magic引数がある場合はmagic_attackとUNT_ATTACK_OR_MOVEを実行し、
    		// usr_moveとattack_USR_to_UNTを実行せず、早期リターンする
    		if (magic) {
    			decrement_MAGIC_COUNTER(eqp_i, usr_id);
    			magic_USR_to_UNT(magic[1], usr_id);
    			change_CURRENT_USR_ID();

    			//  Object.entries(UNT_DATA_OBJ).map((V,I)=>{UNT_ATTACK_OR_MOVE(V[1]['NAME'])});
    			// UNIT_TURNがtrueなら各UNTの行動を実行する
    			if (UNIT_TURN === true) {
    				Object.entries(UNT_DATA_OBJ).map((V, I) => {
    					UNT_ATTACK_OR_MOVE(V[1]['NAME']);
    				});

    				UNIT_TURN = false;
    			}
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
    				CURRENT_Y_AND_X[Usr_Id][1] + offset_x
    			];

    			reflect_USR_DATA();
    			return result_go_to_y_x;
    		};

    		const go_to_y_x = go_to_y_x_setup(key, usr_id);

    		// go_to_y_xがBLCの場合はPICKELを1増やして、BLCをNONに変更する
    		if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'BLC') {
    			$$invalidate(11, PICKEL += 1);
    			change_BLC_to_NON(go_to_y_x[0], go_to_y_x[1]);
    		}

    		// go_to_y_xがUSRの場合は更新しない、早期リターンする処理
    		if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'USR') {
    			return;
    		}

    		// go_to_y_xがGOLの場合はGOALをtrueにする
    		if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'GOL') {
    			$$invalidate(12, GOAL = true);
    			$$invalidate(1, MINE = []);

    			// GOAL後の硬直を無くしてみる(setTimeoutがバグの温床になる気配があるから削除していく方針)
    			// 別の方法でGOALしたことをプレイヤーに伝える
    			// document.removeEventListener('keypress', click_or_keypress_event);
    			// 1秒後にreset_mapを実行する
    			// setTimeout(() => {
    			reset_or_init_map({
    				when_mounted_time: false,
    				go_up: true,
    				when_died: false
    			});
    		} // }, 1000);

    		if (!magic) {
    			const usr_move = () => {
    				reflect_USR_DATA();

    				// go_to_y_xがNONの場合は更新する
    				if (COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] === 'NON') {
    					$$invalidate(14, COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][2] = 'USR', COLLECT_VALUE2);
    					$$invalidate(14, COLLECT_VALUE2[CURRENT_Y_AND_X[usr_id][0]][CURRENT_Y_AND_X[usr_id][1]][2] = 'NON', COLLECT_VALUE2);

    					// 色も更新する
    					$$invalidate(14, COLLECT_VALUE2[go_to_y_x[0]][go_to_y_x[1]][3] = 'background-color: #0000FF', COLLECT_VALUE2);

    					$$invalidate(14, COLLECT_VALUE2[CURRENT_Y_AND_X[usr_id][0]][CURRENT_Y_AND_X[usr_id][1]][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    					CURRENT_Y_AND_X[usr_id] = go_to_y_x;
    				}

    				reflect_USR_DATA();
    			};

    			usr_move();

    			// USRがUNTにアタックする。引数はUNT_DATA_ARRAYのUNT_NUMの指定と攻撃対象のUNTのIDの指定。
    			attack_USR_to_UNT(go_to_y_x[0], go_to_y_x[1]);

    			change_CURRENT_USR_ID();
    		}

    		//  Object.entries(UNT_DATA_OBJ).map((V,I)=>{UNT_ATTACK_OR_MOVE(V[1]['NAME'])});
    		// UNIT_TURNがtrueなら各UNTの行動を実行する
    		if (UNIT_TURN === true) {
    			Object.entries(UNT_DATA_OBJ).map((V, I) => {
    				UNT_ATTACK_OR_MOVE(V[1]['NAME']);
    			});

    			UNIT_TURN = false;
    		}
    	}

    	// 現在のUSRの位置を取得する関数
    	const get_USR_position = () => {
    		// UNTの位置を取得する
    		reflect_USR_DATA();

    		const USR_Y_AND_X = COLLECT_VALUE2.map(V => V.filter(V2 => V2[2] === 'USR')).filter(V => V.length > 0)[0][0];
    		return USR_Y_AND_X;
    	};

    	let tmp = null;

    	// 指定したUNTの位置を取得する関数
    	const get_UNT_position = (UNT_NUM = 0) => {
    		try {
    			// https://stackoverflow.com/questions/38968598/what-happened-inside-of-1-tostring-and-1-tostring-in-javascript
    			const UNT_NUM_STR = UNT_NUM.toString();

    			const UNT_NUM_N = 'UNT_NUM_' + UNT_NUM.toString();

    			// UNTの位置を取得する
    			// filterで['TYPE']がUNTかつ['NAME']がUNT_0等のものを抽出する
    			const NUMBER_STR_AND_YX = COLLECT_VALUE2.map((V1, I1) => V1.map((V2, I2) => {
    				return typeof V2[2] === 'object'
    				? [V2[2]['NAME'].replaceAll('UNT_', ''), [I1, I2]]
    				: null;
    			})).flat().filter(V => V !== null);

    			tmp = NUMBER_STR_AND_YX;
    			const res1 = NUMBER_STR_AND_YX.filter(V => V[0] === UNT_NUM_STR)[0][1];
    			const [Y, X] = res1;
    			return [Y, X];
    		} catch(error) {
    			console.log(error);
    		}
    	};

    	// key_press関数を実行した後に、UNTの行動を実行する関数。
    	// 隣接しているUSRがいたらアタックする
    	// USRが隣接していない場合はランダムに1マス移動する
    	// UNTの移動順はATKの値が高いUNTから順番に行動する。ATKが同値の場合はUNT_NUMが小さい方から行動する。
    	const UNT_ATTACK_OR_MOVE = NAME => {
    		try {
    			const UNT_NUM = NAME ? Number(NAME.replaceAll('UNT_', '')) : 0;
    			const usr_position = get_USR_position();
    			const unt_position = get_UNT_position(UNT_NUM);

    			// 隣接しているマスにUSRがいたらアタックする
    			if (// 上下左右にUSRがいる場合はアタックする
    			unt_position[1] === usr_position[1] && unt_position[0] === usr_position[0] - 1 || unt_position[1] === usr_position[1] && unt_position[0] === usr_position[0] + 1 || unt_position[0] === usr_position[0] && unt_position[0] === usr_position[1] - 1 || unt_position[0] === usr_position[0] && unt_position[0] === usr_position[1] + 1) {
    				attack_UNT_to_USR(UNT_NUM);
    				return;
    			}

    			const UNT_ADJACENT_Y_AND_X = get_click_position(unt_position[0], unt_position[1], false);

    			// 隣接しているマスにUNTがいたらbreedする
    			if (// 上下左右にUNTがいる場合はbreedする
    			// true
    			// window.app.$capture_state().COLLECT_VALUE2[0][3][2]['TYPE']
    			UNT_ADJACENT_Y_AND_X.some(V => COLLECT_VALUE2[V[0]][V[1]][2]['TYPE'] === 'UNT')) {
    				// get_click_position();
    				// console.log(unt_position);
    				// console.log('in breed');
    				const target_unit_num_ary = UNT_ADJACENT_Y_AND_X.filter(V => COLLECT_VALUE2[V[0]][V[1]][2]['TYPE'] === 'UNT').map(V => COLLECT_VALUE2[V[0]][V[1]][2]['NAME'].replaceAll('UNT_', '')).map(V => Number(V));

    				// .sort((a, b) => a - b)[0];
    				breed(UNT_NUM, target_unit_num_ary);
    			} // console.log(Number(target_unit_num_ary));
    			// console.log(UNT_NUM);

    			// breed(UNT_NUM);
    			// return;
    			// 隣接しているマスにUSRがいない場合はランダムに1マス移動する
    			// NONのマスには移動できる。BLCのマスには移動できない。GOLのマスには移動できない。
    			// 移動先のマスをランダムに選択する
    			const random_move = Math.floor(Math.random() * 4);

    			// 移動先のマスを決定する
    			const move_position = [
    				[unt_position[0], unt_position[1] - 1],
    				[unt_position[0], unt_position[1] + 1],
    				[unt_position[0] - 1, unt_position[1]],
    				[unt_position[0] + 1, unt_position[1]]
    			];

    			// 移動先のマスがNONの場合は移動する
    			let shuffled_move_position = shuffle(move_position);

    			for (let i = 0; i < shuffled_move_position.length; i++) {
    				let Move_to = shuffled_move_position[i];

    				// Move_toがNONの場合は移動し、早期リターンする
    				if (COLLECT_VALUE2[Move_to[0]][Move_to[1]][2] === 'NON') {
    					// UNTの位置をNONに変更する
    					change_BLC_to_NON(unt_position[0], unt_position[1]);

    					// 色も更新する
    					$$invalidate(14, COLLECT_VALUE2[unt_position[0]][unt_position[1]][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);

    					// UNTの位置を更新する
    					$$invalidate(14, COLLECT_VALUE2[Move_to[0]][Move_to[1]][2] = UNT_DATA_OBJ['UNT_NUM_' + UNT_NUM], COLLECT_VALUE2);

    					// 色も更新する
    					$$invalidate(14, COLLECT_VALUE2[Move_to[0]][Move_to[1]][3] = 'background-color: #00FF00', COLLECT_VALUE2);

    					// 早期リターンする
    					shuffled_move_position = [];
    				}
    			}
    		} catch(error) {
    			
    		} // console.log(error);
    	};

    	// Y,Xの指定をランダムにする
    	const random_BLC_Y_AND_X = () => {
    		// const random_Y = Math.floor(Math.random() * 10);
    		// const random_X = Math.floor(Math.random() * 10);
    		const random_Y = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])[0];

    		const random_X = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])[0];
    		return [random_Y, random_X];
    	};

    	// BLCの任意の分量(パーセント)をNONに変更する関数
    	const change_percent_BLC_to_NON = (Percent = 80) => {
    		// BLCの総量を取得する
    		const BLC_count = COLLECT_VALUE2.map(V => V.filter(V2 => V2[2] === 'BLC')).flat().length;

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
    			const NON_Y_AND_X = COLLECT_VALUE2.map(V => V.filter(V2 => V2[2] === 'NON')).flat().map(V => V.slice(0, 2));
    			return NON_Y_AND_X;
    		};

    		const set_UNT = () => {
    			let all_NON = get_NON_Y_AND_X();

    			// 以下のようにUNTを配置する
    			Object.entries(UNT_DATA_OBJ).forEach((V, I) => {
    				const UNT_NUM_N = 'UNT_NUM_' + I.toString();
    				const random_Y_AND_X = shuffle(all_NON)[0];

    				// random_Y_AND_Xをall_NONから削除する
    				all_NON = all_NON.filter(V => V !== random_Y_AND_X);

    				$$invalidate(14, COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][2] = UNT_DATA_OBJ[UNT_NUM_N], COLLECT_VALUE2);
    				$$invalidate(14, COLLECT_VALUE2[random_Y_AND_X[0]][random_Y_AND_X[1]][3] = 'background-color: #00FF00', COLLECT_VALUE2);
    			});
    		};

    		set_UNT();
    	};

    	const get_all_USR_ID = () => USR_DATA_ARRAY.map((V, I) => V['ID']);

    	// マップを初期化してやり直す関数
    	// 起動時にも実行する
    	const reset_or_init_map = ({ when_mounted_time = true, go_up = false, when_died = false }) => {
    		// when_mounted_timeがfalseの時はconfirmでagainを表示する
    		// againでない場合は早期リターンして、以降の処理はしない
    		// if(when_mounted_time === false){
    		// 	reset_or_init_map({when_mounted_time: true, go_up: false});
    		// }
    		// COLLECT_VALUE2を初期化する
    		$$invalidate(14, COLLECT_VALUE2 = R.xprod(R.range(0, 10), R.range(0, 10)).map(V => V.concat(['BLC'])).map(V => V.concat(['background-color: #808080'])));

    		$$invalidate(14, COLLECT_VALUE2 = R.splitEvery(10, COLLECT_VALUE2));
    		set_USR_to_init_position();

    		// USRのスポーン位置にUSR_DATA_ARRAYを反映する
    		// reflection_USR_DATA_ARRAY();
    		$$invalidate(13, DIED = '');

    		if ((when_died === true)) {
    			get_all_USR_ID().forEach(Usr_Id => recharge_magic_count(Usr_Id));
    			retry_data_setup();
    			$$invalidate(8, GOLD = USR_DATA_ARRAY[0]['GOLD']);
    		}

    		$$invalidate(7, UNT_DATA_OBJ = {
    			UNT_NUM_0: {
    				TYPE: 'UNT',
    				NAME: 'UNT_0',
    				LFP: 3,
    				ATK: 1,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_1: {
    				TYPE: 'UNT',
    				NAME: 'UNT_1',
    				LFP: 2,
    				ATK: 2,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_2: {
    				TYPE: 'UNT',
    				NAME: 'UNT_2',
    				LFP: 2,
    				ATK: 3,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_3: {
    				TYPE: 'UNT',
    				NAME: 'UNT_3',
    				LFP: 2,
    				ATK: 4,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_4: {
    				TYPE: 'UNT',
    				NAME: 'UNT_4',
    				LFP: 4,
    				ATK: 1,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_5: {
    				TYPE: 'UNT',
    				NAME: 'UNT_5',
    				LFP: 4,
    				ATK: 2,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_6: {
    				TYPE: 'UNT',
    				NAME: 'UNT_6',
    				LFP: 5,
    				ATK: 1,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_7: {
    				TYPE: 'UNT',
    				NAME: 'UNT_7',
    				LFP: 5,
    				ATK: 2,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_8: {
    				TYPE: 'UNT',
    				NAME: 'UNT_8',
    				LFP: 5,
    				ATK: 3,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_9: {
    				TYPE: 'UNT',
    				NAME: 'UNT_9',
    				LFP: 5,
    				ATK: 4,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_10: {
    				TYPE: 'UNT',
    				NAME: 'UNT_10',
    				LFP: 6,
    				ATK: 1,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_11: {
    				TYPE: 'UNT',
    				NAME: 'UNT_11',
    				LFP: 6,
    				ATK: 2,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_12: {
    				TYPE: 'UNT',
    				NAME: 'UNT_12',
    				LFP: 6,
    				ATK: 3,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_13: {
    				TYPE: 'UNT',
    				NAME: 'UNT_13',
    				LFP: 6,
    				ATK: 4,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_14: {
    				TYPE: 'UNT',
    				NAME: 'UNT_14',
    				LFP: 1,
    				ATK: 1,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_15: {
    				TYPE: 'UNT',
    				NAME: 'UNT_15',
    				LFP: 1,
    				ATK: 2,
    				BDP: 0,
    				RBP: 0
    			},
    			UNT_NUM_16: {
    				TYPE: 'UNT',
    				NAME: 'UNT_16',
    				LFP: 1,
    				ATK: 3,
    				BDP: 0,
    				RBP: 0
    			}
    		});

    		$$invalidate(7, UNT_DATA_OBJ = {});
    		let UNT_DATA_CONF = {};

    		if (go_up === true) {
    			get_all_USR_ID().forEach(Usr_Id => recharge_magic_count(Usr_Id));
    			switch_field_gacha();
    			get_all_USR_ID().forEach(Usr_Id => $$invalidate(6, USR_DATA_ARRAY[Usr_Id]['LFP'] += LFP_RECHARGE_NUM, USR_DATA_ARRAY));
    			$$invalidate(4, FLOOR += 1);
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
    				ATK_Range_Array: [ATK_Range_Array_Min, ATK_Range_Array_Max]
    			};
    		}

    		$$invalidate(7, UNT_DATA_OBJ = make_UNT_DATA_OBJ(UNT_DATA_CONF));

    		// GOALを初期位置に戻す
    		change_BLC_to_GOL(0, 9);

    		// PICKELを初期化する
    		$$invalidate(11, PICKEL = 0);

    		// GOALをfalseにする
    		$$invalidate(12, GOAL = false);

    		// ADJACENT_Y_AND_Xを初期化する
    		ADJACENT_Y_AND_X = [];

    		// CURRENT_Y_AND_Xを初期化する
    		CURRENT_Y_AND_X = clone_START_CURRENT_Y_AND_X_ARRAY();

    		// BLCを30%をNONに変更する
    		change_percent_BLC_to_NON();

    		// バトルシステムの開発のために、初期位置の前後左右をNONに変更する
    		$$invalidate(14, COLLECT_VALUE2[5][4][2] = 'NON', COLLECT_VALUE2);

    		$$invalidate(14, COLLECT_VALUE2[5][4][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[5][6][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[5][6][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[4][5][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[4][5][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[6][5][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[6][5][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[5][3][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[5][3][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[5][7][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[5][7][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[3][5][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[3][5][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[7][5][2] = 'NON', COLLECT_VALUE2);
    		$$invalidate(14, COLLECT_VALUE2[7][5][3] = 'background-color: #FFFFFF', COLLECT_VALUE2);
    		change_UNT_to_NON();

    		document.addEventListener('keypress', () => click_or_keypress_event(event, {
    			Key: null,
    			Usr_Id: CURRENT_USER_ID,
    			Magic: null,
    			Eqp_I: null
    		}));
    	};

    	onMount(async () => {
    		try {
    			reset_or_init_map({
    				when_mounted_time: true,
    				go_up: false,
    				when_died: false
    			});
    		} catch(error) {
    			console.log(error);
    		}
    	});

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input0_change_handler() {
    		SHOW_DAMAGE = this.__value;
    		$$invalidate(5, SHOW_DAMAGE);
    	}

    	function input1_change_handler() {
    		SHOW_DAMAGE = this.__value;
    		$$invalidate(5, SHOW_DAMAGE);
    	}

    	const keydown_handler = (Y, X) => get_click_position(Y, X, true);
    	const click_handler = (Y, X) => get_click_position(Y, X, true);

    	const click_handler_1 = () => click_or_keypress_event(null, {
    		Key: 'w',
    		Usr_Id: CURRENT_USER_ID,
    		Magic: null,
    		Eqp_I: null
    	});

    	const click_handler_2 = () => click_or_keypress_event(null, {
    		Key: 'a',
    		Usr_Id: CURRENT_USER_ID,
    		Magic: null,
    		Eqp_I: null
    	});

    	const click_handler_3 = () => click_or_keypress_event(null, {
    		Key: 'd',
    		Usr_Id: CURRENT_USER_ID,
    		Magic: null,
    		Eqp_I: null
    	});

    	const click_handler_4 = () => click_or_keypress_event(null, {
    		Key: 's',
    		Usr_Id: CURRENT_USER_ID,
    		Magic: null,
    		Eqp_I: null
    	});

    	const click_handler_5 = (EQP, EQP_I, USR_DATA) => click_or_keypress_event(null, {
    		Magic: EQP.MAGIC,
    		Eqp_I: EQP_I,
    		// Usr_Id: CURRENT_USER_ID,
    		Usr_Id: USR_DATA['ID']
    	});

    	const click_handler_6 = EQP_I => UN_EQP(EQP_I, 0);
    	const click_handler_7 = () => slot_exe_once({ Rate_Param: 1 });
    	const click_handler_8 = () => slot_exe_once({ Rate_Param: 4 });
    	const click_handler_9 = () => slot_exe_once({ Rate_Param: 8 });

    	const click_handler_10 = (EQP, EQP_I) => set_EQP({
    		Eqp: EQP,
    		// Eqp_Limit: 5,
    		Eqp_Index: EQP_I,
    		// Usr_Id: 0,
    		Usr_Id: CURRENT_USER_ID
    	});

    	function div13_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			rootElement = $$value;
    			$$invalidate(0, rootElement);
    		});
    	}

    	$$self.$capture_state = () => ({
    		field_none,
    		gacha_none,
    		INIT_USR_DATA_ARRAY_0,
    		INIT_USR_DATA_ARRAY_1,
    		INIT_USR_DATA_ARRAY_2,
    		START_CURRENT_Y_AND_X_ARRAY,
    		set_USR_to_init_position,
    		clone_START_CURRENT_Y_AND_X_ARRAY,
    		CURRENT_Y_AND_X,
    		CURRENT_USER_ID,
    		UNIT_TURN,
    		change_CURRENT_USR_ID,
    		reflect_USR_DATA,
    		spawn,
    		breed,
    		rootElement,
    		EQP_LIMIT,
    		KILL_STREAK,
    		kill_streak_stack_get_more_gold,
    		what_sort_by_any,
    		onMount,
    		switch_field_gacha,
    		UN_EQP,
    		recharge_magic_count,
    		next_field,
    		toggle_gacha_display,
    		LFP_ATK_Range_Array_Min_Max_Table,
    		make_UNT_DATA_OBJ,
    		FLOOR,
    		SHOW_DAMAGE,
    		USR_DATA_ARRAY,
    		retry_data_setup,
    		decrement_MAGIC_COUNTER,
    		convert,
    		convert_for_magic,
    		DEV_MODE,
    		set_EQP,
    		LFP_RECHARGE_NUM,
    		UNT_DATA_OBJ,
    		GOLD,
    		MINE,
    		KAKUHEN,
    		KAKUHEN_COUNTER,
    		KAKUHEN_COUNTER_LIMIT,
    		RARITY_ZERO_VOLUME,
    		PROBABILITY_CHANGE_THRESHOLD_0,
    		PROBABILITY_CHANGE_THRESHOLD_1,
    		DECREASE_PERCENT,
    		no_magic,
    		ORIGINAL_SLOT,
    		SLOT,
    		ERROR_MESSAGE,
    		PICKEL,
    		GOAL,
    		DIED,
    		ADJACENT_Y_AND_X,
    		COLLECT_VALUE2,
    		SLOT2,
    		SLOT3,
    		make_slot,
    		decrease_any_rarity,
    		RATE_AND_X_PAIR,
    		make_high_rate_slot,
    		slot_exe_once,
    		magic_USR_to_UNT,
    		get_click_position,
    		change_BLC_to_GOL,
    		change_BLC_to_NON,
    		attack_USR_to_UNT,
    		attack_UNT_to_USR,
    		damage_alert,
    		damage_effect,
    		click_or_keypress_event,
    		get_USR_position,
    		tmp,
    		get_UNT_position,
    		UNT_ATTACK_OR_MOVE,
    		random_BLC_Y_AND_X,
    		change_percent_BLC_to_NON,
    		change_UNT_to_NON,
    		get_all_USR_ID,
    		reset_or_init_map
    	});

    	$$self.$inject_state = $$props => {
    		if ('field_none' in $$props) $$invalidate(22, field_none = $$props.field_none);
    		if ('gacha_none' in $$props) $$invalidate(23, gacha_none = $$props.gacha_none);
    		if ('START_CURRENT_Y_AND_X_ARRAY' in $$props) START_CURRENT_Y_AND_X_ARRAY = $$props.START_CURRENT_Y_AND_X_ARRAY;
    		if ('CURRENT_Y_AND_X' in $$props) CURRENT_Y_AND_X = $$props.CURRENT_Y_AND_X;
    		if ('CURRENT_USER_ID' in $$props) $$invalidate(2, CURRENT_USER_ID = $$props.CURRENT_USER_ID);
    		if ('UNIT_TURN' in $$props) UNIT_TURN = $$props.UNIT_TURN;
    		if ('rootElement' in $$props) $$invalidate(0, rootElement = $$props.rootElement);
    		if ('KILL_STREAK' in $$props) $$invalidate(3, KILL_STREAK = $$props.KILL_STREAK);
    		if ('FLOOR' in $$props) $$invalidate(4, FLOOR = $$props.FLOOR);
    		if ('SHOW_DAMAGE' in $$props) $$invalidate(5, SHOW_DAMAGE = $$props.SHOW_DAMAGE);
    		if ('USR_DATA_ARRAY' in $$props) $$invalidate(6, USR_DATA_ARRAY = $$props.USR_DATA_ARRAY);
    		if ('DEV_MODE' in $$props) DEV_MODE = $$props.DEV_MODE;
    		if ('UNT_DATA_OBJ' in $$props) $$invalidate(7, UNT_DATA_OBJ = $$props.UNT_DATA_OBJ);
    		if ('GOLD' in $$props) $$invalidate(8, GOLD = $$props.GOLD);
    		if ('MINE' in $$props) $$invalidate(1, MINE = $$props.MINE);
    		if ('KAKUHEN' in $$props) $$invalidate(9, KAKUHEN = $$props.KAKUHEN);
    		if ('KAKUHEN_COUNTER' in $$props) $$invalidate(10, KAKUHEN_COUNTER = $$props.KAKUHEN_COUNTER);
    		if ('SLOT' in $$props) SLOT = $$props.SLOT;
    		if ('ERROR_MESSAGE' in $$props) ERROR_MESSAGE = $$props.ERROR_MESSAGE;
    		if ('PICKEL' in $$props) $$invalidate(11, PICKEL = $$props.PICKEL);
    		if ('GOAL' in $$props) $$invalidate(12, GOAL = $$props.GOAL);
    		if ('DIED' in $$props) $$invalidate(13, DIED = $$props.DIED);
    		if ('ADJACENT_Y_AND_X' in $$props) ADJACENT_Y_AND_X = $$props.ADJACENT_Y_AND_X;
    		if ('COLLECT_VALUE2' in $$props) $$invalidate(14, COLLECT_VALUE2 = $$props.COLLECT_VALUE2);
    		if ('SLOT2' in $$props) SLOT2 = $$props.SLOT2;
    		if ('SLOT3' in $$props) $$invalidate(15, SLOT3 = $$props.SLOT3);
    		if ('tmp' in $$props) tmp = $$props.tmp;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*MINE*/ 2) {
    			// import { beforeUpdate, afterUpdate } from 'svelte';
    			MINE && what_sort_by_any({
    				What: MINE,
    				Any: 'RARITY',
    				Asc_Desc: 'DESC'
    			});
    		}

    		if ($$self.$$.dirty[0] & /*rootElement, field_none*/ 4194305) {
    			// $: USR_DATA_ARRAY && console.log('update');
    			rootElement && rootElement.style.setProperty('--field-none', field_none);
    		}

    		if ($$self.$$.dirty[0] & /*rootElement, gacha_none*/ 8388609) {
    			rootElement && rootElement.style.setProperty('--gacha-none', gacha_none);
    		}
    	};

    	return [
    		rootElement,
    		MINE,
    		CURRENT_USER_ID,
    		KILL_STREAK,
    		FLOOR,
    		SHOW_DAMAGE,
    		USR_DATA_ARRAY,
    		UNT_DATA_OBJ,
    		GOLD,
    		KAKUHEN,
    		KAKUHEN_COUNTER,
    		PICKEL,
    		GOAL,
    		DIED,
    		COLLECT_VALUE2,
    		SLOT3,
    		UN_EQP,
    		next_field,
    		set_EQP,
    		slot_exe_once,
    		get_click_position,
    		click_or_keypress_event,
    		field_none,
    		gacha_none,
    		input0_change_handler,
    		$$binding_groups,
    		input1_change_handler,
    		keydown_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		click_handler_7,
    		click_handler_8,
    		click_handler_9,
    		click_handler_10,
    		div13_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1, -1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    // import App from './App.svelte';
    // import Gacha from './Gacha.svelte';


    const app = new App({
    	target: document.body,
    	// props: {
    	// 	name: 'Taro!!'
    	// }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
