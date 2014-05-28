require 'sinatra'
require 'faye'

require_relative 'lib/rack/lint'
require_relative 'lib/kansei_web/kansei_extension'

Dir.chdir File.dirname(__FILE__)

# Load settings.
Dir.glob('settings.d/*') { |file| load file }

use Faye::RackAdapter, mount: settings.faye_path,
    extensions: [KanseiWeb::KanseiExtension.new]

run Sinatra::Application
