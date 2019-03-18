let VueSocketIOLogger=function(){
	this.debug = false;
    this.prefix = '%cVue-Socket.io: ';
}
VueSocketIOLogger.prototype={
	constructor:VueSocketIOLogger,
	info:function(text,data) {
		data=data||'';
        if(this.debug) window.console.info(this.prefix+'%c'+text, 'color: blue; font-weight: 600', 'color: #333333', data);
    },
	error:function() {
		if (this.debug) window.console.error.apply(window.console, [this.prefix].concat(Array.prototype.slice.call(arguments)));
		
        //if(this.debug) window.console.error(this.prefix, ...arguments);
    },
    warn:function() {
        //if(this.debug) window.console.warn(this.prefix, ...arguments);
		if (this.debug) window.console.warn.apply(window.console, [this.prefix].concat(Array.prototype.slice.call(arguments)));
    },
    event:function(text, data){
		data=data||'';
        if(this.debug) window.console.info(this.prefix+'%c'+text, 'color: blue; font-weight: 600', 'color: #333333', data);
    }
}

export default new VueSocketIOLogger() 