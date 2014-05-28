class CreateTables < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.string :username
      t.string :password
      t.timestamps
    end

    create_table :categories do |t|
      t.string :name
    end

    create_table :entries do |t|
      t.belongs_to :category
      t.belongs_to :user
      t.string :content
      t.timestamps
    end
  end

  def down
    drop_table :users
    drop_table :categories
    drop_table :entries
  end
end
