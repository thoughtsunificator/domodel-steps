import { Observable } from "domodel"

/**
 * @global
 */
class Step extends Observable {

	/**
	 * @property STATE {StepState}
	 * @property STATE.VIRTUAL {string}
	 * @property STATE.PATHNAME {string}
	 * @property STATE.HASH {string}
	 */
	static STATE = {
		INITIAL: "INITIAL",
		DRAFT: "DRAFT",
		COMPLETED: "COMPLETED",
	}

	/**
	 * @param {string}  name
	 * @param {object}  model
	 * @param {Binding} binding
	 */
	constructor(name, model, binding, properties = {}) {
		super()
		this._name = name
		this._model = model
		this._binding = binding
		this._properties = properties
		this._state = Step.STATE.INITIAL
		this._active = false
		this._data = null
	}

	/**
	 * @return {string}
	 */
	get name() {
		return this._name
	}

	/**
	 * @return {object}
	 */
	get model() {
		return this._model
	}

	/**
	 * @return {Binding}
	 */
	get binding() {
		return this._binding
	}

	/**
	 * @return {object}
	 */
	get properties() {
		return this._properties
	}

	/**
	 * @type {StepState}
	 */
	get state() {
		return this._state
	}

	set state(state) {
		this._state = state
	}

	/**
	 * @type {boolean}
	 */
	get active() {
		return this._active
	}

	set active(active) {
		this._active = active
	}

	/**
	 * @type {*}
	 */
	get data() {
		return this._data
	}

	set data(data) {
		this._data = data
	}

}

export default Step
