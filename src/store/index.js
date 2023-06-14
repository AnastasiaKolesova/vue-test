import { createStore } from 'vuex'

const store =  createStore ({
	state() {
		return {
			tasks: JSON.parse(localStorage.getItem('tasks')) ?? [],
			// count: 0
		}
	},
	
	mutations: {
		addNewTask (state, task) {
			state.tasks.push(task)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		changeTask (state, info) {
			let taskNeed = state.tasks.find(i => i.id === Number(info.id))
			taskNeed.status = info.status
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		}
	},
	getters: {
		tasks (state) {
			return state.tasks
		},
		countActive (state) {
			return state.tasks.filter(i => i.status === 'active').length
		}
	},
})

export default store
