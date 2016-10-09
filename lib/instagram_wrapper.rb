require "instagram"

class InstagramWrapper
  def initialize
    Instagram.configure do |config|
      config.client_id      = ENV["INSTAGRAM_CLIENT_ID"]
      config.client_secret  = ENV["INSTAGRAM_CLIENT_SECRET"]
    end

    token   = ENV["INSTAGRAM_ACCESS_TOKEN"]
    @client = Instagram.client(:access_token => token)
  end

  def self.instance
    @instance ||= new
  end

  # # Return value will look something like this
  # [
  #   {
  #     "tags": [
  #       "doghiking",
  #       "mthood",
  #       "happydogs",
  #       "aussiesofinstagram",
  #       "australianshepherd",
  #       "packlike",
  #       "hikingwithdogs"
  #     ],
  #     "created_time": "1475991451",
  #     "link": "https://www.instagram.com/p/BLVKg71jZkT/",
  #     "images": {
  #       "low_resolution": {
  #         "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x...",
  #         "width": 320,
  #         "height": 239
  #       },
  #       "thumbnail": {
  #         "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150...",
  #         "width": 150,
  #         "height": 150
  #       },
  #       "standard_resolution": {
  #         "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh...",
  #         "width": 640,
  #         "height": 479
  #       }
  #     },
  #     "caption": {
  #       "text": "Wild thing you make my heart sing <U+1F342>#australianshep...."
  #     }
  #   }
  # ]
  def recent
    client.user_recent_media
  end

  private

  attr_reader :client
end
