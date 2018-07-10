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

import VideoCard from '../components/video-card';

class WebPage {
  constructor(stage, router, query) {
    this.$stage = stage;
    this.router = router;
    this.query = query;
    this.render();
    this.router.updatePageLinks();
    this.result = false;
    return this;
  }

  destroy() {
    // console.log('destroy page');
  }

  template(res) {
   return `
    
      ${store.get("html")}
      ${store.get("media")}
   `
  }

  render() {
    store.remove("html");   
    store.remove("media")
    alert(typeof(store.get("html")));
    alert(typeof(store.get("media")));
    this.getWebSearchResults(this.query); 
    
    alert(store.get("html"));
    alert(store.get("media"));

    while((typeof(store.get("media")) === "undefined"  || typeof(store.get("html")) === "undefined")){
        //sleep(10);              
      }
    
    alert("Template Call")
    this.$stage.html(this.template());
  }

  getWebSearchResults(query){
    let html = '';
    let videos = '';
    //store.remove("html");
    //store.remove("videos");
    let noVideos = false;
    
     $(function() {
        var params = {
            // Request parameters
            "q": `${query}`,
            "count": "10",
            "offset": "0",
            "mkt": "en-us",
            "safesearch": "Moderate",
        };    
          //alert("Ajax");  
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
          if(data != "undefined" && data['webPages'] != "undefined" && data['webPages']['values'] != "undefined") {   
                for(var i=0; i<data['webPages']['value'].length; i++) {
                    var name = data['webPages']['value'][i].name;
                    var url = data['webPages']['value'][i].url;
                    html += '<a href=' +  url + '>' + name + '</a>' + '<br>';
                }                           
                store.set("html", html);              
                alert("html");
          }
             
           // document.getElementById("web").innerHTML = html;

           //alert(this.result);
            if(data != "undefined" && data['videos'] != "undefined" && data['videos']['values'] != "undefined") {
                for(var i=0; i<data['videos']['value'].length; i++) {
                    var url = data['videos']['value'][i].contentUrl;
                    var type = data['videos']['value'][i].encodingFormat;
                    var embed = data['videos']['value'][i].embedHtml;
                        embed = embed.replace("1280", "320");
                        embed = embed.replace("720", "240");
                        embed = embed.replace("autoplay=1", "autoplay=0");               
                    if(i%3 == 0){
                        videos += '<br>';
                    }                       
                    videos += embed;
                }
                alert("videos");
                //document.getElementById("videos").innerHTML = videos;
              
                store.set("media", videos);
                alert(videos); 
             } 
        })
        .fail(function() {
          alert("Filed");
            this.result = "Failed"
        });
    });          
      //return html;
  } 

}

export default WebPage;