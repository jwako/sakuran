module Base
	class API < Grape::API
		version 'v1', using: :path
		format :json

		mount TwitterClient::API
	end
end