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
    id: 'com.myapp.test'
  },
  // App root data
  data: {
    users_list: {},
  },
  // App root methods
  methods: {

    get_usuarios: function () {
      vf_data_user = JSON.parse(sessionStorage.vf_data_user_autorizado);

      this.$request.post('http://webaliza.net/webservice/get_usuarios.php', vf_data_user,
        (data) => {
          // Al usar una arrow function aquí hacemos que this sea el ámbito del
          // parent, es decir, get_usuarios, cuyo this a su vez es el de app, de
          // ese modo podemos acceder a las variables de app como users_list,
          // de lo contrario this sería el ámbito de la propia función
          console.log('@request - get_usuarios');
          console.log(data);
          //console.log(typeof(data));
          this.users_list = JSON.parse(data);
          //console.log(Object.keys(this.users_list).length);
          var vf_key = Object.keys(this.users_list).length - 1
          delete this.users_list[vf_key.toString()];
          console.log(JSON.stringify(this.users_list));
        },
        function (error) {
          // manejo del error
        });
    },

    onSwipeoutDeleted: function (user_code) {
      console.log('@onSwipeoutDeleted');
      console.log('user_code:' + user_code);
      // Ximo -> continuar desde aquí
      vf_data_user = JSON.parse(sessionStorage.vf_data_user_autorizado);
      vf_data_user.usergsBase = user_code; // usuario 
      console.log('vf_data_user:' + JSON.stringify(vf_data_user));

      this.$request.post('http://webaliza.net/webservice/kill_usuario.php', vf_data_user,
        (data) => {
          // Al usar una arrow function aquí hacemos que this sea el ámbito del
          // parent, es decir, get_usuarios, cuyo this a su vez es el de app, de
          // ese modo podemos acceder a las variables de app como users_list,
          // de lo contrario this sería el ámbito de la propia función
          console.log('@request - kill_usuario');
          console.log(data)
          if (data === 'KO') {
            alert('No se pudo ejecutar la acción');
          } else {
            this.get_usuarios();
          }
        },
        function (error) {
          // manejo del error
        });
    }

  }, // fin de methods
  beforeMount: function () {
    console.log('@beforeMount');
    this.get_usuarios();
  }
});

var $$ = Dom7;

// Pull to refresh content
var $ptrContent = $$('.ptr-content');

// Add 'refresh' listener on it
$ptrContent.on('ptr:refresh', function (e) {

  console.log('Refreshing...');

  app.get_usuarios();
  e.detail();

});

document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
  alert('back!');
}