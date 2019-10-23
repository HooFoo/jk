# frozen_string_literal: true

module Api
  module V1
    class BaseController < ApplicationController
      def render_result(result)
        if result.success?
          render json: result.data
        else
          render json: ErrorSerializer.new(result: errors).to_json
        end
      end
    end
  end
end
