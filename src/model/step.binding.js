import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { step, steps } = this.properties

		this.listen(step, "set", () => {
			this.root.classList.add("active")
		})

		this.listen(step, "unset", () => {
			this.root.classList.remove("active")
		})

		this.run(step.model, { binding: new step.binding(step.properties) })

	}

}
