# frozen_string_literal: true

class ApplicationService
  class ServiceError < StandardError
    include ServiceResultMethods

    attr_reader :errors
    def initialize(errors)
      @errors = errors
    end
  end

  def self.perform(*args)
    new(*args).perform
  end

  def perform
    throw 'Must be implemented in child class'
  end
end
