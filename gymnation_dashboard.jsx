import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend, Area, AreaChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const R = "#E10600", D = "#0A0A0A", W = "#FFFFFF", M = "#9CA3AF", G = "#1A1A1A", A = "#FFB400", GR = "#22C55E";
const CARD = "bg-[#141414] border border-[#2A2A2A] rounded-xl";

// ─── DATA ───
const kpis = {total_members:22000,active_members:18742,churn_rate_pct:9.44,retention_rate_pct:90.56,mrr_aed:881881,arr_aed:10582572,total_revenue_aed:60400052,arpu_aed:3222.71,ltv_aed:6930.59,failed_payment_rate_pct:2.95,payment_recovery_rate_pct:3.51,cac_aed:27.79,avg_visits_per_member:12.76,n_clubs:23};

const joins = [
  {m:"Oct 24",v:477},{m:"Nov 24",v:442},{m:"Dec 24",v:420},{m:"Jan 25",v:424},{m:"Feb 25",v:386},
  {m:"Mar 25",v:414},{m:"Apr 25",v:445},{m:"May 25",v:446},{m:"Jun 25",v:423},{m:"Jul 25",v:419},
  {m:"Aug 25",v:432},{m:"Sep 25",v:412},{m:"Oct 25",v:423},{m:"Nov 25",v:439},{m:"Dec 25",v:396},
  {m:"Jan 26",v:471},{m:"Feb 26",v:420},{m:"Mar 26",v:423}
];

const churnByType = [
  {type:"Corporate",rate:4.6},{type:"PT Bundle",rate:4.8},{type:"Premium 12M",rate:5.0},
  {type:"Couples",rate:6.4},{type:"Classic 12M",rate:7.9},{type:"Student",rate:13.3},{type:"Flex Monthly",rate:15.7}
];

const visitsHour = [
  {h:"5",v:5646},{h:"6",v:11074},{h:"7",v:19558},{h:"8",v:22504},{h:"9",v:16757},
  {h:"10",v:13950},{h:"11",v:13864},{h:"12",v:14053},{h:"13",v:14000},{h:"14",v:14113},
  {h:"15",v:16744},{h:"16",v:22420},{h:"17",v:27948},{h:"18",v:30807},{h:"19",v:22526},
  {h:"20",v:8357},{h:"21",v:4253},{h:"22",v:1426}
];

const clubRev = [
  {name:"Olaya",rev:2857},{name:"Silicon Oasis",rev:2854},{name:"Juffair",rev:2796},
  {name:"Mirdif",rev:2710},{name:"Deira",rev:2703},{name:"Motor City",rev:2682},
  {name:"Downtown",rev:2664},{name:"JVC",rev:2662},{name:"JLT",rev:2638},{name:"Al Hamra",rev:2615}
];

const cacChannel = [
  {ch:"Outdoor",cac:20.14},{ch:"TikTok",cac:21.99},{ch:"Corp B2B",cac:22.38},
  {ch:"Referral",cac:23.96},{ch:"Influencer",cac:24.78},{ch:"Google",cac:28.67},
  {ch:"Meta",cac:31.34},{ch:"Walk-in",cac:33.20},{ch:"Snapchat",cac:40.29},{ch:"Email",cac:62.26}
];

const featureImp = [
  {f:"total_visits",v:0.344},{f:"visits/month",v:0.191},{f:"engagement",v:0.099},
  {f:"peak_visit_rate",v:0.061},{f:"days_no_visit",v:0.049},{f:"avg_duration",v:0.043},
  {f:"tenure",v:0.040},{f:"age",v:0.022},{f:"total_events",v:0.019},{f:"total_paid",v:0.017}
];

const segments = [
  {name:"High-Value Loyal",members:2214,avg_paid:9561,churn:3,color:"#22C55E"},
  {name:"Premium Upsell",members:9393,avg_paid:2162,churn:0,color:"#3B82F6"},
  {name:"Casual Engaged",members:9600,avg_paid:2081,churn:19,color:"#FFB400"},
  {name:"At-Risk",members:793,avg_paid:981,churn:16,color:"#E10600"}
];

const riskDist = [{tier:"Low",count:18269,color:"#22C55E"},{tier:"Medium",count:250,color:"#FFB400"},{tier:"High",count:152,color:"#F97316"},{tier:"Critical",count:71,color:"#E10600"}];

