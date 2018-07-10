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

import _ from 'lodash';
import {VIDEO_DATA} from '../constants';




export default function(video, query, expanded) {
  const title = video.url_safe_id;
  const tags = video.annotations.label_annotations.map(label => label.description).join(', ');

  let title_new = ""
  let img_src = ""
  let index = ""

  /** RefineAI Changes **/
  
 if(title.startsWith("1")){   
   title_new = "The Summer Man";
   img_src = "https://storage.googleapis.com/tktimages/1.jpg";
   index=1
 } else if(title.startsWith("2")){
   title_new = "Don Draper is the Man";
  img_src = "https://storage.googleapis.com/tktimages/2.jpg";
  index=2
 }else if(title.startsWith("3")){
   title_new = "Extended Promo";
  img_src = "https://storage.googleapis.com/tktimages/3.jpg";
   index=3
 }else if(title.startsWith("4")){
   title_new = "Nostalgia";
  img_src = "https://storage.googleapis.com/tktimages/Nostalgia.jpg";
   index=4
 }else if(title.startsWith("5")){
   title_new = "Don Draper Bad Ass";
  img_src = "https://storage.googleapis.com/tktimages/5.jpg";
   index=5
 }else if(title.startsWith("6")){
   title_new = "Nostalgia";
  img_src = "https://storage.googleapis.com/tktimages/Nostalgia.jpg";
   index=6
 }else if(title.startsWith("7")){
   title_new = "Season 6 Premiere";
  img_src = "https://storage.googleapis.com/tktimages/7.jpg";
   index=7
 }else if(title.startsWith("8")){
   title_new = "Season 2 Premiere";
  img_src = "https://storage.googleapis.com/tktimages/8.jpg";
   index=8
 } 


  /**End RefineAI Changes **/

  // DEFAULT VALUES
  let header = `<h3 class="text-body">${title_new}</h3>`;
  let selectedTags = tags.length > 90 ? `${tags.substring(0,90)}...` : tags;
  let isExpanded = '';
  

  // UPDATE ELEMENTS FOR EXANDED VIDEO CARD
  if(expanded) {
    header = `<h3 class="text-title">${title_new}</h3>`;
    isExpanded = 'is-expanded';
    selectedTags = tags.length > 230 ? `${tags.substring(0,230)}...` : tags;
  }

  // RETURN VIDEO CARD ELEMENT
  return `
   <script>
      function go${index}(){
        window.location.href="/video/${video.url_safe_id}";
      }
   </script>
    
    <a href="/video/${video.url_safe_id}" class="video-card ${isExpanded}" data-navigo onClick="javascript:go${index}()">     
      <div class="video-card-hero">
        <video poster="${img_src}" class="video-card-video" preload="metadata" id="${video.url_safe_id}" src="${video.link}"></video> 
       <!-- <video class="video-card-video" preload="metadata" id="${video.url_safe_id}" src="${img_src}"></video> -->
      </div>
      ${header}
      <div class="video-card-graph"></div>
      <p class="text-caption is-secondary">${selectedTags}</p>
    </a>
    <input type="submit" style="display: none" />
    
  `;
}