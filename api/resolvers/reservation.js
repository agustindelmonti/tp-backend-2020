export default {
	Query: {
		reservation: (parent, { id }, { db }) =>
			db.reservation.findByPk(id, { include: ['table'] }),

		reservations: (parent, args, { db }) =>
			db.reservation.findAll({ include: ['table'] }),
	},

	Mutation: {
		createReservation: async (parent, { reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.tableId);

			if (!table) {
				// ToDo: Throw Excepction table not found.
			}

			const newReservation = await db.reservation
				.create(reservation)
				.then((res) => res.setTable(table));

			return {
				...newReservation.dataValues,
				table: {
					...table.dataValues,
				},
			};
		},

		updateReservation: async (parent, { id, reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.tableId);

			if (!table) {
				// ToDo: Throw Excepction table not found.
			}

			// AffectedRows sólo funciona en Postgres
			const [affectedRowsCount] = await db.reservation.update(
				reservation,
				{
					where: {
						id,
					},
				}
			);

			if (affectedRowsCount === 0) {
				return null;
			}

			return db.reservation.findByPk(id, {
				include: 'table',
			});
		},

		deleteReservation: (parent, { id }, { db }) =>
			db.reservation.destroy({
				where: {
					id,
				},
			}),
	},
};
