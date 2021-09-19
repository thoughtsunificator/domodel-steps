import assert from "assert"
import { Observable, Binding } from "domodel"

import { Step } from "../index.js"

describe("step", () => {

	it("instance", () => {
		const model = { tagName: "div" }
		assert.strictEqual(Step.STATE.INITIAL, "INITIAL")
		assert.strictEqual(Step.STATE.DRAFT, "DRAFT")
		assert.strictEqual(Step.STATE.COMPLETED, "COMPLETED")
		const step = new Step("vcxvcsa", model, Binding, { test: "a" })
		assert.ok(step instanceof Observable)
		assert.strictEqual(step.name, "vcxvcsa")
		assert.strictEqual(step.state, "INITIAL")
		assert.strictEqual(step.active, false)
		assert.deepEqual(step.model, model)
		assert.deepEqual(step.properties, { test: "a" })
		assert.ok(new step.binding() instanceof Binding)
		assert.throws(() => {
			step.name = 1
		})
		assert.throws(() => {
			step.model = 1
		})
		assert.throws(() => {
			step.binding = 1
		})
		assert.throws(() => {
			step.properties = 1
		})
		assert.doesNotThrow(() => {
			step.state = "DRAFT"
			step.active = true
			step.date = {}
		})
	})

})
