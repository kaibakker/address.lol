import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((sym, i) => {
      if(true){
        return (
          <p key={i}>
            {formErrors[sym].name}<br />

            <a href={ formErrors[sym].blockexplorer_url }>🌍 explorer</a><br />
            <a href={ formErrors[sym].handler_url }>🔗 handler</a>
          </p>
        )
      } else {
        return '';
      }
    })}
  </div>
