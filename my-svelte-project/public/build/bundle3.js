
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
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
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
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
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
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
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

    /* src/Gifer.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;
    const file = "src/Gifer.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    // (173:0) {#if fileNames.length > 0}
    function create_if_block(ctx) {
    	let ul;
    	let each_value = /*fileNames*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file, 173, 0, 4549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fileNames*/ 1) {
    				each_value = /*fileNames*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(173:0) {#if fileNames.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (175:2) {#each fileNames as fileName}
    function create_each_block(ctx) {
    	let li;
    	let t_value = /*fileName*/ ctx[15] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file, 175, 1, 4587);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fileNames*/ 1 && t_value !== (t_value = /*fileName*/ ctx[15] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(175:2) {#each fileNames as fileName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t0;
    	let input0;
    	let t1;
    	let button;
    	let t3;
    	let input1;
    	let t4;
    	let fieldset0;
    	let label0;
    	let input2;
    	let input2_checked_value;
    	let t5;
    	let t6;
    	let label1;
    	let input3;
    	let input3_checked_value;
    	let t7;
    	let t8;
    	let fieldset1;
    	let label2;
    	let input4;
    	let input4_checked_value;
    	let t9;
    	let t10;
    	let label3;
    	let input5;
    	let input5_checked_value;
    	let t11;
    	let t12;
    	let t13;
    	let img_1;
    	let img_1_src_value;
    	let t14;
    	let canvas;
    	let t15;
    	let div;
    	let mounted;
    	let dispose;
    	let if_block = /*fileNames*/ ctx[0].length > 0 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			t0 = text("also directory: ");
    			input0 = element("input");
    			t1 = space();
    			button = element("button");
    			button.textContent = "exe_make_gif";
    			t3 = text("  \ndelay_num: ");
    			input1 = element("input");
    			t4 = space();
    			fieldset0 = element("fieldset");
    			label0 = element("label");
    			input2 = element("input");
    			t5 = text("\n\t  repeat");
    			t6 = space();
    			label1 = element("label");
    			input3 = element("input");
    			t7 = text("\n\t  no_repeat");
    			t8 = space();
    			fieldset1 = element("fieldset");
    			label2 = element("label");
    			input4 = element("input");
    			t9 = text("\n\tASC");
    			t10 = space();
    			label3 = element("label");
    			input5 = element("input");
    			t11 = text("\n\tDESC");
    			t12 = space();
    			if (if_block) if_block.c();
    			t13 = space();
    			img_1 = element("img");
    			t14 = space();
    			canvas = element("canvas");
    			t15 = space();
    			div = element("div");
    			attr_dev(input0, "type", "file");
    			input0.multiple = true;
    			attr_dev(input0, "webkitdirectory", "");
    			add_location(input0, file, 148, 16, 3665);
    			add_location(button, file, 149, 0, 3738);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", "1000");
    			attr_dev(input1, "step", "10");
    			add_location(input1, file, 150, 11, 3805);
    			input2.checked = input2_checked_value = /*repeat_bool*/ ctx[4] === true;
    			attr_dev(input2, "type", "radio");
    			attr_dev(input2, "name", "repeat_type");
    			input2.value = "repeat";
    			add_location(input2, file, 153, 3, 3904);
    			add_location(label0, file, 152, 1, 3893);
    			input3.checked = input3_checked_value = /*repeat_bool*/ ctx[4] === false;
    			attr_dev(input3, "type", "radio");
    			attr_dev(input3, "name", "repeat_type");
    			input3.value = "no_repeat";
    			add_location(input3, file, 157, 3, 4057);
    			add_location(label1, file, 156, 1, 4046);
    			add_location(fieldset0, file, 151, 0, 3881);
    			input4.checked = input4_checked_value = /*sort_by_ASC*/ ctx[2] === true;
    			attr_dev(input4, "type", "radio");
    			attr_dev(input4, "name", "sort_type");
    			input4.value = "asc";
    			add_location(input4, file, 163, 1, 4239);
    			add_location(label2, file, 162, 2, 4230);
    			input5.checked = input5_checked_value = /*sort_by_ASC*/ ctx[2] === false;
    			attr_dev(input5, "type", "radio");
    			attr_dev(input5, "name", "sort_type");
    			input5.value = "desc";
    			add_location(input5, file, 167, 1, 4378);
    			add_location(label3, file, 166, 2, 4369);
    			add_location(fieldset1, file, 161, 0, 4217);
    			if (!src_url_equal(img_1.src, img_1_src_value = /*result_gif_url*/ ctx[1])) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", "");
    			attr_dev(img_1, "class", "result_gif svelte-w6da3f");
    			add_location(img_1, file, 180, 0, 4630);
    			attr_dev(canvas, "class", "target_canvas");
    			add_location(canvas, file, 181, 0, 4685);
    			attr_dev(div, "class", "target_img_tags");
    			add_location(div, file, 182, 0, 4725);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, input0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, input1, anchor);
    			set_input_value(input1, /*delay_num*/ ctx[3]);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, fieldset0, anchor);
    			append_dev(fieldset0, label0);
    			append_dev(label0, input2);
    			append_dev(label0, t5);
    			append_dev(fieldset0, t6);
    			append_dev(fieldset0, label1);
    			append_dev(label1, input3);
    			append_dev(label1, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, fieldset1, anchor);
    			append_dev(fieldset1, label2);
    			append_dev(label2, input4);
    			append_dev(label2, t9);
    			append_dev(fieldset1, t10);
    			append_dev(fieldset1, label3);
    			append_dev(label3, input5);
    			append_dev(label3, t11);
    			insert_dev(target, t12, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, img_1, anchor);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, canvas, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*handleFileInput*/ ctx[7], false, false, false, false),
    					listen_dev(button, "click", /*exe_make_gif*/ ctx[8], false, false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[10]),
    					listen_dev(input2, "change", /*handleRepeatOrNorepeat*/ ctx[5], false, false, false, false),
    					listen_dev(input3, "change", /*handleRepeatOrNorepeat*/ ctx[5], false, false, false, false),
    					listen_dev(input4, "change", /*handleSortByChange*/ ctx[6], false, false, false, false),
    					listen_dev(input5, "change", /*handleSortByChange*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*delay_num*/ 8 && to_number(input1.value) !== /*delay_num*/ ctx[3]) {
    				set_input_value(input1, /*delay_num*/ ctx[3]);
    			}

    			if (dirty & /*repeat_bool*/ 16 && input2_checked_value !== (input2_checked_value = /*repeat_bool*/ ctx[4] === true)) {
    				prop_dev(input2, "checked", input2_checked_value);
    			}

    			if (dirty & /*repeat_bool*/ 16 && input3_checked_value !== (input3_checked_value = /*repeat_bool*/ ctx[4] === false)) {
    				prop_dev(input3, "checked", input3_checked_value);
    			}

    			if (dirty & /*sort_by_ASC*/ 4 && input4_checked_value !== (input4_checked_value = /*sort_by_ASC*/ ctx[2] === true)) {
    				prop_dev(input4, "checked", input4_checked_value);
    			}

    			if (dirty & /*sort_by_ASC*/ 4 && input5_checked_value !== (input5_checked_value = /*sort_by_ASC*/ ctx[2] === false)) {
    				prop_dev(input5, "checked", input5_checked_value);
    			}

    			if (/*fileNames*/ ctx[0].length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(t13.parentNode, t13);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*result_gif_url*/ 2 && !src_url_equal(img_1.src, img_1_src_value = /*result_gif_url*/ ctx[1])) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(input0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(fieldset0);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(fieldset1);
    			if (detaching) detach_dev(t12);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(img_1);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(canvas);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div);
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

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Gifer', slots, []);
    	let files = [];
    	let fileNames = [];
    	let result_gif_url = '';
    	let sort_by_ASC = true;
    	let delay_num = 200;
    	delay_num = 30;
    	let repeat_bool = true;
    	let img = null;

    	const handleRepeatOrNorepeat = event => {
    		console.log(event.target.value);

    		if (event.target.value === 'repeat') {
    			$$invalidate(4, repeat_bool = true);
    		} else if (event.target.value === 'no_repeat') {
    			$$invalidate(4, repeat_bool = false);
    		}
    	};

    	const handleSortByChange = event => {
    		console.log(event.target.value);

    		if (event.target.value === 'asc') {
    			$$invalidate(2, sort_by_ASC = true);
    		} else if (event.target.value === 'desc') {
    			$$invalidate(2, sort_by_ASC = false);
    		}
    	};

    	const handleFileInput = event => {
    		// event.target.filesにpngかjpgかjpeg以外のファイルが入っていたら取り除く
    		$$invalidate(9, files = Array.from(event.target.files).filter(file => {
    			const file_type = file.type;

    			if (file_type === 'image/png' || file_type === 'image/jpeg' || file_type === 'image/jpg') {
    				return true;
    			} else {
    				return false;
    			}
    		}));

    		// filesを作成日時でソートする(sort_by_ASCがtrueなら昇順、falseなら降順)
    		if (sort_by_ASC) {
    			files.sort((a, b) => a.lastModified - b.lastModified);
    		} else {
    			files.sort((a, b) => b.lastModified - a.lastModified);
    		}
    	}; //   files = event.target.files;
    	//   fileNames = Array.from(files).map((file) => file.name);

    	const make_file_names = () => $$invalidate(0, fileNames = Array.from(files).map(file => file.name));

    	// filesをimgタグに変換して<img class="original_files">としてtarget_img_tags直下に追加する関数
    	const make_img_tags = () => {
    		// original_filesがあれば削除する
    		const original_files = document.querySelectorAll('.original_files');

    		original_files.forEach(original_file => {
    			original_file.remove();
    		});

    		const target_img_tags = document.querySelector('.target_img_tags');

    		files.forEach(file => {
    			const img = document.createElement('img');
    			img.src = URL.createObjectURL(file);
    			img.classList.add('original_files');

    			// alt属性にファイル名を入れる
    			img.alt = file.name;

    			target_img_tags.appendChild(img);
    		});
    	};

    	let lastBlobUrl;

    	const exe_make_gif = () => {
    		var gif = new GIF({
    				repeat: repeat_bool ? 0 : -1, //	repeat count, -1 = no repeat, 0 = forever
    				quality: 1, //	pixel sample interval, lower is better
    				workers: 10, //	number of web workers to spawn
    				// workerScript:	gif, //.worker.js	url to load worker script from
    				// background:	'#fff', //	background color where source image is transparent
    				width: null, //	output image width
    				height: null, //	output image height
    				transparent: null, //	transparent hex color, 0x00FF00 = green
    				// transparent:	'#00FF00', //	transparent hex color, 0x00FF00 = green
    				// dither:	false, //	dithering method, e.g. FloydSteinberg-serpentine
    				debug: false, //	whether to print debug information to console
    				
    			});

    		document.querySelectorAll('.original_files').forEach(element => {
    			gif.addFrame(element, { delay: delay_num });
    		});

    		gif.on('finished', function (blob) {
    			// You have to call this when you no longer need that URL.
    			if (lastBlobUrl) {
    				URL.revokeObjectURL(lastBlobUrl);
    			}

    			lastBlobUrl = window.open(URL.createObjectURL(blob));

    			// blobをimgタグに対応したファイル形式に変換してresult_gif_urlに入れる
    			const blob_to_img = blob => {
    				const result_img = document.createElement('img');
    				result_img.src = URL.createObjectURL(blob);
    				result_img.classList.add('result_gif');

    				// alt属性にファイル名を入れる
    				result_img.alt = 'result_gif';

    				return result_img;
    			};

    			img = blob_to_img(blob);
    			$$invalidate(1, result_gif_url = img.src);
    		});

    		gif.render();
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Gifer> was created with unknown prop '${key}'`);
    	});

    	function input1_input_handler() {
    		delay_num = to_number(this.value);
    		$$invalidate(3, delay_num);
    	}

    	$$self.$capture_state = () => ({
    		files,
    		fileNames,
    		result_gif_url,
    		sort_by_ASC,
    		delay_num,
    		repeat_bool,
    		img,
    		handleRepeatOrNorepeat,
    		handleSortByChange,
    		handleFileInput,
    		make_file_names,
    		make_img_tags,
    		lastBlobUrl,
    		exe_make_gif
    	});

    	$$self.$inject_state = $$props => {
    		if ('files' in $$props) $$invalidate(9, files = $$props.files);
    		if ('fileNames' in $$props) $$invalidate(0, fileNames = $$props.fileNames);
    		if ('result_gif_url' in $$props) $$invalidate(1, result_gif_url = $$props.result_gif_url);
    		if ('sort_by_ASC' in $$props) $$invalidate(2, sort_by_ASC = $$props.sort_by_ASC);
    		if ('delay_num' in $$props) $$invalidate(3, delay_num = $$props.delay_num);
    		if ('repeat_bool' in $$props) $$invalidate(4, repeat_bool = $$props.repeat_bool);
    		if ('img' in $$props) img = $$props.img;
    		if ('lastBlobUrl' in $$props) lastBlobUrl = $$props.lastBlobUrl;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*files*/ 512) {
    			((() => {
    				make_file_names();
    				make_img_tags();
    			})());
    		}
    	};

    	return [
    		fileNames,
    		result_gif_url,
    		sort_by_ASC,
    		delay_num,
    		repeat_bool,
    		handleRepeatOrNorepeat,
    		handleSortByChange,
    		handleFileInput,
    		exe_make_gif,
    		files,
    		input1_input_handler
    	];
    }

    class Gifer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gifer",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const gifer = new Gifer({
    	target: document.body,
    });

    return gifer;

})();
//# sourceMappingURL=bundle3.js.map
