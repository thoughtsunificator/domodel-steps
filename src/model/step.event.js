import { EventListener } from "domodel"

/**
 * @global
 */
class StepEventListener extends EventListener {

	/**
	 * @event StepEventListener#reset
	 */

	/**
	 * @event StepEventListener#completed
	 */

	/**
	 * @event StepEventListener#set
	 */
	set() {
		this.root.classList.add("active")
	}

	/**
	 * @event StepEventListener#unset
	 */
	unset() {
		this.root.classList.remove("active")
	}


}

export default StepEventListener
