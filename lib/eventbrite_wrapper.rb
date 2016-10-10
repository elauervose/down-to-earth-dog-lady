require "eventbrite"

class EventbriteWrapper
  def self.instance
    @instance ||= new
  end

  # # Return value will look something like this
  # [
  #   {
  #     "id": "27422283789",
  #     "name": {
  #       "text": "Downtown Private Lesson",
  #       "html": "Downtown Private Lesson"
  #     },
  #     "description": {
  #       "text": "Whether you need to work on new skill, refresh an ...",
  #       "html": "<P CLASS=\"lead2\">Whether you need to work on new ... </P>"
  #     },
  #     "url": "http://www.eventbrite.com/e/downtown-private-lesson-tickets-27422283789",
  #     "start": {
  #       "timezone": "America/Los_Angeles",
  #       "local": "2016-09-20T18:00:00",
  #       "utc": "2016-09-21T01:00:00Z"
  #     },
  #     "end": {
  #       "timezone": "America/Los_Angeles",
  #       "local": "2016-09-20T18:45:00",
  #       "utc": "2016-09-21T01:45:00Z"
  #     },
  #     "created": "2016-08-30T22:40:09Z",
  #     "changed": "2016-09-21T07:35:41Z",
  #     "capacity": 4,
  #     "status": "completed",
  #     "is_locked": false,
  #     "privacy_setting": "unlocked",
  #     "is_series": true,
  #     "is_series_parent": false,
  #     "resource_uri": "https://www.eventbriteapi.com/v3/events/27422283789/",
  #     "series_id": "27422282786",
  #     "logo": {
  #       "id": "23729266",
  #       "original": {
  #         "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com...",
  #         "width": null,
  #         "height": null
  #       },
  #       "url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2...",
  #       "aspect_ratio": "2",
  #       "edge_color": "#7f7d87",
  #       "edge_color_set": true
  #     }
  #   }
  # ]
  def events
    Eventbrite::User.owned_events(user_id: "me").events
  end

  private

  def initialize
    Eventbrite.token = ENV["EVENTBRITE_ACCESS_TOKEN"]
  end
end
