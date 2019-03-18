import Mixin from './mixin';
import Logger from './logger';
import Listener from './listener';
import Emitter from './emitter';
import SocketIO from 'socket.io-client';
let VueSocketIO=function(ref){
	let connection = ref.connection;
	let vuex = ref.vuex;
	let debug = ref.debug;
	let options = ref.options;
	Logger.debug = debug;
    this.io = this.connect(connection, options);
    this.emitter = new Emitter(vuex);
    this.listener = new Listener(this.io, this.emitter);
}
VueSocketIO.prototype={
	constructor:VueSocketIO,
	install:function(Vue){
		Vue.prototype.$socket = this.io;
        Vue.prototype.$vueSocketIo = this;
        Vue.mixin(Mixin);

        Logger.info('Vue-Socket.io plugin enabled');
	},
	connect:function(connection, options){

        if(connection && typeof connection === 'object'){

            Logger.info('Received socket.io-client instance');

            return connection;

        } else if(typeof connection === 'string'){

            Logger.info('Received connection string');

            return this.io = SocketIO(connection, options);

        } else {

            throw new Error('Unsupported connection type');

        }

    }
}
export default VueSocketIO
