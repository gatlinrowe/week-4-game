$(document).ready(function() {
	var characters = new Array(4);
	characters[0] = new Character ("Tracer", "tracer.png", 130, 20, 38);
	characters[1] = new Character ("Soldier 76", "soldier76.png", 130, 20, 30);
	characters[2] = new Character ("Winston", "winston.png", 170, 20, 25);
	characters[3] = new Character ("Pharah", "pharah.png", 110, 30, 60);

	var healthpoints = [100, 130, 200, 130];
	var audio = new Audio();
	var playlist = new Array("audio/tracer.mp3","audio/soldier.mp3","audio/winston.mp3","audio/pharah.mp3");
	var alose = new Audio("audio/defeat.mp3");
	var amusic = new Audio("audio/music.mp3");
	//var apharah = new Audio("audio/pharah.mp3");
	var aprepare = new Audio("audio/prepare.mp3");
	//var asoldier = new Audio("audio/soldier.mp3");
	//var atracer = new Audio("audio/tracer.mp3");
	var avictory = new Audio("audio/victory.mp3");
	//var awinston = new Audio("audio/winston.mp3");
	var blue = -1;
	var red = -1;
	var spawn = new Array;
	var gameOver = false;
	var wins = 0;

	function Character(name, image, health, attack, counter) {
		this.name = name;
		this.image = image;
		this.health = health;
		this.attack = attack;
		this.counter = counter;
		this.status = "ready";
	}
	function showCharacters() {
		$('#characters').empty();
		for (i =0; i < characters.length; i++) {
			if (characters[i].status == "ready") {
				var $newCharacter = $('<div>')
					.addClass("character col-sm-3")
					.attr("character-id", i)
					.html("<span class='name'>"+ characters[i].name + "</span><img src='images/" + characters[i].image +"'><span class='health'>("+ characters[i].health + ")</span>");
				$("#characters").append($newCharacter);
				console.log($newCharacter);
			}
		}
		$(".character").on("click", function(){ 
			selectCharacter(this.getAttribute("character-id"));
			console.log(this.getAttribute("character-id"));
		});
	}
	function selectCharacter(index) {
		if (blue === -1 && red === -1) {
			audio.src = playlist[index];
				audio.play();
			blue = index;
			characters[blue].status = "blue";
		} else if (red === -1) {
			audio.src = playlist[index];
				audio.play();
			red = index;
			characters[red].status = "red";
		}
		refresh();
	}
	function refresh() {
		showCharacters();
		if (blue != -1) {
			showBlue(blue);
			if (spawn.length > 1) {
				$("#action").html('Final Round');
			} else if (spawn.length > 0) {
				$("#action").html('Round 2');
			} else {
				$("#action").html("Round 1");
			}
		}
		if (red != -1) {
			showRed(red);
			if (spawn.length < 2) {
				$("#action").html('Fight!');
			}
		}
	}
	function showBlue(index) {
		var $newBlue = $("<div>")
			.addClass(" character col-sm-offset-1 col-sm-3")
			.html("<span class='name'>"+ characters[index].name + " (" + characters[index].health + ")</span><img src='images/"+ characters[index].image +"'><span class='health'>"+ "Attack "+characters[index].attack +"</span>");
			$("#blue").html($newBlue);
			$("#blue-header").html('Blue Team');
			$("#vs").html("<img src='images/vs.png' height='200px' width='200px'>");
	}
	function youLose() {
		$("#battle").html("<h2>DEFEAT</h2>");
		$("#redTeam").empty();
		alose.play();
		if(!alert('try again?')){window.location.reload();}
	}
	function showRed(index) {
		var $newRed = $("<div>")
			.addClass("red col-sm-offset-1 col-sm-3")
			.html("<span class-'name'>"+ characters[index].name + " (" + characters[index].health + ")</span><img src='images/" + characters[index].image +"'><span class='health'>" + "Attack "+characters[index].attack + "</span>");
		$("#red").html($newRed);
		$("#red-header").html("Red Team");
		$("#fight").html("<img src='images/fight.png' height='100px' width='200px'>");
	}
	function fight() {
		characters[red].health = characters[red].health - characters[blue].attack;
		characters[blue].health = characters[blue].health - characters[red].counter;
		if (characters[red].health < 1) {
			characters[red].health = 0;
			characters[red].status = "dead";
			nextRound();
		} else if (characters[blue].health < 1) {
			characters[blue].health = 0;
			console.log("youlose")
			youLose();
		}
		characters[blue].attack = characters[blue].attack + 5;
		refresh();
	}
	function nextRound() {
		spawn.push(red);
		wins++
		if (wins > 2) {
			blueWins();
		}
		red = -1;
		characters[blue].health = healthpoints[blue];
		$("#red").empty();
		refresh();
		$("#lost").empty();
		showSpawn();
	}
	
	function blueWins() {
		avictory.play();
		$("#battle").html("<h2>Victory! <span class='name'>"+ characters[blue].name + "</span> wins! <img src='images/"+ characters[blue].image +"'><span class='health'> </span></h2>");
		if(!alert('Play Again?')){window.location.reload();}
	}
	function showSpawn() {
		console.log("lost");
		for (i = 0; i < characters.length; i++) {
			$("#lost").empty;
				if (characters[i].status == "dead") {
					console.log('1lost');
					var $lostcharacter = $("<div>")
						.addClass("lostcharacter col-sm-3")
						.html("<span class='name'>"+ characters[i].name + "</span><img src=images/"+ characters[i].image+"><span> </span>");
					$("#lost").append($lostcharacter);
				}
		}
	}
	$("#fight").on("click", function() {
		if (blue > -1 && red > -1) {
			fight()
		}
	})
aprepare.play();
amusic.play();
showCharacters();
});