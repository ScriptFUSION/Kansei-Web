require 'sinatra'
require 'faye'

Dir.chdir File.dirname(__FILE__)

# Load settings.
Dir.glob('settings.d/*') { |file| load file }

use Faye::RackAdapter, mount: settings.faye_path

run Sinatra::Application
