# Disable Rack::Lint middleware.
module Rack
  # Rack::Lint stub.
  class Lint
    def call(env = nil)
      @app.call(env)
    end
  end
end
