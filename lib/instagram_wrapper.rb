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
  #         "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/14474410_877571479041945_1424405184796164096_n.jpg?ig_cache_key=MTM1NzAzNzEwNjQ1OTY3ODk5NQ%3D%3D.2",
  #         "width": 320,
  #         "height": 239
  #       },
  #       "thumbnail": {
  #         "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/c135.0.809.809/14474410_877571479041945_1424405184796164096_n.jpg?ig_cache_key=MTM1NzAzNzEwNjQ1OTY3ODk5NQ%3D%3D.2.c",
  #         "width": 150,
  #         "height": 150
  #       },
  #       "standard_resolution": {
  #         "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14474410_877571479041945_1424405184796164096_n.jpg?ig_cache_key=MTM1NzAzNzEwNjQ1OTY3ODk5NQ%3D%3D.2",
  #         "width": 640,
  #         "height": 479
  #       }
  #     },
  #     "caption": {
  #       "text": "Wild thing you make my heart sing <U+1F342>#australianshepherd#aussiesofinstagram#mthood#happydogs#packlike#hikingwithdogs#doghiking"
  #     }
  #   }
  # ]
  def recent
    client.user_recent_media
  end

  private

  attr_reader :client
end
