class CreateBuildings < ActiveRecord::Migration[5.2]
  def change
    create_table :buildings do |t|
      t.string :address, index: true
      t.string :full_address, index: true
      t.decimal :latitude
      t.decimal :longitude
      t.string :uid, index: true

      t.timestamps
    end
    add_index :buildings, [:latitude, :longitude]
  end
end
