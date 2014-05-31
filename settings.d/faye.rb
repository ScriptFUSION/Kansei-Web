set :faye_path, '/rt'

# Enable WebSocket.
Faye::WebSocket.load_adapter('thin')

# Load Faye middleware.
use Faye::RackAdapter, mount: settings.faye_path,
                       extensions: [KanseiWeb::KanseiExtension.new]
