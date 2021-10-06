import { Binding } from "domodel"

import Step from "../object/step.js"

/**
 * @global
 */
class IndicatorBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Steps}  properties.steps
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { step, steps } = this.properties

		this.listen(step, "reset", () => {
			this.root.classList.remove("completed")
			this.root.classList.remove("active")
			this.root.classList.remove("draft")
		})

		this.listen(step, "completed", () => {
			this.root.classList.add("completed")
			this.root.classList.remove("draft")
		})

		this.listen(step, "set", () => {
			this.root.classList.add("active")
			if(step.state !== Step.STATE.COMPLETED) {
				this.root.classList.add("draft")
			}
		})

		this.listen(step, "unset", () => {
			this.root.classList.remove("active")
		})

		this.root.addEventListener("click", () => {
			if(step.state !== Step.STATE.INITIAL) {
				steps.emit("stepSet", step.name)
			}
		})

	}

}

export default IndicatorBinding
