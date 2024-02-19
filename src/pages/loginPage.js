import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const supabase = createClient(
    'https://kzhiwdgwtormdlysnkja.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
)

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  async function john() {
    const { data, error } = await supabase.auth.signUp(
      {
        email: 'ts132m@web.de',
        password: 'Til1man2',
        options: {
          data: {
            display_name: 'Markus',
            admin_key: false
          }
        }
      }
    )
    console.log(data, error);
  }

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

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={john}>Dummy</button>
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
                providers={['discord']}
                showLinks={true}
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
