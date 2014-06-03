configure do
  # Log queries to STDOUT in development
  if Sinatra::Application.development?
    ActiveRecord::Base.logger = Logger.new(STDOUT)
  end

  if development?
    set :database, {
      adapter: "postgresql",
      database: "scatterbrain"
    }
  else
    set :database, ENV['DATABASE_URL']
  end

  # set :database, {
  #   adapter: "postgresql",
  #   host: "ec2-174-129-197-200.compute-1.amazonaws.com",
  #   port: "5432",
  #   username: "yuetsvswtniawy",
  #   password: "_N3cGPvlI2fSpscuKkPUUTp-hB",
  #   database: "d7avgj2qgk4o64"
  # }  

  # Load all models from app/models, using autoload instead of require
  # See http://www.rubyinside.com/ruby-techniques-revealed-autoload-1652.html
  Dir[APP_ROOT.join('app', 'models', '*.rb')].each do |model_file|
    filename = File.basename(model_file).gsub('.rb', '')
    autoload ActiveSupport::Inflector.camelize(filename), model_file
  end

end
