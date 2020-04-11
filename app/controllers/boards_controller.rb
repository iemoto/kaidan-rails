class BoardsController < ApplicationController
  def index
    @servicelife = [] 
    50.times do |i|
      @servicelife[i] = ["#{i+1}年",i+1,id: i+1]
    end
  end
end