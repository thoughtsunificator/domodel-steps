import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import StepsModel from "../src/model/steps.js"

import StepsBinding from "../src/model/steps.binding.js"

import { Step, Steps } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const stepModel = { tagName: "div" }

const RootModel = { tagName: "div" }
let rootBinding

export function setUp(callback) {
	rootBinding = new Binding()
	Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	callback()
}

export function tearDown(callback) {
	rootBinding.remove()
	callback()
}

export function instance(test) {
	test.expect(1)
	test.ok(new StepsBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.expect(14)
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const steps = new Steps([ step, step_ ])
	const binding = new StepsBinding({ steps })
	rootBinding.run(StepsModel, { binding })
	test.strictEqual(binding.identifier.indicators.children[0].classList.contains("indicator"), true)
	test.strictEqual(binding.identifier.indicators.children[0].textContent, "test")
	test.strictEqual(binding.identifier.indicators.children[1].classList.contains("indicator"), true)
	test.strictEqual(binding.identifier.indicators.children[1].textContent, "cxzcxz")
	test.strictEqual(binding.identifier.steps.children[0].classList.contains("step"), true)
	test.strictEqual(binding.identifier.steps.children[1].classList.contains("step"), true)
	test.strictEqual(binding._children.length, 4)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, false)
	test.ok(binding._children[0] instanceof Binding)
	test.ok(binding._children[1] instanceof Binding)
	test.ok(binding._children[2] instanceof Binding)
	test.ok(binding._children[3] instanceof Binding)
	test.strictEqual(binding._parent, rootBinding)
	test.done()
}

export function stepSet(test) {
	test.expect(10)
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const steps = new Steps([ step, step_ ])
	const binding = new StepsBinding({ steps })
	rootBinding.run(StepsModel, { binding })
	test.strictEqual(step.active, false)
	test.strictEqual(step.state, Step.STATE.INITIAL)
	steps.emit("step set", "test")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, true)
	test.strictEqual(step_.active, false)
	steps.emit("step set", "cxzcxz")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.DRAFT)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, true)
	test.done()
}

export function stepUnset(test) {
	test.expect(10)
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const steps = new Steps([ step, step_ ])
	const binding = new StepsBinding({ steps })
	rootBinding.run(StepsModel, { binding })
	test.strictEqual(step.active, false)
	test.strictEqual(step.state, Step.STATE.INITIAL)
	steps.emit("step set", "test")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, true)
	test.strictEqual(step_.active, false)
	steps.emit("step unset", "test")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, false)
	test.done()
}

export function stepPrevious(test) {
	test.expect(18)
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const step__ = new Step("rewter", stepModel, Binding)
	const steps = new Steps([ step, step_, step__ ])
	const binding = new StepsBinding({ steps })
	rootBinding.run(StepsModel, { binding })
	steps.emit("step previous")
	test.strictEqual(step.state, Step.STATE.INITIAL)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step__.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, false)
	test.strictEqual(step__.active, false)
	steps.emit("step set", "cxzcxz")
	steps.emit("step previous")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.DRAFT)
	test.strictEqual(step__.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, true)
	test.strictEqual(step_.active, false)
	test.strictEqual(step__.active, false)
	steps.emit("step set", "rewter")
	steps.emit("step previous")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.DRAFT)
	test.strictEqual(step__.state, Step.STATE.DRAFT)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, true)
	test.strictEqual(step__.active, false)
	test.done()
}

export function stepNext(test) {
	test.expect(34)
	const stepObject = { a: 1 }
	const step_Object = { b: 2 }
	const step__Object = { c: 3 }
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const step__ = new Step("rewter", stepModel, Binding)
	const steps = new Steps([ step, step_, step__ ])
	const binding = new StepsBinding({ steps })
	rootBinding.run(StepsModel, { binding })
	test.strictEqual(step.state, Step.STATE.INITIAL)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step__.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, false)
	test.strictEqual(step__.active, false)
	steps.emit("step set", "test")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step__.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, true)
	test.strictEqual(step_.active, false)
	test.strictEqual(step__.active, false)
	steps.emit("step next", stepObject)
	test.strictEqual(step.data, stepObject)
	test.strictEqual(step.state, Step.STATE.COMPLETED)
	test.strictEqual(step_.state, Step.STATE.DRAFT)
	test.strictEqual(step__.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, true)
	test.strictEqual(step__.active, false)
	steps.emit("step next", step_Object)
	test.strictEqual(step_.data, step_Object)
	test.strictEqual(step.state, Step.STATE.COMPLETED)
	test.strictEqual(step_.state, Step.STATE.COMPLETED)
	test.strictEqual(step__.state, Step.STATE.DRAFT)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, false)
	test.strictEqual(step__.active, true)
	let done = false
	steps.listen("done", () => {
		done = true
	})
	steps.emit("step next", step__Object)
	test.strictEqual(step__.data, step__Object)
	test.strictEqual(step.state, Step.STATE.COMPLETED)
	test.strictEqual(step_.state, Step.STATE.COMPLETED)
	test.strictEqual(step__.state, Step.STATE.COMPLETED)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, false)
	test.strictEqual(step__.active, true)
	test.ok(done)
	test.done()
}

export function reset(test) {
	test.expect(2)
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const step__ = new Step("rewter", stepModel, Binding)
	const steps = new Steps([ step, step_, step__ ])
	const binding = new StepsBinding({ steps })
	rootBinding.run(StepsModel, { binding })
	let count = 0
	let set = false
	steps.listen("step reset", name => {
		if(count === 0 && name === "test") {
			count++
		} else if(count === 1 && name === "cxzcxz") {
			count++
		} else if(count === 2 && name === "rewter") {
			count++
		}
	})
	steps.listen("step set", name => {
		if(count === 3 && name === "test") {
			set = true
		}
	})
	steps.emit("reset")
	test.strictEqual(count, 3)
	test.ok(set)
	test.done()
}

export function stepReset(test) {
	test.expect(18)
	const step = new Step("test", stepModel, Binding)
	const step_ = new Step("cxzcxz", stepModel, Binding)
	const steps = new Steps([ step, step_ ])
	const binding = new StepsBinding({ steps })
	const stepObject = { a: 1 }
	rootBinding.run(StepsModel, { binding })
	test.strictEqual(step.active, false)
	test.strictEqual(step.state, Step.STATE.INITIAL)
	steps.emit("step set", "test")
	test.strictEqual(step.state, Step.STATE.DRAFT)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.strictEqual(step.active, true)
	test.strictEqual(step_.active, false)
	steps.emit("step next", stepObject)
	test.strictEqual(step.state, Step.STATE.COMPLETED)
	test.strictEqual(step_.state, Step.STATE.DRAFT)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, true)
	test.strictEqual(step.data, stepObject)
	let stepReset = false
	step.listen("reset", () => {
		stepReset = true
	})
	steps.emit("step reset", "test")
	test.strictEqual(step.state, Step.STATE.INITIAL)
	test.strictEqual(step_.state, Step.STATE.DRAFT)
	test.strictEqual(step.active, false)
	test.strictEqual(step_.active, true)
	let unset = false
	steps.listen("step unset", name => {
		if(name === "cxzcxz") {
			unset = true
		}
	})
	steps.emit("step reset", "cxzcxz")
	test.ok(unset)
	test.strictEqual(step_.active, false)
	test.strictEqual(step_.state, Step.STATE.INITIAL)
	test.done()
}
