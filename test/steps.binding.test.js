import assert from "assert"
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

describe("steps.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(new StepsBinding() instanceof Binding)
	})

	it("onCreated", () => {
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const steps = new Steps([ step, step_ ])
		const binding = new StepsBinding({ steps })
		rootBinding.run(StepsModel, { binding })
		assert.strictEqual(binding.identifier.indicators.children[0].classList.contains("indicator"), true)
		assert.strictEqual(binding.identifier.indicators.children[0].textContent, "test")
		assert.strictEqual(binding.identifier.indicators.children[1].classList.contains("indicator"), true)
		assert.strictEqual(binding.identifier.indicators.children[1].textContent, "cxzcxz")
		assert.strictEqual(binding.identifier.steps.children[0].classList.contains("step"), true)
		assert.strictEqual(binding.identifier.steps.children[1].classList.contains("step"), true)
		assert.strictEqual(binding._children.length, 4)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
		assert.ok(binding._children[0] instanceof Binding)
		assert.ok(binding._children[1] instanceof Binding)
		assert.ok(binding._children[2] instanceof Binding)
		assert.ok(binding._children[3] instanceof Binding)
		assert.strictEqual(binding._parent, rootBinding)
	})

	it("onCreatedNoIndicators", () => {
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const steps = new Steps([ step, step_ ])
		const binding = new StepsBinding({ steps, indicators: false })
		rootBinding.run(StepsModel, { binding })
		assert.strictEqual(binding.identifier.indicators.children.length, 0)
		assert.strictEqual(binding.identifier.indicators.style.display, "none")
		assert.strictEqual(binding.identifier.steps.children[0].classList.contains("step"), true)
		assert.strictEqual(binding.identifier.steps.children[1].classList.contains("step"), true)
		assert.strictEqual(binding._children.length, 2)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
		assert.ok(binding._children[0] instanceof Binding)
		assert.ok(binding._children[1] instanceof Binding)
		assert.strictEqual(binding._parent, rootBinding)
	})

	it("stepSet", () => {
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const steps = new Steps([ step, step_ ])
		const binding = new StepsBinding({ steps })
		rootBinding.run(StepsModel, { binding })
		assert.strictEqual(step.active, false)
		assert.strictEqual(step.state, Step.STATE.INITIAL)
		steps.emit("step set", "test")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, true)
		assert.strictEqual(step_.active, false)
		steps.emit("step set", "cxzcxz")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.DRAFT)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, true)
	})

	it("stepUnset", () => {
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const steps = new Steps([ step, step_ ])
		const binding = new StepsBinding({ steps })
		rootBinding.run(StepsModel, { binding })
		assert.strictEqual(step.active, false)
		assert.strictEqual(step.state, Step.STATE.INITIAL)
		steps.emit("step set", "test")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, true)
		assert.strictEqual(step_.active, false)
		steps.emit("step unset", "test")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
	})

	it("stepPrevious", () => {
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const step__ = new Step("rewter", stepModel, Binding)
		const steps = new Steps([ step, step_, step__ ])
		const binding = new StepsBinding({ steps })
		rootBinding.run(StepsModel, { binding })
		steps.emit("step previous")
		assert.strictEqual(step.state, Step.STATE.INITIAL)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step__.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step__.active, false)
		steps.emit("step set", "cxzcxz")
		steps.emit("step previous")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.DRAFT)
		assert.strictEqual(step__.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, true)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step__.active, false)
		steps.emit("step set", "rewter")
		steps.emit("step previous")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.DRAFT)
		assert.strictEqual(step__.state, Step.STATE.DRAFT)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, true)
		assert.strictEqual(step__.active, false)
	})

	it("stepNext", () => {
		const stepObject = { a: 1 }
		const step_Object = { b: 2 }
		const step__Object = { c: 3 }
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const step__ = new Step("rewter", stepModel, Binding)
		const steps = new Steps([ step, step_, step__ ])
		const binding = new StepsBinding({ steps })
		rootBinding.run(StepsModel, { binding })
		assert.strictEqual(step.state, Step.STATE.INITIAL)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step__.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step__.active, false)
		steps.emit("step set", "test")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step__.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, true)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step__.active, false)
		steps.emit("step next", stepObject)
		assert.strictEqual(step.data, stepObject)
		assert.strictEqual(step.state, Step.STATE.COMPLETED)
		assert.strictEqual(step_.state, Step.STATE.DRAFT)
		assert.strictEqual(step__.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, true)
		assert.strictEqual(step__.active, false)
		steps.emit("step next", step_Object)
		assert.strictEqual(step_.data, step_Object)
		assert.strictEqual(step.state, Step.STATE.COMPLETED)
		assert.strictEqual(step_.state, Step.STATE.COMPLETED)
		assert.strictEqual(step__.state, Step.STATE.DRAFT)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step__.active, true)
		let done = false
		steps.listen("done", () => {
			done = true
		})
		steps.emit("step next", step__Object)
		assert.strictEqual(step__.data, step__Object)
		assert.strictEqual(step.state, Step.STATE.COMPLETED)
		assert.strictEqual(step_.state, Step.STATE.COMPLETED)
		assert.strictEqual(step__.state, Step.STATE.COMPLETED)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step__.active, true)
		assert.ok(done)
	})

	it("reset", () => {
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
		assert.strictEqual(count, 3)
		assert.ok(set)
	})

	it("stepReset", () => {
		const step = new Step("test", stepModel, Binding)
		const step_ = new Step("cxzcxz", stepModel, Binding)
		const steps = new Steps([ step, step_ ])
		const binding = new StepsBinding({ steps })
		const stepObject = { a: 1 }
		rootBinding.run(StepsModel, { binding })
		assert.strictEqual(step.active, false)
		assert.strictEqual(step.state, Step.STATE.INITIAL)
		steps.emit("step set", "test")
		assert.strictEqual(step.state, Step.STATE.DRAFT)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
		assert.strictEqual(step.active, true)
		assert.strictEqual(step_.active, false)
		steps.emit("step next", stepObject)
		assert.strictEqual(step.state, Step.STATE.COMPLETED)
		assert.strictEqual(step_.state, Step.STATE.DRAFT)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, true)
		assert.strictEqual(step.data, stepObject)
		let stepReset = false
		step.listen("reset", () => {
			stepReset = true
		})
		steps.emit("step reset", "test")
		assert.strictEqual(step.state, Step.STATE.INITIAL)
		assert.strictEqual(step_.state, Step.STATE.DRAFT)
		assert.strictEqual(step.active, false)
		assert.strictEqual(step_.active, true)
		let unset = false
		steps.listen("step unset", name => {
			if(name === "cxzcxz") {
				unset = true
			}
		})
		steps.emit("step reset", "cxzcxz")
		assert.ok(unset)
		assert.strictEqual(step_.active, false)
		assert.strictEqual(step_.state, Step.STATE.INITIAL)
	})

})
