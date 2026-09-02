module.exports=[63484,a=>{"use strict";var b=a.i(87924),c=a.i(48662),d=a.i(64321),e=a.i(27165),f=a.i(67149),g=a.i(59854);a.s(["default",0,function({totalBalita:a,giziBaik:h,giziKurang:i,giziBuruk:j,berisikoGiziLebih:k,giziLebih:l,obesitas:m}){let n=[{title:"Total Balita",value:a,description:"Tercatat di Wilayah",color:"border-l-[#FF8A65]"},{title:"Gizi Baik",value:h,description:"Status Gizi Baik",color:"border-l-[#4E7BEB]"},{title:"Gizi Kurang",value:i,description:"Mengalami Gizi Kurang",color:"border-l-[#F5B458]"},{title:"Gizi Buruk",value:j,description:"Mengalami Gizi Buruk",color:"border-l-[#FF8A65]"},{title:"Berisiko Gizi Lebih",value:k,description:"Berisiko Gizi Lebih",color:"border-l-[#F4D64E]"},{title:"Gizi Lebih",value:l,description:"Mengalami Gizi Lebih",color:"border-l-[#E88B4A]"},{title:"Obesitas",value:m,description:"Mengalami Obesitas",color:"border-l-[#9B74E4]"}],o=[{name:"Gizi Baik",value:h,color:"#4E7BEB"},{name:"Gizi Kurang",value:i,color:"#F5B458"},{name:"Gizi Buruk",value:j,color:"#FF8A65"},{name:"Berisiko Gizi Lebih",value:k,color:"#F4D64E"},{name:"Gizi Lebih",value:l,color:"#E88B4A"},{name:"Obesitas",value:m,color:"#9B74E4"}].filter(a=>a.value>0),p=j+i+h+k+l+m;return(0,b.jsxs)("div",{className:"mt-20 bg-white font-mono",children:[(0,b.jsx)("div",{className:"mb-8 text-center",children:(0,b.jsx)("h1",{className:"text-3xl font-bold tracking-tight text-teal-600",children:"Data Status Gizi Balita"})}),(0,b.jsxs)("section",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"col-span-5",children:(0,b.jsx)("div",{className:"grid grid-cols-2 gap-5",children:n.map((a,c)=>(0,b.jsxs)("div",{className:`
                  flex
                  min-h-[140px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[26px]
                  border
                  border-gray-200
                  border-l-[5px]
                  ${a.color}
                  bg-white
                  px-4
                  py-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md
                `,children:[(0,b.jsx)("h3",{className:"text-center text-[16px] font-semibold leading-tight text-slate-800",children:a.title}),(0,b.jsxs)("div",{className:"mt-2 text-center",children:[(0,b.jsx)("h2",{className:"text-2xl font-bold leading-none text-slate-900",children:a.value}),(0,b.jsx)("p",{className:"mt-2 text-sm text-slate-500",children:a.description})]})]},c))})}),(0,b.jsx)("div",{className:"col-span-7",children:(0,b.jsxs)("div",{className:"   flex   h-full   min-h-[500px]   flex-col   rounded-[30px]   border   border-gray-200   bg-white   px-7   py-6   shadow-sm   ",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-[20px] font-bold text-slate-800",children:"Distribusi Status Gizi Balita"}),(0,b.jsx)("p",{className:"mt-2 text-[17px] leading-relaxed text-slate-500",children:"Persentase status gizi berdasarkan hasil pemeriksaan terbaru"})]}),(0,b.jsx)("div",{className:"flex flex-1 items-center justify-center",children:o.length>0?(0,b.jsx)("div",{className:"h-[360px] w-full",children:(0,b.jsx)(c.ResponsiveContainer,{width:"100%",height:"100%",children:(0,b.jsxs)(d.PieChart,{children:[(0,b.jsx)(e.Pie,{data:o,cx:"50%",cy:"50%",innerRadius:65,outerRadius:125,dataKey:"value",paddingAngle:1,label:({name:a,percent:b})=>`${a} ${((b??0)*100).toFixed(1)}%`,labelLine:!1,children:o.map((a,c)=>(0,b.jsx)(f.Cell,{fill:a.color},`cell-${c}`))}),(0,b.jsx)("text",{x:"50%",y:"47%",textAnchor:"middle",dominantBaseline:"middle",fontSize:14,fill:"#64748b",children:"Total"}),(0,b.jsx)("text",{x:"50%",y:"55%",textAnchor:"middle",dominantBaseline:"middle",fontSize:25,fontWeight:700,fill:"#0f172a",children:p}),(0,b.jsx)(g.Tooltip,{})]})})}):(0,b.jsx)("div",{className:"flex h-full items-center justify-center",children:(0,b.jsx)("p",{className:"text-sm text-slate-500",children:"Belum ada data hasil gizi."})})})]})})]})]})}])}];

//# sourceMappingURL=src_features_dashboard_sections_dashboard-section_tsx_0r-v_rd._.js.map