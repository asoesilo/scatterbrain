=begin
https://github.com/nvd/yelpster
=end
class YelpAPI
  class << self
    include Yelp::V1::Review::Request
    include Yelp::V2::Business::Request

    @@max_avg_rating = 5

    def find_restaurant(keyword, latitude, longitude, limit=4)
      client = create_new_client
      request = GeoPoint.new(
        term: keyword,
        latitude: latitude,
        longitude: longitude
        )

      businesses = client.search(request)
      businesses = businesses["businesses"].map { |business| parse_result(business) }
      businesses.sort_by! { |business| -StringMatcher.getDistance(keyword, business.name) }.first(limit)
    end

    def parse_result(business)
      id = business["id"]
      name = business["name"]
      address = business["address1"]
      city = business["city"]
      state = business["state_code"]
      country = business["country_code"]
      phone = business["phone"]
      rating = (business["avg_rating"].to_f / @@max_avg_rating).round(2) * 100
      review_count = business["review_count"]
      url = business["url"]
      photo_url = business["photo_url"]

      Restaurant.new(
        id: id,
        name: name,
        address: address,
        city: city,
        state: state,
        country: country,
        phone: phone,
        rating: rating,
        review_count: review_count,
        url: url,
        photo_url: photo_url
        )
    end

    def find_restaurant_by_id(provider_entry_id)
      client = create_new_client
      request = Id.new( yelp_business_id: provider_entry_id )
      response = client.search(request)
      parse_result_by_id(response, provider_entry_id)
    end

    def parse_result_by_id(business, provider_entry_id)
      id = provider_entry_id
      name = business["name"] 
      location = business["location"] 
      address = location["address"][0]
      city = location["city"] 
      state = location["state_code"] 
      country = location["country_code"]
      phone = business["phone"] 
      rating = (business["rating"].to_f / @@max_avg_rating).round(2) * 100
      review_count = business["review_count"]
      url = business["url"]
      photo_url = business["image_url"]

      Restaurant.new(
        id: id,
        name: name,
        address: address,
        city: city,
        state: state,
        country: country,
        phone: phone,
        rating: rating,
        review_count: review_count,
        url: url,
        photo_url: photo_url
        )
    end

    def create_new_client
      Yelp.configure(yws_id: yws_id,
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        token: token,
        token_secret: token_secret)
      Yelp::Client.new
    end

    def yws_id
      "usv8geUT0SpQtWudCe2Etg"
    end

    def consumer_key
      "OANFhtSxnRBEOjMe4NLEWw"
    end

    def consumer_secret
      "K1ADSCKgDPfGEc-ZlFv304B49IM"
    end

    def token
      "H6dNhYsWM0E8Ql-Ty-qSSd37oKDd_gpq"
    end

    def token_secret
      "VmkwLW-ktALMNOFbiqF87PfF6RI"
    end
  end

  private_class_method :yws_id
  private_class_method :consumer_key
  private_class_method :consumer_secret
  private_class_method :token
  private_class_method :token_secret
end