// ==UserScript==
// @name         SuperRTC Express
// @version      1.61
// @author       Leo Takacs // Scam Baiting
// @match        *phone.firertc.com/phone*
// @grant        unsafeWindow
// ==/UserScript==
removeAssets = ['status', 'flash-container', 'logo-container', 'fa-bars', 'links', 'more-info-links', 'map-canvas', 'alert'];
areaCodes = [218, 917, 302, 406, 501, 334, 205, 251, 210, 430, 512, 802, 561, 954, 907, 860, 316, 240, 413, 978, 872, 779, 773, 712, 260, 620, 304, 681];
plugName = GM_info.script.name;
plugDesc = 'slimmmed-down SuperRTC with flagship features';
plugVers = GM_info.script.version;
publicVersion = true;
curNum = 0;
prevCall = false;
var els, i, len, title;
var konamiCode = '84,65,73,78,84,69,68,76,79,86,69';
var keyPresses = [];
var checkKonami = function(e) {
    keyPresses.push(e.keyCode);
    if (keyPresses.slice(keyPresses.length - 11).join() === konamiCode) {
        if (callbtn && !hangbtn && !cancbtn) {
            runKonami();
        }
    }
};
runKonami = function() {
    if (document.getElementById("taintedLoveFrame").src != 'https://www.youtube.com/embed/ZcyCQLewj10?autoplay=1') {
        status("Tainted Love");
        document.getElementById("taintedLoveFrame").src = 'https://www.youtube.com/embed/ZcyCQLewj10?autoplay=1';
        setCustomTitle("Tainted Love");
    } else {
        status("Idle");
        document.getElementById("taintedLoveFrame").src = '';
        setTitle();
    }
}
var SuperRTChtml = `
<center>
<p style="display:inline">Status: </p><p id="stat" style="display:inline">Idle<p>
<div class="btn-group" style=";outline: none;">
<input placeholder="Phone # to call" id="qccallnumber" class="btn dialer-input form-control dropdown-toggle val item" style="width:200px;text-align:center" maxlength="15" size="15" type="text">
<button class="btn btn-primary" type="submit" style="width:50px;height:43px;border-top-right-radius:12px;outline:0" id="qccallbtn" onclick="qc()">Call</button>
</br>
</br>
<input placeholder="Caller ID" id="currentCallerID" class="btn form-control dropdown-toggle" style="width:200px;text-align:center" maxlength="15" size="15" type="text">
<button class="btn btn-success" style="width:50px;height:43px;border-bottom-right-radius:12px;border-top-right-radius:0px;outline:0;margin-bottom:10px" id="uCID" onclick="updateCID()">Save</button>
</div>
</br>
<div class="toggleButtons btn-group-vertical">
<button class="btn btn-primary" style="20px;outline: none;" onclick="toggleCID()" id="CID">Auto randomize CID: ON</button>
<button class="btn btn-primary" style="20px;outline: none;" onclick="toggleHUI()" id="HUI">Hide interface: YES</button>
<button class="btn btn-primary" style="20px;outline:none;" onclick="alert('Despacito :V')">Call Flooder</button>
<button class="btn btn-primary" style="20px;outline:none;" onclick="togglePAD()" id="togglePAD" disabled>Toggle DTMF pad</button>
<!-- <button class="btn btn-primary" style="20px;outline:none;" onclick="taintedLove()">Tainted Love</button> -->
<button class="btn btn-default" style="20px;outline: none;" onclick="window.location.href = 'https://www.firertc.com/donate'"           ">Donate</button>
<button class="btn btn-default" style="20px;outline: none;" onclick="infoAlert()"        ">About</button>
</div>
</br>
</br>
</br>

<div class="newDialpad" style="display:none">

<div class="btn-group" style="">
<button onclick="sendDTMF(1)" class="btn btn-default">1</button>
<button onclick="sendDTMF(2)" class="btn btn-default">2</button>
<button onclick="sendDTMF(3)" class="btn btn-default">3</button>
</div>
</br>
<div class="btn-group" style="">
<button onclick="sendDTMF(4)" class="btn btn-default">4</button>
<button onclick="sendDTMF(5)" class="btn btn-default">5</button>
<button onclick="sendDTMF(6)" class="btn btn-default">6</button>
</div>
</br>
<div class="btn-group" style="">
<button onclick="sendDTMF(7)" class="btn btn-default">7</button>
<button onclick="sendDTMF(8)" class="btn btn-default">8</button>
<button onclick="sendDTMF(9)" class="btn btn-default">9</button>
</div>
</br>
<div class="btn-group" style="">
<button onclick="sendDTMF('*')"     class="btn btn-default">*</button>
<button onclick="sendDTMF(0)"       class="btn btn-default">0</button>
<button onclick="sendDTMF('#')"     class="btn btn-default">#</button>
</div>
</br>

</div>

</div>
</br>
<iframe class="frameCount" src="https://phone.firertc.com/settings" style="display:none;" id="settingswdw"></iframe>
</br>
<iframe class="frameCount" width="560" height="315" style="display:none;" id="taintedLoveFrame" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
`;
togglePAD = function() {
    if (!callbtn && hangbtn || cancbtn){
        if (document.getElementsByClassName("newDialpad")[0].style.display != 'none'){
            document.getElementsByClassName("newDialpad")[0].style.display = 'none';
            showPad = false;
        } else {
            document.getElementsByClassName("newDialpad")[0].style.display = '';
            showPad = true;
        }
    }
}
sendDTMF = function(num) {
    if (num != '*' && num != '#') {
        num = num.toString();
        FireRTC.DTMF;
        FireRTC.play(num);
    } else {
        console.log(num);
        FireRTC.DTMF;
        FireRTC.play(num);
    }
};
taintedLove = function() {
    /*
    if (document.getElementById("taintedLoveFrame").style.display == 'none') {
        document.getElementById("taintedLoveFrame").style.display = '';
    } else {
        document.getElementById("taintedLoveFrame").style.display = 'none';
    }
    */
};

