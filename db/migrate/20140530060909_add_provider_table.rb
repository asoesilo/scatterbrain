class AddProviderTable < ActiveRecord::Migration
  def up
    create_table :providers do |t|
      t.string :name
    end

    add_reference :entries, :providers
    add_column :entries, :provider_entry_id, :string
  end

  def down
    delete_column :entries, :provider_entry_id
    delete_reference :entries, :providers
    drop_table :providers
  end
end
