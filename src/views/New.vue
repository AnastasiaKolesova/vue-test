<template>
  <form class="card" @submit="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="titleValue">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="dateValue">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="descriptionValue"></textarea>
    </div>

    <button class="btn primary" @click.prevent="createTask" :disabled="isValid">Создать</button>
	 <!-- <button class="btn primary" @click.prevent="show">В консоль</button> -->
	</form>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const store = useStore()
		const router = useRouter()
		const titleValue = ref('')
		const dateValue = ref('')
		const descriptionValue = ref('')

		const isValid = computed (() => {
			if(titleValue.value.length !== 0 && dateValue.value.length !== 0 && descriptionValue.value.length !== 0 ){
				return false
			} else {
				return true
			}
		})
		
		function createTask () {
			const newTask = {
				title: titleValue.value,
				date: dateValue.value,
				description: descriptionValue.value,
				id: Date.now(),
				status: 'active',
			}
			if (new Date (newTask.date).getTime() < Date.now()) {
				newTask.status = 'canceled'
			} else {
				newTask.status = 'active'
			}
			store.commit('addNewTask', newTask)
			router.push('/')
		}
						
		return {
			titleValue,
			dateValue,
			descriptionValue,
			createTask,
			isValid,	
			
		}
	}
}

</script>