class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :ingredients
      t.string :directions
      t.integer :cook_time
      t.integer :prep_time
      t.string :category

      t.timestamps
    end
  end
end
