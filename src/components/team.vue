<template>
	<div class="wrapper">
		<div class="teamInformation">

		</div>
		<div class="teamSquad">

		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		props: ['id'],
		data: function(){
			return{
				teamId: this.id
			}
		},
		created: function(){
			this.getTeamInfo();
		},
		methods: {
			getTeamInfo: function(){
				axios.get("https://api.football-data.org/v2/teams/"+this.teamId,{
					headers: {
						'X-Auth-Token': '3f02e1b0e61e4af5a8dbc7be8304073a'
					}
				})
				.then(response => {
					console.log(response.data)
				}) 
			}
		}
	}
</script>

<style scoped lang="scss">

</style>