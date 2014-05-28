(function() {
    var client = new Faye.Client('/rt');

    var Logger = {
        incoming: function(message, callback) {
            console.debug('<-', message);
            callback(message);
        },
        outgoing: function(message, callback) {
            console.debug('->', message);
            callback(message);
        }
    };
    client.addExtension(Logger);

    //Subscribe to channels.
    [
        'public'
    ].each(function(channel) {
        client.subscribe('/' + channel, function(message) {
            routeChannelMessage(channel, message);
        });
    });

    function routeChannelMessage(channel, message) {
        var root = channel.split('/')[0];

        switch (root) {
            case 'public':
                fireEvent('Kansei.chat.receive', message);
        }
    }

    addEvent('Kansei.chat.send', function(msg) {
        //Ignore blank messages.
        if (msg.trim() === '') return;

        client.publish('/public', msg);
    });
})();
