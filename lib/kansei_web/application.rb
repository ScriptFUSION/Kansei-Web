require 'sinatra/base'
require 'faye'

require_relative '../rack/lint'
require_relative 'kansei_extension'

module KanseiWeb
  # Kansei Rack application.
  class Application < Sinatra::Base
    Dir.chdir File.dirname(__FILE__) << '/../..'

    # Load settings.
    Dir.glob('settings.d/*') do |file|
      puts "Loading #{File.basename(file)}..."
      instance_eval File.read(file), file
    end
  end
end
