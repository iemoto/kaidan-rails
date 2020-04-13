class CreateRates < ActiveRecord::Migration[5.2]
  def change
    create_table :rates do |t|
      t.float :straight_line
      t.float :fixed_rate
      t.float :revised_depreciation_rate
      t.float :guarantee_rate
      t.timestamps
    end
  end
end
