class Provider < ActiveRecord::Base
  has_many :entries

  class << self
    def yelp
      find_by(name: 'yelp')
    end

    def rottentomatoes
      find_by(name: 'rottentomatoes')
    end
  end
end