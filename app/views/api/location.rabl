object @address[0] => :location
node(:lat) { |address| address.geometry["location"]["lat"] }
node(:lng) { |address| address.geometry["location"]["lng"] }