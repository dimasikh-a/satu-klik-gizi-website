module.exports=[22928,a=>{"use strict";var b=a.i(87924),c=a.i(48662),d=a.i(64321),e=a.i(27165),f=a.i(67149),g=a.i(59854);a.s(["default",0,function({totalBalita:a,giziBaik:h,giziKurang:i,giziBuruk:j,berisikoGiziLebih:k,giziLebih:l,obesitas:m}){let n=[{title:"Total Balita",value:a,description:"Tercatat di Wilayah",color:"border-l-[#FF8A65]"},{title:"Gizi Baik",value:h,description:"Status Gizi Baik",color:"border-l-[#4E7BEB]"},{title:"Gizi Kurang",value:i,description:"Mengalami Gizi Kurang",color:"border-l-[#F5B458]"},{title:"Gizi Buruk",value:j,description:"Mengalami Gizi Buruk",color:"border-l-[#FF8A65]"},{title:"Berisiko Gizi Lebih",value:k,description:"Berisiko Gizi Lebih",color:"border-l-[#F4D64E]"},{title:"Gizi Lebih",value:l,description:"Mengalami Gizi Lebih",color:"border-l-[#E88B4A]"},{title:"Obesitas",value:m,description:"Mengalami Obesitas",color:"border-l-[#9B74E4]"}],o=[{name:"Gizi Baik",value:h,color:"#4E7BEB"},{name:"Gizi Kurang",value:i,color:"#F5B458"},{name:"Gizi Buruk",value:j,color:"#FF8A65"},{name:"Berisiko Gizi Lebih",value:k,color:"#F4D64E"},{name:"Gizi Lebih",value:l,color:"#E88B4A"},{name:"Obesitas",value:m,color:"#9B74E4"}].filter(a=>a.value>0),p=j+i+h+k+l+m;return(0,b.jsxs)("div",{className:"mt-20 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:mt-20 lg:px-5 lg:py-20",children:[(0,b.jsx)("div",{className:"mb-6 text-center sm:mb-8",children:(0,b.jsx)("h1",{className:"text-2xl font-bold tracking-tight text-teal-600 sm:text-3xl",children:"Data Status Gizi Balita"})}),(0,b.jsxs)("section",{className:"   grid   grid-cols-1   gap-5   lg:grid-cols-12   lg:gap-6   ",children:[(0,b.jsx)("div",{className:"order-2 col-span-1 lg:order-1 lg:col-span-5",children:(0,b.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:gap-5",children:n.map((a,c)=>(0,b.jsxs)("div",{className:`
                  flex
                  min-h-[125px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-gray-200
                  border-l-[5px]
                  ${a.color}
                  bg-white
                  px-2
                  py-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md

                  sm:min-h-[140px]
                  sm:rounded-[26px]
                  sm:px-4
                  sm:py-5
                `,children:[(0,b.jsx)("h3",{className:"   max-w-[140px]   text-center   text-[13px]   font-semibold   leading-tight   text-slate-800      sm:text-[16px]   ",children:a.title}),(0,b.jsxs)("div",{className:"mt-2 text-center",children:[(0,b.jsx)("h2",{className:"   text-xl   font-bold   leading-none   text-slate-900      sm:text-2xl   ",children:a.value}),(0,b.jsx)("p",{className:"   mt-2   text-[11px]   leading-tight   text-slate-500      sm:text-sm   ",children:a.description})]})]},c))})}),(0,b.jsx)("div",{className:"order-1 col-span-1 lg:order-2 lg:col-span-7",children:(0,b.jsxs)("div",{className:"   flex   min-h-[460px]   flex-col   rounded-[24px]   border   border-gray-200   bg-white   px-4   py-5   shadow-sm      sm:min-h-[500px]   sm:rounded-[30px]   sm:px-7   sm:py-6   ",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"   text-[18px]   font-bold   text-slate-800      sm:text-[20px]   ",children:"Distribusi Status Gizi Balita"}),(0,b.jsx)("p",{className:"   mt-2   max-w-2xl   text-[14px]   leading-relaxed   text-slate-500      sm:text-[17px]   ",children:"Persentase status gizi berdasarkan hasil pemeriksaan terbaru"})]}),(0,b.jsx)("div",{className:"flex flex-1 items-center justify-center",children:o.length>0?(0,b.jsx)("div",{className:"   h-[330px]   w-full      sm:h-[360px]   ",children:(0,b.jsx)(c.ResponsiveContainer,{width:"100%",height:"100%",children:(0,b.jsxs)(d.PieChart,{children:[(0,b.jsx)(e.Pie,{data:o,cx:"50%",cy:"50%",innerRadius:55,outerRadius:105,dataKey:"value",paddingAngle:1,label:({name:a,percent:b})=>`${a} ${((b??0)*100).toFixed(1)}%`,labelLine:!1,children:o.map((a,c)=>(0,b.jsx)(f.Cell,{fill:a.color},`cell-${c}`))}),(0,b.jsx)("text",{x:"50%",y:"47%",textAnchor:"middle",dominantBaseline:"middle",fontSize:13,fill:"#64748b",children:"Total"}),(0,b.jsx)("text",{x:"50%",y:"55%",textAnchor:"middle",dominantBaseline:"middle",fontSize:23,fontWeight:700,fill:"#0f172a",children:p}),(0,b.jsx)(g.Tooltip,{})]})})}):(0,b.jsx)("div",{className:"flex h-full items-center justify-center",children:(0,b.jsx)("p",{className:"text-sm text-slate-500",children:"Belum ada data hasil gizi."})})})]})})]})]})}])}];

//# sourceMappingURL=src_features_landing_sections_statistik-section_tsx_09uf2-q._.js.map