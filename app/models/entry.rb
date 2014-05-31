class Entry < ActiveRecord::Base
  validates :user, presence: true
  validates :category, presence: true

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

  class << self
    def create_with_id(provider_entry_id, user, category, provider)
      create(user: user,
        category: category,
        provider: provider,
        provider_entry_id: provider_entry_id)
    end

    def create_with_content(content, user, category, provider)
      create(user: user,
        category: category,
        provider: provider,
        content: content)
    end
  end
end