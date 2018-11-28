const Discord = require('discord.js')
const bot = new Discord.Client()
var msgbfid
var msgbf
var idbf
var botid
var quon

//snipe code
var codesnipeon = 0

var dispatcher;

var lastmsgsolosnipe = undefined;
var solosnipe = 0;

var bfwait = undefined;

// ready action
bot.on('ready', function () { 
	console.log("bot connecter") 
	bot.user.setActivity("!v help")
	botid = bot.user.id
	console.log(botid)
})

//bot.login(token)
bot.login(process.env.TOKEN)

bot.on('message', message => { 

	//antipub
	if(!message.member.roles.find(role => role.name === 'Fondateur')){
		if(message.content.includes("discordapp.com/invite") || message.content.includes("discord.gg")){
			message.channel.send({
				"embed": {
					"footer": {
						"text": Date()
					  },
									   "color": 5575358,
									   "author": {
										 "name": "Admin Bot",
										 "icon_url": "https://cdn.discordapp.com/attachments/486844415571263498/493407087171338251/logo_team_vulcany.jpg"
									   },
									   "fields": [
										 {
										   "name": "Action :",
										   "value": " - Avertissement"
										 },
										 {
										   "name": "A :",
										   "value": " - " + message.author.username
										 },
							   {
										   "name": "Pour :",
										   "value": " - Publication d'une invitation discord"
										 }
									   ]
								   }
			   }
			   )
			message.delete()
		}
	}
	
	//build figth command
	if(message.channel.id === '505357056518258708'){
		if(message.content === '!bf'){
			if(bfwait === message.author){
				message.reply("votre proposition de build fight à été anulée.").then(function (message) {
					setTimeout(() => {
						message.delete()
					}, 300000);
				})
				message.delete()
				msgbf.delete()
				msgbfid = undefined
				msgbf = undefined
				idbf = undefined
				bfwait = undefined
			}else if(bfwait !== undefined){
				message.delete()
				message.reply("un joueur attent déjà pour faire un build fight, rejoin-le.").then(function (message) {
					setTimeout(() => {
						message.delete()
					}, 300000);
				})
			}else{
				idbf = message.author
				bfwait = message.author
				message.delete()
				message.channel.send('Le joueur ' + message.author + ' souhaite faire un buildfight ! \nSi tu souhaites participer au build fight réagit avec 👍 \nPour annuler ton build-fight réagit avec ❎ \n@here').then(function (message) {
        			message.react("👍")
				message.react("❎")
        			msgbfid = message.id
					msgbf = message
    			})
			}
		}else if(message.author.id !== botid){
			setTimeout(() => {
				message.delete()
			}, 300000);
		}
	}

		//solosnipe command
	if(message.content === '!v solosnipe'){
		if(message.member.roles.find(role => role.name === 'Snipe')){
			if(message.channel.id === '505356131431088133'){
			message.delete()
			if(solosnipe === 1){
				message.reply("une autre partie solo snipe est en cours de lancement, merci de patienter.")
			}else{
				if(message.member.voiceChannel){
					if(message.member.voiceChannel.name === 'partie-snipe'){
						message.channel.send("@here")
						message.channel.send({
					  "embed": {
					    "color": 5575358,
					    "author": {
					      "name": "Solo Snipe",
					      "icon_url": "https://cdn.discordapp.com/attachments/486844415571263498/493407087171338251/logo_team_vulcany.jpg"
					    },
					    "fields": [
					      {
					        "name": "Mode :",
					        "value": " - Solo"
					      },
					      {
					        "name": "Lancement dans : ",
					        "value": " - 2 minutes"
					      }
					    ]
					}
				}).then(function (message) {
					lastmsgsolosnipe = message
				})
						solosnipe = 1;
						let splitmsg = message.content.split(" ")
						//vocal
						message.member.voiceChannel.join().then(connection => {
							dispatcher = connection.playFile('flux.wav')

							dispatcher.on('error' , e => {
								console.log(e)
								message.member.voiceChannel.leave()
								solosnipe = 0;
							})
							dispatcher.on('end' , e => {
								dispatcher = undefined
								console.log('fin du son, partie lance')
								message.member.voiceChannel.leave()
								lastmsgsolosnipe.delete()
								lastmsgsolosnipe = undefined
								solosnipe = 0;
								codesnipe(message.channel)
							})
						}).catch(console.log)

					}else{
						message.reply('vous devez etre connecter au salon vocal solo-snipe.')
					}
				}else{
					message.reply('vous devez etre connecter au salon vocal solo-snipe.')
				}
			}
				


			}else{
				message.delete()
				message.reply("merci d'utiliser le salon spécifique à cette commande <#505356131431088133>.")
			}
		}else{
			message.delete()
			message.reply("vous ne disposez pas des permissions pour utiliser cette commande.")
		}
	}

	//duosnipe command
	if(message.content === '!v duosnipe'){
		if(message.member.roles.find(role => role.name === 'Snipe')){
			if(message.channel.id === '505356131431088133'){
			message.delete()
			if(solosnipe === 1){
				message.reply("une autre partie solo snipe est en cours de lancement, merci de patienter.")
			}else{
				if(message.member.voiceChannel){
					if(message.member.voiceChannel.name === 'partie-snipe'){
						message.channel.send("@here")
						message.channel.send({
					  "embed": {
					    "color": 5575358,
					    "author": {
					      "name": "Duo Snipe",
					      "icon_url": "https://cdn.discordapp.com/attachments/486844415571263498/493407087171338251/logo_team_vulcany.jpg"
					    },
					    "fields": [
					      {
					        "name": "Mode :",
					        "value": " - Duo"
					      },
					      {
					        "name": "Lancement dans : ",
					        "value": " - 2 minutes"
					      }
					    ]
					}
				}).then(function (message) {
					lastmsgsolosnipe = message
				})
						solosnipe = 1;
						let splitmsg = message.content.split(" ")
						//vocal
						message.member.voiceChannel.join().then(connection => {
							dispatcher = connection.playFile('flux.wav')

							dispatcher.on('error' , e => {
								console.log(e)
								message.member.voiceChannel.leave()
								solosnipe = 0;
							})
							dispatcher.on('end' , e => {
								dispatcher = undefined
								console.log('fin du son, partie lance')
								message.member.voiceChannel.leave()
								lastmsgsolosnipe.delete()
								lastmsgsolosnipe = undefined
								solosnipe = 0;
								codesnipe(message.channel)
							})
						}).catch(console.log)

					}else{
						message.reply('vous devez etre connecter au salon vocal solo-snipe.')
					}
				}else{
					message.reply('vous devez etre connecter au salon vocal solo-snipe.')
				}
			}
				


			}else{
				message.delete()
				message.reply("merci d'utiliser le salon spécifique à cette commande <#505356131431088133>.")
			}
		}else{
			message.delete()
			message.reply("vous ne disposez pas des permissions pour utiliser cette commande.")
		}
	}

	//squadsnipe command
	if(message.content === '!v squadsnipe'){
		if(message.member.roles.find(role => role.name === 'Snipe')){
			if(message.channel.id === '505356131431088133'){
			message.delete()
			if(solosnipe === 1){
				message.reply("une autre partie solo snipe est en cours de lancement, merci de patienter.")
			}else{
				if(message.member.voiceChannel){
					if(message.member.voiceChannel.name === 'partie-snipe'){
						message.channel.send("@here")
						message.channel.send({
					  "embed": {
					    "color": 5575358,
					    "author": {
					      "name": "Squad Snipe",
					      "icon_url": "https://cdn.discordapp.com/attachments/486844415571263498/493407087171338251/logo_team_vulcany.jpg"
					    },
					    "fields": [
					      {
					        "name": "Mode :",
					        "value": " - Squad"
					      },
					      {
					        "name": "Lancement dans : ",
					        "value": " - 2 minutes"
					      }
					    ]
					}
				}).then(function (message) {
					lastmsgsolosnipe = message
				})
						solosnipe = 1;
						let splitmsg = message.content.split(" ")
						//vocal
						message.member.voiceChannel.join().then(connection => {
							dispatcher = connection.playFile('flux.wav')

							dispatcher.on('error' , e => {
								console.log(e)
								message.member.voiceChannel.leave()
								solosnipe = 0;
							})
							dispatcher.on('end' , e => {
								dispatcher = undefined
								console.log('fin du son, partie lance')
								message.member.voiceChannel.leave()
								lastmsgsolosnipe.delete()
								lastmsgsolosnipe = undefined
								solosnipe = 0;
								codesnipe(message.channel)
							})
						}).catch(console.log)

					}else{
						message.reply('vous devez etre connecter au salon vocal solo-snipe.')
					}
				}else{
					message.reply('vous devez etre connecter au salon vocal solo-snipe.')
				}
			}
				


			}else{
				message.delete()
				message.reply("merci d'utiliser le salon spécifique à cette commande <#505356131431088133>.")
			}
		}else{
			message.delete()
			message.reply("vous ne disposez pas des permissions pour utiliser cette commande.")
		}
	}

	//code snipe
	if(message.channel.id === '516224377071599626'){
		if(message.author.id !== botid){
			message.delete()
		} 
		if(message.content.length === 3){
			if(codesnipeon === 1){
				message.channel.send(message.content + ' => ' + message.author)
			}
		}
	}

	//function code snipe on/off
	function codesnipe(c){
		codesnipeon = 1;
		c.send('@here Lancement de la partie. Veuillez indiquer les 3 deniers caractere de votre code de partie dans <#516224377071599626>. Il se situe en haut à gauche dans votre jeu.').then(function (message) {
			setTimeout(() => {
				message.delete()
				codesnipeon = 0
			}, 180000);
		})
	}
	//help command
	if (message.content === '!v help'){
		message.delete()
		message.channel.send({embed: {
			color: 3447003,
			title: "Liste des commandes :",
			fields: [{
        		name: "!bf",
        		value: "Proposer un buildfight"
      		},
      		{
        		name: "!v help",
        		value: "Afficher l'aide"
			},
			{
        		name: "!v solosnipe",
        		value: "Lancer une partie solo snipe (nécessite un rôle particulié)"
      		}
      		]
		}})
	}
	
	// resetbf command
	if(message.content === '!resetbf'){
	   	if(message.channel.id === '505357056518258708'){
		   	if(message.member.roles.find(role => role.name === 'Staff tournoi') || message.member.roles.find(role => role.name === 'Modérateur') || message.member.roles.find(role => role.name === 'Fondateur')){
				message.delete()
				msgbf.delete()
				msgbfid = undefined
				msgbf = undefined
				idbf = undefined
				bfwait = undefined
			}
		   }
	   }
	// muted
	if(message.member.roles.find(role => role.name === 'Muted')){
		message.reply('tu es actuelement mute.').then(function (message) {
			setTimeout(() => {
				message.delete()
			}, 300000);
		})
		message.delete()
	}

})
   
//reaction (buildfight)
bot.on('messageReactionAdd', (reaction, user) => { 
	if(reaction.emoji.name === "👍"){
		if(reaction.message.id === msgbfid){
			if(user.id === botid){
			}else if(user !== idbf){	
				msgbf.channel.send(':crossed_swords: Buildfight : ' + idbf + ' vs ' + user + ' :crossed_swords:\nVous pouvez vous mp. Que le meilleur gagne !').then(function (message) {
					setTimeout(() => {
						message.delete()
					}, 300000);
				})
				msgbf.delete()
				msgbfid = undefined
				msgbf = undefined
				idbf = undefined
				bfwait = undefined
		}
		}
	}else if(reaction.emoji.name === "❎"){
		console.log("1")
		if(reaction.message.id === msgbfid){
			console.log("2")
			if(user === idbf){
				console.log("3")
				msgbf.channel.send(idbf + ", votre proposition de build fight à été anulée.").then(function (message) {
					setTimeout(() => {
						message.delete()
					}, 300000);
				})
				msgbf.delete()
				msgbfid = undefined
				msgbf = undefined
				idbf = undefined
				bfwait = undefined
			}
		}
	}
})
