const Dashboard = () => {
  // Exemple de données fictives (mock)
  const stats = {
    users: 123,
    messages: 34,
    payments: 157000, // en FCFA ou autre
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold">Utilisateurs</h2>
          <p className="text-3xl">{stats.users}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-3xl">{stats.messages}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold">Paiements (FCFA)</h2>
          <p className="text-3xl">{stats.payments.toLocaleString()} FCFA</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
