<template>
	<div class="wrapper">
		<div class="country">
			<p> {{info.name}} </p>
		</div>
		<div class="standings">
			<b-tabs nav-class="mt-1 justify-content-center">
				<!-- Total section -->
				<b-tab title="Total" active>
					<table class="standing table-bordered table-hover">
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
							<tr v-for="teams in total" @click="getTeamInformation(teams.team.id)">
								<td>{{teams.position}}</td>
								<td>{{teams.team.name}}</td>
								<td>{{teams.playedGames}}</td>
								<td>{{teams.won}}</td>
								<td>{{teams.draw}}</td>
								<td>{{teams.lost}}</td>
								<td>{{teams.goalsFor}}</td>
								<td>{{teams.goalsAgainst}}</td>
								<td>{{teams.goalDifference}}</td>
								<td>{{teams.points}}</td>
							</tr>
						</tbody>
					</table>
				</b-tab>
				<!-- Home section -->
				<b-tab title="Home">
					<table class="standing table-bordered table-hover">
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
							<tr v-for="teams in home" @click="getTeamInformation(teams.team.id)">
								<td>{{teams.position}}</td>
								<td>{{teams.team.name}}</td>
								<td>{{teams.playedGames}}</td>
								<td>{{teams.won}}</td>
								<td>{{teams.draw}}</td>
								<td>{{teams.lost}}</td>
								<td>{{teams.goalsFor}}</td>
								<td>{{teams.goalsAgainst}}</td>
								<td>{{teams.goalDifference}}</td>
								<td>{{teams.points}}</td>
							</tr>
						</tbody>
					</table>
				</b-tab>
				<!-- Away section-->
				<b-tab title="Away">
					<table class="standing table-bordered table-hover">
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
							<tr v-for="teams in away" @click="getTeamInformation(teams.team.id)">
								<td>{{teams.position}}</td>
								<td>{{teams.team.name}}</td>
								<td>{{teams.playedGames}}</td>
								<td>{{teams.won}}</td>
								<td>{{teams.draw}}</td>
								<td>{{teams.lost}}</td>
								<td>{{teams.goalsFor}}</td>
								<td>{{teams.goalsAgainst}}</td>
								<td>{{teams.goalDifference}}</td>
								<td>{{teams.points}}</td>
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
					this.info = response.data.competition;
					this.total = response.data.standings[0].table;
					this.home = response.data.standings[1].table;
					this.away = response.data.standings[2].table;
				}) 
			},
			getTeamInformation: function(teamId){
				this.$router.push({
					name: 'team',
					params: {
						id: teamId
					}
				}) 
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.country{
		top: 25px;
		text-align: center;
		background-color: #2c3945; 
		color: white;
		height: 50px;
		font-weight: bold;
		font-size: 22px;

	}

	.standing{
		margin-right: auto;
		margin-left: auto;
		text-align: center;
		cursor: pointer;

	}

</style>