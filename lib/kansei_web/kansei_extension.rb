module KanseiWeb
  # Faye extension providing Kansei features.
  class KanseiExtension
    def incoming(message, request, callback)
      puts '<- ' << message.inspect

      callback.call(message)
    end

    def outgoing(message, callback)
      puts '-> ' << message.inspect

      callback.call(message)
    end
  end
end
