<template>
	<div class="view-register regform">
		<Card>
			<!--<template #header>
				<img alt="user header" src="demo/images/usercard.png">
			</template>-->
			<template #title>
				Create your account
			</template>
			<template #content>
				<form @submit="submitForm">
					<div class="p-fluid form-content">
						<div class="field">
							<label for="userId">User ID</label>
							<InputText id="userId" type="text" v-model="userid"
								:class="useridClass"
								v-on:change="checkUsername(true)"
								v-on:keyup="checkUsername(false)" />
							<small v-if="useridError" class="p-error">{{useridError}}</small>
						</div>
						<div class="field">
							<label for="email">E-mail</label> (optional)
							<InputText id="email" type="email" v-model="email" />
							<small>E-mail is only used for password recovery. If it is not provided, password reset will not be possible.</small>
						</div>
						<div class="field">
							<label for="password">Password</label>
							<InputText id="password" type="password" v-model="password"
								:class="passwordClass"
								v-on:change="checkPassword(true)"
								v-on:keyup="checkPassword(false)" />
							<small v-if="passwordError" class="p-error">{{passwordError}}</small>
						</div>
						<div class="field">
							<label for="password2">Re-type password</label>
							<InputText id="password2" type="password" v-model="password2"
								:class="password2Class"
								v-on:change="checkPassword(true)"
								v-on:keyup="checkPassword(false)" />
							<small v-if="password2Error" class="p-error">{{password2Error}}</small>
						</div>
						<div class="error" v-if="error">
							<InlineMessage severity="error">{{error}}</InlineMessage>
						</div>
						<div class="buttons">
							<Button icon="pi pi-check" label="Create account" type="submit" :disabled="!isComplete" />
						</div>
					</div>
				</form>
			</template>
			<template #footer>
				<Message severity="success" v-if="accountCreated">
					Account created, you may now
					<router-link to="/login">Sign in</router-link>!
				</Message>
				Already registered?
				<router-link to="/login">Sign in</router-link>!
			</template>
		</Card>

	</div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InlineMessage from 'primevue/inlinemessage';
import Message from 'primevue/message';

export default {
	name: 'register',
	components: {
		Card,
		Button,
		InputText,
		InlineMessage,
		Message
	},
	//inject: ['apiClient'],
	data() {
		return {
			apiClient: null,
			userid: '',
			email: '',
			password: '',
			password2: '',
			error: '',
			useridError: '',
			useridClass: '',
			passwordError: '',
			passwordClass: '',
			password2Error: '',
			password2Class: '',
			pwdok: false,
			userok: false,
			accountCreated: false
		}
	},
	computed: {
		isComplete() {
			return this.pwdok && this.userok;
		}
	},
	created () {
		this.apiClient = this.$root.apiClient;
	},
	methods: {
		async submitForm(ev) {
			ev.preventDefault();
			try {
				const token = await this.recaptcha();
				if (token) {
					let userdata = { username: this.userid, password: this.password, email: this.email, captchaToken: token };
					await this.apiClient.register(userdata);
					this.error = null;
					this.accountCreated = true;
				}
			} catch (e) {
				this.error = "Failed: " + e.message;
			}
			return false;
		},
		async recaptcha() {
			console.log('recaptcha clicked')
			await this.$recaptchaLoaded();
			const token = await this.$recaptcha('register');
			console.log('Token: ' + token);
			return token;
		},
		async checkUsername(final) {
			const regex = new RegExp('^[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]$');
			if (!regex.test(this.userid)) {
				this.useridError = 'User ID may only contain alphanumeric characters or hyphens, and cannot begin or end with a hyphen.';
				this.useridClass = 'p-invalid';
				this.userok = false;
			} else if (this.userid.length < 3) {
				this.useridError = 'User ID must have at least 3 characters';
				this.useridClass = 'p-invalid';
				this.userok = false;
			} else if (await this.apiClient.userExists(this.userid)) {
				this.useridError = 'This user ID is already taken';
				this.useridClass = 'p-invalid';
				this.userok = false;
			} else {
				this.useridError = null;
				this.useridClass = final ? 'ok' : '';
				this.userok = true;
			}
		},
		async checkPassword(final) {
			let ok = true;
			if (this.password.length < 6) {
				this.passwordError = 'Password must have at least 6 characters';
				this.passwordClass = 'p-invalid';
				ok = false;
			} else {
				this.passwordError = null;
			}

			if (this.password !== this.password2) {
				this.password2Error = 'Passwords don\'t match';
				this.password2Class = 'p-invalid';
				ok = false;
			} else {
				this.password2Error = null;
			}

			this.pwdok = ok;
			if (ok) {
				if (final) {
					this.password2Class = this.passwordClass = 'ok';
				} else {
					this.password2Class = this.passwordClass = '';
				}
			}		
		}
	}
}
</script>

<style>
</style>
