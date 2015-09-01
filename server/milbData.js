/* global $ */
var request = require('request');
var moment = require('moment');
var phantom = require('phantom');
var jquery = require('jquery');
var _ = require('lodash');

//get player info by their id, return playerobj
module.exports.scrapePlayer = function (pid, callback) {
	
	if (pid)
		var url = 'http://www.milb.com/player/index.jsp?player_id='+ pid + '#/gamelogs/R/hitting/2015/ALL';
	else
		return;
	
	phantom.create(function(ph) {
	  return ph.createPage(function(page) {
	    return page.open(url, function(status) {
			
	      console.log("opened site? player: ", status);        
			
			
			//jQuery             
			page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                
				setTimeout(function() {
				    return page.evaluate(function() {
				 
				        var result = {};
						
						var getName = function (text) {
							var players = ['Matt Szczur'];
							for(var i = 0; i < players.length; i++){
								if(text.indexOf(players[i]) > -1)
									return players[i];
							}
						};
						
						var today = new Date();
						var year = today.getFullYear();
						var month = ("0" + (today.getMonth() + 1)).slice(-2);
						var day = ("0" + today.getDate()).slice(-2);
				 
				        $('#player_name').each(function() {
				            result.name = getName($(this).text());
				        });
						
						//$('#upcomingGamesPanel tbody tr:first-child td:nth-child(1)').each(function(){
						//	result.datePlaying = $(this).text();
						//});
						//
						//$('#upcomingGamesPanel tbody tr:first-child td:nth-child(3)').each(function(){
						//	result.timePlaying = $(this).text();
						//});
						
						$('#gamelogsPanel tr:last-child td:nth-child(1) span a').each(function(){
							result.statDate = $(this).html();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(2) span a').each(function(){
							result.team = $(this).html();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(4) span').each(function(){
							result.atbats = $(this).text();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(6) span').each(function(){
							result.hits = $(this).text();
						});

						$('#gamelogsPanel tr:last-child td:nth-child(8) span').each(function(){
							result.doubles = $(this).text();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(9) span').each(function(){
							result.triples = $(this).text();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(10) span').each(function(){
							result.homeruns = $(this).text();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(11) span').each(function(){
							result.rbis = $(this).text();
						});
						
						$('#gamelogsPanel tr:last-child td:nth-child(17) span').each(function(){
							result.avg = $(this).text();
						});
						
				        return result;
						
				    }, function(result) {
						
				        callback(result);
						
				        ph.exit();
						
				    });
				}, 5000);
				
            }); //injectJs
			
	    });
	  });
	});

};

//return an object with all of today's team start times, custom for cubs affiliates
module.exports.getTeamStartTimes = function (callback) {
	
	var teamStartTimes = {};
	var teams = [];
	
	teams.push('451'); //iowa cubs
	teams.push('553'); //tennessee smokies
	
	_.each(teams, function(team){
		var url = 'http://www.milb.com/schedule/index.jsp?sid=t' + team;
		
		phantom.create(function(ph) {
		  return ph.createPage(function(page) {
		    return page.open(url, function(status) {
				
		      console.log("opened site? schedule:", status);        
				
				//jQuery             
				page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
	                
					setTimeout(function() {
					    return page.evaluate(function() {
					 
					        var statuses = [];
							var result;
							var hasRan = false;
							
							var today = new Date();
							var year = today.getFullYear();
							var month = ("0" + (today.getMonth() + 1)).slice(-2);
							var day = ("0" + today.getDate()).slice(-2);
					 
					        $('#date-' + year + '-' + month + '-' + 29 + ' .game-statusS').each(function() {
					            if(!hasRan)
								{
									result = $(this).text();
									hasRan = true;
								}
					        });
							
					        return result;
							
					    }, function(result) {
							
					        teamStartTimes[team] = result;
							
							if(Object.keys(teamStartTimes).length == teams.length)
							{
								if (callback)
								{
										callback(teamStartTimes);
								}
							}
							
					        ph.exit();
							
					    });
					}, 5000);
					
	            });
				
		    });
		  });
		});
		
	});
	
};