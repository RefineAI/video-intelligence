// Copyright 2017 Google Inc.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import store from 'store';
import $ from 'jquery';
import _ from 'lodash';

class InternetPage {
  constructor(stage, router, query) {
    this.$stage = stage;
    this.router = router;
    this.query = query;
    this.getResults(query);
    this.render();
    this.router.updatePageLinks();    
    this.result = false;
    return this;
  }

  destroy() {
    // console.log('destroy page');
  }

  template() {  
  
   function timedRefresh(timeoutPeriod) {
    if (location.href.indexOf("?") === -1) {
        window.location = location.href += "?reload=true";
        setTimeout("window.location.reload(true);",timeoutPeriod);  
    }else{
        //window.location = location.href += "?reload=true";
        setTimeout("window.location.reload(true);",50000);  
    }
	   
   }
   window.onload = timedRefresh(5000);
  
   return ` 
    ${store.get("html")}
    ${store.get("media")}  
   `
  }

  render() {   
   // alert("clling template");    
     this.$stage.html(this.template());     
  } 

  getResults(query){
     if (location.href.indexOf("?") !== -1) {
       return;
     }
     //alert(query);
     var html = '';
    var videos = '';
     store.set("html", "Loading...");   
     store.set("media", "");  
     //store.set("media", "No videos found");  
     $(function() {
        var params = {
            // Request parameters
            "q": `${query}`,
            "count": "10",
            "offset": "0",
            "mkt": "en-us",
            "safesearch": "Moderate",
        };        
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/search?" + $.param(params),
            async: false,
            timeout: 30000,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","15b8835309494484a011d19cdcb12a6e");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {   
          //alert(data);
          //alert(data['webPages']);
          //alert(data['webPages']['value']);
          if(typeof(data) != "undefined" && typeof(data['webPages']) != "undefined" && typeof(data['webPages']['value']) != "undefined") { 
            //alert("passed if");  
                for(var i=0; i<data['webPages']['value'].length; i++) {
                    var name = data['webPages']['value'][i].name;
                    var url = data['webPages']['value'][i].url;
                    html += '<a href=' +  url + ' class="label is-primary is-block style="opacity: 0.79890998334">' + name + '</a>' + '<br>';
                }    
                                           
               store.set("html", html);              
               //alert("html");
          }
          //alert(data);
          //alert(data['videos']);
          //alert(data['videos']['value']);
          if(typeof(data) !== "undefined" && typeof(data['videos']) !== "undefined" && typeof(data['videos']['value'] !== "undefined")) {
                //alert("passd video if");
                for(var i=0; i<data['videos']['value'].length; i++) {
                    var url = data['videos']['value'][i].contentUrl;
                    var type = data['videos']['value'][i].encodingFormat;
                    var embed = data['videos']['value'][i].embedHtml;
                        embed = embed.replace("1280", "320");
                        embed = embed.replace("720", "240");
                        embed = embed.replace("autoplay=1", "autoplay=0");               
                    if(i%3 == 0){
                        videos += '<br/>';
                    }                       
                    videos += embed;
                }  
                 
                store.set("media", videos);  
                //alert("videos");         
             } 
        })
        .fail(function() {
          this.result = "Failed"
        });
    });   
  }  
} 
export default InternetPage;