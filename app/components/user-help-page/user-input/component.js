import Ember from 'ember';
export default Ember.Component.extend({
classNameBindings:['isErrorfree:has-success','isError:has-danger'],
hasContent: Ember.computed.notEmpty('value'),
isNotFocussed:true,
isError:Ember.computed.and('isInvalid','isNotFocussed','hasContent'),
isErrorfree : Ember.computed.and('isValid','isNotFocussed','hasContent'),
  init()
  {		

  		this._super(...arguments);
  		let fieldName = this.get('fieldName');
this.set('value',Ember.computed.alias(`model.${fieldName}`));
  this.setProperties({'isInvalid': Ember.computed.readOnly(`model.validations.attrs.${fieldName}.isInvalid`)});
  this.setProperties({'isValid': Ember.computed.readOnly(`model.validations.attrs.${fieldName}.isTruelyValid`)});


  },
    focusIn()
  {
  	this.set('isNotFocussed',false);
  },
  focusOut()
  {
  	  	this.set('isNotFocussed',true);

  }



});
