//"use strict";

Vue.use(Framework7Vue, Framework7);

// Init Vue App
var app = new Vue({

    // App Root Element
    el: '#app',

    // Init Framework7. All Framework7 parameters should be passed in "framework7" property, e.g.:
    framework7: {
        // App Name
        name: 'KickUser',
        // App id
        id: 'com.myapp.test',
    },

    // App root data
    data: {
        login: {
            input_userName: '',
            input_userPass: '',
        },
    },

    // App root methods
    methods: {

        btn_login_onclick: function ()
        {
            console.log("valor de input_user = " + this.login.input_userName + " " + this.login.input_userPass);

            vf_data_user = {
                username: this.login.input_userName,
                password: this.login.input_userPass,
                clave: '@450J391x%_'
            };

            this.$request.post('http://webaliza.net/webservice/auth.php', vf_data_user,
                function (data)
                {
                    console.log('@request');

                    if (data === '"Autorizado"') {

                        var vf_data_user_json = JSON.stringify(vf_data_user);
                        sessionStorage.vf_data_user_autorizado = vf_data_user_json;

                        window.location.href = 'users-list.html';

                    } else {
                        alert('No está autorizado');
                    }

                },
                function (error) {
                    // manejo del error
                });
        }
    } // fin de methods
});