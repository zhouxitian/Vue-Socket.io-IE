let VueSocketIOListener=function(io, emitter){
	this.staticEvents = [
		'connect',
		'error',
		'disconnect',
		'reconnect',
		'reconnect_attempt',
		'reconnecting',
		'reconnect_error',
		'reconnect_failed',
		'connect_error',
		'connect_timeout',
		'connecting',
		'ping',
		'pong'
    ];
	this.io = io;
    this.register();
    this.emitter = emitter;
}
function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
VueSocketIOListener.prototype={
	constructor:VueSocketIOListener,
	register:function(){
		const t=this;
        t.io.onevent = function(packet) {
           // let [event, ...args] = packet.data;
		   console.log(packet)
		   var _packet$data = _toArray(packet.data),
			    event = _packet$data[0],
			    args = _packet$data.slice(1);
            if(args.length === 1) args = args[0];
            t.onEvent(event, args)
        };
        t.staticEvents.forEach(function(event){
			t.io.on(event, function(args){
				t.onEvent(event, args)
			})
		})
    },
    onEvent:function(event, args){
        this.emitter.emit(event, args);
    }
}
export default VueSocketIOListener
