class Entry < ActiveRecord::Base
  validates :user, presence: true
  validates :category, presence: true
  validates :content, presence: true

  belongs_to :user
  belongs_to :category
  belongs_to :provider

  def to_s
    "Category ID: #{category_id} " <<
    "User ID: #{user_id} " <<
    "Content: #{content} " <<
    "Provider ID: #{provider_id} " <<
    "Provider Entry ID: #{provider_entry_id}"
  end
end