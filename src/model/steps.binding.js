import { Binding, Observable } from "domodel"

import StepModel from "./step.js"
import IndicatorModel from "./indicator.js"

import StepBinding from "./step.binding.js"
import IndicatorBinding from "./indicator.binding.js"

import StepsEventListener from "./steps.event.js"

/**
 * @global
 */
class StepsBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Steps}  properties.steps
	 */
	constructor(properties) {
		super(properties, new StepsEventListener(properties.steps))
	}

	onCreated() {

		const { steps } = this.properties

		for(const step of steps.steps) {
			this.run(IndicatorModel(step), { parentNode: this.identifier.indicators, binding: new IndicatorBinding({ step }) })
			this.run(StepModel, { parentNode: this.identifier.steps, binding: new StepBinding({ step }) })
		}

	}

}

export default StepsBinding
