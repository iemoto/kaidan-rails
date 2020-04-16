# == Schema Information
#
# Table name: rates
#
#  id                        :bigint           not null, primary key
#  fixed_rate                :float(24)
#  guarantee_rate            :float(24)
#  revised_depreciation_rate :float(24)
#  straight_line             :float(24)
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#
require 'test_helper'

class RateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
