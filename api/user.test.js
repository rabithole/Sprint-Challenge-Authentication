const request = require('supertest');
const server = require('./server.js');

const joke = {
	joke: ''
}

// describe('API testing', () => {
// 	it('should test the testing environment', () => {
//         expect(process.env.DB_ENV).toBe('testing');
//     })

// 	it('get json object', () => {
// 		return request(server)
// 				.get('/')
// 				// .expect(200)
// 				.expect('Content-Type', /json/)
// 			});
// });

// describe('/ testing', () => {
// 	it('jokes fail', () => {
// 		return request(server)
// 				.get('/api/jokes')
// 				// .expect(200)
// 				.expect('Content-Type', /json/)
// 			});
// });

describe('Login', () => {
	// it('return 404', () => {
	// 	return request(server)
	// 		.get('/api/auth/login')
	// 		.then(res => {
	// 			expect(res.status).toBe(404);
	// 		})
	// })

	it('return json', () => {
		return request(server)
			.get('/api/auth/login')
			.expect('Content-Length', '153')
		})

	// it('auth user', () => {
	// 	return request(server)
	// 		.post('/api/auth/login')
	// 		.auth('username', 'password')
	// 		.expect('Content-Type', /json/)
	// })
})

describe('registered', () => {
	// it('return 200', () => {
	// 	return request(server)
	// 		.post('/api/auth/register')
	// 		.send ({ username: 'bobby2', password: 'password2'})
	// 		.then(res => {
	// 			expect(res.type).toBe('application/json');
	// 		})
	// 	 });
})