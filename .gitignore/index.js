const Discord = require('discord.js')
const bot = new Discord.Client()
var msgbfid
var msgbf
var idbf
var botif
var quon

var dispatcher;

var lastmsgsolosnipe = undefined;
var solosnipe = 0;

var bfwait = undefined;

bot.on('ready', function () { 
	console.log("bot connecter") 
	bot.user.setActivity("!v help")
	botid = bot.user.username
	console.log(botid)
})

bot.login(process.env.TOKEN)

bot.on('message', message => { 
	if (message.content === '!bf') {
		if(message.channel.id === '500706845556604938'){
			if(bfwait === message.author){
				message.reply("votre proposition de build fight à été anulée.")
				message.delete()
				msgbf.delete()
				msgbfid = undefined
				msgbf = undefined
				idbf = undefined
				bfwait = undefined
			}else if(bfwait !== undefined){
				message.delete()
				message.reply("une joueur attent déjà pour faire un build fight, rejoin-le.")
			}else{
				idbf = message.author
				bfwait = message.author
				message.delete()
				message.channel.send('Le joueur ' + message.author + ' souhaite faire un buildfight ! \nSi tu souhaites participer au build fight réagit avec 👍 \n <@500712386626322454>').then(function (message) {
        			message.react("👍")
        			msgbfid = message.id
        			msgbf = message
    			})
			}
			 
		}else{
			message.delete()
			message.reply("merci d'utiliser le salon spécifique à cette commande <#500706845556604938>.")
		}
	}



	if(message.content === '!v solosnipe'){
		if(message.member.roles.find("name", "Snipe")){
			if(message.channel.id === '500715332365844483'){
			message.delete()
			if(solosnipe === 1){
				message.reply("une autre partie solo snipe est en cours de lancement, merci de patienter.")
			}else{
				if(message.member.voiceChannel){
					if(message.member.voiceChannel.name === 'solo-snipe'){
						message.channel.send("<@500722522917175297>")
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
					        "value": " - 5 minutes"
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
								message.member.voiceChannel.disconnect()
								solosnipe = 0;
							})
							dispatcher.on('end' , e => {
								dispatcher = undefined
								console.log('fin du son, partie lance')
								message.member.voiceChannel.disconnect()
								lastmsgsolosnipe.delete()
								lastmsgsolosnipe = undefined
								solosnipe = 0;
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
				message.reply("merci d'utiliser le salon spécifique à cette commande <#500715332365844483>.")
			}
		}else{
			message.delete()
			message.reply("vous ne disposez pas des permissions pour utiliser cette commande.")
		}
	}

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
})
    			
bot.on('messageReactionAdd', (reaction, user) => { 
	if(reaction.emoji.name === "👍"){
		if(reaction.message.id === msgbfid){
			if(user.username === botid){
			}else if(user !== idbf){
				msgbf.channel.send(':crossed_swords: Buildfight : ' + idbf + ' vs ' + user + ' :crossed_swords:\nVous pouvez vous mp. Que le meilleur gagne !')
				msgbf.delete()
				msgbfid = undefined
				msgbf = undefined
				idbf = undefined
				bfwait = undefined		
		}
		}
	}
})


