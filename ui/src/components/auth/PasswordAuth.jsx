import React from 'react';
import {defineMessages, FormattedMessage} from 'react-intl';
import { Button, Intent } from '@blueprintjs/core';
import { showWarningToast } from 'src/app/toast';

const messages = defineMessages({
  not_same: {
    id: 'pass.auth.not_same',
    defaultMessage: 'Your passwords are not the same!'
  },
});

const PasswordAuth = ({onSubmit, buttonClassName, showEmail, showName, showPassword, showConfirmPass, buttonText, children, intl, isActivation, className}) => {
  let emailElement, passwordElement, confirmElement, nameElement;
  console.log(children)

  const submit = (event) => {
    event.preventDefault();

    let password = document.getElementById('pass');
    let confirm = document.getElementById('confirm-pass');
    let arePasswordsTheSame = isActivation ? password.value === confirm.value : true;

      if(arePasswordsTheSame) {
        onSubmit({
          email: showEmail && emailElement.value,
          password: showPassword && passwordElement.value,
          name: showName && nameElement.value
        });
      } else {
        showWarningToast(intl.formatMessage(messages.not_same))
      }
  };

  return (
    <form onSubmit={submit} className={className}>
      {showEmail && <label className="pt-label">
          <FormattedMessage id="password_auth.email" defaultMessage="Email address"/>
          <input className="pt-input pt-fill" type="email" name="email" required
                 ref={(el) => emailElement = el}/>
        </label>}
      {showName &&
        <label className="pt-label">
          <FormattedMessage id="password_auth.name" defaultMessage="Your Name"/>
          <input className="pt-input pt-fill" type="text" name="name" required
                 ref={(el) => nameElement = el}/>
        </label>}
      {showPassword &&
        <label className="pt-label">
          <FormattedMessage id="password_auth.password" defaultMessage="Password"/>
          <input id="pass" className="pt-input pt-fill" type="password" name="password" required
                 ref={(el) => passwordElement = el}/>
        </label>}
      {showConfirmPass &&
      <label className="pt-label">
        <FormattedMessage id="password_auth.confirm" defaultMessage="Confirm password"/>
        <input id="confirm-pass" className="pt-input pt-fill" type="password" name="confirm" required
               ref={(el) => confirmElement = el}/>
      </label>}

      <div className="flex-row">
        <span>
          <Button className={`pt-large ${buttonClassName}`} intent={Intent.PRIMARY} type="submit">
            {buttonText}
          </Button>
        </span>
        <span>
          {children}
        </span>
      </div>
    </form>
  );
};

export const PasswordAuthLogin = ({onSubmit, buttonClassName}) => (
  <PasswordAuth onSubmit={onSubmit} showEmail showPassword buttonClassName={buttonClassName}
                buttonText={<FormattedMessage id="password_auth.signin" defaultMessage="Sign in"/>}>{' '}
  </PasswordAuth>
);

export const PasswordAuthSignup = ({onSubmit, buttonClassName}) => (
  <PasswordAuth onSubmit={onSubmit} showEmail buttonClassName={buttonClassName}
                buttonText={<FormattedMessage id="password_auth.signup" defaultMessage="Sign up"/>}>{' '}
  </PasswordAuth>
);

export const PasswordAuthActivate = ({onSubmit, intl, className}) => (
  <PasswordAuth onSubmit={onSubmit} showPassword showName isActivation className={className}
                intl={intl}
                showConfirmPass={true}
                buttonText={<FormattedMessage id="password_auth.activate" defaultMessage="Activate"/>}/>
);
