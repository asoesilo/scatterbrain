=begin
https://github.com/nmunson/rottentomatoes
=end
class RottenTomatoesAPI
  class << self
    include RottenTomatoes

    
    def find_movie(keyword, limit = 4)
      create_new_client
      movies = RottenMovie.find(title: keyword, limit: limit)
      if(!movies.is_a?(Array))
        movies = [movies]
      end
      movies = movies.map { |movie| parse_result(movie) }
      movies.sort_by! { |movie| -StringMatcher.getDistance(keyword, movie.title) }
    end

    def parse_result(movie)
      id = movie.id
      title = movie.title
      year = movie.year
      theater_release_date = movie.release_dates.theater
      dvd_release_date = movie.release_dates.dvd
      summary = movie.synopsis
      length = movie.runtime
      critics_rating = movie.ratings.critics_score
      audience_rating = movie.ratings.audience_score
      photo_url = movie.posters.detailed
      # director = 
      # cast = 
      url = movie.links.alternate

      Movie.new(
        id: id,
        title: title,
        year: year,
        theater_release_date: theater_release_date,
        dvd_release_date: dvd_release_date,
        summary: summary,
        length: length,
        critics_rating: critics_rating,
        audience_rating: audience_rating,
        photo_url: photo_url,
        url: url,
        )
    end     

    def find_movie_by_id(provider_entry_id)
      create_new_client
      response = RottenMovie.find(id: provider_entry_id).to_h
      parse_result_by_id(response)
    end

    def parse_result_by_id(movie)
      id = movie[:id]
      title = movie[:title]
      year = movie[:year]
      theater_release_date = movie[:release_dates].theater
      dvd_release_date = movie[:release_dates].dvd
      summary = movie[:synopsis]
      length = movie[:runtime]
      critics_rating = movie[:ratings].critics_score
      audience_rating = movie[:ratings].audience_score
      photo_url = movie[:posters].detailed
      # director = 
      # cast = 
      url = movie[:links].alternate

      Movie.new(
        id: id,
        title: title,
        year: year,
        theater_release_date: theater_release_date,
        dvd_release_date: dvd_release_date,
        summary: summary,
        length: length,
        critics_rating: critics_rating,
        audience_rating: audience_rating,
        photo_url: photo_url,
        url: url,
        )
    end

    def create_new_client
      if(Rotten.api_key.empty?)
        Rotten.api_key = api_key
      end
    end

    def api_key
      "t9tswecuzx5ksd7vse2fxfzh"
    end
  end

  private_class_method :api_key
end