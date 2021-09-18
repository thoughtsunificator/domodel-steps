import { Observable, Binding } from "domodel"

import { Step } from "../index.js"

export function instance(test) {
	test.expect(11)
	const model = { tagName: "div" }
	test.strictEqual(Step.STATE.INITIAL, "INITIAL")
	test.strictEqual(Step.STATE.DRAFT, "DRAFT")
	test.strictEqual(Step.STATE.COMPLETED, "COMPLETED")
	const step = new Step("vcxvcsa", model, Binding)
	test.ok(step instanceof Observable)
	test.strictEqual(step.name, "vcxvcsa")
	test.strictEqual(step.state, "INITIAL")
	test.strictEqual(step.active, false)
	test.deepEqual(step.model, model)
	test.ok(new step.binding() instanceof Binding)
	test.throws(() => {
		step.name = 1
		step.model = 1
		step.binding = 1
	})
	test.doesNotThrow(() => {
		step.state = "DRAFT"
		step.active = true
		step.date = {}
	})
	test.done()
}
