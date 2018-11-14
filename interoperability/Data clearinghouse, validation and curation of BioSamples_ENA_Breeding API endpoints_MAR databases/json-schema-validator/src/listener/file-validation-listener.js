/**
 * Created by rolando on 01/08/2018.
 */
const Listener = require('./listener');

class FileValidationListener {
    constructor(rabbitConnectionProperties, exchange, queue, handler, exchangeType) {
        this.exchange = exchange;
        this.exchangeType = exchangeType;
        this.queue = queue;
        this.handler = handler;
        this.listener = new Listener(rabbitConnectionProperties, exchange, queue, exchangeType);
        this.listener.setHandler(this.handler);
    }

    start(){
        this.listener.start();
    }
}

module.exports = FileValidationListener;