import assert from "assert"
import { Observable, Binding } from "domodel"

import { Step, Steps } from "../index.js"

const Model = { tagName: "div" }

describe("steps", () => {

	it("instance", () => {
		const steps = new Steps([])
		assert.ok(Steps.prototype instanceof Observable)
		assert.ok(Array.isArray(steps.steps))
		assert.strictEqual(steps.step, null)
		assert.throws(() => {
			steps.steps = 1
		})
		assert.doesNotThrow(() => {
			steps.step = 1
		})
	})

	it("getStepByName", () => {
		const stepOne = new Step("first", Model, Binding)
		const stepTwo = new Step("second", Model, Binding)
		const stepThree = new Step("three", Model, Binding)
		const steps = new Steps([stepOne, stepTwo, stepThree])
		assert.strictEqual(steps.getStepByName(""), undefined)
		assert.deepEqual(steps.getStepByName("first"), stepOne)
		assert.deepEqual(steps.getStepByName("second"), stepTwo)
		assert.deepEqual(steps.getStepByName("three"), stepThree)
	})

	it("getPreviousStep", () => {
		const stepOne = new Step("first", Model, Binding)
		const stepTwo = new Step("second", Model, Binding)
		const stepThree = new Step("three", Model, Binding)
		const steps = new Steps([stepOne, stepTwo, stepThree])
		assert.strictEqual(steps.getPreviousStep(), null)
		steps.step = stepOne
		assert.strictEqual(steps.getPreviousStep(), null)
		steps.step = stepTwo
		assert.deepEqual(steps.getPreviousStep(), stepOne)
		steps.step = stepThree
		assert.deepEqual(steps.getPreviousStep(), stepTwo)
	})

	it("getNextStep", () => {
		const stepOne = new Step("first", Model, Binding)
		const stepTwo = new Step("second", Model, Binding)
		const stepThree = new Step("three", Model, Binding)
		const steps = new Steps([stepOne, stepTwo, stepThree])
		assert.deepEqual(steps.getNextStep(), stepOne)
		steps.step = stepOne
		assert.deepEqual(steps.getNextStep(), stepTwo)
		steps.step = stepTwo
		assert.deepEqual(steps.getNextStep(), stepThree)
		steps.step = stepThree
		assert.strictEqual(steps.getNextStep(), null)
	})

})
