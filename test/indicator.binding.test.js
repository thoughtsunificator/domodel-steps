import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import IndicatorModel from "../src/model/indicator.js"

import IndicatorBinding from "../src/model/indicator.binding.js"

import { Step, Steps } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

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
	test.ok(new IndicatorBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.expect(5)
	const step = new Step("Test")
	const steps = new Steps([ step ])
	const binding = new IndicatorBinding({ step, steps })
	rootBinding.run(IndicatorModel(step), { binding })
	test.strictEqual(binding.root.classList.contains("indicator"), true)
	test.strictEqual(binding.root.textContent, "Test")
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.strictEqual(binding.root.classList.contains("draft"), false)
	test.strictEqual(binding.root.classList.contains("completed"), false)
	test.done()
}

export function set(test) {
	test.expect(2)
	const step = new Step("Test")
	const steps = new Steps([ step ])
	const binding = new IndicatorBinding({ step, steps })
	rootBinding.run(IndicatorModel, { binding })
	step.emit("set")
	test.strictEqual(binding.root.classList.contains("active"), true)
	test.strictEqual(binding.root.classList.contains("draft"), true)
	test.done()
}

export function setCompleted(test) {
	test.expect(3)
	const step = new Step("Test")
	step.state = Step.STATE.COMPLETED
	test.strictEqual(step.state, Step.STATE.COMPLETED)
	const steps = new Steps([ step ])
	const binding = new IndicatorBinding({ step, steps })
	rootBinding.run(IndicatorModel, { binding })
	step.emit("set")
	test.strictEqual(binding.root.classList.contains("active"), true)
	test.strictEqual(binding.root.classList.contains("draft"), false)
	test.done()
}

export function unSet(test) {
	test.expect(2)
	const step = new Step("Test")
	const steps = new Steps([ step ])
	const binding = new IndicatorBinding({ step, steps })
	rootBinding.run(IndicatorModel, { binding })
	binding.root.classList.add("active")
	test.strictEqual(binding.root.classList.contains("active"), true)
	step.emit("unset")
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.done()
}

export function completed(test) {
	test.expect(3)
	const step = new Step("Test")
	const steps = new Steps([ step ])
	const binding = new IndicatorBinding({ step, steps })
	rootBinding.run(IndicatorModel, { binding })
	binding.root.classList.add("draft")
	test.strictEqual(binding.root.classList.contains("draft"), true)
	step.emit("completed")
	test.strictEqual(binding.root.classList.contains("completed"), true)
	test.strictEqual(binding.root.classList.contains("draft"), false)
	test.done()
}

export function reset(test) {
	test.expect(6)
	const step = new Step("Test")
	const steps = new Steps([ step ])
	const binding = new IndicatorBinding({ step, steps })
	rootBinding.run(IndicatorModel, { binding })
	binding.root.classList.add("completed")
	binding.root.classList.add("active")
	binding.root.classList.add("draft")
	test.strictEqual(binding.root.classList.contains("completed"), true)
	test.strictEqual(binding.root.classList.contains("draft"), true)
	test.strictEqual(binding.root.classList.contains("active"), true)
	step.emit("reset")
	test.strictEqual(binding.root.classList.contains("completed"), false)
	test.strictEqual(binding.root.classList.contains("draft"), false)
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.done()
}