const models = [
  {model:"Logistic Reg.",acc:0.969,prec:0.855,recall:0.810,f1:0.832,auc:0.989},
  {model:"Random Forest",acc:0.969,prec:0.862,recall:0.798,f1:0.829,auc:0.985},
  {model:"Grad. Boost",acc:0.969,prec:0.860,recall:0.800,f1:0.829,auc:0.986}
];

const forecast = [
  {m:"Apr 26",base:429,agg:536,churn:322},{m:"May 26",base:429,agg:536,churn:322},
  {m:"Jun 26",base:429,agg:536,churn:322},{m:"Jul 26",base:429,agg:536,churn:322},
  {m:"Aug 26",base:429,agg:536,churn:322},{m:"Sep 26",base:429,agg:536,churn:322}
];

const fmt = (n) => n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(0)+"K" : n.toFixed(0);
const fmtAED = (n) => "AED " + fmt(n);

const tabs = ["Overview","Churn & Retention","Revenue & Payments","Marketing","Operations","ML Models"];

function KPI({label, value, sub, accent}) {
  return (
    <div className={`${CARD} p-4 flex flex-col`}>
      <span className="text-xs tracking-widest uppercase" style={{color:M}}>{label}</span>
      <span className="text-2xl font-bold mt-1" style={{color: accent||W, fontFamily:"'Georgia', serif"}}>{value}</span>
      {sub && <span className="text-xs mt-1" style={{color:M}}>{sub}</span>}
    </div>
  );
}

function Section({title, children}) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{color:W, fontFamily:"'Georgia', serif"}}>
        <span className="w-1 h-5 rounded-full inline-block" style={{background:R}}></span>
        {title}
      </h2>
      {children}
    </div>
  );
}

const CustomTooltip = ({active, payload, label}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-3 py-2 text-xs" style={{background:"#222",border:"1px solid #333",color:W}}>
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{color:p.color||p.fill||W}}>{p.name}: {typeof p.value === 'number' && p.value > 100 ? fmt(p.value) : p.value}</div>
      ))}
    </div>
  );
};

