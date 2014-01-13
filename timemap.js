//#!/usr/bin/python -B

/*from datetime import datetime
import dateutil.parser
import re
import urllib
import urllib2*/

//==================================================================
// KEYWORDS
//==================================================================

//==================================================================
// REGULAR EXPRESSIONS
//==================================================================

tokenizer = new RegExp('(<[^>]+>|[a-zA-Z]+="[^"]*"|[;,])\\s*'); 

//==================================================================
function TimeMap(object,timemap_uri){
//==================================================================

    //def __init__(self, timemap_uri):
	this.original      = null;
	this.timebundle    = null;
	this.timegate      = null;
	this.timemap       = null;
	this.first_memento = null;
	this.last_memento  = null;
	this.mementos      = [];
	this.__tokens = TimeMapTokenizer(timemap_uri)
	link = this.get_next_link()
	while(link){
		if(link[0] == 'memento')
			this.mementos[link[1]] = link[2];
		else if(link[0] == 'original')
			this.original = link ? link[2] : null;
		else if(link[0] == 'timebundle')
			this.timebundle = link ? link[2] : null;
		else if(link[0] == 'timegate')
			this.timegate = link ? link[2] : null;
		else if(link[0] == 'timemap')
			this.timemap = link ? link[2] : null;
		else if(link[0] == 'first memento'){
			this.mementos[link[1]] = link[2]
			this.first_memento = link ? link[1] : null;}
		else if(link[0] == 'last memento'){
			this.mementos[link[1]] = link[2];
			this.last_memento = link ? link[1] : null;}
		link = this.get_next_link();
	}
    function get_next_link(){
        uri = null;
        datetime = null;
        rel = null;
        resource_type = null;
        for(token in this.__tokens){
            if(token[0] == '<')
                uri = token.slice[1,token.length-2]; //token[1:-1] TO VERIFY: is this getting everything between the first and last element exclusive? 
            else if(token.substr(0,9) == 'datetime=') //token[:9] == 'datetime='
                datetime = token.substr(10);//token[10:-1];
            else if(token.substr(0,4) == 'rel=')
                rel = token.substr(5);
            else if(token.substr(0,5) == 'type=')
                resource_type = token.substr(6);
            else if(token == ';')
                null;
            else if(token == ',')
                return ( rel, (datetime ? 
                              dateutil.parser.parse(datetime) : null),
                              uri, resource_type )
            else
                throw {name:'Unexpected timemap token',token: token}   }//end for
        if(!uri)
            return null
        else
            return ( rel, (datetime ? 
                      dateutil.parser.parse(datetime) : null),
                      uri, resource_type )
	}
    function __getitem__(key){
        return this.mementos[key];}
}
//==================================================================
function TimeMapTokenizer(object){
//==================================================================

    //def __init__(self, timemap_uri):
    var xmlhttp = new XMLHttpRequest(); xmlhttp.open("GET",timemap_uri,false); xmlhttp.send(); this._tmfile = xmlhttp.responseText;
    this._tokens = [];

    function __iter__(){
        return this;}

    function next(){
        if(this._tokens.length == 0){
            line = this._tmfile.readline();
            if(line.length == 0)
                throw {name: "StopIteration"};
            this._tokens = tokenizer.findall(line);} //end conditional
        return this._tokens.pop(0);} //end next function
}
//===============================================================================
// MAIN FOR TESTING
//===============================================================================

//if __name__ == "__main__":
    //import logging
    //logging.basicConfig()

timemap_uri = "http://api.wayback.archive.org/memento/timemap/link/http://www.cs.odu.edu";
tm = TimeMap(timemap_uri);
console.log("Original:     "+tm.original);
console.log("Time Bundle:  ", tm.timebundle);
console.log("Time Gate:    ", tm.timegate);
console.log("Time Map:     ", tm.timemap);
console.log("First Memento:", tm.first_memento);
console.log("Last Memento: ", tm.last_memento);
console.log("Mementos:");
for(memento in sorted(tm.mementos.keys())){
	console.log(memento, "=", tm.mementos[memento]);}

