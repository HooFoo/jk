# frozen_string_literal: true

class ApplicationService
  include ServiceResultMethods

  def self.perform(*args)
    new(*args).perform
  end

  def perform
    throw 'Must be implemented in child class'
  end
end
