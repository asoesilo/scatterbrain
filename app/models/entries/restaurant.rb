class Restaurant
  include Jsonable
  attr_reader :id
  attr_reader :name
  attr_reader :address
  attr_reader :city
  attr_reader :state
  attr_reader :country
  attr_reader :phone
  attr_reader :rating
  attr_reader :review_count
  attr_reader :url
  attr_reader :photo_url

  def initialize(args)
    @id = args[:id]
    @name = args[:name]
    @address = args[:address]
    @city = args[:city]
    @state = args[:state]
    @country = args[:country]
    @phone = args[:phone]
    @rating = args[:rating]
    @review_count = args[:review_count]
    @url = args[:url]
    @photo_url = args[:photo_url]
  end

  def to_s
    "ID: #{@id}" <<
    "Name: #{@name};" <<
    "Address: #{@address};" <<
    "City: #{@city};" <<
    "State: #{@state};" <<
    "Country: #{@country};" <<
    "Phone: #{@phone};" <<
    "Rating: #{@rating};" <<
    "Review count: #{@review_count};" <<
    "URL: #{@url}" <<
    "Photo URL: #{@photo_url};"
  end
end