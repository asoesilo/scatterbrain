=begin
https://github.com/brianmichel/badfruit
=end
class RottenTomatoesAPI
  class << self
    include RottenTomatoes

    def search_by_name(keyword, limit = 5)
      if(Rotten.api_key.empty?)
        Rotten.api_key = api_key
      end
      RottenMovie.find(title: keyword, limit: limit)
    end

    def api_key
      "t9tswecuzx5ksd7vse2fxfzh"
    end
  end

  private_class_method :api_key
end