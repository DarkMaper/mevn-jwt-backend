import User from '../models/User';
import Role from '../models/Role';
import { IRole } from '../models/interfaces/role.interface';

export async function createRoles(): Promise<void> {
	const count = await Role.estimatedDocumentCount();

	if (count > 0) return;
	Promise.all([new Role({ name: 'admin' }).save(), new Role({ name: 'user' }).save()]);
}

export async function createAdminUser(): Promise<void> {
	const count = await User.estimatedDocumentCount();
	const adminRole: IRole | null = await Role.findOne({ name: 'admin' });

	if (count > 0) return;

	const user = new User({
		username: 'admin',
		email: 'admin@admin.com',
		name: 'Administrator',
		password: 'admin',
		verified: true,
	});

	if (adminRole) {
		user.role = adminRole._id;
	}

	Promise.all([user.save()]);
}
