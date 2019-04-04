<template>
	
</template>

<script>
	import axios from 'axios'

	export default{
		props: ['id'],
		data: function(){
			return{
				code: this.id
			}
		},
		created: function(){
			this.getStandings();
		},
		methods: {
			getStandings: function(){
				axios.get("https://api.football-data.org/v2/competitions/"+this.code+"/standings",{
					headers: {
						'X-Auth-Token': '3f02e1b0e61e4af5a8dbc7be8304073a'
					}
				})
				.then(response => {
					console.log(response.data);
				}) 
			}
		}
	}
</script>

<style scoped lang="scss">

</style>