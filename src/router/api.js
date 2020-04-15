const serverBaseURL = `${window.location.origin}/api`;

const Console = {
  error: () => {},
};

export default {
  ServerBaseURL: serverBaseURL,
  GetTasks: async (b) => {
    const resp = await fetch(`${serverBaseURL}/getTasks`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  GetMe: async (b) => {
    const resp = await fetch(`${serverBaseURL}/getMe`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      // resp.json()
      //   .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  GetUsers: async (b) => {
    const resp = await fetch(`${serverBaseURL}/getUsers`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  GetImages: async (b) => {
    const resp = await fetch(`${serverBaseURL}/getImages`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  Login: async (b) => {
    const resp = await fetch(`${serverBaseURL}/login`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  UploadFileURI: `${serverBaseURL}/uploadFile`,
  GetTask: async (b) => {
    const resp = await fetch(`${serverBaseURL}/getTask`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  CreateTask: async (b) => {
    const resp = await fetch(`${serverBaseURL}/createTask`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  StopTask: async (b) => {
    const resp = await fetch(`${serverBaseURL}/stopTask`, {
      method: 'POST',
      body: JSON.stringify(b),
    });
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  GetSysLoad: async () => {
    const resp = await fetch(`${serverBaseURL}/getSysLoad`);
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
  GetAlert: async () => {
    const resp = await fetch(`${serverBaseURL}/getAlert`);
    if (!resp.ok) {
      resp.json()
        .then((data) => Console.error(data));
      return null;
    }
    return resp.json();
  },
};
