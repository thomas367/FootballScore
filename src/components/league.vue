<template>
	<div class="wrapper">
		<div class="country">
			<p> {{info.name}} </p>
		</div>
		<div class="standings">
			<!--Start of tabs-->
			<b-tabs nav-class="mt-1 justify-content-center" pills small>			
				<hr/>
				<!-- Standings section-->
				<b-tab title="Standing" active>
					<!-- Start of nested tabs -->
					<b-tabs nav-class="justify-content-center" pills small>
						<hr/>
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
										<td><div v-if="teams.team.crestUrl !== null"><img :src="teams.team.crestUrl" height="25" width="25"/></div>{{teams.team.name}}</td>
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
										<td><div v-if="teams.team.crestUrl !== null"><img :src="teams.team.crestUrl" height="25" width="25"/></div>{{teams.team.name}}</td>
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
										<td><div v-if="teams.team.crestUrl !== null"><img :src="teams.team.crestUrl" height="25" width="25"/></div>{{teams.team.name}}</td>
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
					</b-tabs>  <!-- End of nested tabs -->
				</b-tab>
				<!-- Fixture section -->
				<b-tab title="Fixture">
					<div class="fixtures">
						<div class="weekFixture" v-for="week in weekList">
							<p class="week">week {{week}}</p>
							<div v-for="matches in fixtures">
								<div v-show="week==matches.matchday">
									<div class="matches row">
										<p class="mr-3">{{matches.homeTeam.name}} - {{matches.awayTeam.name}}</p>
										<p class="ml-3">{{matches.score.fullTime.homeTeam}} : {{matches.score.fullTime.awayTeam}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</b-tab>
				<!-- Scorers section -->
				<b-tab title="Top10 Scorers">
					<table class="scorers table-bordered">
						<thead>
							<tr>
								<th>Position</th>
								<th>Player</th>
								<th>Goals</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(scorer, index) in scorers">
								<td>{{index+1}}</td>
								<td>{{scorer.player.name}} ({{scorer.team.name}})</td>
								<td>{{scorer.numberOfGoals}}</td>
							</tr>
						</tbody>
					</table>
				</b-tab>
			</b-tabs>	<!-- End of tabs -->		
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
				away: [],
				fixtures: [],
				weekList: [],
				scorers: []
			}
		},
		created: function(){
			this.getStandings();
			this.getLeagueScorers();
			this.getFixtures();
		},
		methods: {
			/* Get league standings */
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
				}); 
			},
			/* Get team id and push to team 
			 * component to show team data
			 */
			getTeamInformation: function(teamId){
				this.$router.push({
					name: 'team',
					params: {
						id: teamId
					}
				});
				
			},
			/* Get top10 of league scorers */
			getLeagueScorers: function(){
				axios.get("https://api.football-data.org/v2/competitions/"+this.code+"/scorers",{
					headers: {
						'X-Auth-Token': '3f02e1b0e61e4af5a8dbc7be8304073a'
					}
				})
				.then(response => {
					this.scorers = response.data.scorers;
				});
			},
			/* Get all the matches of the league */
			getFixtures: function(){
				axios.get("https://api.football-data.org/v2/competitions/"+this.code+"/matches",{
					headers: {
						'X-Auth-Token': '3f02e1b0e61e4af5a8dbc7be8304073a'
					}
				})
				.then(response => {
					console.log(response.data);
					this.fixtures = response.data.matches;
					this.weekList = this.setWeekList(response.data.matches)
				}); 
			},
			/* Set week list for fixtures */
			setWeekList: function(matchdayList){
				var weeks = [];
				
				matchdayList.forEach(date =>{
					let matchday = date.matchday;
					var found;

					for(let i=0; i<weeks.length; i++){
						if(weeks[i] === matchday){
							found = true;
						}
						else{
							found = false;
						}
					}

					if(!found){
						weeks.push(matchday)
					}
				})

				return weeks;
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
		font-size: 16px;

		@media(min-width: 320px){
			font-size: 11px;
		}

		@media(min-width: 768px){
			font-size: 16px;
		}

	}

	.week{
		text-align: center;
		background-color: gray;
		color: white;
	}

	.matches{
		justify-content: center;
	}

	.scorers{
		margin-right: auto;
		margin-left: auto;
		text-align: center;
		font-size: 20px;

		@media(min-width: 320px){
			font-size: 14px;
		}

		@media(min-width: 768px){
			font-size: 20px;
		}
	}

</style>