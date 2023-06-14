<template>
	<div>
		<h1 class="text-white center" v-if="tasks.length === 0" >Задач еще нет</h1>
  		<template v-else>
  		  <h3 class="text-white">Всего активных задач:
			 {{ counter }} 
			</h3>
  		  <div class="card" v-for="task in tasks" :key="task.id">
  		    <h2 class="card-title">
  		      {{ task.title }}
  		      <AppStatus :type="task.status" />
  		    </h2>
  		    <p>
  		      <strong>
  		        <small>
  		          {{ task.date.replace(/(\d*)-(\d*)-(\d*)/,'$3.$2.$1') }}
  		        </small>
  		      </strong>
  		    </p>
  		    <button class="btn primary" @click.prevent="$router.push('/task' + '/' + task.id)" >Посмотреть</button>
  		  </div>
  		</template>
	</div>
 
</template>

<script>
import AppStatus from '../components/AppStatus'
import {ref, reactive, computed, } from 'vue'
import { useStore } from 'vuex'


export default {
	setup () {
		const store = useStore()
		let tasks = reactive(store.getters.tasks)

		const counter = computed(() => {
			return store.getters.countActive
		})
	
		return {
			tasks,
			counter
		}
	},

  components: {AppStatus}
}
</script>
