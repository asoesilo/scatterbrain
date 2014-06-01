class SearchUtil
  private
  def initialize
  end

  class << self
    def find_restaurant(keyword, latitude, longitude)
      YelpAPI.find_restaurant(keyword, latitude, longitude)
      # GooglePlacesAPI.find_restaurant(keyword, latitude, longitude)
    end

    def find_movie(keyword, limit = 4)
      RottenTomatoesAPI.find_movie(keyword, limit)
    end
  end
end