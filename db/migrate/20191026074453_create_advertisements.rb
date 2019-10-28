class CreateAdvertisements < ActiveRecord::Migration[5.2]
  def change
    create_table :advertisements do |t|
      t.string :title
      t.text :description
      t.integer :price
      t.string :currency
      t.datetime :due_in
      t.belongs_to :user, foreign_key: true
      t.belongs_to :building, foreign_key: true
      t.string :category, index:true

      t.timestamps
    end
  end
end
