module KanseiWeb
  module Faye
    # Attaches Kansei messaging services to a Faye in-process client.
    class Client
      def initialize(client)
        @client = client

        attach_subscriptions
      end

      private

      def attach_subscriptions
        @client.subscribe('/**') do |data|
          p data
        end
      end
    end
  end
end
