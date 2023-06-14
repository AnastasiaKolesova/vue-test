<template>
  <span 
  :class="['badge', 
  {'primary': type === 'active' || type === 'done' },
  {'danger' : type === 'canceled'},
  {'warning' : type === 'performed'}
  ]">
  {{ statusTask }}
</span>
</template>

<script>
export default {
	props: {
		type: {
			type: String
		}
	},
	
	computed: {
		statusTask(){
			if (this.type === 'active') {
				return 'активен'
			} else if  (this.type === 'canceled') {
				return 'отменен'
			}  else if  (this.type === 'performed') {
				return 'выполняется'
			} else if  (this.type === 'done') {
				return 'завершен'
			} 
		}
	}
}

</script>