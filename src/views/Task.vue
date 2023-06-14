<template>
  <div v-if="task" class="card">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.date.replace(/(\d*)-(\d*)-(\d*)/,'$3.$2.$1') }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click.prevent="changeTask('active')">Взять в работу</button>
      <button class="btn primary" @click.prevent="changeTask('done')">Завершить</button>
      <button class="btn danger"  @click.prevent="changeTask('canceled')">Отменить</button>
    </div>
  </div>
  <h3 v-else class="text-white center">
    Задачи с id = <strong>{{ taskId }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
	setup() {
		const router = useRouter()
		const route = useRoute()
		const store = useStore()

		let tasks = reactive(store.getters.tasks)
		const taskId = route.params.taskId
		
		let task = computed (() => {
			return tasks.find(i => i.id === Number(taskId))
		}) 	

		function changeTask(type) {
			store.commit('changeTask', {
				status: type,
				id: taskId
			})
		}
				return {
			task,
			taskId,
			tasks,
			changeTask
		}
	},
  components: {AppStatus}
}
</script>

<style scoped>

</style>