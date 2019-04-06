<template>
	<div class="wrapper">
		<div class="teamInformation">
			<span class="row">
				<img :src="crest" height="30" width="30"/>
				<p>{{name}}</p>
			</span>
			<p class="founded"><span class="title">Founded: </span>{{founded}}</p>
			<p class="stadium"><span class="title">Stadium: </span>{{stadium}}</p>
		</div>
		<hr/>
		<div class="teamSquad">
			<div id="goalkeepers">
				<p class="position">Goalkeepers</p>
				<div v-for="player in squad">
					<div v-if="player.position === 'Goalkeeper'">
						<div class="player row">
							<p>{{player.shirtNumber}}</p>
							<span>&nbsp;</span>
							<p>{{player.name}}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="defenders">
				<p class="position">Defenders</p>
				<div v-for="player in squad">
					<div v-if="player.position === 'Defender'">
						<div class="player row">
							<p>{{player.shirtNumber}}</p>
							<span>&nbsp;</span>
							<p>{{player.name}}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="midfielders">
				<p class="position">Midfielders</p>
				<div v-for="player in squad">
					<div v-if="player.position === 'Midfielder'">
						<div class="player row">
							<p>{{player.shirtNumber}}</p>
							<span>&nbsp;</span>
							<p>{{player.name}}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="attackers">
				<p class="position">Attackers</p>
				<div v-for="player in squad">
					<div v-if="player.position === 'Attacker'">
						<div class="player row">
							<p>{{player.shirtNumber}}</p>
							<span>&nbsp;</span>
							<p>{{player.name}}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="coach">
				<p class="position">Coach</p>
				<div v-for="player in squad">
					<div v-if="player.role === 'COACH'">
						<div class="player row">
							<p>{{player.name}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		props: ['id'],
		data: function(){
			return{
				teamId: this.id,
				name: '',
				crest: '',
				founded: '',
				stadium: '',
				squad: []
			}
		},
		created: function(){
			this.getTeamInfo();
		},
		methods: {
			/* Get team information */
			getTeamInfo: function(){
				axios.get("https://api.football-data.org/v2/teams/"+this.teamId,{
					headers: {
						'X-Auth-Token': '3f02e1b0e61e4af5a8dbc7be8304073a'
					}
				})
				.then(response => {
					this.crest = response.data.crestUrl;
					this.name = response.data.name;
					this.founded = response.data.founded;
					this.stadium = response.data.venue;
					this.squad = response.data.squad;
				}) 
			}
		}
	}
</script>

<style scoped lang="scss">
	.teamInformation{
		margin-left: 1rem;
		margin-top: 1rem;
	}

	.title{
		font-weight: bold;
	}

	.teamSquad{
		width: 400px;
		border: 1px solid #000000;
		margin-left: auto;
		margin-right: auto;

		@media (min-width: 320px){
			width: 300px;
		}

		@media (min-width: 768px){
			width: 400px;
		}
	}


	.position {
		text-align: center;
		background-color: #A0A0A0;

	}

	.player{
		justify-content: center;

	}

</style>