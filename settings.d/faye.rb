require 'faye'
require File.expand_path('lib/kansei_web/faye/piggyback')
require File.expand_path('lib/kansei_web/faye/extension')

set :faye_path, '/rt'

# Enable WebSocket.
::Faye::WebSocket.load_adapter('thin')

# Load Faye piggyback middleware.
use KanseiWeb::Faye::Piggyback

# Load Faye middleware.
use ::Faye::RackAdapter, mount: settings.faye_path,
                         extensions: [KanseiWeb::Faye::Extension.new]
