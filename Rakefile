require 'rake'
require "sinatra/activerecord/rake"
require ::File.expand_path('../config/environment', __FILE__)

desc 'Retrieves the current schema version number'
task "db:version" do
  puts "Current version: #{ActiveRecord::Migrator.current_version}"
end

desc 'Populate initial default values of database'
task "db:populate" do
  categories = ["Unknown", "Restaurant", "Movie"]
  categories.each { |category|
    Category.create(name: category) if Category.find_by(name: category).nil?
  }

  providers = ["yelp", "rottentomatoes"]
  providers.each { |provider|
    Provider.create(name: provider) if Provider.find_by(name: provider).nil?
  }
end