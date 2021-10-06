import { EventListener } from "domodel"

import Step from "../object/step.js"

/**
 * @global
 */
class StepsEventListener extends EventListener {

	/**
	 * @event StepsEventListener#stepChanged
	 */

	/**
	 * @event StepsEventListener#reset
	 */
	reset() {
		const { steps } = this.properties
		for(const step of steps.steps) {
			steps.emit("stepReset", step.name)
		}
		steps.emit("stepSet", steps.steps[0].name)
	}

/**
 * @event StepsEventListener#stepReset
 * @property {string} name
 */
	stepReset(name) {
		const { steps } = this.properties
		const step = steps.getStepByName(name)
		if(steps.step === step) {
			steps.emit("stepUnset", step.name)
		}
		step.state = Step.STATE.INITIAL
		step.data = null
		step.emit("reset")
	}

	/**
	 * @event StepsEventListener#stepSet
	 * @property {string} name
	 */
	stepSet(name) {
		const { steps } = this.properties
		if(steps.step) {
			steps.emit("stepUnset", steps.step.name)
		}
		const step = steps.getStepByName(name)
		steps.step = step
		step.active = true
		steps.step.state = Step.STATE.DRAFT
		step.emit("set")
		steps.emit("stepChanged", step)
	}

	/**
	 * @event StepsEventListener#stepUnset
	 * @property {string} name
	 */
	stepUnset(name) {
		const { steps } = this.properties
		const step = steps.getStepByName(name)
		step.active = false
		step.emit("unset")
	}

	/**
	 * @event StepsEventListener#stepPrevious
	 */
	stepPrevious() {
		const { steps } = this.properties
		const previousStep = steps.getPreviousStep()
		if(previousStep) {
			steps.emit("stepSet", previousStep.name)
		}
	}

	/**
	 * @event StepsEventListener#stepNext
	 * @property {object} data
	 */
	stepNext(data) {
		const { steps } = this.properties
		steps.step.data = data
		steps.step.state = Step.STATE.COMPLETED
		steps.step.emit("completed")
		const nextStep = steps.getNextStep()
		if(nextStep) {
			steps.emit("stepSet", nextStep.name)
		} else {
			steps.emit("done")
		}
	}

}

export default StepsEventListener
