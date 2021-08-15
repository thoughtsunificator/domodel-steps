import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import StepModel from "../src/model/step.js"

import StepBinding from "../src/model/step.binding.js"

import Step from "../src/object/step.js"
import Steps from "../src/object/steps.js"

const virtualDOM = new JSDOM(``)
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

const stepModel = { tagName: "div", id: "myStep" }

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
	test.ok(new StepBinding() instanceof Binding)
	test.done()
}

export function onCreated(test) {
	test.expect(6)
	const step = new Step("Test", stepModel, Binding)
	const steps = new Steps([ step ])
	const binding = new StepBinding({ step, steps })
	rootBinding.run(StepModel, { binding })
	test.strictEqual(step.active, false)
	test.strictEqual(binding.root.classList.contains("step"), true)
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.strictEqual(binding.root.children[0].id, "myStep")
	test.ok(binding._children[0] instanceof Binding)
	test.deepEqual(binding._parent, rootBinding)
	test.done()
}

export function set(test) {
	test.expect(2)
	const step = new Step("Test", stepModel, Binding)
	const steps = new Steps([ step ])
	const binding = new StepBinding({ step, steps })
	rootBinding.run(StepModel, { binding })
	test.strictEqual(binding.root.classList.contains("active"), false)
	step.emit("set")
	test.strictEqual(binding.root.classList.contains("active"), true)
	test.done()
}

export function unSet(test) {
	test.expect(3)
	const step = new Step("Test", stepModel, Binding)
	const steps = new Steps([ step ])
	const binding = new StepBinding({ step, steps })
	rootBinding.run(StepModel, { binding })
	test.strictEqual(binding.root.classList.contains("active"), false)
	binding.root.classList.add("active")
	test.strictEqual(binding.root.classList.contains("active"), true)
	step.emit("unset")
	test.strictEqual(binding.root.classList.contains("active"), false)
	test.done()
}
