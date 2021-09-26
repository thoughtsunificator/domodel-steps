import { Binding, Observable } from "domodel"

import StepModel from "./step.js"
import IndicatorModel from "./indicator.js"

import StepBinding from "./step.binding.js"
import IndicatorBinding from "./indicator.binding.js"

import Step from "../object/step.js"

export default class extends Binding {

	onCreated() {

		const { steps, indicators = true } = this.properties

		if(!indicators) {
			this.identifier.indicators.style.display = "none"
		}

		this.listen(steps, "reset", () => {
			for(const step of steps.steps) {
				steps.emit("step reset", step.name)
			}
			steps.emit("step set", steps.steps[0].name)
		})

		this.listen(steps, "step reset", name => {
			const step = steps.getStepByName(name)
			if(steps.step === step) {
				steps.emit("step unset", step.name)
			}
			step.state = Step.STATE.INITIAL
			step.data = null
			step.emit("reset")
		})

		this.listen(steps, "step set", name => {
			if(steps.step) {
				steps.emit("step unset", steps.step.name)
			}
			const step = steps.getStepByName(name)
			steps.step = step
			step.active = true
			steps.step.state = Step.STATE.DRAFT
			step.emit("set")
			steps.emit("step changed", step)
		})

		this.listen(steps, "step unset", name => {
			const step = steps.getStepByName(name)
			step.active = false
			step.emit("unset")
		})

		this.listen(steps, "step previous", () => {
			const previousStep = steps.getPreviousStep()
			if(previousStep) {
				steps.emit("step set", previousStep.name)
			}
		})

		this.listen(steps, "step next", data => {
			steps.step.data = data
			steps.step.state = Step.STATE.COMPLETED
			steps.step.emit("completed")
			const nextStep = steps.getNextStep()
			if(nextStep) {
				steps.emit("step set", nextStep.name)
			} else {
				steps.emit("done")
			}
		})

		for(const step of steps.steps) {
			if(indicators) {
				this.run(IndicatorModel(step), { parentNode: this.identifier.indicators, binding: new IndicatorBinding({ step }) })
			}
			this.run(StepModel, { parentNode: this.identifier.steps, binding: new StepBinding({ step }) })
		}

	}

}