function parseNumber(number) {
    number = number.toString();
    number = number.replace(/\(/g, "");
    number = number.replace(/\)/g, "");
    number = number.replace(/ /g, "");
    number = number.replace(/-/g, "");
    number = [number.slice(0, 3), "-", number.slice(3)].join('');
    number = [number.slice(0, 7), "-", number.slice(7)].join('');
    number = [number.slice(0, 0), "(", number.slice(0)].join('');
    number = [number.slice(0, 4), ")", number.slice(4)].join('');
    return number;
}

function status(text) {
    document.getElementById("stat").innerHTML = text;
};
infoAlert = function() {
    info = `
FireRTC made/managed by IceHook
` + plugName + ` ` + plugVers + ` made by Leo Takacs // Scam Baiting
Mobile player made by Jbro129

No copyright infringement intended.
If you payed for this plugin, you were scammed! (ironically)
`;
    alert(info);
};
updateCID = function() {
    if (document.getElementById("currentCallerID").value.length > 9) {
        document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value = parseNumber(document.getElementById("currentCallerID").value);
        document.getElementById("settingswdw").contentWindow.document.getElementsByClassName("btn")[2].click();
        status("Caller ID set to " + parseNumber(document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value));
        document.getElementById("currentCallerID").value = parseNumber(document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value);
        if (cidbtn.innerHTML.includes("ON")) {
            toggleCID();
        }
    }
}
enableButton = function() {
    document.getElementById("qccallbtn").disabled = false;
};
qc = function() {
    setTitle();
    document.getElementById("qccallbtn").disabled = true;
    setTimeout(enableButton, 1000);
    if (callbtn && !hangbtn && !cancbtn) {
        if (cidbtn.innerHTML.includes("ON")) {
            document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value = areaCodes[getRndInteger(0, areaCodes.length)] + "-" + getRndInteger(100, 999) + "-" + getRndInteger(1000, 9999);
            document.getElementById("settingswdw").contentWindow.document.getElementsByClassName("btn")[2].click();
            document.getElementById("currentCallerID").value = parseNumber(document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value);
        }
        if (entnum.value != curNum && entnum.value != '') {
            numspot.value = entnum.value;
            curNum = entnum.value;
        } else if (entnum.value == '' && curNum != 0) {
            entnum.value = curNum;
            numspot.value = curNum;
        } else if (entnum.value == curNum) {
            numspot.value = curNum;
        }
        entnum.value = parseNumber(entnum.value);
        document.getElementById("currentCallerID").value = parseNumber(document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value);
        status("Calling " + parseNumber(curNum) + " from " + parseNumber(document.getElementById("settingswdw").contentWindow.document.getElementById("address-ua-config-display-name").value));
        FireRTC.DTMF();
        if (huibtn.innerHTML.includes("NO")) {
            showClass("jumbotron");
        }
        callbtn.click();
        //hideFrames();
    } else if (hangbtn) {
        cancelled = false;
        hangbtn.click();
        numspot.value = '';
        entnum.value = '';
        document.getElementById("currentCallerID").value = '';
        status("Call with " + parseNumber(curNum) + " ended");
        showFrames();
        if (redbtn.innerHTML.includes("OFF")) {
            hideClass("jumbotron");
        }
    } else if (cancbtn) {
        cancelled = true;
        cancbtn.click();
        numspot.value = '';
        entnum.value = '';
        document.getElementById("currentCallerID").value = '';
        status("Call with " + parseNumber(curNum) + " cancelled");
        if (redbtn.innerHTML.includes("OFF")) {
            hideClass("jumbotron");
        }
    }
}
toggleRED = function() {
    if (redbtn.innerHTML.includes("OFF")) {
        //turn on
        redbtn.innerHTML = redbtn.innerHTML.replace(/OFF/g, "ON");
    } else {
        //turn off
        redbtn.innerHTML = redbtn.innerHTML.replace(/ON/g, "OFF");
    }
};
toggleHUI = function() {
    if (huibtn.innerHTML.includes("YES")) {
        //turn off
        huibtn.innerHTML = huibtn.innerHTML.replace(/YES/g, "NO");
    } else {
        //turn on
        huibtn.innerHTML = huibtn.innerHTML.replace(/NO/g, "YES");
    }
};
toggleCID = function() {
    if (cidbtn.innerHTML.includes("OFF")) {
        //turn on
        cidbtn.innerHTML = cidbtn.innerHTML.replace(/OFF/g, "ON");
    } else {
        //turn off
        cidbtn.innerHTML = cidbtn.innerHTML.replace(/ON/g, "OFF");
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.htmlCode = `


<title>
CID Spoofer - Leo Takacs
</title>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

<style>
#cid_cont *{
font-size: 35px;
}
input {
    text-align: center;
}
</style>

<center>

</br>
<div id="cid_cont" >
<input type="text" id="cid_ent" length="20">
</br><button class="btn btn-default" onclick="if(!this.disabled){setCID(document.getElementById('cid_ent').value)}">Set Caller ID</button>
</br><button class="btn btn-default" onclick="if(!this.disabled){randCID();}">Random Caller ID</button>
</br>
</div>


<iframe width="500" height="500" frameborder="0" seamless="seamless" scrolling="no" ></iframe>
<iframe width="0" height="0" width="100%" height="500px" src="http://10.0.0.98/admin/config.php?display=trunks&tech=sip&extdisplay=OUT_1" frameborder="0"></iframe>
`;

editUrl = "http://10.0.0.98/admin/config.php?display=trunks&tech=sip&extdisplay=OUT_1";


window.onload = function() {
    if (window.location.href.includes("allareacodes")) {
        document.documentElement.scrollTop = 180;
    } else {
        document.documentElement.innerHTML = htmlCode;
        iframe = document.getElementsByTagName("iframe")[1];
        setTimeout(function() {
            if (iframe.contentWindow.document.getElementById("outcid")) {
                setStatusNumber(parseNumber(iframe.contentWindow.document.getElementById("outcid").value));
                setAreaCodeInfo();
            }
        }, 1000);
    }
}

setAreaCodeInfo = function() {
    a = "https://www.allareacodes.com/" + getCurAreaCode();
    document.getElementsByTagName("iframe")[0].src = a;
}

setStatus = function(stat) {
    document.getElementById("curID").innerHTML = stat;
}
setStatusNumber = function(stat1) {
    document.getElementById("cid_ent").value = stat1;
}

parseNumber = function(number) {
    number = number.toString();
    number = number.replace(/\(/g, "");
    number = number.replace(/\)/g, "");
    number = number.replace(/ /g, "");
    number = number.replace(/-/g, "");
    number = [number.slice(0, 3), "-", number.slice(3)].join('');
    number = [number.slice(0, 7), "-", number.slice(7)].join('');
    number = [number.slice(0, 0), "(", number.slice(0)].join('');
    number = [number.slice(0, 4), ")", number.slice(4)].join('');
    return number;
}

getCurAreaCode = function(number) {
    number = document.getElementById("cid_ent").value;
    number = number.toString();
    number = number.replace(/\(/g, "");
    number = number.replace(/\)/g, "");
    number = number.replace(/ /g, "");
    number = number.replace(/-/g, "");
    return number.substring(0, 3);
}

disableAllUI = function() {
    for (i = 0; i < document.getElementById('cid_cont').children.length; i++) {
        document.getElementById('cid_cont').children[i].disabled = true;
    }
}

enableAllUI = function() {
    for (i = 0; i < document.getElementById('cid_cont').children.length; i++) {
        document.getElementById('cid_cont').children[i].disabled = false;
    }
}

setCID = function(num) {
    disableAllUI();
    cid = num;
    document.getElementById('cid_ent').value = '';
    allowUpdates = false;
    setStatusNumber("Setting number.....");
    iframe.contentWindow.document.getElementById("outcid").value = cid;
    setStatusNumber("Submitting.....");
    iframe.contentWindow.document.getElementById("submit").click();
    y = setInterval(function() {
        if (iframe.contentWindow.window.location.href == "http://10.0.0.98/admin/config.php?display=trunks") {
            clearInterval(y);
            iframe.contentWindow.window.onload = function() {
                setStatusNumber("Reloading.....");
                iframe.contentWindow.document.getElementById("button_reload").click();
            }
            setTimeout(function() {
                g = setInterval(function() {
                    if (!iframe.contentWindow.document.getElementsByClassName("ui-dialog-title")[0]) {
                        iframe.contentWindow.window.location.href = "http://10.0.0.98/admin/config.php?display=trunks&tech=sip&extdisplay=OUT_1";
                        clearInterval(g);
                        setStatusNumber(parseNumber(cid));
                        enableAllUI();
                        setAreaCodeInfo(getCurAreaCode());
                    }
                }, 50);
            }, 1000);
        }
    }, 50);
}

randCID = function() {
    areaCode = areaCodes[getRndInteger(0, areaCodes.length)];
    final = areaCode + "-" + getRndInteger(101, 999) + "-" + getRndInteger(1001, 9999);
    setCID(final);
}


getRndInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}() * (max - min)) + min;
}
window.onload = function() {
    document.title = "Loading...";
    setInterval(alwaysRun, 10);
    setInterval(freqRun, 200);
    setTimeout(waitFiveAfterLoad, 3000);
    setTimeout(function() {
        //showFrames();
    }, 2000);
    document.documentElement.innerHTML += SuperRTChtml;
}
alwaysRun = function() {
    unsafeWindow.utils.handleBadScripts = {}
    if (document.querySelectorAll('body[data-controller=home]')[0].style.display == 'none') {
        document.title = "Loading...";
    }
    for (i = 0; i < removeAssets.length; i++) {
        if (document.getElementsByClassName(removeAssets[i])[0] && document.getElementsByClassName(removeAssets[i])[0].style.display != 'none') {
            for (j = 0; j < document.getElementsByClassName(removeAssets[i]).length; j++) {
                document.getElementsByClassName(removeAssets[i])[j].style.display = 'none';
            }
        }
    }
    if (!prevCall && hangbtn) {
        document.getElementById("togglePAD").disabled = false;
        prevCall = true;
    }
    if (!prevCall && cancbtn) {
        document.getElementById("togglePAD").disabled = false;
        prevCall = true;
    }
    if (prevCall && callbtn && redbtn.innerHTML.includes("ON")) {
        //Redial code. Most likely removed in public release.
    } else if (prevCall && callbtn && !redbtn.innerHTML.includes("ON")) {
        prevCall = false;
        if (!cancelled) {
            status("Call with " + parseNumber(curNum) + " ended");
            document.getElementsByClassName("newDialpad")[0].style.display = 'none';
            document.getElementById("togglePAD").disabled = true;
        } else {
            status("Call with " + parseNumber(curNum) + " cancelled");
            document.getElementsByClassName("newDialpad")[0].style.display = 'none';
            document.getElementById("togglePAD").disabled = true;
        }
        hideClass("jumbotron");
    }
}
freqRun = function() {
    callbtn = document.querySelectorAll('button[data-action=call]')[0];
    cancbtn = document.querySelectorAll('button[data-action=cancel]')[0];
    hangbtn = document.querySelectorAll('button[data-action=hangup]')[0];
    redbtn = document.getElementById("RED");
    cidbtn = document.getElementById("CID");
    numspot = document.getElementsByClassName("dialer-input")[0];
    entnum = document.getElementById("qccallnumber");
};
(function() {
    document.title = "Loading...";
    document.querySelectorAll('body[data-controller=home]')[0].style.display = 'none';
})();

