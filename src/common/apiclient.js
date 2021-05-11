
const JWT_SERVER_ROOT = 'http://localhost:8080/jwt-auth';
const JWT_LOGIN = JWT_SERVER_ROOT + '/auth/login';
const JWT_REGISTER = JWT_SERVER_ROOT + '/auth/register';


export class ApiClient {

	currentRepo = 'default';
	onNotAuthorized = null;


	storeToken(token) {
		localStorage.setItem('jwt', token);
	}

	logout() {
		localStorage.removeItem('jwt');
	}

	checkAuth(response) {
		if (response.status == 401 || response.status == 403) {
			if (this.onNotAuthorized) {
				this.onNotAuthorized();
			}
			return false;
		} else {
			return true;
		}
	}

	headers(headers) {
		const src = headers ? headers : {};
		const token = localStorage.getItem('jwt');
		if (token) {
			return {
				...src,
				'Authorization': ('Bearer ' + token)
			};
		} else {
			return src;
		}
	}

	async getUserInfo() {
		const url = JWT_SERVER_ROOT + '/auth/userInfo';
		let response = await fetch(url, {
			method: 'GET',
			headers: this.headers()
		});
		this.checkAuth(response);
		const data = await response.json();
		return data.param;
	}

	async userExists(userid) {
		const url = JWT_SERVER_ROOT + '/auth/checkUserId/' + userid;
		let response = await fetch(url, {
			method: 'GET'
		});
		const data = await response.json();
		return (data.message === 'yes');
	}

	async checkCaptcha(token) {
		const url = JWT_SERVER_ROOT + '/captcha/verify';
		try {
			const udata = { token: token };
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(udata)
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			return (data.result === 'yes');

		} catch (e) {
			throw new Error(e);
		}
	}

	async login(userid, password) {
		const url = JWT_LOGIN;
		try {
			const udata = { username: userid, password: password };
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(udata)
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			const token = data.token;
			this.storeToken(token);

		} catch (e) {
			throw new Error(e);
		}
	}

	async register(userdata) {
		const url = JWT_REGISTER;
		try {
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userdata)
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			return true;

		} catch (e) {
			throw new Error(e);
		}
	}

}