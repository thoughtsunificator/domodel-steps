/** @module steps */

import { Observable } from "domodel"

/**
	* @memberof: module: steps
	*/
class Steps extends Observable {

	/**
	 * @param {Step[]} steps
	 */
	constructor(steps) {
		super()
		this._steps = steps
		this._step = null
	}

	getStepByName(name) {
		return this.steps.find(step => step.name === name)
	}

	getPreviousStep() {
		if(this.step !== null) {
			const index = this.steps.indexOf(this.step)
			if(index >= 1) {
				return this.steps[index - 1]
			}
		}
		return null
	}

	getNextStep() {
		if(this.step === null) {
			return this.steps[0]
		} else {
			const index = this.steps.indexOf(this.step)
			if(index < this.steps.length - 1) {
				return this.steps[index + 1]
			}
		}
		return null
	}

	/**
	 * @type {Step[]}
	 */
	get steps() {
		return this._steps
	}

	/**
	 * @type {Step}
	 */
	get step() {
		return this._step
	}

	set step(step) {
		this._step = step
	}

}

export default Steps
