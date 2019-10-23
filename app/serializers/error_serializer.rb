# frozen_string_literal: true

class ErrorSerializer < ActiveModel::Serializer
  attributes :errors

  def errors
    object.errors
  end
end
