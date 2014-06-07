require 'sass/plugin/rack'

Sass::Plugin.options.merge!(
  template_location: [['assets/sass', 'assets/css']],
  cache_store: Sass::CacheStores::Memory.new
)

use Sass::Plugin::Rack
