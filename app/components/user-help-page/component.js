import Ember from 'ember';
import {
  UserValidations
} from './validations';


export default Ember.Component.extend(UserValidations,{
userObj:'',
checkValidHours()
	{
		let today = moment();
				let uk_time = moment.tz(new Date(), "Europe/London");
				
				let day = uk_time.day();
			
				let hour = uk_time.hour();
				//let message = `Sorry there's no one available right now. Please leave your details below and we'll call you`;
				let message = errorjson.common_msg;
				if(day == 0 || day == 6 || (day == 5 && hour>17)) //weekend
				{
						this.set('displayMsg',message + `after 8:30am on Monday`);
				}
				else if(hour>17)
				{				
					this.set('displayMsg',`${message}after 8:30am tomorrow`);

				}
				else if(hour >= 8.30 && hour<17) //weekdays
				{
				this.set('displayMsg',`${message} within the next 15 minutes`);

				}
				else if(hour>=0 && hour<8.30) //monday mrg
				{
				this.set('displayMsg',`${message} after 8:30am today`);

				}
			
				else
				{
					this.set('displayMsg',`We'll call back.`);
				}

	},
	actions:
	{
		onCallMeBack()
		{
			let userDetails = 
			{
				'FirstName' : this.get('firstName'),	
				'LastName' : this.get('surname')	,
				'Email' : this.get('email'),
				'Phone' : this.get('phone')	} 

this.setProperties(
    		{
    			'userDetails':userDetails,
    			'isValidForm':true
    		}
    		);
		this.checkValidHours();		}
	}




});