// ─── TABS ───
function OverviewTab() {
  return <>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      <KPI label="Active Members" value={kpis.active_members.toLocaleString()} sub="of 22,000 total" accent={GR}/>
      <KPI label="MRR" value={fmtAED(kpis.mrr_aed)} sub="ARR AED 10.6M" accent={W}/>
      <KPI label="Churn Rate" value={kpis.churn_rate_pct+"%"} sub="Target <5%" accent={R}/>
      <KPI label="LTV" value={fmtAED(kpis.ltv_aed)} sub="LTV/CAC: 249x" accent={A}/>
      <KPI label="Failed Payments" value={kpis.failed_payment_rate_pct+"%"} sub="Alert >4%" accent={kpis.failed_payment_rate_pct>4?R:GR}/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold mb-3" style={{color:M}}>MONTHLY NEW JOINERS</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={joins}><defs><linearGradient id="gj" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={R} stopOpacity={0.3}/><stop offset="100%" stopColor={R} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222"/><XAxis dataKey="m" tick={{fill:M,fontSize:9}} interval={2}/><YAxis tick={{fill:M,fontSize:10}}/><Tooltip content={<CustomTooltip/>}/>
            <Area type="monotone" dataKey="v" stroke={R} fill="url(#gj)" strokeWidth={2} name="Joins"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold mb-3" style={{color:M}}>MEMBER SEGMENTS</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="50%" height={200}>
            <PieChart><Pie data={segments} dataKey="members" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={2} stroke="#141414">
              {segments.map((s,i) => <Cell key={i} fill={s.color}/>)}
            </Pie><Tooltip content={<CustomTooltip/>}/></PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 ml-2">
            {segments.map((s,i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{background:s.color}}></span>
                <span style={{color:W}}>{s.name}</span>
                <span style={{color:M}}>({s.members.toLocaleString()})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className={`${CARD} p-5 mt-6`}>
      <h3 className="text-sm font-bold mb-3" style={{color:M}}>6-MONTH FORECAST — NEW JOINERS</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={forecast}><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
          <XAxis dataKey="m" tick={{fill:M,fontSize:10}}/><YAxis tick={{fill:M,fontSize:10}}/><Tooltip content={<CustomTooltip/>}/>
          <Line type="monotone" dataKey="base" stroke={R} strokeWidth={2} name="Base" dot={{r:4}}/>
          <Line type="monotone" dataKey="agg" stroke={GR} strokeWidth={2} strokeDasharray="5 5" name="Aggressive" dot={{r:3}}/>
          <Line type="monotone" dataKey="churn" stroke={A} strokeWidth={2} strokeDasharray="5 5" name="Churn spike" dot={{r:3}}/>
          <Legend wrapperStyle={{fontSize:11,color:M}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </>;
}

function ChurnTab() {
  return <>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <KPI label="Churn Rate" value="9.44%" accent={R}/>
      <KPI label="Retention" value="90.56%" accent={GR}/>
      <KPI label="Critical Risk" value="71" sub="members" accent={R}/>
      <KPI label="High Risk" value="152" sub="members" accent="#F97316"/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold mb-3" style={{color:M}}>CHURN RATE BY MEMBERSHIP TYPE</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={churnByType} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
            <XAxis type="number" tick={{fill:M,fontSize:10}} unit="%"/><YAxis dataKey="type" type="category" tick={{fill:M,fontSize:10}} width={100}/>
            <Tooltip content={<CustomTooltip/>}/><Bar dataKey="rate" fill={R} radius={[0,4,4,0]} name="Churn %"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold mb-3" style={{color:M}}>CHURN RISK DISTRIBUTION (ACTIVE MEMBERS)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={riskDist}><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
            <XAxis dataKey="tier" tick={{fill:M,fontSize:11}}/><YAxis tick={{fill:M,fontSize:10}}/><Tooltip content={<CustomTooltip/>}/>
            <Bar dataKey="count" name="Members" radius={[4,4,0,0]}>
              {riskDist.map((r,i) => <Cell key={i} fill={r.color}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={`${CARD} p-5 mt-6`}>
      <h3 className="text-sm font-bold mb-3" style={{color:M}}>TOP 10 CHURN DRIVERS (FEATURE IMPORTANCE)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={featureImp} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
          <XAxis type="number" tick={{fill:M,fontSize:10}}/><YAxis dataKey="f" type="category" tick={{fill:W,fontSize:10}} width={110}/>
          <Tooltip content={<CustomTooltip/>}/><Bar dataKey="v" fill={R} radius={[0,4,4,0]} name="Importance"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={`${CARD} p-5 mt-6`}>
      <h3 className="text-sm font-bold mb-4" style={{color:M}}>RETENTION ACTIONS BY RISK TIER</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[{tier:"Critical",color:R,action:"Manager call + freeze offer + PT taster",count:71},
          {tier:"High",color:"#F97316",action:"Retention coach email + class pack",count:152},
          {tier:"Medium",color:A,action:"Automated re-engagement journey",count:250},
          {tier:"Low",color:GR,action:"NPS survey + upsell path",count:18269}
        ].map((t,i) => (
          <div key={i} className="rounded-lg p-3" style={{background:"#1A1A1A",borderLeft:`3px solid ${t.color}`}}>
            <div className="text-xs font-bold" style={{color:t.color}}>{t.tier} ({t.count})</div>
            <div className="text-xs mt-1" style={{color:M}}>{t.action}</div>
          </div>
        ))}
      </div>
    </div>
  </>;
}

function RevenueTab() {
  const leakage = [{label:"Failed payments (est.)",val:"AED 1.6M",color:R},{label:"Chargebacks",val:"~AED 53K",color:"#F97316"},{label:"Total leakage",val:"AED 1.65M",color:A}];
  return <>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <KPI label="Total Revenue" value={fmtAED(kpis.total_revenue_aed)} accent={W}/>
      <KPI label="MRR" value={fmtAED(kpis.mrr_aed)} accent={GR}/>
      <KPI label="ARPU" value={fmtAED(kpis.arpu_aed)} accent={A}/>
      <KPI label="Failed Rate" value="2.95%" sub="Recovery 3.51%" accent={R}/>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold mb-3" style={{color:M}}>TOP 10 CLUBS BY REVENUE (AED K)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={clubRev} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
            <XAxis type="number" tick={{fill:M,fontSize:10}}/><YAxis dataKey="name" type="category" tick={{fill:W,fontSize:10}} width={110}/>
            <Tooltip content={<CustomTooltip/>}/><Bar dataKey="rev" fill={R} radius={[0,4,4,0]} name="Revenue (K AED)"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={`${CARD} p-5`}>
        <h3 className="text-sm font-bold mb-3" style={{color:M}}>REVENUE LEAKAGE</h3>
        <div className="flex flex-col gap-4 mt-6">
          {leakage.map((l,i) => (
            <div key={i} className="flex items-center justify-between rounded-lg p-4" style={{background:"#1A1A1A"}}>
              <span className="text-sm" style={{color:M}}>{l.label}</span>
              <span className="text-xl font-bold" style={{color:l.color,fontFamily:"'Georgia', serif"}}>{l.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg p-4" style={{background:"rgba(225,6,0,0.08)",border:"1px solid rgba(225,6,0,0.2)"}}>
          <p className="text-xs" style={{color:"#EF9A9A"}}>
            <strong>Smart retry recommendation:</strong> Time-optimised retry (morning, salary day), gateway fallback routing. Target: reduce failed rate from 2.95% to &lt;1.8%.
          </p>
        </div>
      </div>
    </div>
  </>;
}

function MarketingTab() {
  return <>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <KPI label="Blended CAC" value="AED 27.79" accent={GR}/>
      <KPI label="LTV/CAC" value="249x" accent={A}/>
      <KPI label="Total Campaigns" value="120" accent={W}/>
      <KPI label="Lead→Join" value="22%" sub="conversion rate" accent={W}/>
    </div>
    <div className={`${CARD} p-5`}>
      <h3 className="text-sm font-bold mb-3" style={{color:M}}>CAC BY CHANNEL (AED)</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={cacChannel}><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
          <XAxis dataKey="ch" tick={{fill:M,fontSize:10}} interval={0} angle={-30} textAnchor="end" height={60}/>
          <YAxis tick={{fill:M,fontSize:10}}/><Tooltip content={<CustomTooltip/>}/>
          <Bar dataKey="cac" name="CAC (AED)" radius={[4,4,0,0]}>
            {cacChannel.map((c,i) => <Cell key={i} fill={i < 4 ? GR : i < 7 ? A : R}/>)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-3 text-xs" style={{color:M}}>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:GR}}></span>Efficient</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:A}}></span>Moderate</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:R}}></span>Expensive</span>
      </div>
    </div>
    <div className={`${CARD} p-5 mt-6`}>
      <h3 className="text-sm font-bold mb-3" style={{color:M}}>RECOMMENDATION</h3>
      <p className="text-sm" style={{color:"#CCC"}}>
        Shift 30% of budget from Email/Snapchat/Walk-in (high CAC, lower retention) into Referral incentives and Outdoor/TikTok (low CAC, scalable). Add in-app referral tracking for organic amplification.
      </p>
    </div>
  </>;
}

function OpsTab() {
  return <>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <KPI label="Clubs" value="23" sub="5 GCC cities" accent={W}/>
      <KPI label="Avg visits/member" value="12.76" accent={A}/>
      <KPI label="Trainers" value="180" accent={W}/>
      <KPI label="Classes delivered" value="28K" accent={GR}/>
    </div>
    <div className={`${CARD} p-5`}>
      <h3 className="text-sm font-bold mb-3" style={{color:M}}>VISITS BY HOUR OF DAY</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={visitsHour}><CartesianGrid strokeDasharray="3 3" stroke="#222"/>
          <XAxis dataKey="h" tick={{fill:M,fontSize:10}} label={{value:"Hour",position:"insideBottom",offset:-2,fill:M,fontSize:10}}/>
          <YAxis tick={{fill:M,fontSize:10}}/><Tooltip content={<CustomTooltip/>}/>
          <Bar dataKey="v" name="Visits" radius={[3,3,0,0]}>
            {visitsHour.map((d,i) => <Cell key={i} fill={[6,7,17,18,19].includes(parseInt(d.h)) ? R : "#333"}/>)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2 text-xs" style={{color:M}}>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:R}}></span>Peak hours</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:"#333"}}></span>Off-peak</span>
      </div>
    </div>
    <div className={`${CARD} p-5 mt-6`}>
      <h3 className="text-sm font-bold mb-3" style={{color:M}}>OPERATIONAL INSIGHT</h3>
      <p className="text-sm" style={{color:"#CCC"}}>
        Peak hours (6–7 AM, 5–8 PM) drive 60%+ of visit traffic. Schedule high-demand classes in these windows and shift low-fill classes to off-peak. Consider dynamic pricing or class-pack incentives for 10 AM–3 PM to flatten the curve.
      </p>
    </div>
  </>;
}

function ModelsTab() {
  const radarData = models.map(m => ({model:m.model,Accuracy:m.acc,Precision:m.prec,Recall:m.recall,F1:m.f1,AUC:m.auc}));
  return <>
    <Section title="Churn Classification Models">
      <div className={`${CARD} p-5 overflow-x-auto`}>
        <table className="w-full text-sm" style={{color:W}}>
          <thead><tr style={{borderBottom:"1px solid #333"}}>
            {["Model","Accuracy","Precision","Recall","F1","ROC AUC"].map(h => (
              <th key={h} className="text-left py-2 px-3 text-xs uppercase tracking-wide" style={{color:M}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {models.map((m,i) => (
              <tr key={i} style={{borderBottom:"1px solid #1A1A1A"}}>
                <td className="py-2 px-3 font-bold">{m.model}</td>
                <td className="py-2 px-3">{m.acc}</td>
                <td className="py-2 px-3">{m.prec}</td>
                <td className="py-2 px-3">{m.recall}</td>
                <td className="py-2 px-3">{m.f1}</td>
                <td className="py-2 px-3 font-bold" style={{color:GR}}>{m.auc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
    <Section title="CLV Regression Models">
      <div className={`${CARD} p-5 overflow-x-auto`}>
        <table className="w-full text-sm" style={{color:W}}>
          <thead><tr style={{borderBottom:"1px solid #333"}}>
            {["Model","MAE (AED)","RMSE (AED)","R²"].map(h => (
              <th key={h} className="text-left py-2 px-3 text-xs uppercase tracking-wide" style={{color:M}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[{m:"Linear Regression",mae:"2,107",rmse:"2,986",r2:"0.003"},
              {m:"Random Forest",mae:"1,957",rmse:"2,836",r2:"0.100"},
              {m:"Gradient Boosting",mae:"1,754",rmse:"2,633",r2:"0.224"}
            ].map((r,i) => (
              <tr key={i} style={{borderBottom:"1px solid #1A1A1A"}}>
                <td className="py-2 px-3 font-bold">{r.m}</td>
                <td className="py-2 px-3">{r.mae}</td>
                <td className="py-2 px-3">{r.rmse}</td>
                <td className="py-2 px-3 font-bold" style={{color:A}}>{r.r2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
    <Section title="Deep Learning Verdict">
      <div className={`${CARD} p-5`}>
        <p className="text-sm" style={{color:"#CCC"}}>
          A Keras MLP (64→32→1, dropout 0.3) was benchmarked on the same churn task. It matches but does <strong style={{color:W}}>not beat</strong> Gradient Boosting (AUC ≈ 0.98), while being slower to train and harder to explain. <strong style={{color:GR}}>Recommendation:</strong> Use traditional ML for tabular churn; reserve deep learning for NLP on member feedback, LSTM demand forecasting, and image-based tasks.
        </p>
      </div>
    </Section>
  </>;
}

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const panels = [OverviewTab, ChurnTab, RevenueTab, MarketingTab, OpsTab, ModelsTab];
  const Panel = panels[tab];
  return (
    <div className="min-h-screen" style={{background:D,color:W,fontFamily:"'Segoe UI', system-ui, sans-serif"}}>
      {/* Header */}
      <div className="px-4 sm:px-6 pt-5 pb-4 flex items-center gap-3 border-b" style={{borderColor:"#1A1A1A"}}>
        <div className="w-1.5 h-8 rounded-full" style={{background:R}}></div>
        <div>
          <h1 className="text-xl font-bold" style={{fontFamily:"'Georgia', serif"}}>
            <span style={{color:R}}>Gym</span>Nation
          </h1>
          <p className="text-xs" style={{color:M}}>Executive Data Platform — April 2026</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{background:GR}}></span>
          <span className="text-xs" style={{color:M}}>Live</span>
        </div>
      </div>
      {/* Tabs */}
      <div className="px-4 sm:px-6 py-3 flex gap-1 overflow-x-auto border-b" style={{borderColor:"#1A1A1A"}}>
        {tabs.map((t,i) => (
          <button key={i} onClick={() => setTab(i)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
            style={{
              background: tab===i ? R : "transparent",
              color: tab===i ? W : M,
            }}>{t}</button>
        ))}
      </div>
      {/* Content */}
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        <Panel />
      </div>
      {/* Footer */}
      <div className="px-6 py-4 text-center text-xs border-t" style={{borderColor:"#1A1A1A",color:M}}>
        GymNation Data Platform — Built by Kareem Makki — Confidential
      </div>
    </div>
  );
}
