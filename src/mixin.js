let mixins={

    /**
     *  Assign runtime callbacks
     */
    beforeCreate:function(){
		const t=this;
        if(!t.sockets) t.sockets = {};

        t.sockets.subscribe = function(event, callback) {
            t.$vueSocketIo.emitter.addListener(event, callback, t);
        };

        t.sockets.unsubscribe = function(event) {
            t.$vueSocketIo.emitter.removeListener(event, t);
        };

    },

    /**
     * Register all socket events
     */
    mounted:function(){
		const t=this;
        if(t.$options.sockets){

            Object.keys(t.$options.sockets).forEach(function(event) {

                if(event !== 'subscribe' && event !== 'unsubscribe') {
                    t.$vueSocketIo.emitter.addListener(event, t.$options.sockets[event], t);
                }

            });

        }

    },

    /**
     * unsubscribe when component unmounting
     */
    beforeDestroy:function(){
		const t=this;
        if(t.$options.sockets){

            Object.keys(t.$options.sockets).forEach( function(event) {

                t.$vueSocketIo.emitter.removeListener(event, t);

            });

        }

    }

}
export default mixins;