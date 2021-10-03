# domodel-steps

Steps system for [domodel](https://github.com/thoughtsunificator/domodel).

## Getting started

### Installing

``npm install @domodel/steps``

### Usage

```javascript
import { Core, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"

import FirstStepModel from "/model/first-step.js"
import FirstStepBinding from "/model/first-step.binding.js"

import SecondStepModel from "/model/second-step.js"
import SecondStepBinding from "/model/second-step.binding.js"

export default class extends Binding {

	onCreated() {

		const step1 = new Step("Step 1", FirstStepModel, FirstStepBinding)
		const step2 = new Step("Step 2", SecondStepModel, SecondStepBinding)

		const steps = new Steps([ step1, step2 ])

		Core.run(StepsModel, { parentNode: this.root, binding: new StepsBinding({ steps }) })

	}

}
```
