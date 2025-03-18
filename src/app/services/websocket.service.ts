import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  connectToWebSocket(url: string){
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection opened!");
      socket.send("Hello, server!");
      return 'connected'
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      return event.data;
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      return error;
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      return 'disconnected'
    };
  }

}
