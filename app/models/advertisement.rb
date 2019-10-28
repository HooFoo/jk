class Advertisement < ApplicationRecord
  enum category: %i[baby home sport food other work event]

  belongs_to :user
  belongs_to :building

  has_many_attached :photos
end
