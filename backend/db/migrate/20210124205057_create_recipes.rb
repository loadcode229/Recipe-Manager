class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :directions
      t.integer :cook_time
      t.integer :prep_time
      t.string :status
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
