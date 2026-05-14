/**
 * TimelineHydrator
 *
 * Emits an inline <script> that replaces the contents of every
 * [data-canopy-timeline] element on the page with a custom vanilla-JS
 * rendering (the `.ct-timeline` layout). Reads the JSON payload that
 * upstream's MdxTimeline already embeds as a sibling
 * <script type="application/json"> inside the same wrapper.
 *
 * Inline placement means this script runs synchronously during HTML
 * parsing, before upstream's <script defer src="canopy-timeline.js">.
 * It sets data-canopy-timeline-mounted="1" so upstream's runtime skips
 * the elements it scans on DOMContentLoaded.
 *
 * Drop this component anywhere on a page that uses <Timeline>.
 */

const RUNTIME = String.raw`(function(){
  function esc(str){return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function formatDate(iso){var p=iso.split('-').map(Number);return new Date(p[0],p[1]-1,p[2]).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});}
  function getYear(group){var m=/\d{4}/.exec(group[0].meta.label||'');return m?m[0]:'';}
  function buildCorner(isLeft){return isLeft
    ? '<div class="ct-corner ct-corner--left"><div class="ct-corner__v"></div><div class="ct-corner__h"></div></div>'
    : '<div class="ct-corner ct-corner--right"><div class="ct-corner__h"></div><div class="ct-corner__v"></div></div>';}
  function buildYearRow(year,side){
    var isLeft=side==='left',y='<div class="ct-year">'+esc(String(year))+'</div>';
    return '<div class="ct-row ct-row--year"><div class="ct-cell ct-cell--left">'+(isLeft?y:'')+'</div><div class="ct-dot-col"></div><div class="ct-cell ct-cell--right">'+(isLeft?'':y)+'</div></div>';
  }
  function buildIntroRow(title,rs,re,sy){
    var dr=formatDate(rs)+' – '+formatDate(re);
    var card='<div class="ct-card ct-card--intro"><div class="ct-intro-title">'+esc(title)+'</div><div class="ct-intro-date">'+esc(dr)+'</div></div>';
    return '<div class="ct-row"><div class="ct-cell ct-cell--left">'+card+'</div><div class="ct-dot-col"></div><div class="ct-cell ct-cell--right"><div class="ct-year">'+esc(String(sy))+'</div></div></div>';
  }
  function buildManifestCard(m){
    var href=esc(m.href||'#'),title=esc(m.title||''),thumb=m.thumbnail?esc(m.thumbnail):'';
    var img=thumb?'<img src="'+thumb+'" alt="" width="100" height="100" loading="lazy">':'<span class="ct-manifest-card__no-thumb"></span>';
    return '<a class="ct-manifest-card" href="'+href+'">'+img+'<span>'+title+'</span></a>';
  }
  function buildGroup(group,side){
    var isLeft=side==='left',label=esc(group[0].meta.label),countHtml=group.length>1?'<div class="ct-count">'+group.length+' Events</div>':'';
    var all=[],seen={};
    for(var i=0;i<group.length;i++){var ms=group[i].manifests;if(ms&&ms.length){for(var j=0;j<ms.length;j++){var m=ms[j],k=m.id||m.href;if(k&&!seen[k]){seen[k]=1;all.push(m);}}}}
    var num=group.length>1;
    var titles=group.map(function(pt,idx){var n=num?'<span class="ct-title-num">'+(idx+1)+'.</span> ':'';return '<div class="ct-title">'+n+esc(pt.title)+'</div>';}).join('');
    var manifestsHtml=all.length?'<div class="ct-manifests">'+all.map(buildManifestCard).join('')+'</div>':'';
    var card='<div class="ct-card">'+buildCorner(isLeft)+'<div class="ct-date">'+label+'</div>'+countHtml+titles+manifestsHtml+'</div>';
    var leftCls=isLeft?'ct-cell--left':'ct-cell--right ct-cell--empty';
    var rightCls=!isLeft?'ct-cell--right':'ct-cell--left ct-cell--empty';
    return '<div class="ct-row"><div class="ct-cell '+leftCls+'">'+(isLeft?card:'')+'</div><div class="ct-dot-col"></div><div class="ct-cell '+rightCls+'">'+(!isLeft?card:'')+'</div></div>';
  }
  function renderTimeline(el,points,title,range){
    var sorted=points.slice().sort(function(a,b){return (a.meta.timestamp||0)-(b.meta.timestamp||0);});
    var groups=[];
    for(var i=0;i<sorted.length;i++){var pt=sorted[i],ts=pt.meta.timestamp,last=groups[groups.length-1];if(last&&last[0].meta.timestamp===ts)last.push(pt);else groups.push([pt]);}
    var rows=[];
    var startYear=range&&range.start?range.start.slice(0,4):(groups[0]?getYear(groups[0]):'');
    if(title&&range&&range.start&&range.end)rows.push(buildIntroRow(title,range.start,range.end,startYear));
    var lastYear=startYear;
    groups.forEach(function(group,i){var side=i%2===0?'left':'right',year=getYear(group);if(year&&year!==lastYear){rows.push(buildYearRow(year,side==='left'?'right':'left'));lastYear=year;}rows.push(buildGroup(group,side));});
    if(groups.length>0){var lastSide=(groups.length-1)%2===0?'left':'right';rows.push(buildYearRow(lastYear,lastSide==='left'?'right':'left'));}
    el.innerHTML='<div class="ct-timeline"><div class="ct-rows">'+rows.join('')+'</div></div>';
  }
  function mount(el){
    if(!el||el.getAttribute('data-canopy-timeline-mounted')==='1')return;
    try{
      var dataNode=el.querySelector('script[type="application/json"]');
      if(!dataNode)return;
      var props=JSON.parse(dataNode.textContent||'{}');
      var payload=props.__canopyTimeline||{};
      var points=Array.isArray(payload.points)?payload.points:[];
      renderTimeline(el,points,props.title||'',props.range||null);
      el.setAttribute('data-canopy-timeline-mounted','1');
    }catch(e){try{console.warn('[canopy][timeline] failed to mount',e);}catch(_){}}
  }
  function scan(){var els=document.querySelectorAll('[data-canopy-timeline]:not([data-canopy-timeline-mounted="1"])');for(var i=0;i<els.length;i++)mount(els[i]);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan,{once:true});
  else scan();
  try{
    var obs=new MutationObserver(function(muts){
      var todo=[];
      muts.forEach(function(m){m.addedNodes&&m.addedNodes.forEach(function(n){if(!(n instanceof Element))return;if(n.matches&&n.matches('[data-canopy-timeline]'))todo.push(n);var inner=n.querySelectorAll?n.querySelectorAll('[data-canopy-timeline]'):[];if(inner&&inner.forEach)inner.forEach(function(e){todo.push(e);});});});
      if(todo.length)Promise.resolve().then(function(){todo.forEach(mount);});
    });
    obs.observe(document.documentElement||document.body,{childList:true,subtree:true});
  }catch(_){}
})();`;

export default function TimelineHydrator() {
  return <script dangerouslySetInnerHTML={{__html: RUNTIME}} />;
}
