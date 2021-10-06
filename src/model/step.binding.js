import { Binding } from "domodel"

import StepEventListener from "./step.event.js"

/**
 * @global
 */
class StepBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Step}   properties.step
	 * @param {Steps}  properties.steps
	 */
	constructor(properties) {
		super(properties, new StepEventListener(properties.step))
	}

	onCreated() {

		const { step, steps } = this.properties

		this.run(step.model, { binding: new step.binding(step.properties) })

	}

}

export default StepBinding
