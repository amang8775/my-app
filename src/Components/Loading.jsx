import React from "react";
import './Loading.scss'
export default function Loading() {
  return (
    <div className="centerClass">
      <div class="bodyLoader">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="base">
          <span></span>
          <div class="face"></div>
        </div>
      </div>

      <div class="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <h1 className="text-load">Loading</h1>
     
    </div>
  );
}
