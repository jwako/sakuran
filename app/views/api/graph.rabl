collection @graph, :root => :prefectures, :object_root => false

node(:key) { |k, v| k }
node(:value) { |k,v| v }