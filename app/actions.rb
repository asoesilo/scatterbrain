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