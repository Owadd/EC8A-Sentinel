const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'results', 'qwen_ec8a_with_images.json'), 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nigeria Form EC8A AI Forensic Audit Explorer (Qwen2.5-VL 250 Sheets)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col">

  <!-- HEADER -->
  <header class="bg-slate-800/90 border-b border-slate-700 px-6 py-4 sticky top-0 z-30 backdrop-blur-md">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-3">
          <span class="text-2xl">🇳🇬</span>
          <h1 class="text-xl font-bold tracking-tight text-white">Form EC8A Forensic Audit Explorer</h1>
          <span class="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">Qwen2.5-VL (7B)</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Evaluating open-weight Vision AI on 250 official photographed INEC IReV result sheets across Osun State</p>
      </div>

      <!-- KPI METRICS SUMMARY -->
      <div class="flex flex-wrap gap-2 text-xs">
        <div class="bg-slate-900/80 border border-slate-700/80 px-3 py-2 rounded-lg text-center">
          <div class="text-slate-400">Audited Sheets</div>
          <div class="text-base font-bold text-white">250</div>
        </div>
        <div class="bg-slate-900/80 border border-slate-700/80 px-3 py-2 rounded-lg text-center">
          <div class="text-slate-400">Party Tallies</div>
          <div class="text-base font-bold text-white">3,750</div>
        </div>
        <div class="bg-slate-900/80 border border-emerald-500/40 px-3 py-2 rounded-lg text-center">
          <div class="text-emerald-400 font-medium">Exact Accuracy</div>
          <div class="text-base font-bold text-emerald-400">98.77%</div>
        </div>
        <div class="bg-slate-900/80 border border-rose-500/40 px-3 py-2 rounded-lg text-center">
          <div class="text-rose-400 font-medium">AI Hallucinations</div>
          <div class="text-base font-bold text-rose-400">46 <span class="text-[10px] text-slate-400">(1.23%)</span></div>
        </div>
        <div class="bg-slate-900/80 border border-amber-500/40 px-3 py-2 rounded-lg text-center">
          <div class="text-amber-400 font-medium">Sec. 51 Overvoting</div>
          <div class="text-base font-bold text-amber-400">58 sheets</div>
        </div>
      </div>
    </div>
  </header>

  <!-- CONTROLS & FILTER BAR -->
  <div class="bg-slate-800/50 border-b border-slate-700/80 px-6 py-3">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <button onclick="setFilter('all')" id="btn-filter-all" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white transition">All 250 Sheets</button>
        <button onclick="setFilter('errors')" id="btn-filter-errors" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition">⚠️ With AI Errors (28)</button>
        <button onclick="setFilter('perfect')" id="btn-filter-perfect" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition">✅ 100% Flawless (222)</button>
        <button onclick="setFilter('sec51')" id="btn-filter-sec51" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition">🚨 Sec. 51 Overvoting (58)</button>
      </div>

      <!-- Search & Selector -->
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-72">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
          <input type="text" id="searchInput" oninput="onSearch()" placeholder="Search PU name, Ward, LGA, Code..." class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500">
        </div>
        <div class="text-xs text-slate-400 whitespace-nowrap" id="counterText">Showing 250 sheets</div>
      </div>

    </div>
  </div>

  <!-- MAIN DUAL-PANE STAGE -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

    <!-- LEFT COLUMN: SIDEBAR LIST OF POLLING UNITS -->
    <div class="lg:col-span-4 bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-[760px]">
      <div class="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Polling Unit Selector</span>
        <span class="text-[11px] text-slate-400">Click to inspect</span>
      </div>
      <div id="puListContainer" class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        <!-- PU Cards rendered by JS -->
      </div>
    </div>

    <!-- RIGHT COLUMN: FORENSIC COMPARISON WORKBENCH -->
    <div class="lg:col-span-8 flex flex-col gap-6">
      
      <!-- CURRENT PU HEADER BANNER -->
      <div id="activePuHeader" class="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span id="activePuCode" class="bg-slate-700 font-mono text-[11px] px-2 py-0.5 rounded text-slate-300 font-semibold">29/01/01/001</span>
            <span id="activePuLga" class="text-xs font-medium text-emerald-400">ATAKUMOSA EAST LGA</span>
            <span class="text-slate-500 text-xs">•</span>
            <span id="activePuWard" class="text-xs text-slate-400">IWARA WARD</span>
          </div>
          <h2 id="activePuName" class="text-lg font-bold text-white">TOWN HALL IWARA</h2>
        </div>
        <div class="flex items-center gap-2">
          <span id="activeAccuracyBadge" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">100% Match</span>
          <a id="btnOpenRawImg" href="#" target="_blank" class="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Open Original
          </a>
        </div>
      </div>

      <!-- DUAL STAGE: PHOTO VIEWER & AUDIT SCORECARD -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- PHOTO VIEWER PANEL -->
        <div class="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-[650px]">
          <div class="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-xs">
            <span class="font-semibold text-slate-300"><i class="fa-regular fa-image mr-1.5 text-slate-400"></i> Authentic IReV Form EC8A</span>
            <div class="flex items-center gap-2">
              <button onclick="zoomIn()" class="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300" title="Zoom In"><i class="fa-solid fa-plus"></i></button>
              <button onclick="zoomOut()" class="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300" title="Zoom Out"><i class="fa-solid fa-minus"></i></button>
              <button onclick="resetZoom()" class="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300" title="Reset"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
          </div>
          <div class="flex-1 bg-black/50 overflow-hidden relative flex items-center justify-center p-2">
            <img id="puPhotoImg" src="" alt="EC8A Result Sheet" class="max-h-full max-w-full object-contain transition-transform duration-200">
          </div>
          <div class="px-3 py-2 bg-slate-800/80 border-t border-slate-700/60 text-[11px] text-slate-400 flex justify-between">
            <span>Official INEC S3 Storage</span>
            <span>Camera Photo</span>
          </div>
        </div>

        <!-- VERIFICATION TABLE & STATUTORY AUDIT -->
        <div class="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-[650px]">
          
          <!-- LEGAL COMPLIANCE CARDS -->
          <div class="p-3 bg-slate-800/90 border-b border-slate-700 space-y-2">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Statutory Audit (Electoral Act 2022)</div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div id="sec51Card" class="p-2 rounded-lg border bg-slate-900/60 border-slate-700 flex items-start gap-2">
                <i id="sec51Icon" class="fa-solid fa-shield-check text-emerald-400 text-sm mt-0.5"></i>
                <div>
                  <div class="font-bold text-slate-200">Sec. 51(2) Over-Voting</div>
                  <div id="sec51Text" class="text-[11px] text-slate-400">Total cast &le; accreditation</div>
                </div>
              </div>
              <div id="sec64Card" class="p-2 rounded-lg border bg-slate-900/60 border-slate-700 flex items-start gap-2">
                <i id="sec64Icon" class="fa-solid fa-calculator text-emerald-400 text-sm mt-0.5"></i>
                <div>
                  <div class="font-bold text-slate-200">Sec. 64(4) Collation Math</div>
                  <div id="sec64Text" class="text-[11px] text-slate-400">Sum matches total valid</div>
                </div>
              </div>
            </div>
          </div>

          <!-- TABLE HEADER -->
          <div class="px-4 py-2 bg-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider grid grid-cols-12 gap-2 border-b border-slate-700">
            <div class="col-span-4">Party</div>
            <div class="col-span-3 text-center">Human Truth</div>
            <div class="col-span-3 text-center">Qwen2.5-VL</div>
            <div class="col-span-2 text-right">Audit</div>
          </div>

          <!-- VERIFICATION ROWS -->
          <div id="partyTallyRows" class="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-700/40 text-xs">
            <!-- Rendered by JS -->
          </div>

          <!-- ADMIN TOTALS FOOTER -->
          <div id="adminTotalsFooter" class="bg-slate-800/90 border-t border-slate-700 p-3 grid grid-cols-4 gap-2 text-center text-xs">
            <!-- Rendered by JS -->
          </div>

        </div>

      </div>

    </div>

  </main>

  <script>
    const RAW_DATA = ${JSON.stringify(data)};

    let filteredData = [...RAW_DATA];
    let currentPuIndex = 0;
    let currentZoom = 1.0;
    let currentFilter = 'all';

    const PARTIES = ['A', 'AA', 'AAC', 'ADC', 'ADP', 'APC', 'APGA', 'APM', 'APP', 'BP', 'NNPP', 'PRP', 'SDP', 'YPP', 'ZLP'];

    function init() {
      renderList();
      selectPu(0);
    }

    function setFilter(filterType) {
      currentFilter = filterType;
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-emerald-600', 'text-white');
        btn.classList.add('bg-slate-700', 'text-slate-300');
      });
      const activeBtn = document.getElementById('btn-filter-' + filterType);
      if (activeBtn) {
        activeBtn.classList.remove('bg-slate-700', 'text-slate-300');
        activeBtn.classList.add('bg-emerald-600', 'text-white');
      }

      applyFilterAndSearch();
    }

    function onSearch() {
      applyFilterAndSearch();
    }

    function applyFilterAndSearch() {
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      filteredData = RAW_DATA.filter(item => {
        let passFilter = true;
        if (currentFilter === 'errors') passFilter = item.hallucinations > 0;
        else if (currentFilter === 'perfect') passFilter = item.accuracyPercent === 100;
        else if (currentFilter === 'sec51') passFilter = item.sec51Violation === true;

        if (!passFilter) return false;

        if (!q) return true;
        return (item.puName && item.puName.toLowerCase().includes(q)) ||
               (item.puCode && item.puCode.toLowerCase().includes(q)) ||
               (item.ward && item.ward.toLowerCase().includes(q)) ||
               (item.lga && item.lga.toLowerCase().includes(q));
      });

      document.getElementById('counterText').textContent = 'Showing ' + filteredData.length + ' sheets';
      renderList();
      if (filteredData.length > 0) selectPu(0);
    }

    function renderList() {
      const container = document.getElementById('puListContainer');
      container.innerHTML = '';

      if (filteredData.length === 0) {
        container.innerHTML = '<div class="p-6 text-center text-slate-500 text-xs">No polling units match your criteria</div>';
        return;
      }

      filteredData.forEach((item, idx) => {
        const div = document.createElement('div');
        const isSelected = idx === currentPuIndex;
        div.className = 'p-3 rounded-lg border cursor-pointer transition flex items-center justify-between text-xs ' + 
          (isSelected ? 'bg-slate-700/80 border-emerald-500 shadow-sm' : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-700/40');
        
        const hasErr = item.hallucinations > 0;
        const errBadge = hasErr
          ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">' + item.hallucinations + ' err</span>'
          : '<span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">100%</span>';

        div.innerHTML = \`
          <div class="flex-1 min-w-0 pr-2">
            <div class="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
              <span class="font-mono font-bold text-slate-300">\${item.puCode}</span>
              <span>•</span>
              <span class="truncate">\${item.lga}</span>
            </div>
            <div class="font-bold text-slate-200 truncate">\${item.puName}</div>
          </div>
          <div class="flex flex-col items-end gap-1">
            \${errBadge}
            \${item.sec51Violation ? '<span class="text-[9px] text-amber-400 font-bold">SEC 51!</span>' : ''}
          </div>
        \`;

        div.onclick = () => selectPu(idx);
        container.appendChild(div);
      });
    }

    function selectPu(idx) {
      currentPuIndex = idx;
      const item = filteredData[idx];
      if (!item) return;

      renderList();

      document.getElementById('activePuCode').textContent = item.puCode;
      document.getElementById('activePuLga').textContent = (item.lga || '') + ' LGA';
      document.getElementById('activePuWard').textContent = (item.ward || '') + ' WARD';
      document.getElementById('activePuName').textContent = item.puName;
      document.getElementById('btnOpenRawImg').href = item.imageUrl;

      const accBadge = document.getElementById('activeAccuracyBadge');
      if (item.accuracyPercent === 100) {
        accBadge.className = 'text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
        accBadge.textContent = '100% Flawless Match';
      } else {
        accBadge.className = 'text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30';
        accBadge.textContent = item.accuracyPercent.toFixed(1) + '% (' + item.hallucinations + ' Errors)';
      }

      const img = document.getElementById('puPhotoImg');
      img.src = item.imageUrl;
      resetZoom();

      const sec51Card = document.getElementById('sec51Card');
      const sec51Icon = document.getElementById('sec51Icon');
      const sec51Text = document.getElementById('sec51Text');
      if (item.sec51Violation) {
        sec51Card.className = 'p-2 rounded-lg border bg-rose-950/40 border-rose-600/50 flex items-start gap-2';
        sec51Icon.className = 'fa-solid fa-triangle-exclamation text-rose-400 text-sm mt-0.5';
        sec51Text.innerHTML = '<span class="text-rose-300 font-bold">Over-voting Flagged!</span> Total cast exceeds accreditation';
      } else {
        sec51Card.className = 'p-2 rounded-lg border bg-slate-900/60 border-slate-700 flex items-start gap-2';
        sec51Icon.className = 'fa-solid fa-shield-check text-emerald-400 text-sm mt-0.5';
        sec51Text.textContent = 'Accreditation ceiling respected';
      }

      const sec64Card = document.getElementById('sec64Card');
      const sec64Icon = document.getElementById('sec64Icon');
      const sec64Text = document.getElementById('sec64Text');
      if (!item.sec64Balanced) {
        sec64Card.className = 'p-2 rounded-lg border bg-amber-950/40 border-amber-600/50 flex items-start gap-2';
        sec64Icon.className = 'fa-solid fa-circle-exclamation text-amber-400 text-sm mt-0.5';
        sec64Text.innerHTML = '<span class="text-amber-300 font-bold">Math Mismatch!</span> Candidate sum != recorded valid';
      } else {
        sec64Card.className = 'p-2 rounded-lg border bg-slate-900/60 border-slate-700 flex items-start gap-2';
        sec64Icon.className = 'fa-solid fa-calculator text-emerald-400 text-sm mt-0.5';
        sec64Text.textContent = 'Candidate sum matches valid total';
      }

      const tbody = document.getElementById('partyTallyRows');
      tbody.innerHTML = '';

      const gt = item.groundTruth || {};
      const aiVotes = item.aiExtracted?.votes || {};

      PARTIES.forEach(p => {
        const gtVal = gt[p] !== undefined ? gt[p] : 0;
        const aiVal = aiVotes[p];
        const isMatch = aiVal === gtVal;
        const diff = (aiVal !== undefined && aiVal !== null) ? (aiVal - gtVal) : null;

        const row = document.createElement('div');
        row.className = 'px-4 py-2.5 grid grid-cols-12 gap-2 items-center transition ' + 
          (isMatch ? 'hover:bg-slate-700/20' : 'bg-rose-950/30 border-l-4 border-rose-500');

        let auditBadge = '';
        if (isMatch) {
          auditBadge = '<span class="text-emerald-400 font-bold flex items-center justify-end gap-1"><i class="fa-solid fa-check text-xs"></i> Exact</span>';
        } else if (aiVal === null) {
          auditBadge = '<span class="text-amber-400 font-semibold text-[10px]">Refusal</span>';
        } else {
          const diffStr = diff > 0 ? ('+' + diff) : String(diff);
          auditBadge = '<span class="text-rose-400 font-bold flex items-center justify-end gap-1"><i class="fa-solid fa-xmark text-xs"></i> ' + diffStr + '</span>';
        }

        row.innerHTML = \`
          <div class="col-span-4 flex items-center gap-2">
            <span class="font-black text-slate-200 tracking-wider w-10">\${p}</span>
          </div>
          <div class="col-span-3 text-center font-mono font-bold text-slate-300">\${gtVal}</div>
          <div class="col-span-3 text-center font-mono font-bold \${isMatch ? 'text-emerald-400' : 'text-rose-400'}">\${aiVal !== undefined ? aiVal : 'null'}</div>
          <div class="col-span-2 text-right">\${auditBadge}</div>
        \`;
        tbody.appendChild(row);
      });

      const ext = item.aiExtracted || {};
      const adminFooter = document.getElementById('adminTotalsFooter');
      adminFooter.innerHTML = \`
        <div class="p-1.5 bg-slate-900/60 rounded border border-slate-700/60">
          <div class="text-[10px] text-slate-400">Accredited</div>
          <div class="font-mono font-bold text-slate-200">\${ext.accredited || '—'}</div>
        </div>
        <div class="p-1.5 bg-slate-900/60 rounded border border-slate-700/60">
          <div class="text-[10px] text-slate-400">Valid Votes</div>
          <div class="font-mono font-bold text-slate-200">\${ext.valid || '—'}</div>
        </div>
        <div class="p-1.5 bg-slate-900/60 rounded border border-slate-700/60">
          <div class="text-[10px] text-slate-400">Rejected</div>
          <div class="font-mono font-bold text-slate-200">\${ext.rejected || 0}</div>
        </div>
        <div class="p-1.5 bg-slate-900/60 rounded border border-slate-700/60">
          <div class="text-[10px] text-slate-400">Total Cast</div>
          <div class="font-mono font-bold text-slate-200">\${ext.total_cast || '—'}</div>
        </div>
      \`;
    }

    function zoomIn() {
      currentZoom = Math.min(3.0, currentZoom + 0.25);
      applyZoom();
    }
    function zoomOut() {
      currentZoom = Math.max(0.75, currentZoom - 0.25);
      applyZoom();
    }
    function resetZoom() {
      currentZoom = 1.0;
      applyZoom();
    }
    function applyZoom() {
      const img = document.getElementById('puPhotoImg');
      img.style.transform = 'scale(' + currentZoom + ')';
    }

    window.onload = init;
  </script>
</body>
</html>`;

const outPath = path.join(__dirname, 'results_explorer.html');
fs.writeFileSync(outPath, htmlContent);
console.log('results_explorer.html created successfully! Size: ' + (Buffer.byteLength(htmlContent)/1024).toFixed(1) + ' KB');
