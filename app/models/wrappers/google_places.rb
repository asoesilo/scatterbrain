=begin
https://github.com/marceldegraaf/google_places 
https://github.com/google/google-api-ruby-client
=end

class GooglePlacesAPI
  class << self
    @@client = nil

    def find_restaurant(keyword, latitude, longitude)
      client.spots_by_query(keyword, Lat: latitude, Lng: longitude, types: ['restaurant', 'food'])
    end

    def client
      if(!@@client)
        @@client = GooglePlaces::Client.new(api_key)
      end
      @@client
    end

    def api_key
      "AIzaSyBdfRMhYt-uriYLd_t78kTSnm8Ky9kcl4o"
    end
  end

  private_class_method :api_key
end