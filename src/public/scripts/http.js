// Gérer requêtes HTTP
var Http = (() => {
    // Configuration des options pour les requêtes JSON
    var getOptions = (verb, data) => {
      var options = {
        method: verb,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      if (data) {
        options.body = JSON.stringify(data);
      }
      return options;
    };
  
    // Méthodes HTTP disponibles
    return {
      get: (path) => fetch(path, getOptions('GET')).then(res => res.json()),
      post: (path, data) => fetch(path, getOptions('POST', data)).then(res => res.json()),
      put: (path, data) => fetch(path, getOptions('PUT', data)).then(res => res.json()),
      delete: (path) => fetch(path, getOptions('DELETE')).then(res => res.json()),
    };
  })();
  