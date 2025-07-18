(()=>{if(!window.isAiReaderContentScriptActive){window.isAiReaderContentScriptActive=!0;let t=null,n=null;function o(){if(!document.getElementById("ai-reader-overlay")){(t=document.createElement("div")).id="ai-reader-overlay",Object.assign(t.style,{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.3)",zIndex:"2147483647",cursor:"crosshair"}),document.body.appendChild(t);let i=document.createElement("div"),r=(Object.assign(i.style,{position:"fixed",border:"2px dashed #fff",backgroundColor:"rgba(255, 255, 255, 0.1)",pointerEvents:"none"}),t.appendChild(i),0),d=0,a=!1;t.addEventListener("mousedown",e=>{r=e.clientX,d=e.clientY,a=!0,Object.assign(i.style,{left:r+"px",top:d+"px",width:"0px",height:"0px"})}),t.addEventListener("mousemove",e=>{var t,n,o;a&&(t=e.clientX,e=e.clientY,n=t-r,o=e-d,Object.assign(i.style,{width:Math.abs(n)+"px",height:Math.abs(o)+"px",left:`${0<n?r:t}px`,top:`${0<o?d:e}px`}))}),t.addEventListener("mouseup",async()=>{var e;a&&(a=!1,e={x:parseInt(i.style.left),y:parseInt(i.style.top),width:parseInt(i.style.width),height:parseInt(i.style.height)},t.style.display="none",await new Promise(e=>setTimeout(e,50)),10<e.width&&10<e.height?(chrome.runtime.sendMessage({type:"CAPTURE_AREA",area:e,devicePixelRatio:window.devicePixelRatio||1}),n=setTimeout(()=>{console.warn("OCR response timed out. Cleaning up overlay."),s()},3e4)):s())}),document.addEventListener("keydown",e)}}async function i(){let i=document.getElementById("ai-reader-container");if(i){i.style.display="flex";let e=document.getElementById("ai-reader-iframe");void(e&&(e.src=chrome.runtime.getURL("popup/popup.html?context=floater")))}else{(i=document.createElement("div")).id="ai-reader-container";var r=(await chrome.storage.local.get("floaterOpacity")).floaterOpacity,r=(r&&(i.style.opacity=r),document.createElement("div")),s=(r.id="ai-reader-header",r.textContent="",document.createElement("button"));s.id="ai-reader-close-btn",s.textContent="×",s.onclick=()=>{i.remove()};let e=document.createElement("iframe");e.id="ai-reader-iframe",e.src=chrome.runtime.getURL("popup/popup.html?context=floater"),r.appendChild(s),i.appendChild(r),i.appendChild(e),document.body.appendChild(i);s=document.createElement("style");s.textContent=`
            #ai-reader-container {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 285px; /* Reduced width */
                max-height: 90vh; /* Use max-height instead of fixed height */
                height: auto; /* Allow height to adjust */
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 2147483647;
                display: flex;
                flex-direction: column;
                overflow: hidden; /* Changed from hidden to auto for scrolling if needed */
                transition: height 0.2s ease-in-out; /* Add a smooth transition */
            }
            #ai-reader-header {
                padding: 10px;
                background-color: #f1f1f1;
                font-weight: bold;
                cursor: move;
                position: relative;
                user-select: none;
                text-align: center;
            }
            #ai-reader-close-btn {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                line-height: 1;
                padding: 5px;
            }
            #ai-reader-iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
        `,document.head.appendChild(s);{var c=i;s=r;let t=!1,d,a,e=e=>{"ai-reader-close-btn"!==e.target.id&&(t=!0,d=e.clientX-c.offsetLeft,a=e.clientY-c.offsetTop,document.addEventListener("mousemove",n),document.addEventListener("mouseup",o))},n=n=>{if(t){let e=n.clientX-d,t=n.clientY-a;var n=window.innerWidth,o=window.innerHeight,i=c.offsetWidth,r=c.offsetHeight;e<0&&(e=0),t<0&&(t=0),e+i>n&&(e=n-i),t+r>o&&(t=o-r),c.style.left=e+"px",c.style.top=t+"px"}},o=()=>{t=!1,document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)};s.addEventListener("mousedown",e)}}}function s(){n&&clearTimeout(n),n=null,t&&t.parentNode&&t.parentNode.removeChild(t),t=null,document.removeEventListener("keydown",e)}function e(e){"Escape"===e.key&&s()}window.addEventListener("message",e=>{var t,n;e.source===document.getElementById("ai-reader-iframe")?.contentWindow&&({type:e,height:t}=e.data,"RESIZE_IFRAME"===e)&&(n=document.getElementById("ai-reader-container"))&&t&&(n.style.height=t+25+"px")}),chrome.runtime.onMessage.addListener(e=>{if("START_SCREENSHOT"===e.type)o();else if("OCR_COMPLETED"===e.type)s(),i();else{if("OCR_ERROR"===e.type)return console.error("OCR Failed:",e.error),s(),window.isAiReaderContentScriptActive=!1;var t;"SET_OPACITY"===e.type?(t=document.getElementById("ai-reader-container"))&&(t.style.opacity=e.opacity):"SHOW_FLOATING_WINDOW"===e.type?i():"RESTART_SCREENSHOT"===e.type&&((t=document.getElementById("ai-reader-container"))&&(t.style.display="none"),o())}return!1}),window.addEventListener("message",e=>{console.log("[ContentScript] Received message event:",e);var t=document.getElementById("ai-reader-iframe");t&&e.source===t.contentWindow?(console.log("[ContentScript] Message source validated. Data:",e.data),{type:t,opacity:e}=e.data,"SET_OPACITY"===t&&((t=document.getElementById("ai-reader-container"))?(console.log("[ContentScript] Setting opacity to: "+e),t.style.opacity=e):console.log("[ContentScript] Container not found for setting opacity."))):console.log("[ContentScript] Message ignored: source does not match iframe window.")})}})();