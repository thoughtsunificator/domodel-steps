import { Binding } from "domodel"

import Step from "../object/step.js"

export default class extends Binding {

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

		this.root.addEventListener("click", () => steps.emit("step set", step.name))

	}

}
