require 'sinatra'

Dir.chdir File.dirname(__FILE__)

# Load settings.
Dir.glob('settings.d/*') { |file| load file }
