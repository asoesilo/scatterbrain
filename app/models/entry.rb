class Entry < ActiveRecord::Base
  validates :user, presence: true
  validates :category, presence: true
  validates :content, presence: true

  belongs_to :user
  belongs_to :category
  belongs_to :provider
end