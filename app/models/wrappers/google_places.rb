=begin
https://github.com/marceldegraaf/google_places 
https://github.com/google/google-api-ruby-client
=end

class GooglePlacesAPI
  class << self
    @@client = nil
    @@max_avg_rating = 5

    def find_restaurant(keyword, latitude, longitude)
      businesses = client.spots_by_query(keyword, Lat: latitude, Lng: longitude, types: ['restaurant', 'food'])
      
      businesses = businesses.map { |business|
        name = business.name
        address = business.formatted_address
        # city = 
        # state = 
        # country = 
        phone = business.formatted_phone_number
        rating = (business.rating.to_f / @@max_avg_rating).round(2) * 100
        review_count = business.reviews.size
        # url = 
        # photo_url = 

        Restaurant.new(
          name: name,
          address: address,
          # city: city,
          # state: state,
          # country: country,
          phone: phone,
          rating: rating,
          review_count: review_count,
          # url: url,
          # photo_url: photo_url
          )
      }

      businesses.sort_by! { |business| -StringMatcher.getDistance(keyword, business.name) }.first(5)
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