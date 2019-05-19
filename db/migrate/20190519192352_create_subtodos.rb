class CreateSubtodos < ActiveRecord::Migration[5.1]
  def change
    create_table :subtodos do |t|
      t.references :todo, foreign_key: true
      t.string :title
      t.boolean :done
      t.integer :health
      t.integer :power

      t.timestamps
    end
  end
end
