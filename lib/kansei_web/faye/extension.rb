module KanseiWeb
  module Faye
    # Faye extension providing Kansei features.
    class Extension
      def incoming(message, callback)
        puts '<- ' << message.inspect

        callback.call(message)
      end

      def outgoing(message, callback)
        puts '-> ' << message.inspect

        callback.call(message)
      end
    end
  end
end
