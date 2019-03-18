import Logger from './logger';
let EventEmitter=function(vuex){
	Logger.info(vuex ? 'Vuex adapter enabled' : 'Vuex adapter disabled');
	Logger.info(vuex.mutationPrefix ? 'Vuex socket mutations enabled' : 'Vuex socket mutations disabled');
    Logger.info(vuex ? 'Vuex socket actions enabled' : 'Vuex socket actions disabled');
	this.store = vuex.store;
	this.actionPrefix = vuex.actionPrefix ? vuex.actionPrefix : 'SOCKET_';
	this.mutationPrefix = vuex.mutationPrefix;
	this.listeners = new Map();
}
EventEmitter.prototype={
	constructor:EventEmitter,
	addListener:function(event, callback, component){

        if(typeof callback === 'function'){

            if (!this.listeners.has(event)) this.listeners.set(event, []);
            this.listeners.get(event).push({ callback, component });

            Logger.info(event+' subscribe, component: '+component.$options.name);

        } else {

            throw new Error('callback must be a function');

        }

    },
    removeListener:function(event, component){

        if(this.listeners.has(event)){

            const listeners = this.listeners.get(event).filter(function(listener) {
                listener.component !== component
            });

            if (listeners.length > 0) {
                this.listeners.set(event, listeners);
            } else {
                this.listeners.delete(event);
            }

            Logger.info(event+' unsubscribe, component: '+component.$options.name);

        }

    },
	emit:function(event, args){

        if(this.listeners.has(event)){

            Logger.info('Broadcasting: #${event}, Data:', args);

            this.listeners.get(event).forEach(function(listener)  {
                listener.callback.call(listener.component, args);
            });

        }

        if(event !== 'ping' && event !== 'pong') {
            this.dispatchStore(event, args);
        }

    },
	dispatchStore:function(event, args){

        if(this.store && this.store._actions){

            let prefixed_event = this.actionPrefix + event;

            for (let key in this.store._actions) {

                let action = key.split('/').pop();

                if(action === prefixed_event) {

                    Logger.info('Dispatching Action: '+key+', Data:', args);

                    this.store.dispatch(key, args);

                }

            }

            if(this.mutationPrefix) {

                let prefixed_event = this.mutationPrefix + event;

                for (let key in this.store._mutations) {

                    let mutation = key.split('/').pop();

                    if(mutation === prefixed_event) {

                        Logger.info('Commiting Mutation: '+key+', Data:', args);

                        this.store.commit(key, args);

                    }

                }

            }

        }

    }
}
export default EventEmitter