class Api::RatesController < ApplicationController
  def index
    @rates = Rate.all
  end
end