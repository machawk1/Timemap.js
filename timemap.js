//==================================================================
// KEYWORDS
//==================================================================

//==================================================================
// REGULAR EXPRESSIONS
//==================================================================

var tokenizer = new RegExp('(<[^>]+>|[a-zA-Z]+="[^"]*"|[;,])\\s*');

//==================================================================
function TimeMap(obj){
//==================================================================
	this.original      = null;
	this.timebundle    = null;
	this.timegate      = null;
	this.timemap       = null;
	this.first_memento = null;
	this.last_memento  = null;
	this.mementos      = {};
	this.tokens = TimeMapTokenizer(timemap_uri);
	link = this.get_next_link();
	while(link != null){
		if(link[0] == 'memento')
			this.mementos[link[1]] = link[2];
		else if(link[0] == 'original')
			if(link != null)
				this.original = link[2];
			//else null;
		else if(link[0] == 'timebundle')
			if(link != null)
				this.timebundle = link[2];
			//else null;
		else if(link[0] == 'timegate')
			if(link != null)
				this.timegate = link[2];
			//else null;
		else if(link[0] == 'timemap')
			if(link != null)
				this.timemap = link[2]; 
			 //else null;
		else if(link[0] == 'first memento'){
			this.mementos[link[1]] = link[2];
			if(link != null)
				this.first_memento = link[1];
			//else 
				//null;
		}
		else if(link[0] == 'last memento'){
			this.mementos[link[1]] = link[2];
			if(link != null){
				this.last_memento = link[1]
			}
			//else null;
		}
		link = this.get_next_link()
	}
	
	function get_next_link(){
        uri = null;
        datetime = null;
        rel = null;
        resource_type = null;
       /* for(token in this.tokens){
            if(token[0] == '<')
                uri = token[1:-1];
            else if(token[:9] == 'datetime=')
                datetime = token[10:-1];
            else if(token[:4] == 'rel=')
                rel = token[5:-1];
            else if(token[:5] == 'type=')
                resource_type = token[6:-1];
            else if(vtoken == ';')
                null;
            else if(token == ',')
                return ( rel, dateutil.parser.parse(datetime)
                              if datetime != null else null,
                              uri, resource_type );
            else
                raise Exception('Unexpected timemap token', token);
        }*/
        if(uri == null)
            return null
        else
        	if(datetime != null)
				return (rel, dateutil.parser.parse(datetime));
            else 
            	return (null, uri, resource_type);
	}
	
    function getitem(key){
        return this.mementos[key];
    }

//==================================================================
function TimeMapTokenizer(obj){
//==================================================================
	this.tmfile = urllib2.urlopen(timemap_uri);
	this.tokens = [];

    function iter(){
        return this;
    }

    function next(){
        if (this.tokens.length == 0){
            line = this.tmfile.readline();
            if(len(line) == 0){
                //TODO: Raise StopIteration;
            }
            this.tokens = tokenizer.findall(line);
        }
        return this.tokens.pop(0);
    }
}

//===============================================================================
// MAIN FOR TESTING
//===============================================================================
logging.basicConfig();

timemap_uri = "http://api.wayback.archive.org/memento/timemap/link/http://www.cs.odu.edu";
tm = TimeMap(timemap_uri);
console.log "Original:     "+ tm.original);
console.log( "Time Bundle:  "+ tm.timebundle);
console.log( "Time Gate:    "+ tm.timegate);
console.log( "Time Map:     "+ tm.timemap);
console.log( "First Memento:"+ tm.first_memento);
console.log( "Last Memento: "+ tm.last_memento);
console.log( "Mementos:");
for memento in sorted(tm.mementos.keys()):
	print memento, "=", tm.mementos[memento];

