//#!/usr/bin/python -B

/*from datetime import datetime
import dateutil.parser
import re
import urllib
import urllib2*/

#==================================================================
# KEYWORDS
#==================================================================

#==================================================================
# REGULAR EXPRESSIONS
#==================================================================

tokenizer = re.compile('(<[^>]+>|[a-zA-Z]+="[^"]*"|[;,])\\s*')

#==================================================================
class TimeMap(object,timemap_uri):
#==================================================================

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
			this.original = link ? link[2] : else null;
		else if(link[0] == 'timebundle')
			this.timebundle = link ? link[2] : else null;
		else if(link[0] == 'timegate')
			this.timegate = link ? link[2] : else null;
		else if(link[0] == 'timemap')
			this.timemap = link ? link[2] : else null;
		else if(link[0] == 'first memento')
			this.mementos[link[1]] = link[2]
			this.first_memento = link ? link[1] : else null;
		else if(link[0] == 'last memento')){
			this.mementos[link[1]] = link[2];
			this.last_memento = link ? link[1] : else null;}
		link = this.get_next_link()
	}
    function get_next_link(){
        uri = null;
        datetime = null;
        rel = null;
        resource_type = null;
        for(token in this.__tokens){
            if(token[0] == '<')
                uri = token[1:-1];
            else if(token[:9] == 'datetime=')
                datetime = token[10:-1];
            else if(token[:4] == 'rel=')
                rel = token[5:-1];
            else if(token[:5] == 'type=')
                resource_type = token[6:-1];
            else if(token == ';')
                null;
            else if(token == ',')
                return ( rel, (datetime ? 
                              dateutil.parser.parse(datetime) : null),
                              uri, resource_type )
            else:
                raise Exception('Unexpected timemap token', token) }
        if(!uri)
            return null
        else
            return ( rel, (datetime ? 
                      dateutil.parser.parse(datetime) : null),
                      uri, resource_type )
	}
    function __getitem__(key){
        return this.mementos[key];}

#==================================================================
function TimeMapTokenizer(object):
#==================================================================

    //def __init__(self, timemap_uri):
    this._tmfile = urllib2.urlopen(timemap_uri);
    this._tokens = [];

    function __iter__(){
        return this;}

    function next(){
        if this._tokens.length == 0{
            line = this._tmfile.readline();
            if(line.length == 0)
                raise StopIteration;
            this._tokens = tokenizer.findall(line);} //end conditional
        return this._tokens.pop(0);} //end next function

#===============================================================================
# MAIN FOR TESTING
#===============================================================================

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