function hideClass(className) {
    for (k = 0; k < document.getElementsByClassName(className).length; k++) {
        document.getElementsByClassName(className)[k].style.display = 'none';
    }
}

function showClass(className) {
    for (k = 0; k < document.getElementsByClassName(className).length; k++) {
        document.getElementsByClassName(className)[k].style.display = '';
    }
}
waitFiveAfterLoad = function() {
    /*
    document.querySelectorAll('button[data-action=call]')[0].setAttribute("id", "callbtn");
    document.querySelectorAll('button[data-action=cancel]')[0].setAttribute("id", "cancbtn");
    document.querySelectorAll('button[data-action=hangup]')[0].setAttribute("id", "hangbtn");
    document.getElementById("RED").setAttribute("id", "redbtn");
    document.getElementById("CID").setAttribute("id", "cidbtn");
    document.getElementsByClassName("dialer-input")[0].setAttribute("id", "numspot");
    */
    callbtn = document.querySelectorAll('button[data-action=call]')[0];
    cancbtn = document.querySelectorAll('button[data-action=cancel]')[0];
    hangbtn = document.querySelectorAll('button[data-action=hangup]')[0];
    redbtn = document.getElementById("RED");
    cidbtn = document.getElementById("CID");
    huibtn = document.getElementById("HUI");
    numspot = document.getElementsByClassName("dialer-input")[0];
    entnum = document.getElementById("qccallnumber");
    hideClass("jumbotron");
    if (!callbtn) {
        window.location.reload();
    } else {
        document.querySelectorAll('body[data-controller=home]')[0].style.display = '';
        if (publicVersion) {
            alert("Welcome to " + plugName + " " + plugVers + "!\n\n" + "by Leo Takacs // Scam Baiting\n(FireRTC by IceHook)");
        }
        document.addEventListener('keyup', checkKonami);
        setTitle();
    }
};
setTitle = function() {
    document.title = plugName + " " + plugVers;
}
setCustomTitle = function(title) {
    document.title = title;
}
getTitle = function() {
    return document.title;
}  
