class SearchUtil
  private
  def initialize
  end

  class << self
    def find_restaurant(keyword, latitude, longitude)
      YelpAPI.find_restaurant(keyword, latitude, longitude)
      # GooglePlacesAPI.find_restaurant(keyword, latitude, longitude)
    end

    def search_movies_by_name(keyword, limit = 5)
      RottenTomatoesAPI.search_by_name(keyword, limit)
    end
  end
end