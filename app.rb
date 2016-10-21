require "sinatra"
require "json"
require "sinatra/json"

require "./lib/instagram_wrapper"
require "./lib/eventbrite_wrapper"

# Erica put this here
require "./lib/acuity_wrapper"

#this came from here: https://developers.acuityscheduling.com/docs/webhooks
# this is the cURL: curl -u [[app:username]]:[[app:password]] "https://acuityscheduling.com/api/v1/appointments"
require 'openssl'
require 'base64'

def verify_message_signature(secret, body, signature)
  hash = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), secret, body))
  if hash.strip() != signature
    raise 'This message was forged!'
  end
end

# Index page
get "/" do
  erb :index
end

# Single page (`.?:format?` will ignore .html on urls)
get "/about.?:format?" do
  erb :about
end

# Single page (`.?:format?` will ignore .html on urls)
get "/training.?:format?" do
  # this line assumes a folder titled "layouts" exists and a layout called "events.erb" is in there.
  erb :training2, :layout => :"layouts/training-layout"
end

get "/events" do
  json EventbriteWrapper.instance.events
end

# tags in use: #packhikes, #portlandpetcare, #dogtraining
# use #dtedl to float images to the top
get "/recent-photos" do
  json InstagramWrapper.instance.recent
end

# Erica put this here
get "/appointments" do
  json AcuityWrapper.instance.recent
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
