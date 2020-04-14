class Api::RatesController < ApplicationController
  def index
    @rates = Rate.all
    binding.pry
  end
end