module ServiceResultMethods
  def build_result(success: , status: , errors: {}, data: {})
    OpenStruct.new(
      success?: success,
      failure?: !success,
      status: status,
      errors: errors,
      data: data
    )
  end

  def success_result(status: :success, data: {})
    build_result success: true, status: status, data: data
  end

  def error_result(status: :error, errors: {}, data: {})
    build_result success: false, status: status, errors: errors, data: data
  end

  def invalid_params_result(errors)
    errors = errors.is_a?(ActiveRecord::Base) ? errors.errors.messages : errors
    build_result success: false, status: :invalid_params, errors: errors
  end
end
