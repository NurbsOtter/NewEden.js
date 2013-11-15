var request = require('request');
var xml2js = require('xml2js');
var util= require('util');


exports.parseApi = function(keyID,vCode,callback)
{
	var Characters = new Array
	var parser = xml2js.Parser({mergeAttrs:true});//Avoids the silly $ for attrs thing that doesn't make sense for the EVE api
	request('https://api.eveonline.com/account/Characters.xml.aspx?keyID=' + keyID +'&vCode='+vCode,function(error,response,body){
		if (!error && response.statusCode == 200) //This key is valid!
		{
			parser.parseString(body,function(err,result){ //Async hell starts here!
				result.eveapi.result[0].rowset[0].row.forEach(function(character)
				{
					console.log(character);
				});
			});
		}
		else
		{
			throw new Error("Invalid API key.")
		}
	});//First step is to enumerate the characters. Then parse them all with many asyncs. Wow.
};