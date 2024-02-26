import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const supabase = createClient(
    'https://kzhiwdgwtormdlysnkja.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
)

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const errormessage = document.querySelector('.loginMessage');


    supabase.auth.onAuthStateChange(async (event) => {
        if (event === 'SIGNED_IN') {
                        async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    if(value.data?.user) {
                        setUser(value.data.user);
                        console.log(value.data.user);
                        if(value.data.user.user_metadata.admin_key === undefined) {
                            navigate('/success');
                        } else {
                            navigate('/admin');
                        }
                    }
                });
            }
            getUserData();
        } else if (event === 'SIGNED_OUT') {
            navigate('/');
        }
    }
    );



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
    <div className="App">
      <header className="App-header">
        <div className='testacc'>
            <p>Normaler Account: user@test.com</p>
            <p>Admin Account: admin@test.com</p>
            <p>Passwort für beide: PW</p>
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

      </header>
    </div>
  );


}

export default Login
