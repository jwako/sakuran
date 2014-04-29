class Tweet < ActiveRecord::Base

	scope :unchecked, proc { where(checked: false) }
	scope :random, ->(n){ self.where(id: self.pluck(:id).shuffle[0..n-1]) }
	
end
