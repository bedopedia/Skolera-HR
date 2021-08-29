import { Component, OnInit, Injectable } from '@angular/core';
import { Globals } from '@core/globals';
import { style } from '@angular/animations';
@Injectable()

@Component({
    selector: 'popup-message',
    template: `
        <div [hidden]="!globals.siteHasMessage" class="message-container {{globals.siteMessageType}}-container">
            <div class="text-center">
                <img src="assets/images/site-loader.svg" alt="">
                <br />
                <p class="mt-5 size-default">
                    {{globals.siteMessage}}
                </p>
            </div>
        </div>
    `,
    styles: [`
        .text-center{
            text-align: center;
        }
        .message-container{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255,255,255,.85);
            z-index: 999;
            font-size: 1.4rem;
        }
        .message-container p{
            min-height: 3rem;
            max-width: 500px;
            width: 100%;
            display: inline-block;
        }
        .message-container img{
            display: inline-block;
            width: 50px;
            object-fit: contain;
            padding: 0;
        }
        .loading-container img{
            animation: rotate360 1.5s linear 0s infinite none;
            transform-style: preserve-3d;
        }
        @keyframes rotate360{
            100%{
                transform: rotate(360deg)
            }
        }
    `]
})

export class PopupMessageComponent implements OnInit {

    constructor(
        public globals: Globals
    ) { }
    ngOnInit() { }
}
