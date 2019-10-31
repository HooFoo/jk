module Api
  module V1
    module Buildings
      class IndexForm < ApplicationForm
        def params
          p = @params.permit(:sw_lat, :sw_lng, :ne_lat, :ne_lng)
          {
              sw: [p[:sw_lat], p[:sw_lng]],
              ne: [p[:ne_lat], p[:ne_lng]]
          }
        end
      end
    end
  end
end
