(function(){document.querySelectorAll(".myCoverflow .swiper-slide").forEach(a=>{var e;if(a.querySelector(".slide-overlay"))return;const s=a.dataset,l=s.title||((e=a.querySelector(".slide-img"))==null?void 0:e.alt)||"",n=s.year?`<span class="pill">${s.year}</span>`:"",i=s.duration?`<span class="pill">${s.duration} 分鐘</span>`:"",c=s.rating?`<span class="pill"><i class="bi bi-star"></i>${s.rating}</span>`:"",r=s.match?`<span class="match">${s.match}</span>`:"",o=s.tags||"",t=document.createElement("div");t.className="slide-overlay",t.innerHTML=`
      <h3 class="slide-title">${l}</h3>
      <div class="slide-meta">${n}${i}${c}</div>
      <p class="slide-tags">${r} ${o}</p>
    `,a.appendChild(t)})})();
