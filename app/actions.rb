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

get '/movies'
  keyword = params[:keyword]

  @movies = SearchUtil.search_movies_by_name(keyword)
end

get '/restaurants'
  keyword = params[:keyword]
  latitude = params[:latitude]
  longitude = params[:longitude]

  @restaurants = SearchUtil.find_restaurant(keyword, latitude, longitude)
end