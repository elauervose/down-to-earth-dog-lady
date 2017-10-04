require "sinatra"
require "json"
require "rdiscount"
require "sinatra/json"
require "sinatra/content_for"

require "./lib/instagram_wrapper"
# require "./lib/eventbrite_wrapper"

# Index page
get "/" do
  erb :index, :layout => :"layouts/layout"
end

# Single page (`.?:format?` will ignore .html on urls)
get "/about.?:format?" do
  erb :about, :layout => :"layouts/layout"
end

# Single page (`.?:format?` will ignore .html on urls)
# get "/training.?:format?" do
  # this line assumes a folder titled "layouts" exists and a layout called "events.erb" is in there.
#   erb :training, :layout => :"layouts/training-layout"
# end

# get "/events" do
#   json EventbriteWrapper.instance.events
# end

# tags in use: #packhikes, #portlandpetcare, #dogtraining
# use #dtedl to float images to the top
get "/recent-photos" do
  json InstagramWrapper.instance.recent
end

get "/descriptions" do
  categories = []

  Dir.glob("erins_content_folder/category_descriptions/*.md") do |file|
    contents = File.read(file)
    filename = File.basename(file).gsub(/\.md/, '')
    categories << {
      name: filename,
      content: RDiscount.new(contents).to_html
    }
  end

  json categories
end

# Wildcard page (must be the last route in app.rb)
get "/:page.?:format?" do
  begin
    erb params[:page].to_sym, :layout => :"layouts/layout"
  rescue Errno::ENOENT
    halt 404
  end
end

not_found do
  erb :"404"
end

error do
  erb :"500"
end
