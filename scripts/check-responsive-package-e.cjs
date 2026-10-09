const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const source=path.resolve(__dirname,'../design/package-e');
const modules=process.env.PACKAGE_E_NODE_MODULES;
const {chromium}=require(modules?path.join(modules,'playwright'):'playwright');
(async()=>{
  const browser=await chromium.launch({headless:true});
  const results=[];
  try {
    for(const name of ['LandingDesktopMockup',...Array.from({length:10},(_,i)=>`wireframe${i+19}`)]){
      for(const width of [320,390,768,960,1440]){
        const page=await browser.newPage({viewport:{width,height:900}});
        await page.goto(pathToFileURL(path.join(source,`${name}.html`)).href);
        await page.evaluate(()=>document.fonts.ready);
        const result=await page.evaluate(()=>{
          const visible=e=>e.getBoundingClientRect().height>0&&getComputedStyle(e).visibility!=='hidden';
          const controls=[...document.querySelectorAll('button,input,select,textarea,.btn')].filter(visible);
          return {
            width:innerWidth,scroll:document.documentElement.scrollWidth,
            brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length,
            shortControls:controls.filter(e=>e.getBoundingClientRect().height<48).map(e=>e.textContent||e.id),
            unlabeledFields:[...document.querySelectorAll('input,select,textarea')].filter(e=>!e.labels?.length&&!e.getAttribute('aria-label')).map(e=>e.id),
            sidebarVisible:!!document.querySelector('.sidebar')&&visible(document.querySelector('.sidebar'))
          };
        });
        results.push({name,...result});
        await page.close();
      }
    }
    const failures=results.filter(r=>r.scroll>r.width||r.brokenImages||r.shortControls.length||r.unlabeledFields.length||(r.width<960&&r.sidebarVisible));
    const report={viewports:[320,390,768,960,1440],cases:results.length,checks:['No horizontal overflow','Images loaded','Controls at least 48px high','Persistent labels for every field','Sidebar hidden below 960px'],failures,results};
    fs.writeFileSync(path.join(source,'responsive-verification.json'),JSON.stringify(report,null,2)+'\n');
    if(failures.length)throw new Error(JSON.stringify(failures,null,2));
    console.log(`Responsive verification: ${results.length} cases passed at 320/390/768/960/1440px.`);
  } finally {await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
