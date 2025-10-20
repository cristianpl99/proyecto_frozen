export const fetchAllClients = async () => {
  let clients = [];
  let nextPage = 'https://frozenback-test.up.railway.app/api/ventas/clientes/';
  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    clients = clients.concat(data.results);
    nextPage = data.next;
  }
  return clients;
};
