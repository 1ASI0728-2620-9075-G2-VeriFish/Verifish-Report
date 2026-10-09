const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'design/package-e');
const output = path.join(root, 'assets/images/cap6');
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };
const manifests = ['style','landing','wireframes','wireflows'].flatMap(group =>
  JSON.parse(fs.readFileSync(path.join(source, `manifest-${group}.json`), 'utf8')));
const expected = [
  'style-guide-trace','information-architecture',
  'LandingDesktopWireframe','LandingPhoneWireframe','LandingDesktopMockup','LandingPhoneMockup',
  ...Array.from({length:28},(_,i)=>`wireframe${i+1}`),
  ...Array.from({length:10},(_,i)=>`wireframe${i+19}-mobile`),
  ...Array.from({length:23},(_,i)=>`wireflow${i+1}`)
];
for (const name of expected) check(manifests.some(m=>m.name===name), `Missing design: ${name}`);
check(new Set(manifests.map(m=>m.name)).size===manifests.length, 'Duplicate manifest entries');
for (const m of manifests) {
  const png = path.join(output, `${m.name}.png`);
  const html = path.join(source, `${m.name}.html`);
  check(fs.existsSync(png)&&fs.existsSync(html), `Missing source/export: ${m.name}`);
  if (!fs.existsSync(png)||!fs.existsSync(html)) continue;
  const bytes=fs.readFileSync(png);
  check(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `Invalid PNG: ${m.name}`);
  check(bytes.readUInt32BE(16)===m.width, `Incorrect export width: ${m.name}`);
  check(m.scroll<=m.width&&m.font&&m.brokenImages.length===0, `Failed render QA: ${m.name}`);
  const text=fs.readFileSync(html,'utf8');
  check(text.includes('lang="es"'), `Missing Spanish language: ${m.name}`);
  for (const match of text.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref=match[1];
    if (/^(?:https?:|data:|#)/.test(ref)) continue;
    check(fs.existsSync(path.resolve(source,ref)), `Broken local reference ${m.name}: ${ref}`);
  }
}
const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
const chapter=readme.split('\n# Capítulo VI: Solution UX Design')[1]?.split('\n# Conclusiones')[0];
check(Boolean(chapter),'Missing chapter VI');
const refs=[...chapter.matchAll(/(?:src="([^"]+)"|!\[[^\]]*\]\(([^)]+)\))/g)].map(m=>m[1]||m[2]);
for (const ref of refs) if (!/^https?:/.test(ref)) check(fs.existsSync(path.resolve(root,ref)),`Broken chapter VI image: ${ref}`);
check(!chapter.includes('assets/disenoux/'),'Legacy broken image path remains');
check(!/> (?:✍️|🔴|🟡|🟢)/.test(chapter),'Unresolved editorial marker in chapter VI');
check(!readme.includes('<!-- TEXTO ANTERIOR (Student Outcome 7'),'Obsolete Student Outcome remains');
function luminance(hex){const c=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];}
const colors=[['Primary','#FFFFFF','#002B49'],['Accessible cyan','#FFFFFF','#007EA8'],['Success','#166534','#F0FDF4'],['Error','#B91C1C','#FEF2F2'],['Pending','#075985','#F0F9FF'],['Revoked','#374151','#F3F4F6'],['Body','#163249','#F8FAFC'],['Muted','#526577','#F8FAFC']];
const contrast=colors.map(([name,fg,bg])=>{const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);check(ratio>=4.5,`Insufficient text contrast: ${name} ${ratio}`);return {name,foreground:fg,background:bg,ratio:Number(ratio.toFixed(2))};});
const result={designs:manifests.length,mainScreens:28,mobileTraceScreens:10,wireflows:23,chapterImageReferences:refs.length,contrast,checks:['PNG signature and width','Editable source and local references','Spanish language','Render manifests: overflow, fonts, images','Chapter VI image paths','Text contrast ≥ 4.5:1'],failures};
fs.writeFileSync(path.join(source,'verification.json'),JSON.stringify(result,null,2)+'\n');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(JSON.stringify(result,null,2));
