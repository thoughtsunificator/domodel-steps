import assert from "assert"
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

describe("indicator.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(new IndicatorBinding() instanceof Binding)
	})

	it("onCreated", () => {
		const step = new Step("Test")
		const steps = new Steps([ step ])
		const binding = new IndicatorBinding({ step, steps })
		rootBinding.run(IndicatorModel(step), { binding })
		assert.strictEqual(binding.root.classList.contains("indicator"), true)
		assert.strictEqual(binding.root.textContent, "Test")
		assert.strictEqual(binding.root.classList.contains("active"), false)
		assert.strictEqual(binding.root.classList.contains("draft"), false)
		assert.strictEqual(binding.root.classList.contains("completed"), false)
	})

	it("set", () => {
		const step = new Step("Test")
		const steps = new Steps([ step ])
		const binding = new IndicatorBinding({ step, steps })
		rootBinding.run(IndicatorModel, { binding })
		step.emit("set")
		assert.strictEqual(binding.root.classList.contains("active"), true)
		assert.strictEqual(binding.root.classList.contains("draft"), true)
	})

	it("setCompleted", () => {
		const step = new Step("Test")
		step.state = Step.STATE.COMPLETED
		assert.strictEqual(step.state, Step.STATE.COMPLETED)
		const steps = new Steps([ step ])
		const binding = new IndicatorBinding({ step, steps })
		rootBinding.run(IndicatorModel, { binding })
		step.emit("set")
		assert.strictEqual(binding.root.classList.contains("active"), true)
		assert.strictEqual(binding.root.classList.contains("draft"), false)
	})

	it("unSet", () => {
		const step = new Step("Test")
		const steps = new Steps([ step ])
		const binding = new IndicatorBinding({ step, steps })
		rootBinding.run(IndicatorModel, { binding })
		binding.root.classList.add("active")
		assert.strictEqual(binding.root.classList.contains("active"), true)
		step.emit("unset")
		assert.strictEqual(binding.root.classList.contains("active"), false)
	})

	it("completed", () => {
		const step = new Step("Test")
		const steps = new Steps([ step ])
		const binding = new IndicatorBinding({ step, steps })
		rootBinding.run(IndicatorModel, { binding })
		binding.root.classList.add("draft")
		assert.strictEqual(binding.root.classList.contains("draft"), true)
		step.emit("completed")
		assert.strictEqual(binding.root.classList.contains("completed"), true)
		assert.strictEqual(binding.root.classList.contains("draft"), false)
	})

	it("reset", () => {
		const step = new Step("Test")
		const steps = new Steps([ step ])
		const binding = new IndicatorBinding({ step, steps })
		rootBinding.run(IndicatorModel, { binding })
		binding.root.classList.add("completed")
		binding.root.classList.add("active")
		binding.root.classList.add("draft")
		assert.strictEqual(binding.root.classList.contains("completed"), true)
		assert.strictEqual(binding.root.classList.contains("draft"), true)
		assert.strictEqual(binding.root.classList.contains("active"), true)
		step.emit("reset")
		assert.strictEqual(binding.root.classList.contains("completed"), false)
		assert.strictEqual(binding.root.classList.contains("draft"), false)
		assert.strictEqual(binding.root.classList.contains("active"), false)
	})

})
