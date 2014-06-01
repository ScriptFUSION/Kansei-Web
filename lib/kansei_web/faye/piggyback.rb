require_relative 'client'

module KanseiWeb
  module Faye
    # Rack middleware for piggybacking Faye::RackAdapter.
    class Piggyback
      def initialize(app)
        @app = app

        fail 'Must be placed immediately before Faye::RackAdapater' unless
          app.is_a? ::Faye::RackAdapter

        @client = Client.new app.get_client
      end

      def call(env)
        # Pass through.
        @app.call(env)
      end
    end
  end
end
