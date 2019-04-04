<template>
	<div class="wrapper">
		<div class="country">
			<p> {{info.name}} </p>
		</div>
		<div class="standings">
			<b-tabs class="navigation">
				<!-- Total section -->
				<b-tab title="Total" active>
					<table class="standing table-bordered">
						<thead>
							<tr>
								<th>Position</th>
								<th>Club</th>
								<th>Played</th>
								<th>Win</th>
								<th>Draw</th>
								<th>Lose</th>
								<th>GF</th>
								<th>GA</th>
								<th>GD</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="teams in total">
								<th>{{teams.position}}</th>
								<th>{{teams.team.name}}</th>
								<th>{{teams.playedGames}}</th>
								<th>{{teams.won}}</th>
								<th>{{teams.draw}}</th>
								<th>{{teams.lost}}</th>
								<th>{{teams.goalsFor}}</th>
								<th>{{teams.goalsAgainst}}</th>
								<th>{{teams.goalDifference}}</th>
								<th>{{teams.points}}</th>
							</tr>
						</tbody>
					</table>
				</b-tab>
				<!-- Home section -->
				<b-tab title="Home">
					<table class="standing table-bordered">
						<thead>
							<tr>
								<th>Position</th>
								<th>Club</th>
								<th>Played</th>
								<th>Win</th>
								<th>Draw</th>
								<th>Lose</th>
								<th>GF</th>
								<th>GA</th>
								<th>GD</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="teams in home">
								<th>{{teams.position}}</th>
								<th>{{teams.team.name}}</th>
								<th>{{teams.playedGames}}</th>
								<th>{{teams.won}}</th>
								<th>{{teams.draw}}</th>
								<th>{{teams.lost}}</th>
								<th>{{teams.goalsFor}}</th>
								<th>{{teams.goalsAgainst}}</th>
								<th>{{teams.goalDifference}}</th>
								<th>{{teams.points}}</th>
							</tr>
						</tbody>
					</table>
				</b-tab>
				<!-- Away section-->
				<b-tab title="Away">
					<table class="standing table-bordered">
						<thead>
							<tr>
								<th>Position</th>
								<th>Club</th>
								<th>Played</th>
								<th>Win</th>
								<th>Draw</th>
								<th>Lose</th>
								<th>GF</th>
								<th>GA</th>
								<th>GD</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="teams in away">
								<th>{{teams.position}}</th>
								<th>{{teams.team.name}}</th>
								<th>{{teams.playedGames}}</th>
								<th>{{teams.won}}</th>
								<th>{{teams.draw}}</th>
								<th>{{teams.lost}}</th>
								<th>{{teams.goalsFor}}</th>
								<th>{{teams.goalsAgainst}}</th>
								<th>{{teams.goalDifference}}</th>
								<th>{{teams.points}}</th>
							</tr>
						</tbody>
					</table>
				</b-tab>
			</b-tabs>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		props: ['id'],
		data: function(){
			return{
				code: this.id,
				info: [],
				total: [],
				home: [],
				away: []
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
					this.info = response.data.competition;
					this.total = response.data.standings[0].table;
					this.home = response.data.standings[1].table;
					this.away = response.data.standings[2].table;
				}) 
			}
		}
	}
</script>

<style scoped lang="scss">
	.country{
		margin-top: 1rem;
		text-align: center;
	}

	.navigation{
		margin-bottom: 1rem;
		justify-content: center;
	}

	.standing{
		width: 700px;
		margin-right: auto;
		margin-left: auto;

	}

</style>