import { Observable, Binding } from "domodel"

import Step from "../src/object/step.js"
import Steps from "../src/object/steps.js"

const Model = { tagName: "div" }

export function instance(test) {
	test.expect(5)
	const steps = new Steps([])
	test.ok(steps instanceof Observable)
	test.ok(Array.isArray(steps.steps))
	test.strictEqual(steps.step, null)
	test.throws(() => {
		steps.steps = 1
	})
	test.doesNotThrow(() => {
		steps.step = 1
	})
	test.done()
}

export function getStepByName(test) {
	test.expect(4)
	const stepOne = new Step("first", Model, Binding)
	const stepTwo = new Step("second", Model, Binding)
	const stepThree = new Step("three", Model, Binding)
	const steps = new Steps([stepOne, stepTwo, stepThree])
	test.strictEqual(steps.getStepByName(""), undefined)
	test.deepEqual(steps.getStepByName("first"), stepOne)
	test.deepEqual(steps.getStepByName("second"), stepTwo)
	test.deepEqual(steps.getStepByName("three"), stepThree)
	test.done()
}

export function getPreviousStep(test) {
	test.expect(4)
	const stepOne = new Step("first", Model, Binding)
	const stepTwo = new Step("second", Model, Binding)
	const stepThree = new Step("three", Model, Binding)
	const steps = new Steps([stepOne, stepTwo, stepThree])
	test.strictEqual(steps.getPreviousStep(), null)
	steps.step = stepOne
	test.strictEqual(steps.getPreviousStep(), null)
	steps.step = stepTwo
	test.deepEqual(steps.getPreviousStep(), stepOne)
	steps.step = stepThree
	test.deepEqual(steps.getPreviousStep(), stepTwo)
	test.done()
}

export function getNextStep(test) {
	test.expect(4)
	const stepOne = new Step("first", Model, Binding)
	const stepTwo = new Step("second", Model, Binding)
	const stepThree = new Step("three", Model, Binding)
	const steps = new Steps([stepOne, stepTwo, stepThree])
	test.deepEqual(steps.getNextStep(), stepOne)
	steps.step = stepOne
	test.deepEqual(steps.getNextStep(), stepTwo)
	steps.step = stepTwo
	test.deepEqual(steps.getNextStep(), stepThree)
	steps.step = stepThree
	test.strictEqual(steps.getNextStep(), null)
	test.done()
}
