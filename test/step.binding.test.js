import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import StepModel from "../src/model/step.js"

import StepBinding from "../src/model/step.binding.js"

import { Step, Steps } from "../index.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

const stepModel = { tagName: "div", id: "myStep" }

describe("step.binding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(new StepBinding() instanceof Binding)
	})

	it("onCreated", () => {
		const step = new Step("Test", stepModel, Binding)
		const steps = new Steps([ step ])
		const binding = new StepBinding({ step, steps })
		rootBinding.run(StepModel, { binding })
		assert.strictEqual(step.active, false)
		assert.strictEqual(binding.root.classList.contains("step"), true)
		assert.strictEqual(binding.root.classList.contains("active"), false)
		assert.strictEqual(binding.root.children[0].id, "myStep")
		assert.ok(binding._children[0] instanceof Binding)
		assert.deepEqual(binding._parent, rootBinding)
	})

	it("set", () => {
		const step = new Step("Test", stepModel, Binding)
		const steps = new Steps([ step ])
		const binding = new StepBinding({ step, steps })
		rootBinding.run(StepModel, { binding })
		assert.strictEqual(binding.root.classList.contains("active"), false)
		step.emit("set")
		assert.strictEqual(binding.root.classList.contains("active"), true)
	})

	it("unSet", () => {
		const step = new Step("Test", stepModel, Binding)
		const steps = new Steps([ step ])
		const binding = new StepBinding({ step, steps })
		rootBinding.run(StepModel, { binding })
		assert.strictEqual(binding.root.classList.contains("active"), false)
		binding.root.classList.add("active")
		assert.strictEqual(binding.root.classList.contains("active"), true)
		step.emit("unset")
		assert.strictEqual(binding.root.classList.contains("active"), false)
	})

})
