import React, { useState, useEffect } from 'react';
import { 
  Database, FileJson, FileCode, FileText, Table, 
  Terminal, Share2, Copy, Check, Download, 
  Search, Play, RefreshCw, Server, Zap, 
  Shield, Globe, Box, Layers, Code, ArrowRight,
  ChevronRight, Settings
} from 'lucide-react';

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState('docs');
  const [activePlayground, setActivePlayground] = useState('rest'); // 'rest' or 'graphql'
  const [copied, setCopied] = useState(null);

  // --- MOCK DATA GENERATOR FOR PREVIEWS ---
  // In a real app, these would fetch from the static JSON files.
  const MOCK_DATA = {
    users: [
      { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", role: "Admin" },
      { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", role: "User" },
      { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", role: "User" }
    ],
    posts: [
      { id: 1, title: "sunt aut facere repellat provident occaecati", body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum", userId: 1 },
      { id: 2, title: "qui est esse", body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque", userId: 1 }
    ],
    comments: [
      { id: 1, name: "id labore ex et quam laborum", email: "Eliseo@gardner.biz", body: "laudantium enim quasi est quidem magnam voluptate ipsam eos" },
      { id: 2, name: "quo vero reiciendis velit similique earum", email: "Jayne_Kuhic@sydney.com", body: "est natus enim nihil est dolore omnis voluptatem numquam" }
    ]
  };

  // --- REST PLAYGROUND STATE ---
  const [restResource, setRestResource] = useState('users');
  const [restFormat, setRestFormat] = useState('json');
  const [restResponse, setRestResponse] = useState(null);
  const [restLoading, setRestLoading] = useState(false);

  // --- GRAPHQL PLAYGROUND STATE ---
  const [gqlQuery, setGqlQuery] = useState(`query {
  users {
    id
    name
    email
  }
}`);
  const [gqlResult, setGqlResult] = useState(null);
  const [gqlLoading, setGqlLoading] = useState(false);

  const RESOURCES = [
    { name: 'users', count: 100, desc: 'User profiles with address, company & role', icon: <Globe className="w-4 h-4 text-blue-400"/> },
    { name: 'posts', count: 500, desc: 'Social media posts linked to users', icon: <FileText className="w-4 h-4 text-green-400"/> },
    { name: 'comments', count: 2000, desc: 'Comments attached to posts', icon: <Layers className="w-4 h-4 text-purple-400"/> },
    { name: 'todos', count: 300, desc: 'Task items with completion status', icon: <Check className="w-4 h-4 text-emerald-400"/> },
    { name: 'photos', count: 5000, desc: 'Album photos with thumbnails', icon: <Box className="w-4 h-4 text-orange-400"/> },
  ];

  const FORMATS = [
    { ext: 'json', label: 'JSON', desc: 'Standard JavaScript Object Notation' },
    { ext: 'csv', label: 'CSV', desc: 'Comma Separated Values' },
    { ext: 'xml', label: 'XML', desc: 'Extensible Markup Language' },
    { ext: 'yaml', label: 'YAML', desc: 'YAML Ain\'t Markup Language' },
    { ext: 'ndjson', label: 'NDJSON', desc: 'Newline Delimited JSON' },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const executeRestRequest = () => {
    setRestLoading(true);
    setRestResponse(null);
    setTimeout(() => {
      const data = MOCK_DATA[restResource] || [];
      let formatted = "";
      
      if (restFormat === 'json') formatted = JSON.stringify(data, null, 2);
      else if (restFormat === 'csv') formatted = "id,name,email\n1,Leanne Graham,Sincere@april.biz\n2,Ervin Howell,Shanna@melissa.tv"; // Mock CSV
      else if (restFormat === 'xml') formatted = "<users>\n  <user>\n    <id>1</id>\n    <name>Leanne Graham</name>\n  </user>\n</users>"; // Mock XML
      else formatted = JSON.stringify(data); // Fallback

      setRestResponse(formatted);
      setRestLoading(false);
    }, 600);
  };

  const executeGqlRequest = () => {
    setGqlLoading(true);
    setTimeout(() => {
      if (gqlQuery.includes('users')) {
        setGqlResult(JSON.stringify({ data: { users: MOCK_DATA.users } }, null, 2));
      } else {
        setGqlResult(JSON.stringify({ error: "Unknown query. Try querying 'users'." }, null, 2));
      }
      setGqlLoading(false);
    }, 600);
  };

  // --- CODE SNIPPETS ---
  const getCodeSnippet = (lang) => {
    const url = `https://apidata.gitlab.io/api/v1/users.json`;
    switch(lang) {
      case 'curl': return `curl -X GET "${url}" \\
  -H "Accept: application/json"`;
      case 'js': return `fetch('${url}')
  .then(response => response.json())
  .then(json => console.log(json));`;
      case 'python': return `import requests

response = requests.get('${url}')
data = response.json()
print(data)`;
      case 'go': return `resp, err := http.Get("${url}")
if err != nil {
    log.Fatalln(err)
}
// parse body...`;
      default: return '';
    }
  };
  const [activeCodeLang, setActiveCodeLang] = useState('js');

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="border-b border-slate-800/60 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">OpenAPI<span className="text-indigo-400">Data</span></span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-emerald-400">
              v1.0 • Stable
            </span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <button 
              onClick={() => setActiveTab('docs')} 
              className={`transition-colors duration-200 ${activeTab === 'docs' ? 'text-white' : 'hover:text-white'}`}
            >
              Documentation
            </button>
            <button 
              onClick={() => setActiveTab('playground')} 
              className={`transition-colors duration-200 ${activeTab === 'playground' ? 'text-white' : 'hover:text-white'}`}
            >
              Playground
            </button>
            <a href="https://gitlab.com" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-2">
              <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">GitLab</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {activeTab === 'docs' && (
        <>
          <div className="relative overflow-hidden border-b border-slate-800/60 bg-[#0F1422]">
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 mb-6 leading-tight">
                  The Production-Ready<br />Mock Data API
                </h1>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
                  Build prototypes faster with our free, open-source static API. 
                  Supports <span className="text-indigo-300 font-semibold">JSON, XML, CSV, YAML, NDJSON</span>, and <span className="text-indigo-300 font-semibold">GraphQL</span>. 
                  Hosted on GitLab Pages for infinite scalability and zero latency.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveTab('playground')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg shadow-indigo-900/20 flex items-center gap-2 group">
                    <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> Try Playground
                  </button>
                  <button onClick={() => document.getElementById('quickstart').scrollIntoView({ behavior: 'smooth'})} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-lg font-semibold transition border border-slate-700 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Quickstart
                  </button>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none" />
          </div>

          <main className="max-w-7xl mx-auto px-6 py-16">
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                { icon: <Shield className="w-6 h-6 text-emerald-400"/>, title: "No Auth Required", desc: "Just simple GET requests. No API keys, tokens, or rate limits to worry about." },
                { icon: <Globe className="w-6 h-6 text-blue-400"/>, title: "All Formats", desc: "Native support for JSON, XML, CSV, YAML, NDJSON, and BSON out of the box." },
                { icon: <Server className="w-6 h-6 text-purple-400"/>, title: "Static & Fast", desc: "Pre-generated data served via CDN. Extremely low latency for your prototypes." },
              ].map((feature, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition duration-300">
                  <div className="bg-slate-950 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-slate-800">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left: Documentation */}
              <div className="lg:col-span-8 space-y-16">
                
                {/* Quickstart Section */}
                <section id="quickstart" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-indigo-400" /> Quickstart
                  </h2>
                  <div className="bg-[#0F1422] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                    {/* Tab Bar */}
                    <div className="flex border-b border-slate-800 bg-slate-950/50">
                      {['js', 'python', 'go', 'curl'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => setActiveCodeLang(lang)}
                          className={`px-6 py-3 text-sm font-medium transition-colors border-r border-slate-800/50 ${
                            activeCodeLang === lang 
                              ? 'text-indigo-400 bg-slate-900' 
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {lang === 'js' ? 'JavaScript' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                    {/* Code Area */}
                    <div className="p-6 relative group">
                      <pre className="font-mono text-sm text-slate-300 overflow-x-auto leading-relaxed">
                        {getCodeSnippet(activeCodeLang)}
                      </pre>
                      <button 
                        onClick={() => handleCopy(getCodeSnippet(activeCodeLang), 'snippet')}
                        className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-slate-700"
                      >
                        {copied === 'snippet' ? <Check className="w-4 h-4 text-emerald-400"/> : <Copy className="w-4 h-4"/>}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Endpoints & Schema */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Database className="w-6 h-6 text-indigo-400" /> Resources & Schema
                  </h2>
                  <div className="space-y-4">
                    {RESOURCES.map((res) => (
                      <div key={res.name} className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 transition">
                          <div className="flex items-center gap-4">
                            <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-bold font-mono">GET</span>
                            <code className="text-indigo-300 font-mono text-sm">/api/v1/{res.name}</code>
                            <span className="text-slate-500 text-sm hidden sm:inline">• {res.count} records</span>
                          </div>
                          <div className="text-slate-400 text-sm flex items-center gap-2">
                             Details <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                        {/* Example Schema Display (Mock) */}
                        <div className="border-t border-slate-800/50 bg-slate-950/30 p-4">
                          <div className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Model Schema</div>
                          <pre className="font-mono text-xs text-slate-400">
{`interface ${res.name.slice(0, -1).charAt(0).toUpperCase() + res.name.slice(0, -1).slice(1)} {
  id: number;
  ${res.name === 'users' ? 'name: string;\n  email: string;\n  address: Address;' : 'title: string;\n  body: string;'}
}`}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* Right: Sidebar Info */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 sticky top-24">
                  <h3 className="font-bold text-white mb-4">Support Info</h3>
                  <div className="space-y-4 text-sm text-slate-400">
                    <div className="flex justify-between py-2 border-b border-slate-800/50">
                      <span>Base URL</span>
                      <code className="text-indigo-300">apidata.gitlab.io/api/v1</code>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800/50">
                      <span>Rate Limit</span>
                      <span className="text-emerald-400">Unlimited</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800/50">
                      <span>CORS</span>
                      <span className="text-emerald-400">Enabled (*)</span>
                    </div>
                    <div className="pt-2">
                      <p className="mb-2 font-medium text-slate-300">Supported Formats</p>
                      <div className="flex flex-wrap gap-2">
                        {FORMATS.map(f => (
                          <span key={f.ext} className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-300 border border-slate-700">.{f.ext}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </>
      )}

      {/* Playground Area */}
      {activeTab === 'playground' && (
        <main className="max-w-7xl mx-auto px-6 py-12 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
          
          <div className="flex items-center justify-between mb-6">
             <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setActivePlayground('rest')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${activePlayground === 'rest' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  REST API
                </button>
                <button 
                   onClick={() => setActivePlayground('graphql')}
                   className={`px-4 py-2 rounded-md text-sm font-medium transition ${activePlayground === 'graphql' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  GraphQL
                </button>
             </div>
             <div className="text-sm text-slate-500 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Service Operational
             </div>
          </div>

          <div className="flex-1 bg-[#0F1422] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {activePlayground === 'rest' ? (
              // --- REST INTERFACE ---
              <>
                <div className="w-full lg:w-1/3 bg-slate-950 border-r border-slate-800 p-6 flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Endpoint</label>
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1">
                      <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded font-mono text-sm font-bold">GET</span>
                      <select 
                        className="bg-transparent text-slate-200 text-sm font-mono w-full outline-none p-1"
                        value={restResource}
                        onChange={(e) => setRestResource(e.target.value)}
                      >
                        {RESOURCES.map(r => <option key={r.name} value={r.name}>/{r.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['json', 'csv', 'xml', 'yaml'].map(fmt => (
                        <button
                          key={fmt}
                          onClick={() => setRestFormat(fmt)}
                          className={`px-3 py-2 rounded text-xs font-mono border transition ${restFormat === fmt ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                        >
                          .{fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={executeRestRequest}
                    disabled={restLoading}
                    className="mt-auto bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {restLoading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Play className="w-4 h-4 fill-current"/>}
                    Send Request
                  </button>
                </div>

                <div className="flex-1 bg-[#0B0F19] flex flex-col min-h-0">
                  <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <span className="text-xs text-slate-400">Response Preview</span>
                    {restResponse && (
                       <span className="text-xs text-emerald-400 font-mono">200 OK • 14ms</span>
                    )}
                  </div>
                  <div className="flex-1 overflow-auto p-6 font-mono text-sm text-blue-100">
                    {restLoading ? (
                      <div className="h-full flex items-center justify-center text-slate-600 gap-3">
                         <RefreshCw className="w-5 h-5 animate-spin"/> Processing...
                      </div>
                    ) : restResponse ? (
                      <pre className="whitespace-pre-wrap">{restResponse}</pre>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-700">
                         <Server className="w-12 h-12 mb-4 opacity-20"/>
                         <p>Ready to test.</p>
                         <p className="text-xs">Select a resource and click Send.</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // --- GRAPHQL INTERFACE ---
              <>
                 <div className="w-full lg:w-1/3 bg-slate-950 border-r border-slate-800 flex flex-col">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase">
                       Operation
                    </div>
                    <textarea 
                      value={gqlQuery}
                      onChange={(e) => setGqlQuery(e.target.value)}
                      className="flex-1 bg-slate-950 text-indigo-100 font-mono text-sm p-4 outline-none resize-none focus:bg-slate-900/50 transition"
                      spellCheck="false"
                    />
                    <div className="p-4 border-t border-slate-800">
                       <button 
                        onClick={executeGqlRequest}
                        disabled={gqlLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                      >
                         {gqlLoading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Play className="w-4 h-4 fill-current"/>}
                         Execute Query
                      </button>
                    </div>
                 </div>
                 <div className="flex-1 bg-[#0B0F19] flex flex-col min-h-0">
                    <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                      <span className="text-xs text-slate-400">Data</span>
                    </div>
                    <div className="flex-1 overflow-auto p-6 font-mono text-sm text-yellow-100/90">
                       {gqlLoading ? (
                          <div className="h-full flex items-center justify-center text-slate-600">
                            <RefreshCw className="w-6 h-6 animate-spin"/>
                          </div>
                       ) : gqlResult ? (
                         <pre>{gqlResult}</pre>
                       ) : (
                         <div className="h-full flex flex-col items-center justify-center text-slate-700">
                           <Layers className="w-12 h-12 mb-4 opacity-20"/>
                           <p>GraphQL Schema available.</p>
                         </div>
                       )}
                    </div>
                 </div>
              </>
            )}

          </div>
        </main>
      )}

      {/* Footer */}
      {activeTab === 'docs' && (
        <footer className="border-t border-slate-800/60 bg-[#0B0F19] py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
               <Database className="w-5 h-5 text-slate-400" />
               <span className="font-bold text-slate-300">OpenAPI<span className="text-slate-500">Data</span></span>
            </div>
            <div className="text-slate-500 text-sm">
               Open Source project maintained by the community.
            </div>
            <div className="flex gap-4">
               <a href="#" className="text-slate-500 hover:text-indigo-400 transition">GitLab</a>
               <a href="#" className="text-slate-500 hover:text-indigo-400 transition">License</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
