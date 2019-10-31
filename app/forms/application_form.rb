# frozen_string_literal: true

class ApplicationForm
  attr_reader :params

  def initialize(params)
    @params = params
  end
end
