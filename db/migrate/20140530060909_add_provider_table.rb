class AddProviderTable < ActiveRecord::Migration
  def up
    create_table :providers do |t|
      t.string :name
    end

    add_reference :entries, :provider
    add_column :entries, :provider_entry_id, :string
  end

  def down
    remove_column :entries, :provider_entry_id
    remove_reference :entries, :provider
    drop_table :providers
  end
end
