class Category < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :entries

  class << self
    def unknown
      find_by(name: 'Unknown')
    end

    def restaurant
      find_by(name: 'Restaurant')
    end

    def movie
      find_by(name: 'Movie')
    end
  end
end