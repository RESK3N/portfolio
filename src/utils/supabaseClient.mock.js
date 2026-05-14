// Mock Supabase Client for LAN Testing
// This bypasses GitHub OAuth and uses local mock data

const mockData = {
  about: [{ content: "This is a LAN-mocked professional profile for testing purposes." }],
  projects: [
    { id: 1, title: "Mock Project 1", description: "This is a simulated project for LAN testing.", tags: ["Mock", "LAN"], github_link: "#" },
    { id: 2, title: "Mock Project 2", description: "Everything here is served from a local mock layer.", tags: ["Demo"], github_link: "#" }
  ],
  experience: [
    { id: 1, role: "LAN Tester", company: "Local Network", duration: "2024 - Present" }
  ],
  skills: [
    { id: 1, category: "Simulation", items: ["Mock Auth", "LAN Sync"] }
  ]
};

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: { user: { email: "lan-guest@example.com" } } }, error: null }),
    signInWithOAuth: async () => { 
      alert("Mock Auth: Logging in as Guest...");
      window.location.reload(); 
    },
    signOut: async () => { window.location.reload(); },
    onAuthStateChange: (cb) => {
      cb('SIGNED_IN', { user: { email: "lan-guest@example.com" } });
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: (table) => ({
    select: () => ({
      order: () => ({ 
        limit: () => ({ data: mockData[table] || [], error: null }),
        data: mockData[table] || [], error: null 
      }),
      limit: () => ({ data: mockData[table] || [], error: null }),
      data: mockData[table] || [], error: null,
      count: 'exact'
    }),
    insert: () => ({ select: () => ({ data: [], error: null }), error: null }),
    update: () => ({ eq: () => ({ error: null }), error: null }),
    delete: () => ({ eq: () => ({ error: null }), error: null })
  }),
  storage: {
    from: () => ({
      getPublicUrl: (path) => ({ data: { publicUrl: path } }),
      upload: async () => ({ data: { path: "mock" }, error: null }),
      remove: async () => ({ data: [], error: null })
    })
  }
};
