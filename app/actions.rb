helpers do
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end

# Homepage (Root path)
get '/' do
  erb :index
end

# Authentication Routes
get '/login' do
  erb :'auth/login'
end

get '/login/status' do
  puts "Checking user status: #{current_user.id if current_user}"
  { isLoggedIn: !current_user.nil? }.to_json
end

get '/signup' do
  erb :'auth/signup'
end

get '/logout' do
  session[:user_id] = nil
  redirect '/'
end

post '/signup' do
  @user = User.new(
    username: params[:username],
    password: params[:password]
  )

  if @user.save
    session[:user_id] = @user.id
    redirect '/'
  else
    erb :'auth/signup'
  end
end

post '/login' do
  @user = User.find_by(
    username: params[:username], 
    password: params[:password]
  )

  if @user
    session[:user_id] = @user.id
    redirect '/'
  else
    erb :'auth/login'
  end
end

get '/movies' do
  keyword = params[:keyword]

  @movies = SearchUtil.find_movie(keyword)
  @movies.to_json
end

get '/restaurants' do
  keyword = params[:keyword]
  latitude = params[:latitude]
  longitude = params[:longitude]

  @restaurants = SearchUtil.find_restaurant(keyword, latitude, longitude)
  @restaurants.to_json
end

post '/user/restaurants' do
  @params = JSON.parse(request.body.read)
  puts "Add new restaurant with ID #{@params['yelp_business_id']} to user #{current_user.id}"
  yelp_business_id = @params["yelp_business_id"]

  entry = current_user.entries.create(
    provider_entry_id: yelp_business_id,
    category: Category.restaurant,
    provider: Provider.yelp,
    )
end

post '/user/movies' do
  @params = JSON.parse(request.body.read)
  puts "Add new movie with ID #{@params['rotten_tomatoes_movie_id']} to user #{current_user.id}"
  rotten_tomatoes_movie_id = @params["rotten_tomatoes_movie_id"]

  entry = current_user.entries.create(
    provider_entry_id: rotten_tomatoes_movie_id,
    category: Category.movie,
    provider: Provider.rottentomatoes,
    )
end

get '/user/restaurants' do
  puts "Retrieving list of restaurants for user #{current_user.id}"
  restaurants = current_user.entries.where( category: Category.find_by(name: "Restaurant") ).map do |entry|
    restaurant = YelpAPI.find_restaurant_by_id(entry.provider_entry_id)
  end
  restaurants.to_json
end

get '/user/movies' do
  puts "Retrieving list of movies for user #{current_user.id}"
  movies = current_user.entries.where( category: Category.find_by(name: "Movie") ).map do |entry|
    restaurant = RottenTomatoesAPI.find_movie_by_id(entry.provider_entry_id)
  end
  movies.to_json
end

get '/user/restaurants/:provider_entry_id' do
  YelpAPI.find_restaurant_by_id( params[:provider_entry_id] ).to_json
end
  
get '/user/movies/:provider_entry_id' do
  RottenTomatoesAPI.find_movie_by_id( params[:provider_entry_id] ).to_json
end