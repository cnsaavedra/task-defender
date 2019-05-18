class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :done
      t.integer :health
      t.integer :power

      t.timestamps
    end
  end
end
