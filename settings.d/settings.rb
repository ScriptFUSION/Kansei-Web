configure do
  # Sinatra settings.
  set :public_folder, 'assets'
  set :views, 'views'

  # Template settings.
  set :haml, attr_wrapper: '"'

  # Custom settings.
  set :libraries,
      mootools: '//cdnjs.cloudflare.com/ajax/libs/mootools/1.5.0/' \
        'mootools-core-full-nocompat.min.js'
end
