import { Meteor } from 'meteor/meteor';
import SimplSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = (user) => {
  const email = user.emails[0].address;

  new SimplSchema ({
    email: {
      type: String,
      regEx: SimplSchema.RegEx.Email
    }
  }).validate({ email: email})

return true;
}

if (Meteor.isServer){
	Accounts.validateNewUser(validateNewUser);
}

