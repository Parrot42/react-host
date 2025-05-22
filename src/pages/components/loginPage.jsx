import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React, { useState, useEffect } from 'react';


const supabase = createClient(
    'https://vhzvxyrhlteqlktklgan.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoenZ4eXJobHRlcWxrdGtsZ2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDEwMjIsImV4cCI6MjA1ODY3NzAyMn0.I0CtuRDg644nO6reKi9ys02obAaSELfURSw_9lgO2AY')

function Login() {


    //  Supabase Auth Error Message Translation
useEffect(() => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== "childList" || mutation.addedNodes.length === 0)
        return;

      for (const node of mutation.addedNodes) {
        if (
          node instanceof HTMLElement &&
          (node.classList.contains("supabase-account-ui_ui-message") ||
            node.classList.contains("supabase-auth-ui_ui-message"))
        ) {
          const originErrorMessage = node.innerHTML.trim();

          let translatedErrorMessage = "<DEFAULT MESSAGE>";
          switch (originErrorMessage) {
            case "Invalid login credentials":
              translatedErrorMessage = "Passwort oder E-Mail-Adresse falsch";
              break;
            case "Email not confirmed":
              translatedErrorMessage = "E-Mail-Adresse noch nicht bestätigt";
              break;
          }

          if (!document.querySelector("#auth-forgot-password")) {
            node.innerHTML = translatedErrorMessage;
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}, []);


  return (
    <>
        <div className='testacc'>
            <p>Normaler Account: user@test.com</p>
            <p>Admin Account: admin@test.com</p>
            <p>Passwort für beide: PW</p>
            {/* <button onClick={async () => {
                const { data, error } = await createClient(
    'https://vhzvxyrhlteqlktklgan.supabase.co',
    '/*admin key*//*').auth.admin.createUser({
                  email: "admin@test.com",
                  password: "PW",
                  email_confirm: true,
                  user_metadata: { 
                    display_name: "Anton", 
                    name: "Holzkopf",
                    //admin_key: ''
                  } 

                })}}>Test Account erstellen</button> */}
        </div>
        <div className="loginBox">
            <Auth 
                supabaseClient={supabase} 
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                          colors: {
                            brand: 'red',
                            brandAccent: 'darkred',
                          },
                        },
                      },
                    className: {
                        container: 'loginContainer',
                        anchor: 'loginAnchor',
                        button: 'loginButton',
                        divider: 'loginDivider',
                        label: 'loginLabel',
                        input: 'loginInput',
                        loader: 'loginLoader',
                        message: 'loginMessage'
                    }
                }}
                theme='dark'
                providers={[]}
                showLinks={false}
                localization={{
                    variables: {
                    sign_in: {
                        email_label: 'E-Mail-Adresse',
                        password_label: 'Passwort',
                        email_input_placeholder: 'E-Mail-Adresse eingeben',
                        password_input_placeholder: 'Passwort eingeben',
                        button_label: 'Anmelden',
                        loading_button_label: 'Wird angemeldet...',
                        social_provider_text: 'Anmelden mit {{provider}}',
                        link_text: 'Bereits registriert? Hier anmelden!'
                    },
                    },
                }}

            />
        </div>
      </>
  );


}

export default Login
