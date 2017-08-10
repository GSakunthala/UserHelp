import Ember from 'ember';
import {
  UserValidations
} from './validations';
import errorjson from '../../config/errorjson';


export default Ember.Component.extend(UserValidations,{

  store: Ember.inject.service(),
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

			/*let userDetails = 
			{
				'firstName' : this.get('firstName'),	
				'lastName' : this.get('lastName')	,
				'email' : this.get('email'),
				'phone' : this.get('phone')	
			} */
			let userDetails = {};
			let fields =this.get('fields');
			//var userObject = Ember.Object.create();
			var thiscomponent = this;
			fields.forEach(function(field,i){
				console.log(i+"--"+field.id);
				let fieldValue = thiscomponent.get(field.id);
				//userObject.set(field.id,fieldValue);
				userDetails[field.id] = fieldValue;


			});
						console.log("userDetaisl--"+userDetails);

			this.setProperties(
    		{
    			'userDetails':userDetails,
    			'isValidForm':true
    		}
    		);
			this.showStatusMessage();	
			var store = this.get('store');

			var storeRecord = store.createRecord('user', userDetails);
			storeRecord.save().then((response) => {console.log("response--"+response)}).catch((reason) => {console.log("Reason--"+reason)});
				}
	}




});
