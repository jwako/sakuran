module Base
	class API < Grape::API
		version 'v1', using: :path
		format :json

		mount TwitterClient::API
		mount LocationClient::API
		mount GraphClient::API
	end
end