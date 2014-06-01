require 'sinatra/base'
require 'kansei/game'

module KanseiWeb
  # Kansei Sinatra application.
  class Application < Sinatra::Base
    Dir.chdir File.realpath('../..', __dir__)

    # Load settings.
    Dir.glob('settings.d/*') do |file|
      puts "Loading #{File.basename(file)}..."
      instance_eval File.read(file), file
    end
  end
end
