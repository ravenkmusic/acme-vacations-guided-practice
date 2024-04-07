const { client, createTables, createUser, createPlace, fetchUsers,
    fetchPlaces, 
    createVacation,
    fetchVacations } = require('./db');

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  await createTables();
  console.log('tables created');

  const [moe, lucy, ethyl, rome, nyc, la, paris] = await Promise.all([
    createUser('moe'),
    createUser('lucy'),
    createUser('ethyl'),
    createPlace('rome'),
    createPlace('nyc'),
    createPlace('la'),
    createPlace('paris')
  ]);
  console.log(`moe has an id of ${moe.id}`);
  console.log(`rome has an id of ${rome.id}`);
  
  console.log(await fetchUsers());
  console.log(await fetchPlaces());
  await Promise.all([
    createVacation({ user_id: moe.id, place_id: nyc.id, departure_date: '04/01/2024'}),
    createVacation({ user_id: moe.id, place_id: nyc.id, departure_date: '04/15/2024'}),
    createVacation({ user_id: lucy.id, place_id: la.id, departure_date: '07/04/2024'}),
    createVacation({ user_id: lucy.id, place_id: rome.id, departure_date: '10/31/2024'}),
  ]);
  
  const vacations = await fetchVacations();
  console.log(vacations);
  await destroyVacation(vacations[0].id);
  console.log(await fetchVacations());
  console.log(await fetchVacations());
};

init();