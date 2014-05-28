(function() {
    var chat = $$('.chat')[0],
        input = chat.getChildren('input')[0],
        messages = chat.getChildren('ol')[0];

    document.addEvent('keypress', function(e) {
        //Enter key.
        if (e.code == 13) {
            chat.toggleClass('hidden');

            if (chat.hasClass('hidden'))
                fireEvent('Kansei.chat.send', input.value);
            else input.focus();

            //Clear input.
            input.set('value', null);
        }
    });

    addEvent('Kansei.chat.receive', function(message) {
        messages.adopt(new Element('li', { html: message }));
    });
})();
