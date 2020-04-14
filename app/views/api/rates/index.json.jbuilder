json.array! @rates do |rate|
  json.extract! rate, :id, :straight_line, :fixed_rate, :revised_depreciation_rate, :guarantee_rate
end
