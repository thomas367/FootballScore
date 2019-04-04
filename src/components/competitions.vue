<template>
	<div class="competitions row">
		<div class="competition-card" @click="getCompetition('BL1')">
			<img src="../assets/logo_bundesliga.png" height="100"  width="100"/>
			<p id="competition-name">Bundesliga</p>
		</div>
		<div class="competition-card" @click="getCompetition('PD')">
			<img src="../assets/logo_laliga.png" height="100"  width="100"/>
			<p id="competition-name">La Liga</p>
		</div>
		<div class="competition-card" @click="getCompetition('PL')">
			<img src="../assets/logo_premier_league.png" height="100"  width="100"/>
			<p id="competition-name">Premier League</p>
		</div>
		<div class="competition-card" @click="getCompetition('SA')">
			<img src="../assets/logo_serie_a.png" height="100"  width="100"/>
			<p id="competition-name">Seria A</p>
		</div>
		<div class="competition-card" @click="getCompetition('FL1')">
			<img src="../assets/logo_ligue_1.png" height="100"  width="100"/>
			<p id="competition-name">Ligue 1</p>
		</div>
	</div>
</template>

<script>

	export default{
		methods:{
			getCompetition: function(code){
				this.$router.push({
					name: 'competition',
					params: {
						id: code
					}
				})
			} 
		}
	}
</script>


<style scoped lang="scss">
	.competitions{
		justify-content: center;
	}

	.competition-card{
		border: 1px solid #000000;
		width: 140px;
		margin: 20px;
		padding: 10px;
		text-align: center;
		cursor: pointer;
	}
</style>