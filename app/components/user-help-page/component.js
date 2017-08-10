import Ember from 'ember';
import {
  UserValidations
} from './validations';
import errorjson from '../../config/errorjson';


export default Ember.Component.extend(UserValidations,{
userObj:'',
showStatusMessage()
	{
		
				let uk_date = moment.tz(new Date(), "Europe/London");
				let day = uk_date.day();
				let hour = uk_date.hour();
				let message = errorjson.notAvailableMessage;
				if(day == 0 || day == 6 || (day == 5 && hour>17))
				{
						this.set('displayMsg',`${message}  ${errorjson.callAfterWeekend}`);
				}
				else if(hour>17)
				{				
					this.set('displayMsg',`${message} ${errorjson.callTomorrow}`);

				}
				else if(hour >= 8.30 && hour<17) 
				{
				this.set('displayMsg',`${message} ${errorjson.callShortly}`);

				}
				else if(hour>=0 && hour<8.30) 
				{
				this.set('displayMsg',`${message} ${errorjson.callAfterDayStarts}`);

				}
				else
				{
					this.set('displayMsg',`${errorjson.callImmediately}`);
				}

	},
	actions:
	{
		onCallMeBack()
		{
			let userDetails = 
			{
				'FirstName' : this.get('firstName'),	
				'LastName' : this.get('lastName')	,
				'Email' : this.get('email'),
				'Phone' : this.get('phone')	} 

this.setProperties(
    		{
    			'userDetails':userDetails,
    			'isValidForm':true
    		}
    		);
		this.showStatusMessage();		}
	}




});
