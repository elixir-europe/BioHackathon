/**
 * Created by rolando on 02/08/2018.
 */
const amqp = require('amqplib');

class Listener {
    constructor(rabbitConnectionProperties, exchange, queue, exchangeType) {
        this.rabbitConnectionProperties = rabbitConnectionProperties;
        this.rabbitUrl = rabbitConnectionProperties["scheme"] + "://" + rabbitConnectionProperties["host"] + ":" + rabbitConnectionProperties["port"];
        this.exchange = exchange;
        this.queue = queue;
        this.exchangeType = exchangeType;
    }

    start(){
        amqp.connect(this.rabbitUrl).then(conn => {
            return conn.createChannel();
        }).then(ch => {
            ch.assertExchange(this.exchange, this.exchangeType).then(() => {
                ch.assertQueue(this.queue, {durable: false}).then(() => {
                    ch.bindQueue(this.queue, this.exchange, this.queue).then(() => {
                        ch.prefetch(1).then(() => {
                            ch.consume(this.queue, (msg) => {
                                this.handle(msg);
                            }, {noAck : true});
                        })
                    })
                })
            })

        })
    }

    setHandler(handler) {
        this.handler = handler;
    }

    handle(msg){
        this.handler.handle(msg);
    }

}

module.exports = Listener;