class Movie 
  include Jsonable
  attr_reader :id
  attr_reader :title
  attr_reader :year
  attr_reader :theater_release_date
  attr_reader :dvd_release_date
  attr_reader :summary
  attr_reader :runtime
  attr_reader :critics_rating
  attr_reader :audience_rating
  attr_reader :photo_url
  # attr_reader :director
  # attr_reader :cast
  attr_reader :url
  attr_accessor :created_at

  def initialize(args)
    @id = args[:id]
    @title = args[:title]
    @year = args[:year]
    @theater_release_date = args[:theater_release_date]
    @dvd_release_date = args[:dvd_release_date]
    @summary = args[:summary]
    @runtime = args[:runtime]
    @critics_rating = args[:critics_rating]
    @audience_rating = args[:audience_rating]
    @photo_url = args[:photo_url]
    # @director = args[:director]
    # @cast = args[:cast]
    @url = args[:url]
    @created_at = args[:created_at]
  end
end