<template>
<div class="login-form">
  <div class="auth-alert">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#687F82;" d="M386.694,42.702C358.977,15.144,322.305,0,283.343,0c-0.287,0-0.576,0.001-0.864,0.002C202.081,0.464,136.674,66.94,136.674,148.188v36.322c0,4.355,3.53,7.885,7.885,7.885h42.053c4.355,0,7.885-3.53,7.885-7.885v-36.615c0-49.193,39.459-89.597,87.96-90.067c23.882-0.187,46.361,8.911,63.356,25.741c16.999,16.835,26.36,39.241,26.36,63.093v75.193c0,15.664,12.5,28.851,27.866,29.396c0.355,0.013,0.709,0.019,1.063,0.019c7.531,0,14.619-2.856,20.059-8.107c5.697-5.498,8.835-12.887,8.835-20.805v-75.696C429.996,107.386,414.618,70.467,386.694,42.702z"/><g><path style="fill:#FFFFFF;" d="M408.969,188.188c-4.355,0-7.885-3.53-7.885-7.885v-33.642c0-18.004-3.935-35.24-11.695-51.227c-1.902-3.917-0.267-8.635,3.65-10.536c3.918-1.903,8.636-0.267,10.536,3.65c8.81,18.151,13.277,37.703,13.277,58.113v33.642C416.854,184.659,413.324,188.188,408.969,188.188z"/><path style="fill:#FFFFFF;" d="M371.868,65.498c-2.01,0-4.021-0.764-5.559-2.294c-8.289-8.241-17.646-15.168-27.808-20.586c-16.817-8.967-35.889-13.706-55.157-13.706c-4.355,0-7.885-3.53-7.885-7.885s3.53-7.885,7.885-7.885c21.846,0,43.485,5.381,62.578,15.561c11.524,6.144,22.124,13.99,31.507,23.319c3.088,3.071,3.102,8.063,0.032,11.152C375.918,64.722,373.894,65.498,371.868,65.498z"/></g><path style="fill:#4ACFD9;" d="M432.624,214.472H134.045c-21.74,0-39.425,17.686-39.425,39.425v250.218c0,4.355,3.53,7.885,7.885,7.885h361.659c4.355,0,7.885-3.53,7.885-7.885V253.897C472.049,232.158,454.364,214.472,432.624,214.472z"/><path style="fill:#0295AA;" d="M134.045,214.472c-21.74,0-39.425,17.686-39.425,39.425v250.218c0,4.355,3.53,7.885,7.885,7.885h180.83V214.472H134.045z"/><path style="fill:#FFD1A9;" d="M297.578,350.283c22.964-6.271,39.9-27.304,39.9-52.229c0-29.855-24.289-54.144-54.144-54.144c-29.855,0-54.144,24.289-54.144,54.144c0,24.925,16.936,45.958,39.9,52.229c-39.322,6.783-69.338,41.112-69.338,82.342v42.053c0,4.355,3.53,7.885,7.885,7.885h151.392c4.355,0,7.885-3.53,7.885-7.885v-42.053C366.916,391.395,336.9,357.066,297.578,350.283z"/><path style="fill:#FF8C29;" d="M229.191,298.053c0,24.925,16.936,45.958,39.9,52.229c-39.322,6.783-69.338,41.112-69.338,82.342v42.053c0,4.355,3.53,7.885,7.885,7.885h75.696V243.91C253.48,243.91,229.191,268.199,229.191,298.053z"/><g><path style="fill:#F0353D;" d="M80.546,191.075h-32.71c-4.355,0-7.885-3.53-7.885-7.885s3.53-7.885,7.885-7.885h32.71c4.355,0,7.885,3.53,7.885,7.885S84.901,191.075,80.546,191.075z"/><path style="fill:#F0353D;" d="M89.678,164.312c-2.018,0-4.036-0.77-5.575-2.31l-20.815-20.815c-3.079-3.079-3.079-8.072,0-11.152s8.072-3.079,11.15,0l20.815,20.815c3.079,3.079,3.079,8.072,0,11.152C93.714,163.542,91.695,164.312,89.678,164.312z"/><path style="fill:#F0353D;" d="M68.651,238.653c-2.018,0-4.036-0.77-5.575-2.31c-3.079-3.079-3.079-8.072,0-11.15l20.815-20.815c3.079-3.079,8.072-3.079,11.15,0c3.079,3.079,3.079,8.072,0,11.15l-20.815,20.815C72.687,237.883,70.669,238.653,68.651,238.653z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
    <p>Need authorisation</p>
  </div>
  <form @submit.prevent="doLogin" class="login-data">
    <div>
      <label for="AuthUserName">Login</label>
      <input ref="AuthUserName" id="AuthUserName" v-model="form.AuthUserName">
    </div>
    <div>
      <label for="AuthPassword" name="AuthPassword">Password</label>
      <input type="password" name="AuthPassword" id="AuthPassword" v-model="form.AuthPassword">
    </div>
    <button
      :class="{disabled: isDisabled}" class="modal-buttons login-btn" @click="doLogin">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 563.43 563.43" style="enable-background:new 0 0 563.43 563.43;" xml:space="preserve"><path d="M280.79,314.559c83.266,0,150.803-67.538,150.803-150.803S364.055,13.415,280.79,13.415S129.987,80.953,129.987,163.756S197.524,314.559,280.79,314.559z M280.79,52.735c61.061,0,111.021,49.959,111.021,111.021S341.851,274.776,280.79,274.776s-111.021-49.959-111.021-111.021S219.728,52.735,280.79,52.735z"/><path d="M19.891,550.015h523.648c11.102,0,19.891-8.789,19.891-19.891c0-104.082-84.653-189.198-189.198-189.198H189.198C85.116,340.926,0,425.579,0,530.124C0,541.226,8.789,550.015,19.891,550.015z M189.198,380.708h185.034c75.864,0,138.313,56.436,148.028,129.524H41.17C50.884,437.607,113.334,380.708,189.198,380.708z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      {{sendText}}
    </button>
  </form>
  <div v-if="loginError" class="login-error">
    {{loginError}}
  </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "login-form",
  data() {
    return {
      form: {
        AuthUserName: "",
        AuthPassword: ""
      },
      loading: false
    };
  },
  mounted() {
    this.$refs.AuthUserName.focus();
  },
  computed: {
    isDisabled() {
      return !this.form.AuthUserName || !this.form.AuthPassword;
    },
    loginError() {
      return this.$store.state.login.LOGIN_ERROR;
    },
    sendText() {
      return (this.loading && "Loading...") || "Login";
    }
  },
  methods: {
    doLogin() {
      if (this.isDisabled) return;
      this.loading = true;
      this.$store.dispatch("DO_LOGIN", this.form);
      setTimeout(() => (this.loading = false), 333);
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;

  svg {
    width: 50px;
  }
  & > * {
    margin: 5px;
  }
}
.login-data {
  display: flex;
  justify-content: space-around;
  & > * {
    margin: 10px;
  }
}
.login-btn {
  svg {
    width: 12px;
  }
  &.disabled {
    background: gray;
    &:active,
    &:hover {
      transform: scale(1);
    }
  }
}
.login-error {
  color: red;
}
</style>