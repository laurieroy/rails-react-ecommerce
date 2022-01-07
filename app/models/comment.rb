class Comment < ApplicationRecord
  validates_presence_of :body
  
  belongs_to :product
  belongs_to :user
end
