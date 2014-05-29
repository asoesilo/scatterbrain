# Homepage (Root path)
get '/' do
  erb :index
end

# Authentication Routes
get '/login' do
  erb :'auth/login'
end

get '/signup' do
  erb :'auth/signup'
end

get '/logout' do
  erb :'/'
end