import Ember from 'ember';

export default Ember.Route.extend({
	model()
	{
		return [{id:'firstName',label:'First Name'},
				{id:'lastName',label:'Last Name'},
				{id:'phone',label:'Phone number'},
				{id:'email',label:'Email Id'}];
		//return this.store.findAll('user');
	}
});
