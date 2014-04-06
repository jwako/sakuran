class Tweet < ActiveRecord::Base

	scope :unchecked, proc { where(checked: false) }
	
end
