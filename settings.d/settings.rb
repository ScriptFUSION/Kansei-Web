configure do
  set :public_folder, 'assets'
  set :haml, attr_wrapper: '"'
  set :faye_path, '/rt'
  set :libraries,
      mootools: '//cdnjs.cloudflare.com/ajax/libs/mootools/1.5.0/' \
        'mootools-core-full-nocompat.min.js'
end
