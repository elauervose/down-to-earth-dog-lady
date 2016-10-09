require 'sinatra'

# Index page
get '/' do
  erb :index
end

# Single page (`.?:format?` will ignore .html on urls)
get '/about.?:format?' do
  erb :about
end

# Wildcard page
get '/:page.?:format?' do
  erb params[:page].to_sym
end
